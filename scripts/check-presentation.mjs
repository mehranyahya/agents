import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const slidesSource = file('src/data/slidesData.ts');
const speakerScript = file('SPEAKER_SCRIPT_8MIN_FA.md');
const exportSource = file('src/services/googleSlidesService.ts');
const exportModal = file('src/components/GoogleSlidesModal.tsx');
const app = file('src/App.tsx');
const thumbnailSource = file('src/components/SlideThumbnails.tsx');

const match = slidesSource.match(/export const SLIDES: SlideData\[\] = (\[[\s\S]*\]);/);
assert.ok(match, 'Could not find the JSON slide list');
const slides = JSON.parse(match[1]);

assert.equal(slides.length, 10, 'The live website must retain 10 slides');
assert.equal(slides.reduce((sum, slide) => sum + slide.durationSeconds, 0), 480, 'Target speaking time must remain 8:00');
assert.equal(slides[5].durationSeconds, 105, 'Practical slide requires 1:45');
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
assert.ok(app.includes("target?.closest("), 'Interactive controls must retain their keyboard keys');
assert.ok(slides[5].exportBullets.join(' ').includes('SWE-agent'), 'Demo evidence source must be represented');
console.log('Presentation audit passed: 10 slides, 8:00, 1:45 demo, synchronized text, safe controls.');
