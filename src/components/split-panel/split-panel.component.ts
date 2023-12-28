import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import styles from './split-panel.styles';

const ELEMENT_NAME = 'ds-split-panel';

@customElement(ELEMENT_NAME)
export default class DsSplitPanel extends BaseElement {
  static styles = [BaseElement.styles, styles];

  /** The current position of the divider from the start in percentage */
  @property({reflect: true, type: Number})
  position = 60;

  /** Disables resizing through the divider */
  @property({type: Boolean, reflect: true})
  disabled = false;

  render() {
    return html`
      <slot name="start-panel" part="start-panel" class="start-panel"></slot>
      <div
        part="divider"
        class="divider"
        role="separator"
        aria-valuenow=${this.position}
        tabindex=${this.disabled ? -1 : 0}
      ></div>
      <slot name="end-panel" part="end-panel" class="end-panel"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsSplitPanel;
  }
}
