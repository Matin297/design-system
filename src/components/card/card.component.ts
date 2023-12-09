import {html} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import styles from './card.styles';

const ELEMENT_NAME = 'ds-card';

const SLOTS = ['image', 'header', 'body', 'footer'] as const;

@customElement(ELEMENT_NAME)
export default class DsCard extends BaseElement {
  static styles = [BaseElement.styles, styles];

  private _hasSlottedElement(name: (typeof SLOTS)[number]) {
    return this.querySelector(`:scope > [slot=${name}]`) !== null;
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          card: true,
          'card--with-image': this._hasSlottedElement('image'),
          'card--with-header': this._hasSlottedElement('header'),
          'card--with-body': this._hasSlottedElement('body'),
          'card--with-footer': this._hasSlottedElement('footer'),
        })}
      >
        ${SLOTS.map(
          (slotName) =>
            html`
              <slot
                name=${slotName}
                part=${slotName}
                class="card__${slotName}"
              ></slot>
            `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsCard;
  }
}
