import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import styles from './switch.styles';

const ELEMENT_NAME = 'ds-switch';

@customElement(ELEMENT_NAME)
export default class DsSwitch extends BaseElement {
  static styles = [BaseElement.styles, styles];

  @property({type: Boolean, reflect: true})
  vertical = false;

  render() {
    return html`
      <label part="base" class="switch" for="switch">
        <slot part="label" class="switch__label"></slot>
        <input
          id="switch"
          part="input"
          role="switch"
          type="checkbox"
          class="switch__input"
        />
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsSwitch;
  }
}
