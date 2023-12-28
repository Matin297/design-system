import {html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import {clamp, toPercent} from '../../utilities/math';
import styles from './split-panel.styles';

const ELEMENT_NAME = 'ds-split-panel';
const DIVIDER_COLUM = 'var(--divider-width)';
const END_COLUM = 'auto';

@customElement(ELEMENT_NAME)
export default class DsSplitPanel extends BaseElement {
  static styles = [BaseElement.styles, styles];

  /** The current position of the divider from the start in percentage */
  @property({reflect: true, type: Number})
  position = 50;

  /** Disables resizing through the divider */
  @property({type: Boolean, reflect: true})
  disabled = false;

  willUpdate(changedProps: PropertyValues<this>) {
    // Whenever position changes update the template columns on host
    if (changedProps.has('position')) {
      this.style.gridTemplateColumns = `
        ${this._calcStartColumn()} 
        ${DIVIDER_COLUM} 
        ${END_COLUM}
      `;
    }
  }

  render() {
    return html`
      <slot name="start-panel" part="start-panel" class="start-panel"></slot>
      <div
        part="divider"
        class="divider"
        role="separator"
        aria-valuenow=${this.position}
        tabindex=${this.disabled ? -1 : 0}
        @pointerdown=${this._pointerDownHandler}
      ></div>
      <slot name="end-panel" part="end-panel" class="end-panel"></slot>
    `;
  }

  private _pointerDownHandler() {
    if (this.disabled) {
      return;
    }

    // Read document-relative coordinates for host
    const hostCoords = this.getCoords();

    // Updates position with pointer's x coordinate
    const pointerMoveHandler = (event: PointerEvent) => {
      this.position = clamp(
        0,
        toPercent(event.pageX - hostCoords.left, this.offsetWidth),
        100
      );
    };

    const pointerUpHandler = () => {
      document.removeEventListener('pointermove', pointerMoveHandler);
    };

    document.addEventListener('pointermove', pointerMoveHandler, {
      passive: true,
    });
    document.addEventListener('pointerup', pointerUpHandler, {once: true});
  }

  private _calcStartColumn() {
    return `
      clamp(
        0%, 
        calc(${this.position}% - ${DIVIDER_COLUM} / 2), 
        calc(100% - ${DIVIDER_COLUM})
      )
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsSplitPanel;
  }
}
