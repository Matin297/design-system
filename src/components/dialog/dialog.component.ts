import {html} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import {waitForAnimationsToFinish} from '../../internals/animation';
import {lockBodyScroll, unlockBodyScroll} from '../../internals/scroll';
import {
  findAutoFocusElement,
  queryFocusableElements,
} from '../../internals/tabbable';
import styles from './dialog.styles';

const ELEMENT_NAME = 'ds-dialog';

@customElement(ELEMENT_NAME)
export default class DsDialog extends BaseElement {
  static styles = [BaseElement.styles, styles];

  private _mutationObserver = new MutationObserver((mutationList) =>
    this._observerCallback(mutationList)
  );

  @query('dialog')
  dialog: HTMLDialogElement;

  firstUpdated() {
    this._mutationObserver.observe(this.dialog, {
      attributes: true,
      attributeFilter: ['open'],
    });
  }

  /** Delegate show to the underlying dialog element */
  show() {
    this.dialog.showModal();
  }

  /** Delegate close to the underlying dialog element */
  close() {
    this.dialog.close();
  }

  render() {
    const header = this.hasSlottedElement('header')
      ? html`<header part="header" class="dialog__header">
          <slot name="header"></slot>
        </header>`
      : '';

    const footer = this.hasSlottedElement('footer')
      ? html`<footer part="footer" class="dialog__footer">
          <slot name="footer"></slot>
        </footer>`
      : '';

    return html`
      <dialog part="base" class="dialog">
        <section class="dialog__panel">
          ${header}
          <main part="main" class="dialog__main">
            <slot></slot>
          </main>
          ${footer}
        </section>
      </dialog>
    `;
  }

  private async _observerCallback(mutationList: MutationRecord[]) {
    for (const mutation of mutationList) {
      const target = mutation.target as HTMLDialogElement;

      if (target.open) {
        lockBodyScroll(this);
        await waitForAnimationsToFinish(target);
        this._moveFocus();
      } else {
        await waitForAnimationsToFinish(target);
        unlockBodyScroll(this);
      }
    }
  }

  private async _moveFocus() {
    const focusableElements = queryFocusableElements(this);
    const autofocusElement = findAutoFocusElement(focusableElements);

    // selected element which is either an element with autofocus attribute
    // or the first focusable element found.
    const elementToFocus = autofocusElement ?? focusableElements[0];

    // perform the focus and dispatch an event to indicate
    // the shift of focus to the selected element
    if (elementToFocus && typeof elementToFocus.focus === 'function') {
      elementToFocus.focus();
      this.dispatchEvent(this.generateEvent('ds-initial-focus'));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsDialog;
  }
}
