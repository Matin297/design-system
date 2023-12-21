import {css} from 'lit';

import defaultStyles from './default.styles';
import primaryStyles from './primary.styles';
import successStyles from './success.styles';
import neutralStyles from './neutral.styles';
import warningStyles from './warning.styles';
import dangerStyles from './danger.styles';
import sizeStyles from './size.styles';

export default css`
  :host {
    display: inline-block;
  }

  .button {
    cursor: pointer;
    user-select: none;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-style: solid;
    border-width: var(--ds-input-border-width);
    font-family: var(--ds-input-font-family);
    font-weight: var(--ds-font-weight-semibold);
    transition: color var(--ds-transition-x-fast),
      border-color var(--ds-transition-x-fast),
      background-color var(--ds-transition-x-fast);
  }

  .button:focus-visible {
    outline: var(--ds-focus-ring);
    outline-offset: var(--ds-focus-ring-offset);
  }

  .button__prefix,
  .button__label,
  .button__suffix {
    display: flex;
  }

  /** Disabled */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :host([disabled]) * {
    pointer-events: none;
  }

  /** Default */
  ${defaultStyles}

  /** Primary */
  ${primaryStyles}

  /** Success */
  ${successStyles}

  /** Neutral */
  ${neutralStyles}

  /** Warning */
  ${warningStyles}

  /** Danger */
  ${dangerStyles}

  /** Sizes */
  ${sizeStyles}

  /** Prefix */
  .button--prefixed.button--small,
  .button--prefixed.button--small .button__label {
    padding-inline-start: var(--ds-spacing-x-small);
  }

  .button--prefixed.button--medium,
  .button--prefixed.button--medium .button__label,
  .button--prefixed.button--large,
  .button--prefixed.button--large .button__label {
    padding-inline-start: var(--ds-spacing-small);
  }

  /** Suffix */
  .button--suffixed.button--small,
  .button--suffixed.button--small .button__label {
    padding-inline-end: var(--ds-spacing-x-small);
  }

  .button--suffixed.button--medium,
  .button--suffixed.button--medium .button__label,
  .button--suffixed.button--large,
  .button--suffixed.button--large .button__label {
    padding-inline-end: var(--ds-spacing-small);
  }

  /** Pill */
  .button--pill.button--small {
    border-radius: var(--ds-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--ds-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--ds-input-height-large);
  }

  /** Circle */
  .button--circle {
    border-radius: 50%;
  }

  .button--circle.button--small {
    width: var(--ds-input-height-small);
  }

  .button--circle.button--medium {
    width: var(--ds-input-height-medium);
  }

  .button--circle.button--large {
    width: var(--ds-input-height-large);
  }

  /** Outlined */
  .button--outline {
    background: none;
  }

  /** Text */
  .button--text {
    background: none;
    border: none;
  }
`;
