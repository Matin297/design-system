import {html} from 'lit';
import type {PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BaseElement} from '../../internals/base-element';
import styles from './avatar.styles';

const ELEMENT_NAME = 'ds-avatar';

@customElement(ELEMENT_NAME)
export default class DsAvatar extends BaseElement {
  static styles = [BaseElement.styles, styles];

  @state()
  private hasError = false;

  /** A label to use to describe avatar to assistive devices */
  @property()
  label = '';

  /** Initials to use as a fallback when no image is available */
  @property()
  initials = '';

  /** The image source to use for avatar */
  @property()
  image = '';

  /** Indicates how the browser should load the image */
  @property()
  loading: 'eager' | 'lazy' = 'eager';

  /** The shape of the avatar */
  @property({reflect: true})
  shape: 'circle' | 'square' | 'rounded' = 'circle';

  willUpdate(changedProps: PropertyValues<this>) {
    if (changedProps.get('image')) {
      this.hasError = false;
    }
  }

  render() {
    const avatarWithImage = html`
      <img
        class="avatar__image"
        part="image"
        src=${this.image}
        loading=${this.loading}
        alt=""
        @error=${this.handleError}
      />
    `;

    let avatarWithoutImage = html`
      <slot name="icon">
        <ion-icon name="person"></ion-icon>
      </slot>
    `;

    if (this.initials) {
      avatarWithoutImage = html`
        <div part="initials" class="avatar__initials">${this.initials}</div>
      `;
    }

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
        ${this.image && !this.hasError ? avatarWithImage : avatarWithoutImage}
      </div>
    `;
  }

  handleError() {
    this.hasError = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsAvatar;
  }
}
