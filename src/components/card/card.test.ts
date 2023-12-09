import './card.component.js';

import {fixture, html, expect} from '@open-wc/testing';
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
});
