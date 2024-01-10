import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-range';

@customElement(ELEMENT_NAME)
export default class DsRange extends BaseElement {
  static styles = [BaseElement.styles];

  render() {
    return html`
      <div class="range" part="base">
        <label for="range" class="range__label" part="label">
          <slot name="label"></slot>
        </label>

        <div class="range__control" part="control">
          <input
            part="input"
            class="range__input"
            type="range"
            id="range"
            aria-describedby="helper-text"
          />
          <output part="tooltip" for="range" class="range__tooltip"></output>
        </div>

        <div part="helper-text" class="range__helper-text" id="helper-text">
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
