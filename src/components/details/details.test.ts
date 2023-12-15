import './details.component.js';

import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import sinon from 'sinon';
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

    it('should emit ds-hide and ds-hide-finish when calling hide()', async () => {
      const hideHandler = sinon.spy();
      const hideFinishHandler = sinon.spy();

      details.addEventListener('ds-hide', hideHandler);
      details.addEventListener('ds-hide-finish', hideFinishHandler);

      details.hide();

      await oneEvent(details, 'ds-hide-finish');

      expect(hideHandler).to.have.been.calledOnce;
      expect(hideFinishHandler).to.have.been.calledOnce;
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

    it('should emit ds-show and ds-show-finish when calling show()', async () => {
      const showHandler = sinon.spy();
      const showFinishHandler = sinon.spy();

      details.addEventListener('ds-show', showHandler);
      details.addEventListener('ds-show-finish', showFinishHandler);

      details.show();

      await oneEvent(details, 'ds-show-finish');

      expect(showHandler).to.have.been.calledOnce;
      expect(showFinishHandler).to.have.been.calledOnce;
    });
  });
});
