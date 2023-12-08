import './avatar.component.js';

import {fixture, html, expect, waitUntil} from '@open-wc/testing';
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
      const base = avatar.shadowRoot!.querySelector('[part=base]')!;
      expect(avatar).to.have.attribute('shape', 'circle');
      expect(base).to.have.class('avatar--circle');
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
      const imagePart = avatar.shadowRoot!.querySelector('[part=image]');
      expect(imagePart).to.have.attribute('src', image);
    });

    it('should render the label attribute on the base part', () => {
      const base = avatar.shadowRoot!.querySelector('[part=base]');
      expect(base).to.have.attribute('aria-label', label);
    });
  });

  describe('when provided initials', () => {
    const initials = 'SL';

    before(async () => {
      avatar = await fixture<DsAvatar>(
        html`
          <ds-avatar initials=${initials} label="Initials Avatar"></ds-avatar>
        `
      );
    });

    it('should be accessible', async () => {
      await expect(avatar).to.be.accessible();
    });

    it('should render initials part with the given initials as text', () => {
      const initialsPart = avatar.shadowRoot!.querySelector('[part=initials]');
      expect(initialsPart).to.have.text(initials);
    });
  });

  describe('when image is provided, initials or icon should not render', () => {
    const initials = 'SL';
    const image =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    const label = 'Small transparent square';

    before(async () => {
      avatar = await fixture<DsAvatar>(
        html`
          <ds-avatar
            image=${image}
            initials=${initials}
            label=${label}
          ></ds-avatar>
        `
      );
    });

    it('should be accessible', async () => {
      await expect(avatar).to.be.accessible();
    });

    it('should render image part with src attribute of the given image link', () => {
      const imagePart = avatar.shadowRoot!.querySelector('[part=image]');
      expect(imagePart).to.have.attribute('src', image);
    });

    it('should not render initials part', () => {
      const initialsPart = avatar.shadowRoot!.querySelector('[part=initials]');
      expect(initialsPart).not.to.exist;
    });

    it('should not render icon', () => {
      const iconSlot = avatar.shadowRoot!.querySelector('slot[name=icon]');
      expect(iconSlot).not.to.exist;
    });
  });

  (['circle', 'rounded', 'square'] as const).forEach((shape) => {
    describe(`when provided a shape attribute of value ${shape}`, () => {
      before(async () => {
        avatar = await fixture<DsAvatar>(
          html`<ds-avatar shape=${shape} label="shaped avatar"></ds-avatar>`
        );
      });

      it('should be accessible', async () => {
        await expect(avatar).to.be.accessible();
      });

      it('should have the appropriate attribute and className on base', () => {
        const base = avatar.shadowRoot!.querySelector('[part=base]');
        expect(avatar).to.have.attribute('shape', shape);
        expect(base).to.have.class(`avatar--${shape}`);
      });
    });
  });

  describe('when provided content for the icon slot', () => {
    before(async () => {
      avatar = await fixture<DsAvatar>(
        html`
          <ds-avatar label="icon avatar">
            <span slot="icon">Random Icon</span>
          </ds-avatar>
        `
      );
    });

    it('should be accessible', async () => {
      await expect(avatar).to.be.accessible();
    });

    it('should render the given icon slotted element correctly', () => {
      const slot = avatar.shadowRoot!.querySelector(
        'slot[name=icon]'
      ) as HTMLSlotElement;
      const assignedElements = slot.assignedElements();

      expect(assignedElements).to.have.length(1);
      expect(assignedElements[0]).to.have.text('Random Icon');
    });
  });

  describe('when provided an invalid image', () => {
    before(async () => {
      avatar = await fixture<DsAvatar>(
        html`<ds-avatar label="bad avatar" image="bad-image"></ds-avatar>`
      );
    });

    it('should not render the image', async () => {
      await waitUntil(() =>
        avatar.shadowRoot!.querySelector('slot[name=icon]')
      );

      expect(avatar.shadowRoot!.querySelector('[part=image]')).not.to.exist;
    });

    it('should render the image when updated with a valid link', async () => {
      await waitUntil(() =>
        avatar.shadowRoot!.querySelector('slot[name=icon]')
      );

      avatar.image =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

      await avatar.updateComplete;

      expect(avatar.shadowRoot!.querySelector('[part=image]')).to.exist;
    });
  });
});
