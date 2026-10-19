import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const slidesSource = file('src/data/slidesData.ts');
const speakerScript = file('SPEAKER_SCRIPT_9M40_FA.md');
const exportSource = file('src/services/googleSlidesService.ts');
const exportModal = file('src/components/GoogleSlidesModal.tsx');
const app = file('src/App.tsx');
const thumbnailSource = file('src/components/SlideThumbnails.tsx');

const match = slidesSource.match(/export const SLIDES: SlideData\[\] = (\[[\s\S]*\]);/);
assert.ok(match, 'Could not find the JSON slide list');
const slides = JSON.parse(match[1]);

assert.equal(slides.length, 10, 'The live website must retain 10 slides');
assert.equal(slides.reduce((sum, slide) => sum + slide.durationSeconds, 0), 580, 'Target speaking time must remain 9:40');
assert.equal(slides[4].durationSeconds, 106, 'Demo at visible slide 5 requires 1:46');
assert.equal(slides[4].slug, 'applications-and-demo', 'Slide 5 must be the interactive coding demo');
assert.equal(slides[5].slug, 'real-world-interface', 'Slide 6 must explain tool calling, API and MCP');
assert.equal(slides[6].slug, 'no-code-automation', 'Slide 7 must be the professor-requested no-code automation scenario');
assert.ok(slides[6].exportBullets.some(x => x.includes('Make')), 'No-code tools must appear in exported slide');
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
assert.ok(exportModal.includes('{talkTime}'), 'Google Slides modal time should be data-driven');
assert.ok(thumbnailSource.includes('{idx + 1}'), 'Thumbnail numbering should be 1–10');
assert.ok(app.includes('isOpen={isNotesOpen && !isFullscreen}'), 'Notes must stay off the shared fullscreen canvas');
assert.ok(app.includes('shouldHandlePresentationKey(e, isGoogleSlidesModalOpen)'), 'App must use the tested keyboard focus guard');
assert.ok(slides[4].exportBullets.join(' ').includes('SWE-agent'), 'Demo evidence source must be represented on slide 5');
console.log('Presentation audit passed: 10 slides, 9:40, demo 5 / tools 6 / no-code 7, synchronized speaker notes, safe controls.');
