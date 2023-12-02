import type {CSSResultGroup} from 'lit';
import {LitElement, css} from 'lit';

export class BaseElement extends LitElement {
  static styles: CSSResultGroup = css`
    :host {
      box-sizing: border-box;
    }

    :host *,
    :host *::before,
    :host *::after {
      box-sizing: inherit;
    }
  `;
}
