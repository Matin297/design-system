import './button.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';
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

  describe('when disabled', () => {
    before(async () => {
      button = await fixture<DsButton>(
        html`<ds-button disabled>Disabled</ds-button>`
      );
    });

    it('should be accessible', async () => {
      expect(button).to.be.accessible();
    });

    it('should disabled the underlying button element', () => {
      const base = button.shadowRoot!.querySelector('button[disabled]');
      expect(base).to.exist;
    });
  });

  describe('when submitting a form', () => {
    it('should submit the form when type is set to "submit" and placed inside of it', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <ds-button type="submit">Submit</ds-button>
        </form>
      `);

      const submitHandler = sinon.spy((e: Event) => e.preventDefault());
      form.addEventListener('submit', submitHandler);

      form.querySelector('ds-button')!.click();

      expect(submitHandler).to.have.been.calledOnce;
    });

    it('should submit the form when type is set to "submit" and placed outside of it', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <div>
          <form id="testID">
            <input name="test" value="test" />
          </form>
          <ds-button type="submit" form="testID">Submit</ds-button>
        </div>
      `);

      const submitHandler = sinon.spy((e: Event) => e.preventDefault());
      form.addEventListener('submit', submitHandler);

      form.querySelector('ds-button')!.click();

      expect(submitHandler).to.have.been.calledOnce;
    });
  });
});
