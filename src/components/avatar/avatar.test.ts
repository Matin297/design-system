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
});
