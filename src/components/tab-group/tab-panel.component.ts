import {html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import styles from './tab-panel.styles';

const ELEMENT_NAME = 'ds-tab-panel';

@customElement(ELEMENT_NAME)
export default class DsTabPanel extends BaseElement {
  static styles = [BaseElement.styles, styles];

  @property()
  id: string;

  @property()
  tab: string;

  @property({reflect: true, type: Boolean})
  active = false;

  firstUpdated() {
    this.setAttribute('role', 'tabpanel');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('tab')) {
      this.setAttribute('aria-labelledby', this.tab);
    }
  }

  render() {
    return html`
      <div part="base" class="panel" tabindex="0" ?hidden=${!this.active}>
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
