import './range.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import type DsRange from './range.component';

describe('<ds-range>', () => {
  describe('when no parameters are provider', () => {
    it('should be accessible', async () => {
      const ranger = await fixture<DsRange>(html`
        <ds-range><p slot="label">Label</p></ds-range>
      `);

      await expect(ranger).to.be.accessible();
    });

    it('should have default values for not provided props', async () => {
      const ranger = await fixture<DsRange>(html`
        <ds-range><p slot="label">Label</p></ds-range>
      `);

      expect(ranger.value).to.be.equal(0);
      expect(ranger.disabled).to.be.false;
      expect(ranger.min).to.be.equal(0);
      expect(ranger.step).to.be.equal(1);
      expect(ranger.max).to.be.equal(100);
      expect(ranger.tooltip).to.be.equal('top');
    });
  });
});
