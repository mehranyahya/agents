import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

const output = 'projector-snapshots';
await mkdir(output, { recursive: true });

const server = spawn('npm', ['run','dev','--','--host','127.0.0.1','--port','4173'], {stdio:'ignore'});
let browser;
try {
  let ready = false;
  for (let attempt=0; attempt<45; attempt++){
    try {const r=await fetch('http://127.0.0.1:4173/agents/');if(r.ok){ready=true;break;}}catch{}
    await new Promise(r=>setTimeout(r,400));
  }
  if (!ready) throw new Error('Vite server did not start');
  browser=await chromium.launch({channel:'chrome',headless:true,args:['--no-sandbox']});
  const results = [];
  for (const [width,height] of [[1920,1080],[1280,720]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const pageErrors=[];
    page.on('pageerror',e=>{pageErrors.push(e.message);console.log('BROWSER_ERROR:',e.message);});
    await page.goto('http://127.0.0.1:4173/agents/',{waitUntil:'domcontentloaded'});
    const timerSelector='[title="شروع تایمر"], [title="توقف تایمر"], [title="ریست تایمر"], [title="صفر کردن تایمر"]';
    if(await page.locator(timerSelector).count())throw new Error('A timer control is visible in normal view');
    if((await page.locator('header').first().innerText()).includes('سقف ۱۰ دقیقه'))throw new Error('Navbar still shows a timer limit');
    await page.locator('button[title="حالت ارائه تمام‌صفحه"]').click();
    await page.waitForSelector('.presentation-slide--fullscreen');
    if(await page.locator(timerSelector).count())throw new Error('A timer control is visible in fullscreen');
    if((await page.locator('.presentation-slide--fullscreen').innerText()).includes('/ 10:00'))throw new Error('Fullscreen timer is still visible');
    for(let i=0;i<12;i++){
      if(i===0)await page.keyboard.press('Home');
      else await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(70);
      // Check slide-topic mapping visually after the sequence change.
      if(i>=4 && i<=9){
        const heading=await page.locator('.presentation-slide--fullscreen h2').first().innerText();
        const required={4:'خطا',5:'ابزار',6:'بدون کدنویسی',7:'شخصی',8:'متن‌باز',9:'خطا'}[i];
        if(!heading.includes(required))throw new Error('Slide '+(i+1)+' unexpectedly shows '+heading);
      }
      const stats = await page.evaluate(()=>{
        const st=document.querySelector('.presentation-slide--fullscreen');
        if(!st)return {error:'No slide stage'};
        const box=st.getBoundingClientRect();
        const tw=document.createTreeWalker(st,NodeFilter.SHOW_TEXT);
        const items=[];let node;
        while((node=tw.nextNode())){
          const text=node.textContent?.trim();
          if(!text||!node.parentElement)continue;
          const parent=node.parentElement;
          const cs=getComputedStyle(parent);
          if(cs.display==='none'||cs.visibility==='hidden')continue;
          const range=document.createRange();range.selectNodeContents(node);
          const rects=[...range.getClientRects()].filter(r=>r.width>0&&r.height>0);
          if(!rects.length)continue;
          const clipped=rects.some(r=>r.left<box.left-3||r.right>box.right+3||r.top<box.top-3||r.bottom>box.bottom+3);
          items.push({text:text.slice(0,85),fontSize:parseFloat(cs.fontSize),clipped});
        }
        const b=document.querySelector('.presentation-slide--fullscreen > div.relative.z-10');
        return {slide:Number(st.getAttribute('data-slide'))+1,stageWidth:Math.round(box.width),stageHeight:Math.round(box.height),textCount:items.length,minFontSize:Math.min(...items.map(x=>x.fontSize)),medianFontSize:items.map(x=>x.fontSize).sort((a,b)=>a-b)[Math.floor(items.length/2)],clipped:items.filter(x=>x.clipped),contentScrollHeight:b?.scrollHeight,contentClientHeight:b?.clientHeight};
      });
      results.push({width,height,...stats});
      if(i===7||i===8){
        const galleryQA=await page.evaluate(()=>{
          const stage=document.querySelector('.presentation-slide--fullscreen');
          const cards=[...stage.querySelectorAll('[data-agent-product]')];
          const errors=[];
          if(cards.length!==3)errors.push('Expected exactly three product cards');
          for(const card of cards){
            const cb=card.getBoundingClientRect();
            if(card.scrollHeight>card.clientHeight+5)errors.push(card.dataset.agentProduct+' card content vertically overflows');
            const walker=document.createTreeWalker(card,NodeFilter.SHOW_TEXT);
            let textNode;
            while((textNode=walker.nextNode())){
              if(!textNode.textContent?.trim())continue;
              const range=document.createRange();range.selectNodeContents(textNode);
              for(const r of range.getClientRects()){
                if(r.width>0&&r.height>0&&(r.left<cb.left-4||r.right>cb.right+4||r.top<cb.top-4||r.bottom>cb.bottom+4))
                  errors.push(card.dataset.agentProduct+' text outside card: '+textNode.textContent.trim().slice(0,35));
              }
            }
          }
          return {errors,names:cards.map(c=>c.dataset.agentProduct)};
        });
        console.log('PRODUCT_GALLERY_QA',width+'x'+height,'slide'+(i+1),JSON.stringify(galleryQA));
        if(galleryQA.errors.length)throw new Error('Product gallery overflow: '+galleryQA.errors.join('; '));
      }
      if(stats.clipped?.length)throw new Error('Slide '+(i+1)+' text escapes projector stage at '+width+'x'+height+': '+JSON.stringify(stats.clipped.slice(0,4)));
      if((stats.contentScrollHeight||0)-(stats.contentClientHeight||0)>4)throw new Error('Slide '+(i+1)+' vertically overflows projector stage at '+width+'x'+height);
      if(i===5){
        const abbreviationAudit = await page.evaluate(()=>{
          const stage=document.querySelector('.presentation-slide--fullscreen');
          const expansions=[...stage.querySelectorAll('.concept-full-form')];
          const expected=['Application Programming Interface','Model Context Protocol'];
          const errors=[];
          if(expansions.length!==2)errors.push('There must be two abbreviations on slide 6');
          for(const [index,element] of expansions.entries()){
            if(element.textContent.trim()!==expected[index])errors.push('Wrong abbreviation '+index);
            const card=element.closest('.rounded-xl');
            if(!card){errors.push('Missing concept card '+index);continue;}
            const bounds=card.getBoundingClientRect();
            const line=element.getBoundingClientRect();
            const style=getComputedStyle(element);
            if(parseFloat(style.fontSize)<12)errors.push('Expansion text too small: '+style.fontSize);
            if(line.left<bounds.left-3||line.right>bounds.right+3||line.top<bounds.top-3||line.bottom>bounds.bottom+3)errors.push('Expansion outside its card: '+element.textContent.trim());
            if(card.scrollHeight>card.clientHeight+3)errors.push('Concept card vertically overflows: '+element.textContent.trim());
            const heading=element.previousElementSibling;
            if(heading&&heading.getBoundingClientRect().bottom>line.top+2)errors.push('Heading collides with expansion: '+element.textContent.trim());
          }
          return {errors,expansions:expansions.map(e=>({label:e.textContent.trim(),font:getComputedStyle(e).fontSize,lines:Math.round(e.getBoundingClientRect().height/parseFloat(getComputedStyle(e).lineHeight))}))};
        });
        console.log('ABBREVIATION_QA',width+'x'+height,JSON.stringify(abbreviationAudit));
        if(abbreviationAudit.errors.length)throw new Error('Slide 6 abbreviation QA failed: '+abbreviationAudit.errors.join('; '));
      }
      const name=width+'x'+height+'_slide'+(i+1)+'.png';
      if(width===1920||[1,2,3,4,5,6,7].includes(i))await page.screenshot({path:output+'/'+name});
      if(i===2){
        const qa=await page.evaluate(()=>{
          const stage=document.querySelector('.presentation-slide--fullscreen');
          const diagram=stage.querySelector('.architecture-diagram');
          const parts=['loop-label','memory','tools','llm','instructions','safety'];
          if(!diagram) return {errors:['missing architecture diagram']};
          const dr=diagram.getBoundingClientRect();
          const cards=[...diagram.querySelectorAll('.architecture-card')];
          const errors=[];
          const r=cards.map(card=>({name:card.getAttribute('data-diagram-part'),rect:card.getBoundingClientRect(),overflow:card.scrollHeight-card.clientHeight}));
          // Cards may not cover any of each other's area, in either direction.
          for(let a=0;a<r.length;a++)for(let b=a+1;b<r.length;b++){
            const x=Math.min(r[a].rect.right,r[b].rect.right)-Math.max(r[a].rect.left,r[b].rect.left);
            const y=Math.min(r[a].rect.bottom,r[b].rect.bottom)-Math.max(r[a].rect.top,r[b].rect.top);
            if(x>2&&y>2)errors.push('cards overlap: '+r[a].name+' / '+r[b].name);
          }
          for(const x of r){
            if(x.overflow>3)errors.push(x.name+' content vertically overflows by '+x.overflow+'px');
          }
          const label=diagram.querySelector('[data-diagram-part="loop-label"]').getBoundingClientRect();
          const memory=diagram.querySelector('[data-diagram-part="memory"]').getBoundingClientRect();
          if(label.bottom>memory.top+2)errors.push('cycle label overlaps memory card');
          if(dr.width>stage.getBoundingClientRect().width*(stage.getBoundingClientRect().width<1300?.85:.75))errors.push('diagram not narrowed');
          if(dr.height/dr.width<.38)errors.push('diagram not tall enough');
          for(const node of [...diagram.querySelectorAll('.architecture-card, [data-diagram-part="loop-label"]')]){
            const bounds=node.getBoundingClientRect();
            const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
            let text;
            while((text=walker.nextNode())){
              if(!text.textContent?.trim())continue;
              const range=document.createRange();range.selectNodeContents(text);
              for(const tr of range.getClientRects()){
                if(tr.width>0&&tr.height>0&&(tr.left<bounds.left-3||tr.right>bounds.right+3||tr.top<bounds.top-3||tr.bottom>bounds.bottom+3)){
                  errors.push((node.getAttribute('data-diagram-part')||'label')+' text outside its own card: '+text.textContent.trim().slice(0,35));
                }
              }
            }
          }
          return {errors,width:Math.round(dr.width),height:Math.round(dr.height),cardCount:cards.length};
        });
        console.log('ARCHITECTURE_QA',width+'x'+height,JSON.stringify(qa));
        if(qa.errors.length)throw new Error('Slide 3 architecture layout failed: '+qa.errors.join('; '));
      }
      console.log(JSON.stringify({viewport:width+'x'+height,slide:i+1,fonts:[stats.minFontSize,stats.medianFontSize],clipped:stats.clipped?.length,contentOverflow:(stats.contentScrollHeight||0)-(stats.contentClientHeight||0)}));
      if(stats.clipped?.length)console.log('CLIPPED_TEXT',JSON.stringify(stats.clipped.slice(0,5)));
    }
    // Check all states of the interactive coding demo, not just the initial screen.
    await page.keyboard.press('5');
    await page.waitForTimeout(100);
    for(let step=0;step<5;step++){
      await page.getByRole('button',{name:'گام بعدی شبیه‌سازی'}).click();
    }
    await page.screenshot({path:output+'/'+width+'x'+height+'_demo-complete.png'});
    await page.getByRole('button',{name:'سند اجرای واقعی'}).click();
    await page.screenshot({path:output+'/'+width+'x'+height+'_real-trace.png'});
    // Verify none of the visible text overflows the slide stage in these states.
    const traceOverflow=await page.evaluate(()=>{
      const stage=document.querySelector('.presentation-slide--fullscreen');
      const bounds=stage.getBoundingClientRect();
      const walker=document.createTreeWalker(stage,NodeFilter.SHOW_TEXT);
      const outside=[];let node;
      while((node=walker.nextNode())){
        if(!node.textContent?.trim()||!node.parentElement)continue;
        const r=document.createRange();r.selectNodeContents(node);
        if([...r.getClientRects()].some(x=>x.width>0 && x.height>0 &&
          (x.left<bounds.left-3 || x.right>bounds.right+3 || x.top<bounds.top-3 || x.bottom>bounds.bottom+3)))
          outside.push(node.textContent.trim().slice(0,80));
      }
      return outside;
    });
    console.log('TRACE_OVERFLOW',width+'x'+height,traceOverflow.length,JSON.stringify(traceOverflow.slice(0,5)));
    // Verify the same new labels stay legible when the user changes to light mode.
    await page.keyboard.press('6');
    await page.getByRole('button',{name:'تغییر تم'}).click();
    // Tailwind animates the stage background for 300ms. Capture only the settled state.
    await page.waitForTimeout(450);
    const contrast=await page.evaluate(()=>{
      const stage=document.querySelector('.presentation-slide--fullscreen');
      const heading=stage.querySelector('h2');
      // Let Chrome convert both rgb(...) and modern oklch(...) into true sRGB.
      const rgb=color=>{
        const canvas=document.createElement('canvas');
        canvas.width=canvas.height=1;
        const ctx=canvas.getContext('2d');
        ctx.fillStyle=color;
        ctx.fillRect(0,0,1,1);
        return [...ctx.getImageData(0,0,1,1).data].slice(0,3);
      };
      const luminance=color=>{
        const v=rgb(color).map(n=>{const x=n/255;return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;});
        return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2];
      };
      const bg=luminance(getComputedStyle(stage).backgroundColor);
      const fg=luminance(getComputedStyle(heading).color);
      const panel=stage.querySelector('[data-order-request]');
      const panelBg=luminance(getComputedStyle(panel).backgroundColor);
      const panelFg=luminance(getComputedStyle(panel).color);
      return {
        ratio:(Math.max(bg,fg)+0.05)/(Math.min(bg,fg)+0.05),
        panelContrast:(Math.max(panelBg,panelFg)+0.05)/(Math.min(panelBg,panelFg)+0.05),
        bg:getComputedStyle(stage).backgroundColor,
        title:getComputedStyle(heading).color
      };
    });
    console.log('LIGHT_MODE_CONTRAST',width+'x'+height,JSON.stringify(contrast));
    if(contrast.ratio<7)throw new Error('Slide 6 title contrast insufficient in light mode');
    if(contrast.panelContrast<4.5)throw new Error('Slide 6 order-request text is unreadable in light mode');
    await page.screenshot({path:output+'/'+width+'x'+height+'_slide6-light.png'});
    const lightModeText=await page.locator('.presentation-slide--fullscreen .concept-full-form').allInnerTexts();
    if(lightModeText.length!==2||lightModeText[0].trim()!=='Application Programming Interface'||lightModeText[1].trim()!=='Model Context Protocol')
      throw new Error('Slide 6 expansions disappeared in light mode');
    // Capture a complete second pass in light theme to catch regressions
    // that clipping-only checks on the default dark theme cannot reveal.
    for(let i=0;i<12;i++){
      if(i===0)await page.keyboard.press('Home');
      else await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(75);
      const lightClipped=await page.evaluate(()=>{
        const stage=document.querySelector('.presentation-slide--fullscreen');
        const bounds=stage.getBoundingClientRect();
        const walker=document.createTreeWalker(stage,NodeFilter.SHOW_TEXT);
        let text;const outside=[];
        while((text=walker.nextNode())){
          if(!text.textContent?.trim()||!text.parentElement)continue;
          const range=document.createRange();range.selectNodeContents(text);
          if([...range.getClientRects()].some(r=>r.width>0&&r.height>0&&(r.left<bounds.left-3||r.right>bounds.right+3||r.top<bounds.top-3||r.bottom>bounds.bottom+3)))
            outside.push(text.textContent.trim().slice(0,60));
        }
        return outside;
      });
      if(lightClipped.length)throw new Error('Light slide '+(i+1)+' text clipped at '+width+'x'+height+': '+JSON.stringify(lightClipped.slice(0,3)));
      if(width===1280)await page.screenshot({path:output+'/'+width+'x'+height+'_light-slide'+(i+1)+'.png'});
    }
    if(pageErrors.length)throw new Error('Browser errors during projection audit: '+pageErrors.join(' | '));
    await page.close();
  }
  await writeFile(output+'/metrics.json',JSON.stringify(results,null,2));
}finally{
  if(browser)await browser.close();
  server.kill('SIGTERM');
}
