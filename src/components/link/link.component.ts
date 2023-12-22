import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import DsBaseButton from '../../internals/base-button/index.component';

const ELEMENT_NAME = 'ds-link';

@customElement(ELEMENT_NAME)
export default class DsLink extends DsBaseButton {
  /** The link address to attach to the anchor tag */
  @property()
  href = '';

  /** The target to open the appointed link address into */
  @property()
  target: '_blank' | '_self' | '_parent' | '_top' = '_self';

  /** The name as which to download the link address */
  @property()
  download?: string;

  @property()
  rel?: string;

  render() {
    return html`
      <a
        part="base"
        class=${classMap(this.classNames)}
        href=${this.href}
        target=${this.target}
        rel=${ifDefined(this.rel)}
        download=${ifDefined(this.download)}
        tabindex=${this.disabled ? -1 : 0}
        aria-disabled=${this.disabled}
      >
        ${this.slots}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsLink;
  }
}
