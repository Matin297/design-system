import {html} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import type DsTab from './tab.component';
import type DsPanel from './tab-panel.component';

const ELEMENT_NAME = 'ds-tab-group';

@customElement(ELEMENT_NAME)
export default class DsTabGroup extends BaseElement {
  static styles = [BaseElement.styles];

  private _tabFocus = 0;

  @queryAssignedElements({slot: 'tabs'})
  tabs: DsTab[];

  @queryAssignedElements()
  panels: DsPanel[];

  @property()
  label = '';

  firstUpdated() {
    this.addEventListener('ds-activate-tab', (event) => {
      this._handleTabActivation(event.detail);
    });
  }

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

  private _handleTabActivation(tabID: string | number) {
    this.tabs.forEach((tab) => {
      tab.active = false;

      if (tab.id === tabID) {
        tab.active = true;
        this._handlePanelActivation(tab.panel);
      }
    });
  }

  private _handlePanelActivation(panelID: string) {
    this.panels.forEach((panel) => {
      panel.active = false;

      if (panel.id === panelID) {
        panel.active = true;
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsTabGroup;
  }
}
