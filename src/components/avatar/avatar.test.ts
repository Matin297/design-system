import './avatar.component.js';

import {fixture, html, expect} from '@open-wc/testing';
import type DsAvatar from './avatar.component';

describe('<ds-avatar>', () => {
  let avatar: DsAvatar;

  describe('when provided no parameters but label', () => {
    before(async () => {
      avatar = await fixture<DsAvatar>(
        html`<ds-avatar label="avatar"></ds-avatar>`
      );
    });

    it('should be accessible', async () => {
      await expect(avatar).to.be.accessible();
    });

    it('should default to circle shape', () => {
      const base = avatar.shadowRoot!.querySelector('[part="base"]')!;
      expect(avatar).to.have.attribute('shape', 'circle');
      expect(base.className).to.include('avatar--circle');
    });
  });

  describe('when provided image and label', () => {
    const image =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    const label = 'Small transparent square';

    before(async () => {
      avatar = await fixture<DsAvatar>(
        html`<ds-avatar image=${image} label=${label}></ds-avatar>`
      );
    });

    it('should be accessible', async () => {
      await expect(avatar).to.be.accessible();
    });

    it('should render image part with the given image link as src', () => {
      const imagePart = avatar.shadowRoot!.querySelector('[part="image"]');
      expect(imagePart).to.have.attribute('src', image);
    });

    it('should render the label attribute on the base part', () => {
      const base = avatar.shadowRoot!.querySelector('[part="base"]');
      expect(base).to.have.attribute('aria-label', label);
    });
  });
});
