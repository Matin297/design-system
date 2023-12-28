import {html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import {clamp, toPercent} from '../../utilities/math';
import styles from './split-panel.styles';

const ELEMENT_NAME = 'ds-split-panel';
const DIVIDER_SPACE = 'var(--divider-width)';
const END_PANEL_SPACE = 'auto';

@customElement(ELEMENT_NAME)
export default class DsSplitPanel extends BaseElement {
  static styles = [BaseElement.styles, styles];

  /** The current position of the divider from the start in percentage */
  @property({reflect: true, type: Number})
  position = 50;

  /** Disables resizing through the divider */
  @property({type: Boolean, reflect: true})
  disabled = false;

  /** Renders split panel in a vertical orientation with start and end panels stacked */
  @property({type: Boolean, reflect: true})
  vertical = false;

  willUpdate(changedProps: PropertyValues<this>) {
    // Whenever position changes update the template columns on host
    if (changedProps.has('position')) {
      this.style[this._gridTemplateProp] = `
        ${this._calcStartPanelSpace()} 
        ${DIVIDER_SPACE} 
        ${END_PANEL_SPACE}
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

    // Updates position with pointer's coordinates based on orientation
    const pointerMoveHandler = (event: PointerEvent) => {
      const newPositionInPx = this.vertical
        ? event.pageY - hostCoords.top
        : event.pageX - hostCoords.left;

      this.position = clamp(0, toPercent(newPositionInPx, this._hostSize), 100);
    };

    const pointerUpHandler = () => {
      document.removeEventListener('pointermove', pointerMoveHandler);
    };

    document.addEventListener('pointermove', pointerMoveHandler, {
      passive: true,
    });
    document.addEventListener('pointerup', pointerUpHandler, {once: true});
  }

  private _calcStartPanelSpace() {
    return `
      clamp(
        0%, 
        calc(${this.position}% - ${DIVIDER_SPACE} / 2), 
        calc(100% - ${DIVIDER_SPACE})
      )
    `;
  }

  private get _gridTemplateProp() {
    return this.vertical ? 'gridTemplateRows' : 'gridTemplateColumns';
  }

  private get _hostSize() {
    return this.vertical ? this.offsetHeight : this.offsetWidth;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsSplitPanel;
  }
}
