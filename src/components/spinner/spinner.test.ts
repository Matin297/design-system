import './spinner.component.js';

import {fixture, expect, html} from '@open-wc/testing';
import type DsSpinner from './spinner.component';

describe('<ds-spinner>', () => {
  describe('when provided no parameters', () => {
    it('is accessible', async () => {
      const spinner = await fixture<DsSpinner>(html`<ds-spinner></ds-spinner>`);
      await expect(spinner).to.be.accessible();
    });

    it('should have a role of "progressbar"', async () => {
      const spinner = await fixture<DsSpinner>(html`<ds-spinner></ds-spinner>`);
      const base = spinner.shadowRoot!.querySelector('[part="base"]');
      expect(base).to.have.attribute('role', 'progressbar');
    });
  });
});
