import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import BaseButton from '../../internals/base-button/index.component';

const ELEMENT_NAME = 'ds-button';

@customElement(ELEMENT_NAME)
export default class DsButton extends BaseButton {
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

  /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#form */
  @property()
  form: string;

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

  private handleBlur() {
    this.emit('ds-blur');
  }

  private handleFocus() {
    this.emit('ds-focus');
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
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
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

type FormMethod = 'post' | 'get' | 'dialog';

type FormTarget = '_self' | '_blank' | '_parent' | '_top';
