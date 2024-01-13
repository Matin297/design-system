import {css} from 'lit';

export default css`
  :host {
    --percent: 0;
    --proportion: 0;
    --thumb-size: 20px;
    --track-height: 6px;
    --tooltip-offset: 3px;
    --track-color: var(--ds-color-neutral-200);
    --track-fill-color: var(--ds-color-primary-600);

    display: block;
  }

  .range__label {
    color: var(--ds-input-label-color);
    font-size: var(--ds-input-label-font-size-medium);
  }

  .range__helper-text {
    color: var(--ds-input-help-text-color);
    font-size: var(--ds-input-help-text-font-size-medium);
  }

  .range__control {
    display: flex;
    position: relative;
    margin: calc(var(--thumb-size) / 2 + var(--ds-spacing-3x-small)) 0;
  }

  .range__input {
    -webkit-appearance: none;

    margin: 0;
    width: 100%;
    position: relative;
  }

  .range__input:focus {
    outline: none;
  }

  .range__input:disabled {
    opacity: 0.5;
  }

  .range__input:enabled:active + .range__tooltip,
  .range__input:enabled:focus + .range__tooltip {
    opacity: 1;
  }

  /** Tooltip */
  .range__tooltip {
    position: absolute;

    color: var(--ds-tooltip-color);
    z-index: var(--ds-z-index-tooltip);
    padding: var(--ds-tooltip-padding);
    font-size: var(--ds-tooltip-font-size);
    font-family: var(--ds-tooltip-font-family);
    font-weight: var(--ds-tooltip-font-weight);
    border-radius: var(--ds-tooltip-border-radius);
    background-color: var(--ds-tooltip-background-color);

    translate: calc(-50% + var(--thumb-size) / 2);
    inset-inline-start: calc(
      var(--percent) - var(--proportion) * var(--thumb-size)
    );

    opacity: 0;
    transition: opacity var(--ds-transition-medium) ease-in-out;
  }

  .range__tooltip::after {
    content: '';
    position: absolute;
    inset-inline-start: 50%;
    translate: calc(var(--ds-tooltip-arrow-size) * -1);
    border: var(--ds-tooltip-arrow-size) solid
      var(--ds-tooltip-background-color);
    border-left-color: transparent;
    border-right-color: transparent;
  }

  /** Top Placement */
  .range__tooltip--top {
    bottom: calc(var(--thumb-size) + var(--tooltip-offset));
  }

  .range__tooltip--top::after {
    inset-block-start: 100%;
    border-bottom-color: transparent;
  }

  /** Bottom PLacement */
  .range__tooltip--bottom {
    top: calc(var(--thumb-size) + var(--tooltip-offset));
  }

  .range__tooltip--bottom::after {
    inset-block-end: 100%;
    border-top-color: transparent;
  }

  /** Fill */
  .range__input::before {
    content: '';
    height: 100%;
    position: absolute;
    border-radius: 3px;
    width: var(--percent);
    background-color: var(--track-fill-color);
  }

  /** Track (Webkit) */
  .range__input::-webkit-slider-runnable-track {
    border-radius: 3px;
    height: var(--track-height);
    background-color: var(--track-color);
  }

  /** Thumb (Webkit) */
  .range__input::-webkit-slider-thumb {
    -webkit-appearance: none;

    cursor: pointer;
    border-radius: 50%;
    position: relative;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--ds-color-primary-600);
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    z-index: 1;
  }

  .range__input:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--ds-focus-ring);
    outline-offset: var(--ds-focus-ring-offset);
  }

  .range__input:enabled::-webkit-slider-thumb:hover {
    background-color: var(--ds-color-primary-700);
  }

  .range__input:enabled::-webkit-slider-thumb:active {
    cursor: grabbing;
    background-color: var(--ds-color-primary-500);
  }

  .range__input:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }
`;
