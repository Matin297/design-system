/** List of html tags that are considered focusable */
const FOCUSABLE_ELEMENTS = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'details',
];

/**
 * getComputedStyle returns a live object so it only needs to be called once for an element.
 * using a weakMap we will cache these computed styles and use this weakMap instead.
 */
const computedStylesWeakMap = new WeakMap<Element, CSSStyleDeclaration>();

/** Checks for elements visibility based on the display and visibility css props */
const isVisible = (element: HTMLElement) => {
  let computedStyles = computedStylesWeakMap.get(element);

  if (!computedStyles) {
    computedStyles = window.getComputedStyle(element);
    computedStylesWeakMap.set(element, computedStyles);
  }

  if (
    computedStyles.display === 'none' ||
    computedStyles.visibility === 'hidden' ||
    element.hasAttribute('aria-hidden')
  ) {
    return false;
  }

  return true;
};

/** Checks for elements disability based on the disabled attribute */
const isDisabled = (element: HTMLElement) => element.hasAttribute('disabled');

/** Checks whether the element is tabbable based on the tabindex attribute */
const isTabbable = (element: HTMLElement) =>
  element.hasAttribute('tabindex') &&
  Number(element.hasAttribute('tabindex')) !== -1;

/** Checks whether the element is focusable based on defined FOCUSABLE_ELEMENTS  */
const isFocusable = (element: HTMLElement) =>
  FOCUSABLE_ELEMENTS.includes(element.tagName.toLocaleLowerCase());

/** Returns a list of elements that are focusable and therefore tabbable */
export const queryFocusableElements = (parentElement: HTMLElement) => {
  const focusableElements: HTMLElement[] = [];

  const treeWalker = document.createTreeWalker(
    parentElement,
    NodeFilter.SHOW_ELEMENT
  );

  do {
    const element = treeWalker.currentNode as HTMLElement;

    if (
      !isDisabled(element) &&
      isVisible(element) &&
      (isTabbable(element) || isFocusable(element))
    ) {
      focusableElements.push(element);
    }

    if (element.shadowRoot) {
      const shadowChildRoot = element.shadowRoot
        .firstElementChild as HTMLElement;

      focusableElements.push(...queryFocusableElements(shadowChildRoot));
    }
  } while (treeWalker.nextNode());

  return focusableElements;
};

/** Search for an element with autofocus attribute set */
export const findAutoFocusElement = (focusableElements: HTMLElement[]) => {
  return focusableElements.find((element) => element.hasAttribute('autofocus'));
};
