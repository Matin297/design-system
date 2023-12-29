import './split-panel.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import type DsSplitPanel from './split-panel.component';

// WARNING: When you move the mouse or hold down a mouse button,
// the mouse stays in this state as long as you do not explicitly
// move it to another position or release the button. For this reason,
// it is recommended to reset the mouse state with the resetMouse command
// after each test that manipulates the mouse in order to avoid unexpected
// side effects in the following tests.

describe('<ds-split-panel>', () => {
  describe('when no parameters are provided', () => {
    it('should be accessible', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel>
          <div slot="start-panel">start</div>
          <div slot="end-panel">end</div>
        </ds-split-panel>
      `);

      await expect(panel).to.be.accessible();
    });

    it('should render both start and end panels the same size', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel>
          <div slot="start-panel">start</div>
          <div slot="end-panel">end</div>
        </ds-split-panel>
      `);

      const start = panel.querySelector<HTMLDivElement>(
        '[slot="start-panel"]'
      )!;
      const end = panel.querySelector<HTMLDivElement>('[slot="end-panel"]')!;

      expect(start.offsetWidth).to.equal(end.offsetWidth);
    });
  });
});
