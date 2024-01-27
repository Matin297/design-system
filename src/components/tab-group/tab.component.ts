import {html, PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BaseElement} from '../../internals/base-element';
import styles from './tab.styles';

const ELEMENT_NAME = 'ds-tab';

@customElement(ELEMENT_NAME)
export default class DsTab extends BaseElement {
  static styles = [BaseElement.styles, styles];

  @query('button')
  button: HTMLButtonElement;

  @property()
  id: string;

  @property()
  panel: string;

  @property({reflect: true, type: Boolean})
  active = false;

  @property({type: Boolean, reflect: true})
  disabled = false;

  firstUpdated() {
    this.setAttribute('role', 'tab');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('panel')) {
      this.setAttribute('aria-controls', this.panel);
    }

    if (changedProperties.has('active')) {
      this.setAttribute('aria-selected', `${this.active}`);
    }
  }

  /** Delegate focus to the underlying button element */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  render() {
    return html`
      <button
        part="base"
        class=${classMap({
          tab: true,
          'tab--active': this.active,
        })}
        ?disabled=${this.disabled}
        tabindex=${this.active ? 0 : -1}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }

  private _handleClick() {
    // dispatch activation event
    this.dispatchEvent(
      this.generateEvent('ds-activate-tab', {detail: this.id})
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsTab;
  }
}
