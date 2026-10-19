import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const slidesSource = file('src/data/slidesData.ts');
const speakerScript = file('SPEAKER_SCRIPT_12SLIDES_FA.md');
const exportSource = file('src/services/googleSlidesService.ts');
const exportModal = file('src/components/GoogleSlidesModal.tsx');
const app = file('src/App.tsx');
const thumbnailSource = file('src/components/SlideThumbnails.tsx');

const match = slidesSource.match(/export const SLIDES: SlideData\[\] = (\[[\s\S]*\]);/);
assert.ok(match, 'Could not find the JSON slide list');
const slides = JSON.parse(match[1]);

assert.equal(slides.length, 12, 'The live website must have 12 slides');
assert.equal(slides.reduce((sum, slide) => sum + slide.durationSeconds, 0), 620, 'Approximate rehearsal timing must total 10:20');
assert.equal(slides[4].durationSeconds, 106, 'Demo at visible slide 5 requires 1:46');
assert.equal(slides[4].slug, 'applications-and-demo', 'Slide 5 must be the interactive coding demo');
const agentLoopSource = file('src/components/slides/Slide3AgentLoop.tsx');
assert.ok(agentLoopSource.includes("phase: 'Check'"), 'Step 4 must be labeled Check, not Repeat');
assert.ok(agentLoopSource.includes("«ابزار بخش اول گزارش را پیدا کرد و برگرداند.»"), 'Observe should only report the tool output');
assert.ok(agentLoopSource.includes("«آیا سه نکته اصلی پیدا شده؟ نه؛ پس دوباره جست‌وجو می‌کنم.»"), 'Check should evaluate goal completion');
assert.ok(slides[3].exportBullets.join(' ').includes('Observe: فقط دریافت خروجی ابزار'), 'Export must explain observation');
assert.ok(slides[3].exportBullets.join(' ').includes('Check: مقایسه خروجی با هدف'), 'Export must explain Check');
assert.equal(slides[5].slug, 'real-world-interface', 'Slide 6 must explain tool calling, API and MCP');
assert.equal(slides[6].slug, 'no-code-automation', 'Slide 7 must be the professor-requested no-code automation scenario');
assert.ok(slides[6].exportBullets.some(x => x.includes('Make')), 'No-code tools must appear in exported slide');
assert.equal(slides[7].slug, 'personal-ai-agent-products', 'Slide 8 must cover Dots, Muse, Grok Bot');
assert.equal(slides[8].slug, 'open-agent-products', 'Slide 9 must cover OpenClaw, Hermes, MausBot');
assert.equal(slides[9].slug, 'compounding-errors', 'Risk slide must move to visible slide 10');
assert.equal(slides[10].slug, 'multi-agent', 'Multi-agent slide must move to visible slide 11');
assert.equal(slides[11].slug, 'summary', 'Summary slide must move to visible slide 12');
assert.ok(slides[7].oralNotes.join(' ').split(/\s+/).length < 45, 'Slide 8 must need little spoken text');
assert.ok(slides[8].oralNotes.join(' ').split(/\s+/).length < 50, 'Slide 9 must need little spoken text');
const agentCards = file('src/components/slides/SlideAgentProducts.tsx');
for (const name of ['Dots', 'Muse', 'Grok Bot', 'OpenClaw', 'Hermes', 'MausBot']) {
  assert.ok(agentCards.includes("name: '"+name+"'"), 'Missing agent product '+name);
}
assert.ok(!agentCards.includes('85,000'), 'Unverified fixed skills count must not appear');
assert.ok(agentCards.includes('dir="rtl"'), 'Product cards must be right-to-left for Persian');
for (const term of ['دستیار همیشه‌فعال', 'دستیار امور شخصی', 'تیم همکاران هوش مصنوعی', 'دستیار متصل به پیام‌رسان‌ها', 'ایجنت با مهارت‌های یادگیرنده', 'هماهنگ‌کننده تیم ایجنت‌ها', 'منبع رسمی']) {
  assert.ok(agentCards.includes(term), 'Missing Persian product description: ' + term);
}
for (const slide of [slides[7], slides[8]]) {
  assert.ok(slide.exportBullets.join(' ').includes('دستیار') || slide.exportBullets.join(' ').includes('هماهنگی'), 'Google Slides product export must be Persian');
  assert.ok(!/Always-on ChatGPT worker|Self-hosted assistant|Team of AI coworkers/.test(slide.exportBullets.join(' ')), 'Old English text must not remain in product export');
}
assert.ok(!speakerScript.includes('اطلاعات کامل انگلیسی'), 'The spoken guide must not refer to English product explanations');
slides.forEach((slide, index) => {
  assert.equal(slide.id, index, 'Slide IDs must be sequential internally');
  assert.ok(slide.title && slide.keyTakeaway && slide.memoryCue && slide.stageNote);
  assert.ok(Array.isArray(slide.exportBullets) && slide.exportBullets.length >= 2, 'Export summary absent');
  assert.ok(Array.isArray(slide.oralNotes) && slide.oralNotes.length >= 1, 'Speaker notes absent');
  for (const paragraph of slide.oralNotes) {
    assert.ok(speakerScript.includes(paragraph), `Speaker script is not synchronized for slide ${index + 1}`);
  }
});
assert.ok(exportSource.includes('slide.exportBullets'), 'Google Slides export must use shared slide data');
assert.ok(!exportModal.includes('۹:۲۵'), 'Outdated export timing must not be visible');
// Timing metadata remains for the printable script, but the deck UI has no timers.
assert.ok(!exportModal.includes('{talkTime}'), 'Export modal must not display timing');
const navbar = file('src/components/Navbar.tsx');
const viewer = file('src/components/SlideViewer.tsx');
const notesDrawer = file('src/components/SpeakerNotesDrawer.tsx');
for (const [name, source] of [
  ['App', app],
  ['Navbar', navbar],
  ['SlideViewer', viewer],
  ['SpeakerNotesDrawer', notesDrawer],
  ['SlideThumbnails', thumbnailSource],
  ['GoogleSlidesModal', exportModal],
]) {
  assert.ok(!/PresentationTimer|timerSeconds|isTimerRunning|onToggleTimer|onResetTimer|زمان تخصیص‌یافته|زمان هدف:|سقف: ۱۰ دقیقه|\/ 10:00/.test(source), name + ' must not show a presentation timer');
}
assert.ok(!thumbnailSource.includes('{slide.timing}'), 'Thumbnail timings must be hidden');
assert.ok(thumbnailSource.includes('{idx + 1}'), 'Thumbnail numbering should be sequential');
assert.ok(app.includes('isOpen={isNotesOpen && !isFullscreen}'), 'Notes must stay off the shared fullscreen canvas');
assert.ok(app.includes('shouldHandlePresentationKey(e, isGoogleSlidesModalOpen)'), 'App must use the tested keyboard focus guard');
assert.ok(slides[4].exportBullets.join(' ').includes('SWE-agent'), 'Demo evidence source must be represented on slide 5');
const toolsSlideSource = file('src/components/slides/Slide4RealWorld.tsx');
for (const fullName of ['Application Programming Interface', 'Model Context Protocol']) {
  assert.ok(toolsSlideSource.includes(fullName), `Missing expansion on visible slide 6: ${fullName}`);
  assert.ok(slides[5].exportBullets.join(' ').includes(fullName), `Missing expansion in Google Slides export: ${fullName}`);
}
console.log('Presentation audit passed: 12 slides, 10:20 rehearsal, two short Persian agent galleries after slide 7, synchronized notes, no timers.');
