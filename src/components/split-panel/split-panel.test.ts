import './split-panel.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import {sendMouse, resetMouse} from '@web/test-runner-commands';
import type DsSplitPanel from './split-panel.component';

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

    it('should render the panels with correct proportion based on position, vertically', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel style="height: 400px" position="25" vertical>
          <div slot="start-panel">start</div>
          <div slot="end-panel">end</div>
        </ds-split-panel>
      `);

      const start = panel.querySelector<HTMLDivElement>(
        '[slot="start-panel"]'
      )!;
      const end = panel.querySelector<HTMLDivElement>('[slot="end-panel"]')!;

      expect(start.offsetHeight).to.be.lessThan(end.offsetHeight);
    });
  });

  describe('when disabled', () => {
    afterEach(async () => {
      await resetMouse();
    });

    it('should be accessible', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel disabled>
          <div slot="start-panel">start</div>
          <div slot="end-panel">end</div>
        </ds-split-panel>
      `);

      await expect(panel).to.be.accessible();
    });

    it('should not resize panels using mouse', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel disabled>
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

      expect(start.offsetWidth).to.equal(end.offsetWidth);
    });
  });

  describe('when vertical', () => {
    it('should render both start and end panels the same size', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel style="height: 400px" vertical>
          <div slot="start-panel">Start</div>
          <div slot="end-panel">End</div>
        </ds-split-panel>
      `);

      const start = panel.querySelector<HTMLDivElement>(
        '[slot="start-panel"]'
      )!;
      const end = panel.querySelector<HTMLDivElement>('[slot="end-panel"]')!;

      expect(start.offsetHeight).to.equal(end.offsetHeight);
    });

    it('should update panels proportion when position updates programmatically', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel style="height: 400px" vertical>
          <div slot="start-panel">Start</div>
          <div slot="end-panel">End</div>
        </ds-split-panel>
      `);

      panel.position = 75;

      await panel.updateComplete;

      const start = panel.querySelector<HTMLDivElement>(
        '[slot="start-panel"]'
      )!;
      const end = panel.querySelector<HTMLDivElement>('[slot="end-panel"]')!;

      expect(start.offsetHeight).to.be.greaterThan(end.offsetHeight);
    });

    it('should resize panels when moving divider using mouse', async () => {
      const panel = await fixture<DsSplitPanel>(html`
        <ds-split-panel style="height: 400px" vertical>
          <div slot="start-panel">Start</div>
          <div slot="end-panel">End</div>
        </ds-split-panel>
      `);

      const start = panel.querySelector<HTMLDivElement>(
        '[slot="start-panel"]'
      )!;
      const divider =
        panel.shadowRoot!.querySelector<HTMLDivElement>('[part=divider]')!;
      const end = panel.querySelector<HTMLDivElement>('[slot="end-panel"]')!;

      expect(start.offsetHeight).to.equal(end.offsetHeight);

      const step = 10;
      const {top, left, width, height} = divider.getBoundingClientRect();
      const mouseY = top + window.scrollY + height / 2;
      const mouseX = left + window.scrollX + width / 2;

      // move the mouse to the center of the divider
      await sendMouse({type: 'move', position: [mouseX, mouseY]});
      // perform a mouse down on the divider
      await sendMouse({type: 'down'});

      // move the mouse upward by "step" px
      await sendMouse({type: 'move', position: [mouseX, mouseY - step]});
      // perform a mouse up on the divider
      await sendMouse({type: 'up'});

      expect(start.offsetHeight + step).to.equal(end.offsetHeight - step);
    });
  });
});
