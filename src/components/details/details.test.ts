import './details.component.js';

import {fixture, html, expect, oneEvent, waitUntil} from '@open-wc/testing';
import sinon from 'sinon';
import type DsDetails from './details.component';

describe('<ds-details>', () => {
  describe('when details is opened', () => {
    it('should be accessible', async () => {
      const details = await fixture<DsDetails>(html`
        <ds-details open summary="Test">Test Details</ds-details>
      `);

      await expect(details).to.be.accessible();
    });

    it('should display the body content', async () => {
      const details = await fixture<DsDetails>(html`
        <ds-details open summary="Test">Test Details</ds-details>
      `);

      const body = details.shadowRoot!.querySelector('.details__body')!;
      expect(body.clientHeight).to.be.greaterThan(0);
    });

    it('should emit ds-hide and ds-hide-finish when calling hide()', async () => {
      const details = await fixture<DsDetails>(html`
        <ds-details open summary="Test">Test Details</ds-details>
      `);

      const hideHandler = sinon.spy();
      const hideFinishHandler = sinon.spy();

      details.addEventListener('ds-hide', hideHandler);
      details.addEventListener('ds-hide-finish', hideFinishHandler);

      details.hide();

      await oneEvent(details, 'ds-hide-finish');

      expect(hideHandler).to.have.been.calledOnce;
      expect(hideFinishHandler).to.have.been.calledOnce;
    });

    it('should not be closed when ds-hide is prevented', async () => {
      const details = await fixture<DsDetails>(html`
        <ds-details open summary="Test">Test Details</ds-details>
      `);

      const hideHandler = sinon.spy((event: Event) => event.preventDefault());

      details.addEventListener('ds-hide', hideHandler);
      details.hide();

      await waitUntil(() => hideHandler.calledOnce);

      expect(details.open).to.be.true;
    });
  });

  describe('when details is closed', () => {
    it('should be accessible', async () => {
      const details = await fixture<DsDetails>(html`
        <ds-details summary="Test">Test Details</ds-details>
      `);

      await expect(details).to.be.accessible();
    });

    it('should not display the body content', async () => {
      const details = await fixture<DsDetails>(html`
        <ds-details summary="Test">Test Details</ds-details>
      `);

      const body = details.shadowRoot!.querySelector('.details__body')!;
      expect(body.clientHeight).to.be.equal(0);
    });

    it('should emit ds-show and ds-show-finish when calling show()', async () => {
      const details = await fixture<DsDetails>(html`
        <ds-details summary="Test">Test Details</ds-details>
      `);

      const showHandler = sinon.spy();
      const showFinishHandler = sinon.spy();

      details.addEventListener('ds-show', showHandler);
      details.addEventListener('ds-show-finish', showFinishHandler);

      details.show();

      await oneEvent(details, 'ds-show-finish');

      expect(showHandler).to.have.been.calledOnce;
      expect(showFinishHandler).to.have.been.calledOnce;
    });

    it('should not be opened when ds-show is prevented', async () => {
      const details = await fixture<DsDetails>(html`
        <ds-details summary="Test">Test Details</ds-details>
      `);

      const showHandler = sinon.spy((event: Event) => event.preventDefault());

      details.addEventListener('ds-show', showHandler);
      details.show();

      await waitUntil(() => showHandler.calledOnce);

      expect(details.open).to.be.false;
    });
  });
});
