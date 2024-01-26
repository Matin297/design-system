import {html} from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedElements,
} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BaseElement} from '../../internals/base-element';
import type DsTab from './tab.component';
import type DsPanel from './tab-panel.component';
import styles from './tab-group.styles';

const ELEMENT_NAME = 'ds-tab-group';

@customElement(ELEMENT_NAME)
export default class DsTabGroup extends BaseElement {
  static styles = [BaseElement.styles, styles];

  private _tabFocus = 0;

  @queryAssignedElements({slot: 'tabs'})
  tabs: DsTab[];

  @queryAssignedElements()
  panels: DsPanel[];

  @query('.tab-group__active-indicator')
  indicator: HTMLDivElement;

  @property()
  label = '';

  /** Whether the tabs should stack vertically or horizontally */
  @property({reflect: true})
  direction: Direction = 'inline';

  /** Defined the placement of the tabs relative to the track/indicator */
  @property({reflect: true})
  placement: Placement = 'start';

  async firstUpdated() {
    this.addEventListener('ds-activate-tab', (event) => {
      this._handleTabClick(event.detail);
    });

    await this._waitForTabsToFinishUpdating();

    this._moveIndicator();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          'tab-group': true,
          'tab-group--inline': this.direction === 'inline',
          'tab-group--block': this.direction === 'block',
          'tab-group--start': this.placement === 'start',
          'tab-group--end': this.placement === 'end',
        })}
      >
        <div
          role="tablist"
          part="tab-list"
          class="tab-group__tab-list"
          aria-label=${this.label}
          @keydown=${this._handleKeyDownNavigation}
        >
          <div
            part="active-indicator"
            class="tab-group__active-indicator"
          ></div>
          <slot name="tabs"></slot>
        </div>

        <div part="panel-list" class="tab-group__panel-list">
          <slot></slot>
        </div>
      </div>
    `;
  }

  private _handleKeyDownNavigation(event: KeyboardEvent) {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      this.tabs[this._tabFocus].active = false;

      if (
        (event.key === 'ArrowRight' && this.direction === 'inline') ||
        (event.key === 'ArrowDown' && this.direction === 'block')
      ) {
        this._tabFocus++;

        if (this._tabFocus >= this.tabs.length) {
          this._tabFocus = 0;
        }
      } else if (
        (event.key === 'ArrowLeft' && this.direction === 'inline') ||
        (event.key === 'ArrowUp' && this.direction === 'block')
      ) {
        this._tabFocus--;

        if (this._tabFocus < 0) {
          this._tabFocus = this.tabs.length - 1;
        }
      }

      this.tabs[this._tabFocus].active = true;
      this.tabs[this._tabFocus].focus();
    }
  }

  private _handleTabClick(tabID: string) {
    this._handleTabActivation(tabID);
    this._handlePanelActivation(tabID);
    this._moveIndicator(tabID);
  }

  private _handleTabActivation(tabID: string) {
    this.tabs.forEach((tab) => {
      tab.active = false;

      if (tab.id === tabID) {
        tab.active = true;
      }
    });
  }

  private _handlePanelActivation(tabID: string) {
    this.panels.forEach((panel) => {
      panel.active = false;

      if (panel.tab === tabID) {
        panel.active = true;
      }
    });
  }

  private _calcIndicatorOffset(offsetTabs: DsTab[]) {
    return offsetTabs.reduce((acc, tab) => {
      if (this.direction === 'inline') {
        return acc + tab.offsetWidth;
      }
      return acc + tab.offsetHeight;
    }, 0);
  }

  private _moveIndicator(tabID?: string) {
    const activeTabIndex = this.tabs.findIndex(
      (tab) => tab.id === tabID || tab.active
    );
    this._tabFocus = activeTabIndex;

    const activeTab = this.tabs[activeTabIndex];

    const offsetTabs = this.tabs.slice(0, activeTabIndex);
    const offset = this._calcIndicatorOffset(offsetTabs);

    if (this.direction === 'inline') {
      this.indicator.style.translate = `${offset}px 0`;
      this.indicator.style.width = `${activeTab.offsetWidth}px`;
    } else {
      this.indicator.style.translate = `0 ${offset}px`;
      this.indicator.style.height = `${activeTab.offsetHeight}px`;
    }
  }

  private async _waitForTabsToFinishUpdating() {
    await customElements.whenDefined('ds-tab');
    await Promise.all(this.tabs.map((tab) => tab.updateComplete));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsTabGroup;
  }
}

type Direction = 'inline' | 'block';
type Placement = 'start' | 'end';
