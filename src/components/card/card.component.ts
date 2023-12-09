import {html} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import styles from './card.styles';

const ELEMENT_NAME = 'ds-card';

@customElement(ELEMENT_NAME)
export default class DsCard extends BaseElement {
  static styles = [BaseElement.styles, styles];

  private _hasSlottedElement(name: string) {
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
          'card--with-footer': this._hasSlottedElement('footer'),
        })}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsCard;
  }
}
