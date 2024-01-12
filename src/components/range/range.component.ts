import {html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import {clamp} from '../../utilities/math';

const ELEMENT_NAME = 'ds-range';

@customElement(ELEMENT_NAME)
export default class DsRange extends BaseElement {
  static formAssociated = true;
  static styles = [BaseElement.styles];

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  /** Range name, submitted as a name/value pair with form data */
  @property()
  name: string;

  /** Range value, submitted as a name/value pair with form data */
  @property({type: Number})
  value = 0;

  /** Range starting value */
  @property({type: Number})
  min = 0;

  /** Range ending value */
  @property({type: Number})
  max = 100;

  /** The interval in which the value is increased/decreased */
  @property({type: Number})
  step = 1;

  /** Whether the range form control is disabled or not */
  @property({type: Boolean, reflect: true})
  disabled = false;

  /** Whether to show the tooltip and if so where to display it */
  @property()
  tooltip: Tooltip = 'top';

  willUpdate(changedProps: PropertyValues<this>) {
    if (changedProps.has('value')) {
      let value = clamp(this.min, this.value, this.max);

      if (Object.is(value, NaN)) {
        value = 0;
        this.value = 0;
      }

      this._internals.setFormValue(value.toString());
    }
  }

  render() {
    return html`
      <div class="range" part="base">
        <label for="range" class="range__label" part="label">
          <slot name="label"></slot>
        </label>

        <div class="range__control" part="control">
          <input
            id="range"
            type="range"
            part="input"
            class="range__input"
            max=${this.max}
            min=${this.min}
            step=${this.step}
            name=${this.name}
            value=${this.value}
            ?disabled=${this.disabled}
            aria-describedby="helper-text"
            @input=${this._inputHandler}
          />
          <output part="tooltip" for="range" class="range__tooltip"></output>
        </div>

        <div part="helper-text" class="range__helper-text" id="helper-text">
          <slot name="helper-text"></slot>
        </div>
      </div>
    `;
  }

  private _inputHandler(event: InputEvent) {
    const target = event.target as EventTarget & {value: string};
    this.value = parseFloat(target.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsRange;
  }
}

type Tooltip = 'top' | 'bottom' | 'none';