import './drawer.component.js';

import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import type DsDrawer from './drawer.component';

describe('<ds-drawer>', () => {
  describe('when no parameters are provided', () => {
    it('should not show dialog by default', async () => {
      const drawer = await fixture<DsDrawer>(
        html`<ds-drawer>Here goes the content</ds-drawer>`
      );

      const dialog =
        drawer.shadowRoot?.querySelector<HTMLDialogElement>('dialog');
      const display = getComputedStyle(dialog!).display;

      expect(display).to.be.equal('none');
    });

    it('should display dialog when show method is called', async () => {
      const drawer = await fixture<DsDrawer>(
        html`<ds-drawer>Here goes the content</ds-drawer>`
      );

      drawer.show();

      await drawer.updateComplete;

      const dialog =
        drawer.shadowRoot!.querySelector<HTMLDialogElement>('dialog');
      const display = getComputedStyle(dialog!).display;

      expect(display).to.be.equal('block');
    });

    it('should hide dialog when close method is called', async () => {
      const drawer = await fixture<DsDrawer>(
        html`<ds-drawer>Here goes the content</ds-drawer>`
      );

      drawer.show();
      await drawer.updateComplete;

      drawer.close();
      await drawer.updateComplete;

      const dialog =
        drawer.shadowRoot!.querySelector<HTMLDialogElement>('dialog');
      const display = getComputedStyle(dialog!).display;

      expect(display).to.be.equal('none');
    });

    it('should focus on an autofocus element if any is provided', async () => {
      const drawer = await fixture<DsDrawer>(
        html`<ds-drawer>
          <p>Here goes the content</p>
          <input autofocus />
        </ds-drawer>`
      );

      drawer.show();

      await oneEvent(drawer, 'ds-initial-focus');

      expect(document.activeElement).to.be.equal(drawer.querySelector('input'));
    });

    it('should be closed whe Esc key is pressed', async () => {
      const drawer = await fixture<DsDrawer>(
        html`<ds-drawer>Here goes the content</ds-drawer>`
      );

      drawer.show();

      await drawer.updateComplete;

      await sendKeys({press: 'Escape'});

      const dialog =
        drawer.shadowRoot?.querySelector<HTMLDialogElement>('dialog');
      const display = getComputedStyle(dialog!).display;

      expect(display).to.be.equal('none');
    });
  });
});
