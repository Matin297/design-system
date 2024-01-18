import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-tab-panel';

@customElement(ELEMENT_NAME)
export default class DsTabPanel extends BaseElement {
  static styles = [BaseElement.styles];

  @property()
  id: string;

  @property()
  tab: string;

  @property({reflect: true, type: Boolean})
  active = false;

  render() {
    return html`
      <div
        role="tabpanel"
        tabindex="0"
        id=${this.id}
        ?hidden=${!this.active}
        aria-labelledby=${this.tab}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsTabPanel;
  }
}
