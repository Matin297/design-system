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

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formaction */
  @property({attribute: 'formaction'})
  formAction: string;

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formenctype */
  @property({attribute: 'formenctype'})
  formEnctype: FormEnctype;

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formmethod */
  @property({attribute: 'formmethod'})
  formMethod: FormMethod;

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formnovalidate */
  @property({attribute: 'formnovalidate', type: Boolean})
  formNoValidate: boolean;

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formtarget */
  @property({attribute: 'formtarget'})
  formTarget: FormTarget;

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
      const button = this.shadowRoot!.querySelector(
        'button'
      )!.cloneNode() as HTMLButtonElement;

      button.style.display = 'none';

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
        formaction=${ifDefined(this.formAction)}
        formmethod=${ifDefined(this.formMethod)}
        formtarget=${ifDefined(this.formTarget)}
        formenctype=${ifDefined(this.formEnctype)}
        ?formnovalidate=${this.formNoValidate}
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

type FormEnctype =
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain';

type FormMethod = 'post' | 'get';

type FormTarget = '_self' | '_blank' | '_parent' | '_top';
