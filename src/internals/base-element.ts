import type {CSSResultGroup} from 'lit';
import {LitElement, css} from 'lit';

import type {
  DsEventMap,
  DsEventInit,
  DsCustomEvent,
  WithDetailsEvent,
  WithDetailsEventsMap,
  WithoutDetailsEvent,
  WithoutDetailsEventsMap,
} from '../events/types';

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

  emit<T extends keyof WithDetailsEventsMap>(
    name: WithDetailsEvent<T>,
    options: DsEventInit<T>
  ): DsCustomEvent<T>;
  emit<T extends keyof WithoutDetailsEventsMap>(
    name: WithoutDetailsEvent<T>,
    options?: DsEventInit<T>
  ): DsCustomEvent<T>;
  emit<T extends keyof DsEventMap>(
    name: T,
    options?: DsEventInit<T>
  ): DsCustomEvent<T> {
    const customEvent = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {},
      ...options,
    });

    this.dispatchEvent(customEvent);

    return customEvent as DsCustomEvent<T>;
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
}
