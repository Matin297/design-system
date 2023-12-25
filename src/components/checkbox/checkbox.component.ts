import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BaseElement} from '../../internals/base-element';
import styles from './checkbox.styles';

const ELEMENT_NAME = 'ds-checkbox';

@customElement(ELEMENT_NAME)
export default class DsCheckbox extends BaseElement {
  static styles = [BaseElement.styles, styles];

  /** Checkbox size */
  @property({reflect: true})
  size: Size = 'medium';

  /** Checkbox name, submitted as a name/value pair with form data */
  @property()
  name: string;

  /** Checkbox value, submitted as a name/value pair with form data */
  @property()
  value: string;

  /** Whether of not the checkbox is checked */
  @property({type: Boolean, reflect: true})
  checked = false;

  /** Whether or not the checkbox is disabled */
  @property({type: Boolean, reflect: true})
  disabled = false;

  /** Whether or not the checkbox is a required field */
  @property({type: Boolean, reflect: true})
  required = false;

  /** Whether or not the checkbox is indeterminate */
  @property({type: Boolean, reflect: true})
  indeterminate = false;

  render() {
    return html`
      <label
        part="base"
        class=${classMap({
          checkbox: true,
          'checkbox--small': this.size === 'small',
          'checkbox--medium': this.size === 'medium',
          'checkbox--large': this.size === 'large',
        })}
      >
        <input
          type="checkbox"
          class="checkbox__input"
          name=${this.name}
          value=${this.value}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
        />
        <span part="control" class="checkbox__control">
          ${this.checked
            ? html`<ion-icon
                class="checkbox__checkmark"
                name="checkmark-outline"
              ></ion-icon>`
            : ''}
          ${this.indeterminate
            ? html`<ion-icon
                class="checkbox__remove"
                name="remove-outline"
              ></ion-icon>`
            : ''}
        </span>
        <slot part="label" class="checkbox__label"></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsCheckbox;
  }
}

type Size = 'small' | 'medium' | 'large';
