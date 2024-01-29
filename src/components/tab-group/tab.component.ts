import {html, PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BaseElement} from '../../internals/base-element';
import styles from './tab.styles';

const ELEMENT_NAME = 'ds-tab';

@customElement(ELEMENT_NAME)
export default class DsTab extends BaseElement {
  static styles = [BaseElement.styles, styles];

  @query('div')
  tab: HTMLDivElement;

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

  /** Delegate focus to the underlying element */
  focus(options?: FocusOptions) {
    this.tab.focus(options);
  }

  /** Delegate click to the underlying element */
  click() {
    this.tab.click();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          tab: true,
          'tab--active': this.active,
          'tab--disabled': this.disabled,
        })}
        tabindex=${this.active ? 0 : -1}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </div>
    `;
  }

  private _requestTabActivation() {
    if (this.disabled) return;

    // dispatch activation event
    this.dispatchEvent(
      this.generateEvent('ds-activate-tab', {detail: this.id})
    );
  }

  private _handleClick() {
    this._requestTabActivation();
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this._requestTabActivation();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsTab;
  }
}
