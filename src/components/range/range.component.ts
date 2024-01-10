import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-range';

@customElement(ELEMENT_NAME)
export default class DsRange extends BaseElement {
  static styles = [BaseElement.styles];

  render() {
    return html`
      <div class="range">
        <label for="range" class="range__label">
          <slot name="label"></slot>
        </label>

        <div class="range__control">
          <input
            class="range__input"
            type="range"
            id="range"
            aria-describedby="helper-text"
          />
          <output for="range" class="range__tooltip"></output>
        </div>

        <div class="range__helper-text" id="helper-text">
          <slot name="helper-text"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsRange;
  }
}
