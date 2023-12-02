import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BaseElement} from '../../internals/base-element';
import styles from './avatar.styles';

const ELEMENT_NAME = 'ds-avatar';

@customElement(ELEMENT_NAME)
export default class DsAvatar extends BaseElement {
  static styles = [BaseElement.styles, styles];

  /** A label to use to describe avatar to assistive devices */
  @property()
  label = '';

  /** The image source to use for avatar */
  @property()
  image = '';

  /** Indicates how the browser should load the image */
  @property()
  loading: 'eager' | 'lazy' = 'eager';

  /** The shape of the avatar */
  @property()
  shape: 'circle' | 'square' | 'rounded' = 'circle';

  render() {
    const avatarWithImage = html`
      <img
        class="avatar__image"
        part="image"
        src=${this.image}
        loading=${this.loading}
        alt=""
      />
    `;

    const avatarWithoutImage = html`
      <slot name="icon">
        <ion-icon name="person-circle"></ion-icon>
      </slot>
    `;

    return html`
      <div
        part="base"
        class=${classMap({
          avatar: true,
          'avatar--circle': this.shape === 'circle',
          'avatar--square': this.shape === 'square',
          'avatar--rounded': this.shape === 'rounded',
        })}
        role="img"
        aria-label=${this.label}
      >
        ${this.image ? avatarWithImage : avatarWithoutImage}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsAvatar;
  }
}
