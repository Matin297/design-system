import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import styles from './spinner.styles';

const ELEMENT_NAME = 'ds-spinner';

@customElement(ELEMENT_NAME)
export default class DsSpinner extends BaseElement {
  static styles = [BaseElement.styles, styles];

  render() {
    return html`
      <svg part="base" class="spinner" role="progressbar" aria-label="loading">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsSpinner;
  }
}
