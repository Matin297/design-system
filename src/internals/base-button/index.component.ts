import {html} from 'lit/static-html.js';
import {property} from 'lit/decorators.js';
import {BaseElement} from '../base-element';
import styles from './index.styles';

export default class DsBaseButton extends BaseElement {
  static styles = [BaseElement.styles, styles];

  /** Button theme */
  @property({reflect: true})
  variant: Variant = 'default';

  /** Button size */
  @property({reflect: true})
  size: Size = 'medium';

  /** Renders a bordered button */
  @property({type: Boolean, reflect: true})
  outline = false;

  /** Renders a pill-style button */
  @property({type: Boolean, reflect: true})
  pill = false;

  /** Renders a button without border or background */
  @property({type: Boolean, reflect: true})
  text: false;

  /**
   * Renders a circular icon button.
   * When set, component will expect only a single icon in the default slot.
   */
  @property({type: Boolean, reflect: true})
  circle = false;

  /** Disables the button */
  @property({type: Boolean, reflect: true})
  disabled = false;

  private _hasSlottedElement(name: string) {
    return this.querySelector(`:scope > [slot=${name}]`) !== null;
  }

  get classNames() {
    return {
      button: true,
      'button--text': this.text,
      'button--pill': this.pill,
      'button--circle': this.circle,
      'button--outline': this.outline,
      'button--disabled': this.disabled,
      'button--small': this.size === 'small',
      'button--medium': this.size === 'medium',
      'button--large': this.size === 'large',
      'button--default': this.variant === 'default',
      'button--primary': this.variant === 'primary',
      'button--success': this.variant === 'success',
      'button--neutral': this.variant === 'neutral',
      'button--warning': this.variant === 'warning',
      'button--danger': this.variant === 'danger',
      'button--prefixed': this._hasSlottedElement('prefix'),
      'button--suffixed': this._hasSlottedElement('suffix'),
    };
  }

  get slots() {
    return html`
      <slot name="prefix" part="prefix" class="button__prefix"></slot>
      <slot part="label" class="button__label"></slot>
      <slot name="suffix" part="suffix" class="button__suffix"></slot>
    `;
  }
}

type Variant =
  | 'default'
  | 'primary'
  | 'success'
  | 'neutral'
  | 'warning'
  | 'danger';

type Size = 'small' | 'medium' | 'large';
