import './card.component.js';

import {fixture, html, expect, assert} from '@open-wc/testing';
import type DsCard from './card.component';

describe('<ds-card>', () => {
  let card: DsCard;

  describe('when provided body', () => {
    const content =
      'This is just a basic card. No image, no header, and no footer. Just your content.';

    before(async () => {
      card = await fixture<DsCard>(html` <ds-card>${content}</ds-card> `);
    });

    it('should be accessible', async () => {
      await expect(card).to.be.accessible();
    });

    it('should render the provided child content', () => {
      const body = card.shadowRoot!.querySelector(
        '[part=body]'
      ) as HTMLSlotElement;

      expect(body.assignedNodes()[0]).to.have.text(content);
    });
  });

  describe('when provided header and body', () => {
    const content =
      'This card has a header. You can put all sorts of things in it!';

    before(async () => {
      card = await fixture<DsCard>(html`
        <ds-card>
          <div slot="header">Header</div>
          ${content}
        </ds-card>
      `);
    });

    it('should be accessible', async () => {
      await expect(card).to.be.accessible();
    });

    it('should render body content correctly', () => {
      const body = card.shadowRoot!.querySelector(
        '[part=body]'
      ) as HTMLSlotElement;

      assert.include(
        body.assignedNodes().map((node) => node.textContent),
        content
      );
    });

    it('should render header content correctly', () => {
      const header = card.shadowRoot!.querySelector(
        'slot[name=header]'
      ) as HTMLSlotElement;

      expect(header.assignedElements()).to.have.length(1);
    });

    it('should attach card--with-header class modifier to base', () => {
      const base = card.shadowRoot!.querySelector('[part=base]');
      expect(base).to.have.class('card--with-header');
    });
  });

  describe('when provided footer and body', () => {
    const content =
      'This card has a footer. You can put all sorts of things in it!';

    before(async () => {
      card = await fixture<DsCard>(html`
        <ds-card>
          ${content}
          <div slot="footer">Footer Content</div>
        </ds-card>
      `);
    });

    it('should be accessible', async () => {
      await expect(card).to.be.accessible();
    });

    it('should render body content correctly', () => {
      const body = card.shadowRoot!.querySelector(
        '[part=body]'
      ) as HTMLSlotElement;
      assert.include(
        body.assignedNodes().map((node) => node.textContent),
        content
      );
    });

    it('should render footer content correctly', () => {
      const footer = card.shadowRoot!.querySelector(
        '[part=footer]'
      ) as HTMLSlotElement;

      expect(footer.assignedElements()).to.have.length(1);
    });

    it('should attach card--with-footer class modifier to base', () => {
      const base = card.shadowRoot!.querySelector('[part=base]');
      expect(base).to.have.class('card--with-footer');
    });
  });

  describe('when provided image and body', () => {
    const content =
      'This is a kitten, but not just any kitten. This kitten likes walking along pallets.';

    before(async () => {
      card = await fixture<DsCard>(html`
        <ds-card>
          <img
            slot="image"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt="A kitten walks towards camera on top of pallet."
          />
          ${content}
        </ds-card>
      `);
    });

    it('should be accessible', async () => {
      await expect(card).to.be.accessible();
    });

    it('should render body content correctly', () => {
      const body = card.shadowRoot!.querySelector(
        '[part=body]'
      ) as HTMLSlotElement;
      assert.include(
        body.assignedNodes().map((node) => node.textContent),
        content
      );
    });

    it('should render image correctly', () => {
      const image = card.shadowRoot!.querySelector(
        '[part=image]'
      ) as HTMLSlotElement;

      expect(image.assignedElements()).to.have.length(1);
    });

    it('should attach card--with-image class modifier to base', () => {
      const base = card.shadowRoot!.querySelector(
        '[part=base]'
      ) as HTMLSlotElement;
      expect(base).to.have.class('card--with-image');
    });
  });
});
