import {html, PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import styles from './switch.styles';

const ELEMENT_NAME = 'ds-switch';

@customElement(ELEMENT_NAME)
export default class DsSwitch extends BaseElement {
  static formAssociated = true;
  static styles = [BaseElement.styles, styles];

  private _validationMessage =
    'Please, turn on the switch if you wish to proceed';
  private _internals: ElementInternals;
  private _defaultChecked = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  @query('#switch')
  switch: HTMLInputElement;

  @property()
  size: Size = 'medium';

  @property()
  name = '';

  @property()
  value = '';

  @property({type: Boolean, reflect: true})
  checked = false;

  @property({type: Boolean, reflect: true})
  vertical = false;

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({type: Boolean, reflect: true})
  required = false;

  firstUpdated() {
    this._defaultChecked = this.checked;
    this._switchStateHandler();
  }

  willUpdate(changedProps: PropertyValues<this>) {
    if (changedProps.get('checked') !== undefined) {
      this._switchStateHandler();
    }
  }

  formResetCallback() {
    this.checked = this._defaultChecked;
    // if we do not reset the switch checked attribute directly
    // it won't change the position of the thumb!
    this.switch.checked = this.checked;
  }

  /** Sets the validation message used when switch is invalid */
  setCustomValidationMessage(message: string) {
    if (message) this._validationMessage = message;
  }

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
          name=${this.name}
          value=${this.value}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @click=${this._clickHandler}
        />
      </label>
    `;
  }

  private _clickHandler() {
    this.checked = !this.checked;
  }

  private _switchStateHandler() {
    if (this.checked) {
      this._internals.setFormValue(this.value);
      this._internals.setValidity({});
    } else {
      this._internals.setFormValue(null);

      if (this.required) {
        this._internals.setValidity(
          {valueMissing: true},
          this._validationMessage,
          this.switch
        );
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsSwitch;
  }
}

type Size = 'small' | 'medium' | 'large';
