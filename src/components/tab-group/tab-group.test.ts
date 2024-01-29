import './tab.component.js';
import './tab-panel.component.js';
import './tab-group.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import type DsTabGroup from './tab-group.component';

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
  });
});
