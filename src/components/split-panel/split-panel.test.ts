import './split-panel.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import {sendMouse, resetMouse} from '@web/test-runner-commands';
import type DsSplitPanel from './split-panel.component';

// WARNING: When you move the mouse or hold down a mouse button,
// the mouse stays in this state as long as you do not explicitly
// move it to another position or release the button. For this reason,
// it is recommended to reset the mouse state with the resetMouse command
// after each test that manipulates the mouse in order to avoid unexpected
// side effects in the following tests.

describe('<ds-split-panel>', () => {
  describe('when no parameters are provided', () => {
    afterEach(async () => {
      await resetMouse();
    });

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

    it('should update panels proportion when position updates programmatically', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel>
          <div slot="start-panel">start</div>
          <div slot="end-panel">end</div>
        </ds-split-panel>
      `);

      panel.position = 75;

      await panel.updateComplete;

      const start = panel.querySelector<HTMLDivElement>(
        '[slot="start-panel"]'
      )!;
      const end = panel.querySelector<HTMLDivElement>('[slot="end-panel"]')!;

      expect(start.offsetWidth).to.be.greaterThan(end.offsetWidth);
    });

    it('should resize panels when moving divider using mouse', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel>
          <div slot="start-panel">start</div>
          <div slot="end-panel">end</div>
        </ds-split-panel>
      `);

      const start = panel.querySelector<HTMLDivElement>(
        '[slot="start-panel"]'
      )!;
      const divider =
        panel.shadowRoot!.querySelector<HTMLDivElement>('[part=divider]')!;
      const end = panel.querySelector<HTMLDivElement>('[slot="end-panel"]')!;

      expect(start.offsetWidth).to.equal(end.offsetWidth);

      const step = 10;
      const {top, left, width, height} = divider.getBoundingClientRect();
      const mouseY = top + window.scrollY + height / 2;
      const mouseX = left + window.scrollX + width / 2;

      // move the mouse to the center of the divider
      await sendMouse({type: 'move', position: [mouseX, mouseY]});
      // perform a mouse down on the divider
      await sendMouse({type: 'down'});

      // move the mouse to the left by "step" px
      await sendMouse({type: 'move', position: [mouseX - step, mouseY]});
      // perform a mouse up on the divider
      await sendMouse({type: 'up'});

      expect(start.offsetWidth + step).to.equal(end.offsetWidth - step);
    });
  });

  describe('when position is provided', () => {
    it('should render the panels with correct proportion based on position', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel position="25">
          <div slot="start-panel">start</div>
          <div slot="end-panel">end</div>
        </ds-split-panel>
      `);

      const start = panel.querySelector<HTMLDivElement>(
        '[slot="start-panel"]'
      )!;
      const end = panel.querySelector<HTMLDivElement>('[slot="end-panel"]')!;

      expect(start.offsetWidth).to.be.lessThan(end.offsetWidth);
    });
  });

  describe('when disabled', () => {
    it('should be accessible', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel disabled>
          <div slot="start-panel">start</div>
          <div slot="end-panel">end</div>
        </ds-split-panel>
      `);

      await expect(panel).to.be.accessible();
    });
  });
});
