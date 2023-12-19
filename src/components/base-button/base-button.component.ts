import {html, literal} from 'lit/static-html.js';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BaseElement} from '../../internals/base-element';
import styles from './base-button.styles';

const ELEMENT_NAME = 'ds-base-button';

@customElement(ELEMENT_NAME)
export default class DsBaseButton extends BaseElement {
  static styles = [BaseElement.styles, styles];

  tag = literal`button`;

  /**
   * An empty title will prevent browser validation tooltip to appear
   */
  @property()
  title = '';

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

  render() {
    return html`
      <${this.tag}
        part="base"
        class=${classMap({
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
        })}
        title=${this.title}
        ?disabled=${this.disabled}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
      </${this.tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsBaseButton;
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
