import {html} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {customElement, property, query} from 'lit/decorators.js';
import {BaseElement} from '../../internals/base-element';
import {setAnimation, getAnimation} from '../../utilities/animation-registry';
import {
  stopAnimations,
  performAnimation,
  shimKeyframesAutoHeight,
} from '../../internals/animation';
import styles from './details.styles';

const ELEMENT_NAME = 'ds-details';
const DETAILS_SHOW = 'details.show';
const DETAILS_HIDE = 'details.hide';

@customElement(ELEMENT_NAME)
export default class DsDetails extends BaseElement {
  static styles = [BaseElement.styles, styles];

  @query('.details__body')
  body: HTMLDivElement;

  /**
   * The summary text to show in header part.
   * If needed to display HTML instead use the summary slot.
   */
  @property()
  summary = '';

  /**
   * Indicates whether or not details is open.
   * you can toggle this attribute using show()/hide() methods
   */
  @property({type: Boolean, reflect: true})
  open = false;

  /** Disables the details so it can't be toggles anymore. */
  @property({type: Boolean, reflect: true})
  disabled = false;

  private toggleDetailsHandler(event: MouseEvent) {
    event.preventDefault();

    if (this.disabled) return;

    if (this.open) {
      return this.hide();
    }

    return this.show();
  }

  private async animateBodyContent(animationName: string) {
    await stopAnimations(this.body);
    const {keyframes, options} = getAnimation(animationName);
    await performAnimation(
      this.body,
      shimKeyframesAutoHeight(keyframes, this.body.scrollHeight),
      options
    );
  }

  async hide() {
    if (this.disabled || !this.open) return;

    const dsHideEvent = this.generateEvent('ds-hide', {cancelable: true});
    this.dispatchEvent(dsHideEvent);

    // Keep it open if event is prevented
    if (dsHideEvent.defaultPrevented) {
      this.open = true;
      return;
    }

    await this.animateBodyContent(DETAILS_HIDE);

    this.open = false;

    const dsHideFinishEvent = this.generateEvent('ds-hide-finish');
    this.dispatchEvent(dsHideFinishEvent);
  }

  async show() {
    if (this.disabled || this.open) return;

    const dsShowEvent = this.generateEvent('ds-show', {cancelable: true});
    this.dispatchEvent(dsShowEvent);

    // Keep it closed if event is prevented
    if (dsShowEvent.defaultPrevented) {
      this.open = false;
      return;
    }

    this.open = true;

    await this.animateBodyContent(DETAILS_SHOW);

    const dsShowFinishEvent = this.generateEvent('ds-show-finish');
    this.dispatchEvent(dsShowFinishEvent);
  }

  render() {
    return html`
      <details
        part="base"
        class=${classMap({
          details: true,
          'details--disabled': this.disabled,
        })}
        ?open=${this.open}
      >
        <summary
          part="header"
          class="details__header"
          @click=${this.toggleDetailsHandler}
        >
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

        <div class="details__body">
          <slot part="content" class="details__content"></slot>
        </div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: DsDetails;
  }
}

setAnimation(DETAILS_SHOW, {
  keyframes: [
    {height: '0', opacity: '0'},
    {height: 'auto', opacity: '1'},
  ],
  options: {
    duration: 250,
    easing: 'linear',
  },
});

setAnimation(DETAILS_HIDE, {
  keyframes: [
    {height: 'auto', opacity: '1'},
    {height: '0', opacity: '0'},
  ],
  options: {
    duration: 250,
    easing: 'linear',
  },
});
