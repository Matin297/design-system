import {html} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import styles from './dialog.styles';

const ELEMENT_NAME = 'ds-dialog';

@customElement(ELEMENT_NAME)
export default class DsDialog extends BaseElement {
  static styles = [BaseElement.styles, styles];

  @query('dialog')
  dialog: HTMLDialogElement;

  /** Delegate show to the underlying dialog element */
  show() {
    this.dialog.showModal();
  }

  /** Delegate close to the underlying dialog element */
  close() {
    this.dialog.close();
  }

  render() {
    return html`
      <dialog part="base" class="dialog">
        <header part="header" class="dialog__header">
          <slot name="header"></slot>
        </header>
        <main part="main" class="dialog__main">
          <slot></slot>
        </main>
        <footer part="footer" class="dialog__footer">
          <slot name="footer"></slot>
        </footer>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsDialog;
  }
}
