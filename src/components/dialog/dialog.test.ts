import './dialog.component.js';

import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
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

    it('should focus on a focusable element if any is provided', async () => {
      const dialog = await fixture<DsDialog>(
        html`<ds-dialog>
          <p>Test</p>
          <button slot="footer">Here</button>
        </ds-dialog>`
      );

      dialog.show();
      await dialog.updateComplete;

      await oneEvent(dialog, 'ds-initial-focus');

      expect(document.activeElement).to.be.equal(
        dialog.querySelector('button')
      );
    });

    it('should focus on an autofocus element if any is provided', async () => {
      const dialog = await fixture<DsDialog>(
        html`<ds-dialog>
          <p>Test</p>
          <input autofocus />
        </ds-dialog>`
      );

      dialog.show();
      await dialog.updateComplete;

      await oneEvent(dialog, 'ds-initial-focus');

      expect(document.activeElement).to.be.equal(dialog.querySelector('input'));
    });

    it('should be closed whe Esc key is pressed', async () => {
      const dialog = await fixture<DsDialog>(html`<ds-dialog>Test</ds-dialog>`);

      const dialogElement =
        dialog.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!;
      const {display} = getComputedStyle(dialogElement);

      dialog.show();
      await dialog.updateComplete;

      await sendKeys({press: 'Escape'});

      expect(display).to.be.equal('none');
    });
  });
});
