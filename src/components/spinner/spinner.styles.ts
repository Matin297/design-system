import {css} from 'lit';

export default css`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--ds-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    width: 100%;
    height: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    fill: none;
    stroke-width: var(--track-width);
  }

  .spinner__track {
    stroke: var(--track-color);
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    animation: spin var(--speed) linear infinite;
    transform-origin: center;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`;
