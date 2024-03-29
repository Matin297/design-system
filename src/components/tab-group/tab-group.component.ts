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

  private _tabFocusIndex = 0;

  @queryAssignedElements({slot: 'tabs'})
  tabs: DsTab[];

  @queryAssignedElements()
  panels: DsPanel[];

  @query('.tab-group__active-indicator')
  indicator: HTMLDivElement;

  @property()
  label = '';

  /** Whether the tabs and panels should align vertically or horizontally */
  @property({reflect: true})
  direction: Direction = 'block';

  /** Defined the placement of the tabs relative to the track/indicator */
  @property({reflect: true})
  placement: Placement = 'start';

  firstUpdated() {
    this.addEventListener('ds-activate-tab', (event) => {
      this._handleTabActivation(event.detail);
    });

    this._waitForTabsToFinishUpdating().then(() => {
      this._handleTabActivation();
    });
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

  private get _enabledTabs() {
    return this.tabs.filter((tab) => !tab.disabled);
  }

  private _handleKeyDownNavigation(event: KeyboardEvent) {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      this._enabledTabs[this._tabFocusIndex].active = false;

      if (
        (event.key === 'ArrowRight' && this.direction === 'block') ||
        (event.key === 'ArrowDown' && this.direction === 'inline')
      ) {
        this._tabFocusIndex++;

        if (this._tabFocusIndex >= this._enabledTabs.length) {
          this._tabFocusIndex = 0;
        }
      } else if (
        (event.key === 'ArrowLeft' && this.direction === 'block') ||
        (event.key === 'ArrowUp' && this.direction === 'inline')
      ) {
        this._tabFocusIndex--;

        if (this._tabFocusIndex < 0) {
          this._tabFocusIndex = this._enabledTabs.length - 1;
        }
      }

      this._enabledTabs[this._tabFocusIndex].active = true;
      this._enabledTabs[this._tabFocusIndex].focus();
    }
  }

  private _handleTabActivation(tabID?: string) {
    this._activateTab(tabID);
    this._activatePanel();
    this._moveActiveTabIndicator();
  }

  private _activateTab(tabID?: string) {
    if (!tabID) {
      let activeTabIndex = this._enabledTabs.findIndex((tab) => tab.active);

      if (activeTabIndex < 0) {
        activeTabIndex = 0;
        this._enabledTabs[activeTabIndex].active = true;
      }

      this._tabFocusIndex = activeTabIndex;
    } else {
      this._enabledTabs.forEach((tab, index) => {
        tab.active = false;

        if (tab.id === tabID) {
          tab.active = true;
          this._tabFocusIndex = index;
        }
      });
    }
  }

  private _activatePanel() {
    const activeTab = this._enabledTabs[this._tabFocusIndex];

    this.panels.forEach((panel) => {
      panel.active = false;

      if (panel.tab === activeTab.id) {
        panel.active = true;
      }
    });
  }

  private _calcIndicatorOffset(activeTab: DsTab) {
    const activeTabIndex = this.tabs.findIndex((tab) => tab === activeTab);
    const offsetTabs = this.tabs.slice(0, activeTabIndex);

    return offsetTabs.reduce((acc, tab) => {
      if (this.direction === 'block') {
        return acc + tab.offsetWidth;
      }
      return acc + tab.offsetHeight;
    }, 0);
  }

  private _moveActiveTabIndicator() {
    const activeTab = this._enabledTabs[this._tabFocusIndex];
    const offset = this._calcIndicatorOffset(activeTab);

    if (this.direction === 'block') {
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
