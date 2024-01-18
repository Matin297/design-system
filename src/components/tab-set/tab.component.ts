import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-tab';

@customElement(ELEMENT_NAME)
export default class DsTab extends BaseElement {
  static styles = [BaseElement.styles];

  @property()
  id: string;

  @property()
  panel: string;

  @property({reflect: true, type: Boolean})
  active = false;

  render() {
    return html`
      <button
        role="tab"
        id=${this.id}
        aria-controls=${this.panel}
        tabindex=${this.active ? 0 : -1}
        aria-selected=${this.active ? 'true' : 'false'}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsTab;
  }
}
