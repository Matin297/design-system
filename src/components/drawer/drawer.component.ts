import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {BaseElement} from '../../internals/base-element';
import {waitForAnimationsToFinish} from '../../internals/animation';
import {
  findAutoFocusElement,
  queryFocusableElements,
} from '../../internals/tabbable';
import {lockBodyScroll, unlockBodyScroll} from '../../internals/scroll';
import styles from './drawer.styles';

const ELEMENT_NAME = 'ds-drawer';

@customElement(ELEMENT_NAME)
export default class DsDrawer extends BaseElement {
  static styles = [BaseElement.styles, styles];

  private _mutationObserver = new MutationObserver((mutationList) =>
    this._observerCallback(mutationList)
  );

  @query('.drawer')
  drawer: HTMLDialogElement;

  firstUpdated() {
    this._mutationObserver.observe(this.drawer, {
      attributes: true,
      attributeFilter: ['open'],
    });
  }

  /** Specified value for aria-label */
  @property()
  label?: string;

  /** Specified value for aria-labelledby */
  @property({attribute: 'labelledby'})
  labelledBy?: string;

  /**
   * Whether dialog is modal or not.
   * For this to work, set position to relative and overflow to hidden on the container.
   */
  @property({type: Boolean, reflect: true})
  contained = false;

  /** Where to place the drawer based on direction */
  @property()
  placement: Placement = 'end';

  /** Determines the drawer direction */
  @property()
  direction: Direction = 'inline';

  /**
   * Delegates opening the drawer to the underlying dialog.
   * If contained is set then will open a non-modal drawer.
   */
  show() {
    if (this.contained) {
      this.drawer.show();
    } else {
      this.drawer.showModal();
    }
  }

  /** Delegates closing the drawer to the underlying dialog */
  close() {
    this.drawer.close();
  }

  render() {
    const header = this.hasSlottedElement('header')
      ? html`<header part="header" class="drawer__header">
          <slot name="header"></slot>
        </header>`
      : '';

    const footer = this.hasSlottedElement('footer')
      ? html`<footer part="footer" class="drawer__footer">
          <slot name="footer"></slot>
        </footer>`
      : '';

    return html`
      <dialog
        part="base"
        class=${classMap({
          drawer: true,
          'drawer--end': this.placement === 'end',
          'drawer--start': this.placement === 'start',
          'drawer--inline': this.direction === 'inline',
          'drawer--block': this.direction === 'block',
        })}
        aria-label=${ifDefined(this.label)}
        aria-labelledby=${ifDefined(this.labelledBy)}
      >
        <section part="body" class="drawer__body">
          ${header}
          <main part="content" class="drawer__content">
            <slot></slot>
          </main>
          ${footer}
        </section>
      </dialog>
    `;
  }

  private async _observerCallback(mutationList: MutationRecord[]) {
    for (const mutation of mutationList) {
      const target = mutation.target as HTMLDialogElement;

      if (target.open) {
        if (!this.contained) {
          lockBodyScroll(this);
        }

        await waitForAnimationsToFinish(target);

        const focusableElements = queryFocusableElements(this);
        const autoFocusableElement = findAutoFocusElement(focusableElements);

        /** Initial focus indicator event */
        const initialFocusEvent = this.generateEvent('ds-initial-focus');

        // Either move focus to an element with autofocus attribute
        // or to the first focusable element.
        if (
          autoFocusableElement &&
          typeof autoFocusableElement.focus === 'function'
        ) {
          autoFocusableElement.focus();
          this.dispatchEvent(initialFocusEvent);
        } else if (
          focusableElements.length > 0 &&
          typeof focusableElements[0].focus === 'function'
        ) {
          focusableElements[0].focus();
          this.dispatchEvent(initialFocusEvent);
        }
      } else {
        await waitForAnimationsToFinish(target);

        if (!this.contained) {
          unlockBodyScroll(this);
        }
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsDrawer;
  }
}

type Placement = 'start' | 'end';
type Direction = 'inline' | 'block';
