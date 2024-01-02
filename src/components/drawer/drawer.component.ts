import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-drawer';

@customElement(ELEMENT_NAME)
export default class DsDrawer extends BaseElement {
  static styles = [BaseElement.styles];

  @query('.drawer')
  drawer: HTMLDialogElement;

  /** Specified value for aria-label */
  @property()
  label?: string;

  /** Specified value for aria-labelledby */
  @property({attribute: 'labelledby'})
  labelledBy?: string;

  /** Where to place the drawer based on direction */
  @property()
  placement: Placement = 'end';

  /** Determines the drawer direction */
  @property()
  direction: Direction = 'inline';

  /** Delegates opening the drawer to the underlying dialog */
  show() {
    this.drawer.showModal();
  }

  /** Delegates closing the drawer to the underlying dialog */
  close() {
    this.drawer.close();
  }

  render() {
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
        <header part="header" class="drawer__header">
          <slot name="header"></slot>
        </header>

        <main part="body" class="drawer__body">
          <slot></slot>
        </main>

        <footer part="footer" class="drawer__footer">
          <slot name="footer"></slot>
        </footer>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsDrawer;
  }
}

type Placement = 'start' | 'end';
type Direction = 'inline' | 'block';
