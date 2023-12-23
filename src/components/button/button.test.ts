import './button.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import DsButton from './button.component';

describe('<ds-button>', () => {
  let button: DsButton;

  describe('when provided no parameters', () => {
    before(async () => {
      button = await fixture<DsButton>(html`<ds-button>Test</ds-button>`);
    });

    it('should be accessible', async () => {
      await expect(button).to.be.accessible();
    });

    it('should set default prop values correctly', () => {
      expect(button.disabled).to.equal(false);
      expect(button.type).to.equal('button');

      expect(button).to.have.attribute('variant', 'fill');
      expect(button).to.have.attribute('theme', 'primary');
      expect(button).to.have.attribute('size', 'medium');
    });
  });
});
