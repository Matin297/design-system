import {customElement} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-avatar';

@customElement(ELEMENT_NAME)
export default class DsAvatar extends BaseElement {
  static styles = [BaseElement.styles];
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsAvatar;
  }
}
