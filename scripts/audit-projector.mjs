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
    page.on('pageerror',e=>console.log('BROWSER_ERROR:',e.message));
    await page.goto('http://127.0.0.1:4173/agents/',{waitUntil:'domcontentloaded'});
    await page.locator('button[title="حالت ارائه تمام‌صفحه"]').click();
    await page.waitForSelector('.presentation-slide--fullscreen');
    for(let i=0;i<10;i++){
      await page.keyboard.press(i<9?String(i+1):'0');
      await page.waitForTimeout(70);
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
      const name=width+'x'+height+'_slide'+(i+1)+'.png';
      if(width===1920||[1,3,4,5,7].includes(i))await page.screenshot({path:output+'/'+name});
      console.log(JSON.stringify({viewport:width+'x'+height,slide:i+1,fonts:[stats.minFontSize,stats.medianFontSize],clipped:stats.clipped?.length,contentOverflow:(stats.contentScrollHeight||0)-(stats.contentClientHeight||0)}));
      if(stats.clipped?.length)console.log('CLIPPED_TEXT',JSON.stringify(stats.clipped.slice(0,5)));
    }
    await page.close();
  }
  await writeFile(output+'/metrics.json',JSON.stringify(results,null,2));
}finally{
  if(browser)await browser.close();
  server.kill('SIGTERM');
}
