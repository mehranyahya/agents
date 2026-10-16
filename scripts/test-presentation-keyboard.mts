import assert from 'node:assert/strict';
import { shouldHandlePresentationKey } from '../src/utils/presentationKeyboard.ts';

type Focus = 'none' | 'button' | 'link' | 'slider' | 'input' | 'textarea' | 'editable';

function fakeTarget(focus: Focus) {
  if (focus === 'none') return null;
  return {
    closest(selector: string) {
      const isMatch = {
        button: 'button',
        link: 'a, summary',
        slider: '[role="slider"]',
        input: 'input,',
        textarea: 'textarea',
        editable: '[contenteditable]',
      }[focus];
      return isMatch && selector.includes(isMatch) ? {} : null;
    },
  };
}

function handles(
  key: string,
  focus: Focus = 'none',
  options: { modal?: boolean; repeat?: boolean; altKey?: boolean; ctrlKey?: boolean; metaKey?: boolean } = {},
): boolean {
  const event = {
    key,
    target: fakeTarget(focus),
    repeat: options.repeat ?? false,
    altKey: options.altKey ?? false,
    ctrlKey: options.ctrlKey ?? false,
    metaKey: options.metaKey ?? false,
  };
  return shouldHandlePresentationKey(event as unknown as KeyboardEvent, options.modal ?? false);
}

for (const key of ['ArrowLeft', 'ArrowRight', 'PageDown', 'PageUp', 'Backspace', 'Home', 'End', '0', '1']) {
  assert.equal(handles(key, 'button'), true, `${key} should navigate after clicking a demo button`);
  assert.equal(handles(key, 'link'), true, `${key} should navigate even if a link retains focus`);
}

assert.equal(handles(' ', 'none'), true, 'Space on slide background should navigate');
assert.equal(handles(' ', 'button'), false, 'Space on focused button must activate the button');
assert.equal(handles(' ', 'link'), false, 'Space on focused link should remain native');
assert.equal(handles('ArrowLeft', 'slider'), false, 'Arrow keys on probability slider must adjust the slider');
assert.equal(handles('ArrowRight', 'slider'), false, 'Arrow keys on probability slider must adjust the slider');
assert.equal(handles(' ', 'slider'), false, 'Slider controls must retain their keyboard interactions');
assert.equal(handles('ArrowLeft', 'input'), false, 'Text inputs must keep their cursor controls');
assert.equal(handles(' ', 'textarea'), false, 'Textareas must keep their typing keys');
assert.equal(handles('ArrowRight', 'editable'), false, 'Editable regions must retain navigation keys');
assert.equal(handles('ArrowLeft', 'button', { modal: true }), false, 'Modal should prevent background navigation');
assert.equal(handles('ArrowLeft', 'button', { ctrlKey: true }), false, 'System modifier shortcuts must remain native');
assert.equal(handles('ArrowLeft', 'none', { altKey: true }), false, 'Alt modifier shortcuts must remain native');
assert.equal(handles('f', 'none', { metaKey: true }), false, 'OS fullscreen shortcuts must remain native');
assert.equal(handles('ArrowLeft', 'button', { repeat: true }), false, 'Holding ArrowLeft must not skip several slides');
assert.equal(handles(' ', 'none', { repeat: true }), false, 'Holding Space must not skip several slides');
console.log('Keyboard navigation tests passed: demo focus, Space activation, slider input and repeat safety.');
