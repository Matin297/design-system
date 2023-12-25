import './checkbox.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import type DsCheckbox from './checkbox.component';

describe('<ds-checkbox>', () => {
  let checkbox: DsCheckbox;

  describe('when no parameters are provided', () => {
    before(async () => {
      checkbox = await fixture<DsCheckbox>(
        html`<ds-checkbox>Test</ds-checkbox>`
      );
    });

    it('should be accessible', async () => {
      await expect(checkbox).to.be.accessible();
    });

    it('should set the default props correctly', () => {
      expect(checkbox.checked).to.be.false;
      expect(checkbox.disabled).to.be.false;
      expect(checkbox.required).to.be.false;
      expect(checkbox.indeterminate).to.be.false;

      expect(checkbox).not.to.have.attribute('name');
      expect(checkbox).not.to.have.attribute('value');

      expect(checkbox).to.have.attribute('size', 'medium');
    });

    it('should be disabled when disabled property is set', async () => {
      checkbox.disabled = true;
      await checkbox.updateComplete;
      expect(checkbox.shadowRoot!.querySelector('input')).to.have.attribute(
        'disabled'
      );
    });
  });

  describe('when disabled', () => {
    before(async () => {
      checkbox = await fixture<DsCheckbox>(
        html`<ds-checkbox disabled>Test</ds-checkbox>`
      );
    });

    it('should be accessible', async () => {
      await expect(checkbox).to.be.accessible();
    });

    it('should disable the underlying checkbox input', () => {
      const checkboxInput = checkbox.shadowRoot!.querySelector(
        'input[type=checkbox]'
      );

      expect(checkboxInput).to.have.attribute('disabled');
    });
  });
});