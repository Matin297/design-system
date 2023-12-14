import {html} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {customElement, property} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';

const ELEMENT_NAME = 'ds-details';

@customElement(ELEMENT_NAME)
export default class DsDetails extends BaseElement {
  static styles = [BaseElement.styles];

  /**
   * The summary text to show in header part.
   * If needed to display HTML instead use the summary slot.
   */
  @property()
  summary = '';

  /**
   * Indicates whether or not the details is open.
   * you can toggle this attribute to toggle details content
   */
  @property({type: Boolean, reflect: true})
  open = false;

  /** Disables the details so it can't be toggles anymore. */
  @property({type: Boolean, reflect: true})
  disabled = false;

  render() {
    return html`
      <details
        part="base"
        class=${classMap({
          details: true,
          'details--open': this.open,
          'details--disabled': this.disabled,
        })}
      >
        <summary part="header" class="details__header">
          <slot part="summary" name="summary">${this.summary}</slot>

          <span part="icon" class="details__icon">
            <slot name="expand-icon">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </slot>
            <slot name="collapse-icon">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </slot>
          </span>
        </summary>

        <slot part="content" class="details__content"></slot>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsDetails;
  }
}
