import {css} from 'lit';

export default css`
  :host {
    --percent: 0;
    --thumb-size: 20px;
    --track-height: 6px;
    --track-color: var(--ds-color-neutral-200);
    --track-fill-color: var(--ds-color-primary-600);

    display: block;
  }

  .range__control {
    position: relative;
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
