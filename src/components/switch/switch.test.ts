import './switch.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import {sendKeys} from '@web/test-runner-commands';
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
      expect(switcher.value).to.be.equal('');
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
});
