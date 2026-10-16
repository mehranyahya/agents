/**
 * Decide whether a keydown belongs to presentation navigation.
 * Arrow/Page keys may move between slides even after the presenter clicks a
 * demo button, while native button activation (Space) and input/slider editing
 * must remain untouched.
 */
type PresentationKeyEvent = Pick<
  KeyboardEvent,
  'key' | 'repeat' | 'altKey' | 'ctrlKey' | 'metaKey' | 'target'
>;

const NATIVE_EDITING_SELECTOR =
  'input, textarea, select, [contenteditable], [role="textbox"], [role="slider"], [role="spinbutton"], [role="combobox"]';

const SPACE_ACTIVATION_SELECTOR =
  'button, a, summary, [role="button"], [role="link"]';

const REPEAT_PROTECTED_KEYS = new Set([
  ' ', 'ArrowLeft', 'ArrowRight', 'PageDown', 'PageUp',
  'Backspace', 'Home', 'End',
]);

export function shouldHandlePresentationKey(
  event: PresentationKeyEvent,
  isModalOpen: boolean
): boolean {
  if (isModalOpen || event.altKey || event.ctrlKey || event.metaKey) return false;

  const target = event.target as Element | null;
  if (typeof target?.closest === 'function') {
    // Preserve arrow keys on sliders and normal editing in form controls.
    if (target.closest(NATIVE_EDITING_SELECTOR)) return false;

    // Space activates the focused demo/navigation button; arrows still navigate.
    if (event.key === ' ' && target.closest(SPACE_ACTIVATION_SELECTOR)) return false;
  }

  // Holding a key must not inadvertently skip multiple slides.
  if (event.repeat && REPEAT_PROTECTED_KEYS.has(event.key)) return false;

  return true;
}
