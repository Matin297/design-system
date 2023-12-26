import {html, PropertyValues} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {BaseElement} from '../../internals/base-element';
import styles from './checkbox.styles';

const ELEMENT_NAME = 'ds-checkbox';

@customElement(ELEMENT_NAME)
export default class DsCheckbox extends BaseElement {
  static styles = [BaseElement.styles, styles];

  static formAssociated = true;
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  @query('.checkbox__input')
  input: HTMLInputElement;

  @state()
  validationMessage = 'Please, check this box if you wish to proceed';

  /** Checkbox size */
  @property({reflect: true})
  size: Size = 'medium';

  /** Checkbox name, submitted as a name/value pair with form data */
  @property()
  name: string;

  /** Checkbox value, submitted as a name/value pair with form data */
  @property()
  value = 'on';

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

  firstUpdated() {
    this._handleCheckboxStates();
  }

  willUpdate(changedProps: PropertyValues<this>) {
    if (changedProps.get('checked') !== undefined) {
      this._handleCheckboxStates();
    }
  }

  private _clickHandler() {
    this.checked = !this.checked;
    this.indeterminate = false;
  }

  private _handleCheckboxStates() {
    if (this.checked) {
      this._internals.setFormValue(this.value);
      this._internals.setValidity({});
    } else {
      this._internals.setFormValue(null);

      if (this.required) {
        this._internals.setValidity(
          {valueMissing: true},
          this.validationMessage,
          this.input
        );
      }
    }
  }

  /** Delegates the click event to the underlying input */
  click() {
    this.input.click();
  }

  /** Delegates the focus event to the underlying input */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  get isValid() {
    return this._internals.checkValidity();
  }

  /** Sets the validation message used when checkbox is invalid */
  setCustomValidationMessage(message: string) {
    if (message) this.validationMessage = message;
  }

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
          aria-checked=${this.checked}
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @click=${this._clickHandler}
        />
        <span part="control" class="checkbox__control">
          ${this.checked
            ? html`<ion-icon
                class="checkbox__checkmark"
                name="checkmark-outline"
              ></ion-icon>`
            : ''}
          ${this.indeterminate && !this.checked
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
