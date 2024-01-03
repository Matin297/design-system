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

  generateEvent(name: DsEventName, options?: CustomEventInit) {
    return new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {},
      ...options,
    });
  }

  /** Calculates coordinates relative to the document */
  getCoords() {
    const coords = this.getBoundingClientRect();

    return {
      ...coords,
      top: coords.top + window.scrollY,
      bottom: coords.bottom + window.scrollY,
      left: coords.left + window.scrollX,
      right: coords.right + window.scrollX,
    };
  }

  /** Check to see if there are elements in lightDOM assigned to a slot in shadowDOM */
  hasSlottedElement(name: string) {
    return this.querySelector(`:scope > [slot=${name}]`) !== null;
  }
}

const EVENTS = {
  HIDE: 'ds-hide',
  HIDE_FINISH: 'ds-hide-finish',
  SHOW: 'ds-show',
  SHOW_FINISH: 'ds-show-finish',
} as const;

type DsEventName = (typeof EVENTS)[keyof typeof EVENTS];
