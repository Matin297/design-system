import {html} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import type DsTab from './tab.component';

const ELEMENT_NAME = 'ds-tab-group';

@customElement(ELEMENT_NAME)
export default class DsTabGroup extends BaseElement {
  static styles = [BaseElement.styles];

  private _tabFocus = 0;

  @queryAssignedElements({slot: 'tabs'})
  tabs: DsTab[];

  @property()
  label = '';

  render() {
    return html`
      <div>
        <div
          role="tablist"
          aria-label=${this.label}
          @keydown=${this._handleKeyDown}
        >
          <slot name="tabs"></slot>
        </div>

        <slot></slot>
      </div>
    `;
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      this.tabs[this._tabFocus].active = false;

      if (event.key === 'ArrowRight') {
        this._tabFocus++;

        if (this._tabFocus >= this.tabs.length) {
          this._tabFocus = 0;
        }
      } else if (event.key === 'ArrowLeft') {
        this._tabFocus--;

        if (this._tabFocus < 0) {
          this._tabFocus = this.tabs.length - 1;
        }
      }

      this.tabs[this._tabFocus].active = true;
      this.tabs[this._tabFocus].focus();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsTabGroup;
  }
}
