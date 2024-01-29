import './tab.component.js';
import './tab-panel.component.js';
import './tab-group.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import {sendMouse} from '@web/test-runner-commands';
import type DsTabGroup from './tab-group.component';
import type DsTab from './tab.component';

describe('<ds-tab-group>', () => {
  describe('when provided with no parameters', () => {
    it('should be accessible', async () => {
      const tabGroup = await fixture<DsTabGroup>(html`
        <ds-tab-group label="test">
          <ds-tab slot="tabs" id="tab-1" panel="panel-1" active>tab</ds-tab>
          <ds-tab-panel id="panel-1" tab="tab-1"> panel </ds-tab-panel>
        </ds-tab-group>
      `);

      await expect(tabGroup).to.be.accessible();
    });

    it('should activate the first tab when active attribute is not provided', async () => {
      const tabGroup = await fixture<DsTabGroup>(html`
        <ds-tab-group label="test">
          <ds-tab slot="tabs" id="tab-1" panel="panel-1">tab</ds-tab>
          <ds-tab-panel id="panel-1" tab="tab-1"> panel </ds-tab-panel>

          <ds-tab slot="tabs" id="tab-2" panel="panel-2">tab</ds-tab>
          <ds-tab-panel id="panel-2" tab="tab-2"> panel </ds-tab-panel>
        </ds-tab-group>
      `);

      const tabs = tabGroup.querySelectorAll<DsTab>('ds-tab');

      expect(tabs[0].active).to.be.true;
      expect(tabs[1].active).to.be.false;
    });

    it('should activate a tab by clicking on it and deactivate all others', async () => {
      const tabGroup = await fixture<DsTabGroup>(html`
        <ds-tab-group label="test">
          <ds-tab slot="tabs" id="tab-1" panel="panel-1">tab</ds-tab>
          <ds-tab-panel id="panel-1" tab="tab-1"> panel </ds-tab-panel>

          <ds-tab slot="tabs" id="tab-2" panel="panel-2">tab</ds-tab>
          <ds-tab-panel id="panel-2" tab="tab-2"> panel </ds-tab-panel>
        </ds-tab-group>
      `);

      const tabs = tabGroup.querySelectorAll<DsTab>('ds-tab');

      const {top, left} = tabs[1].getCoords();

      await sendMouse({
        type: 'click',
        position: [Math.round(left + 1), Math.round(top + 1)],
      });

      expect(tabs[0].active).to.be.false;
      expect(tabs[1].active).to.be.true;
    });

    it('should not activate a disabled tab when clicked', async () => {
      const tabGroup = await fixture<DsTabGroup>(html`
        <ds-tab-group label="test">
          <ds-tab slot="tabs" id="tab-1" panel="panel-1">tab</ds-tab>
          <ds-tab-panel id="panel-1" tab="tab-1"> panel </ds-tab-panel>

          <ds-tab slot="tabs" id="tab-2" panel="panel-2" disabled>tab</ds-tab>
          <ds-tab-panel id="panel-2" tab="tab-2"> panel </ds-tab-panel>
        </ds-tab-group>
      `);

      const tabs = tabGroup.querySelectorAll<DsTab>('ds-tab');

      const {top, left} = tabs[1].getCoords();

      await sendMouse({
        type: 'click',
        position: [Math.round(left + 1), Math.round(top + 1)],
      });

      expect(tabs[0].active).to.be.true;
      expect(tabs[1].active).to.be.false;
    });
  });
});
