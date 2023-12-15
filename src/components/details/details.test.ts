import './details.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import type DsDetails from './details.component';

describe('<ds-details>', () => {
  let details: DsDetails;

  describe('when details is opened', () => {
    before(async () => {
      details = await fixture<DsDetails>(html`
        <ds-details open summary="Test">Test Details</ds-details>
      `);
    });

    it('should be accessible', async () => {
      await expect(details).to.be.accessible();
    });
  });

  describe('when details is closed', () => {
    before(async () => {
      details = await fixture<DsDetails>(html`
        <ds-details summary="Test">Test Details</ds-details>
      `);
    });

    it('should be accessible', async () => {
      await expect(details).to.be.accessible();
    });
  });
});
