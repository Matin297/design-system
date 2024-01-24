import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-tab';

@customElement(ELEMENT_NAME)
export default class DsTab extends BaseElement {
  static styles = [BaseElement.styles];

  @query('button[role=tab]')
  button: HTMLButtonElement;

  @property()
  id: string;

  @property()
  panel: string;

  @property({reflect: true, type: Boolean})
  active = false;

  /** Delegate focus to the underlying button element */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  render() {
    return html`
      <button
        role="tab"
        id=${this.id}
        aria-controls=${this.panel}
        tabindex=${this.active ? 0 : -1}
        aria-selected=${this.active ? 'true' : 'false'}
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
