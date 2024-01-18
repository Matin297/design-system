import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-tab-list';

@customElement(ELEMENT_NAME)
export default class DsTabList extends BaseElement {
  static styles = [BaseElement.styles];

  @property()
  label = '';

  render() {
    return html`
      <div>
        <div role="tablist" aria-label=${this.label}>
          <slot name="tabs"></slot>
        </div>

        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsTabList;
  }
}
