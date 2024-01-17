import './switch.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
import sinon from 'sinon';
import type DsSwitch from './switch.component';

describe('<ds-switch>', () => {
  describe('when no parameters are provided', () => {
    it('should be accessible', async () => {
      const switcher = await fixture<DsSwitch>(
        html`<ds-switch>Label</ds-switch>`
      );
      await expect(switcher).to.be.accessible();
    });

    it('should have default values for not provided props', async () => {
      const switcher = await fixture<DsSwitch>(
        html`<ds-switch>Label</ds-switch>`
      );

      expect(switcher.checked).to.be.false;
      expect(switcher.required).to.be.false;
      expect(switcher.disabled).to.be.false;
      expect(switcher.name).to.be.equal('');
      expect(switcher.size).to.be.equal('medium');
    });

    it('should be valid', async () => {
      const switcher = await fixture<DsSwitch>(
        html`<ds-switch>Label</ds-switch>`
      );
      expect(switcher.checkValidity()).to.be.true;
    });

    it('should be checked when clicked', async () => {
      const switcher = await fixture<DsSwitch>(
        html`<ds-switch>Label</ds-switch>`
      );

      switcher.click();
      await switcher.updateComplete;

      expect(switcher.checked).to.be.true;
    });

    it('should be toggled using space bar', async () => {
      const switcher = await fixture<DsSwitch>(
        html`<ds-switch>Label</ds-switch>`
      );
      switcher.focus();
      await sendKeys({type: ' '});
      await switcher.updateComplete;

      expect(switcher.checked).to.be.true;
    });
  });

  describe('when disabled', () => {
    it('should disable the underlying input', async () => {
      const switcher = await fixture<DsSwitch>(
        html`<ds-switch disabled>Label</ds-switch>`
      );

      const input =
        switcher.shadowRoot!.querySelector<HTMLInputElement>('input')!;
      expect(input.disabled).to.be.true;
    });
  });

  describe('when required', () => {
    it('should be invalid when not checked', async () => {
      const switcher = await fixture<DsSwitch>(
        html`<ds-switch required>Label</ds-switch>`
      );

      expect(switcher.checkValidity()).to.be.false;
    });

    it('should be valid when checked', async () => {
      const switcher = await fixture<DsSwitch>(
        html`<ds-switch required checked>Label</ds-switch>`
      );

      expect(switcher.checkValidity()).to.be.true;
    });
  });

  describe('when submitting a form', () => {
    it('should include name and value in the form data', async () => {
      const form = await fixture<HTMLFormElement>(
        html`
          <form>
            <ds-switch name="a" value="b">Label</ds-switch>
            <button type="submit">submit</button>
          </form>
        `
      );

      const submitHandler = sinon.spy((e: Event) => e.preventDefault());
      form.addEventListener('submit', submitHandler);

      const switcher = form.querySelector('ds-switch')!;
      switcher.click();
      await switcher.updateComplete;

      form.querySelector('button')!.click();

      expect(submitHandler).to.have.been.calledOnce;

      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('b');
    });

    it('should include the name with value "on" if value is not provided', async () => {
      const form = await fixture<HTMLFormElement>(
        html`
          <form>
            <ds-switch name="a">Label</ds-switch>
            <button type="submit">submit</button>
          </form>
        `
      );

      const submitHandler = sinon.spy((e: Event) => e.preventDefault());
      form.addEventListener('submit', submitHandler);

      const switcher = form.querySelector('ds-switch')!;
      switcher.click();
      await switcher.updateComplete;

      form.querySelector('button')!.click();

      expect(submitHandler).to.have.been.calledOnce;

      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('on');
    });
  });
});
