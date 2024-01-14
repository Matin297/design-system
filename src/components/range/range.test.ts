import './range.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import {sendMouse, sendKeys} from '@web/test-runner-commands';
import sinon from 'sinon';
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

  describe('when disabled', () => {
    it('should disable the underlying input', async () => {
      const ranger = await fixture<DsRange>(html`
        <ds-range disabled><p slot="label">Label</p></ds-range>
      `);

      const input =
        ranger.shadowRoot!.querySelector<HTMLInputElement>('input')!;
      expect(input.disabled).to.be.true;
    });
  });

  describe('when value changes', () => {
    it('should change the value to 100 when click far right of the track', async () => {
      const ranger = await fixture<DsRange>(html` <ds-range></ds-range> `);

      const {right, bottom} = ranger.getBoundingClientRect();

      await sendMouse({
        type: 'click',
        position: [Math.round(right) - 1, Math.round(bottom) - 1],
      });

      await ranger.updateComplete;

      expect(ranger.value).to.be.equal(100);
    });

    it('should decrease value when left arrow is pressed on focus', async () => {
      const ranger = await fixture<DsRange>(
        html` <ds-range value="50"></ds-range> `
      );

      ranger.focus();

      await sendKeys({press: 'ArrowLeft'});

      await ranger.updateComplete;

      expect(ranger.value).to.be.equal(49);
    });

    it('should increase value when right arrow is pressed on focus', async () => {
      const ranger = await fixture<DsRange>(
        html` <ds-range value="50"></ds-range> `
      );

      ranger.focus();

      await sendKeys({press: 'ArrowRight'});

      await ranger.updateComplete;

      expect(ranger.value).to.be.equal(51);
    });
  });

  describe('when submitting a form', () => {
    it('should include name/vale for the range', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <ds-range name="a" value="10"></ds-range>
          <button>submit</button>
        </form>
      `);

      const submitHandler = sinon.spy((e: Event) => e.preventDefault());
      form.addEventListener('submit', submitHandler);
      form.querySelector('button')?.click();
      const formData = new FormData(form);

      expect(submitHandler).to.have.been.calledOnce;
      expect(formData.get('a')).to.equal('10');
    });

    it('should include name/vale for the range when place outside a form', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <ds-range form="ranger" name="a" value="10"></ds-range>
          <form id="ranger">
            <button>submit</button>
          </form>
        </div>
      `);

      const form = container.querySelector<HTMLFormElement>('form')!;
      const submitHandler = sinon.spy((e: Event) => e.preventDefault());

      form.addEventListener('submit', submitHandler);
      form.querySelector('button')!.click();

      const formData = new FormData(form);

      expect(submitHandler).to.have.been.calledOnce;
      expect(formData.get('a')).to.equal('10');
    });
  });
});
