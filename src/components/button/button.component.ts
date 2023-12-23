import {html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import BaseButton from '../../internals/base-button/index.component';

const ELEMENT_NAME = 'ds-button';

@customElement(ELEMENT_NAME)
export default class DsButton extends BaseButton {
  static formAssociated = true;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  /**
   * The type of button. The default value is "button" which is the opposite of how
   * the native button element behaves.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type
   */
  @property()
  type: Type = 'button';

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#name */
  @property()
  name: string;

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#value */
  @property()
  value: string;

  firstUpdated() {
    this._internals.setFormValue(this.value);
  }

  willUpdate(changedProps: PropertyValues<this>) {
    if (changedProps.get('value')) {
      this._internals.setFormValue(this.value);
    }
  }

  private handleClick() {
    if (
      (this.type === 'reset' || this.type === 'submit') &&
      this._internals.form
    ) {
      const button = document.createElement('button');

      button.style.display = 'none';
      button.type = this.type;

      this._internals.form.append(button);

      button.click();
      button.remove();
    }
  }

  render() {
    return html`
      <button
        part="base"
        class=${classMap(this.classNames)}
        ?disabled=${this.disabled}
        type=${this.type}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        aria-disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${this.slots}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsButton;
  }
}

type Type = 'button' | 'submit' | 'reset';
