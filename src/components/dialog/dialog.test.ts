import './dialog.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import type DsDialog from './dialog.component';

describe('<ds-dialog>', () => {
  describe('when no parameters are provided', () => {
    it('should not be visible by default', async () => {
      const dialog = await fixture<DsDialog>(html`<ds-dialog>test</ds-dialog>`);

      await dialog.updateComplete;

      const dialogElement =
        dialog.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!;
      const {display} = getComputedStyle(dialogElement);

      expect(display).to.equal('none');
    });

    it('should display dialog after calling show method', async () => {
      const dialog = await fixture<DsDialog>(html`<ds-dialog>test</ds-dialog>`);

      dialog.show();

      await dialog.updateComplete;

      const dialogElement =
        dialog.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!;
      const {display} = getComputedStyle(dialogElement);

      expect(display).to.equal('block');
    });

    it('should hide dialog after calling close method', async () => {
      const dialog = await fixture<DsDialog>(html`<ds-dialog>test</ds-dialog>`);

      const dialogElement =
        dialog.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!;
      const {display} = getComputedStyle(dialogElement);

      dialog.show();
      await dialog.updateComplete;

      dialog.close();
      await dialog.updateComplete;

      expect(display).to.equal('none');
    });
  });
});
