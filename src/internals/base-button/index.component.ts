import {html} from 'lit/static-html.js';
import {property, query} from 'lit/decorators.js';
import {BaseElement} from '../base-element';
import styles from './index.styles';

export default class BaseButton extends BaseElement {
  static styles = [BaseElement.styles, styles];

  @query('.button')
  button: HTMLButtonElement;

  /** Button variant */
  @property({reflect: true})
  variant: Variant = 'fill';

  /** Button shape */
  @property({reflect: true})
  shape?: Shape;

  /** Button theme */
  @property({reflect: true})
  theme: Theme = 'primary';

  /** Button size */
  @property({reflect: true})
  size: Size = 'medium';

  /** Disables the button */
  @property({type: Boolean, reflect: true})
  disabled = false;

  get classNames() {
    return {
      button: true,
      'button--disabled': this.disabled,
      'button--fill': this.variant === 'fill',
      'button--outline': this.variant === 'outline',
      'button--text': this.variant === 'text',
      'button--pill': this.shape === 'pill',
      'button--circle': this.shape === 'circle',
      'button--small': this.size === 'small',
      'button--medium': this.size === 'medium',
      'button--large': this.size === 'large',
      'button--primary': this.theme === 'primary',
      'button--success': this.theme === 'success',
      'button--neutral': this.theme === 'neutral',
      'button--warning': this.theme === 'warning',
      'button--danger': this.theme === 'danger',
      'button--prefixed': this.hasSlottedElement('prefix'),
      'button--suffixed': this.hasSlottedElement('suffix'),
    };
  }

  get slots() {
    return html`
      <slot name="prefix" part="prefix" class="button__prefix"></slot>
      <slot part="label" class="button__label"></slot>
      <slot name="suffix" part="suffix" class="button__suffix"></slot>
    `;
  }

  /** Delegates click to underlying the button */
  click() {
    this.button.click();
  }

  /** Delegates focus to underlying the button */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Delegates blur to underlying the button */
  blur() {
    this.button.blur();
  }
}

type Variant = 'fill' | 'outline' | 'text';

type Shape = 'pill' | 'circle';

type Size = 'small' | 'medium' | 'large';

type Theme = 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
