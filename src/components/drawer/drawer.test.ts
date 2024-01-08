import './drawer.component.js';

import {fixture, html, expect} from '@open-wc/testing';
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

      expect(dialog).to.be.displayed;
    });
  });
});
