import {css} from 'lit';

export default css`
  :host {
    display: inline-block;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    white-space: nowrap;
    border-style: solid;
    border-width: var(--ds-input-border-width);
    font-family: var(--ds-input-font-family);
    font-weight: var(--ds-font-weight-semibold);
    transition: color var(--ds-transition-x-fast),
      border-color var(--ds-transition-x-fast),
      background-color var(--ds-transition-x-fast);
  }

  /** Default */
  .button--default {
    color: var(--ds-color-neutral-700);
    border-color: var(--ds-color-neutral-300);
    background-color: var(--ds-color-neutral-0);
  }

  .button--default:not(:disabled):hover {
    color: var(--ds-color-primary-700);
    border-color: var(--ds-color-primary-300);
    background-color: var(--ds-color-primary-50);
  }

  .button--default.button--outline:not(:disabled):hover {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-primary-600);
    background-color: var(--ds-color-primary-600);
  }

  .button--default.button--text:not(:disabled):hover {
    background: none;
    color: var(--ds-color-primary-500);
  }

  .button--default:not(:disabled):active {
    border-color: var(--ds-color-primary-400);
    background-color: var(--ds-color-primary-100);
  }

  .button--default.button--outline:not(:disabled):active {
    border-color: var(--ds-color-primary-700);
    background-color: var(--ds-color-primary-700);
  }

  .button--default.button--text:not(:disabled):active {
    color: var(--ds-color-primary-700);
  }

  /** Primary */
  .button--primary {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-primary-600);
    background-color: var(--ds-color-primary-600);
  }

  .button--primary.button--outline,
  .button--primary.button--text {
    color: var(--ds-color-primary-600);
  }

  .button--primary:not(:disabled):hover {
    border-color: var(--ds-color-primary-500);
    background-color: var(--ds-color-primary-500);
  }

  .button--primary.button--outline:not(:disabled):hover {
    color: var(--ds-color-neutral-0);
    background-color: var(--ds-color-primary-600);
  }

  .button--primary.button--text:not(:disabled):hover {
    background: none;
    color: var(--ds-color-primary-500);
  }

  .button--primary:not(:disabled):active {
    border-color: var(--ds-color-primary-600);
    background-color: var(--ds-color-primary-600);
  }

  .button--primary.button--outline:not(:disabled):active {
    border-color: var(--ds-color-primary-700);
    background-color: var(--ds-color-primary-700);
  }

  .button--primary.button--text:not(:disabled):active {
    color: var(--ds-color-primary-700);
  }

  /** Success */
  .button--success {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-success-600);
    background-color: var(--ds-color-success-600);
  }

  .button--success.button--outline,
  .button--success.button--text {
    color: var(--ds-color-success-600);
  }

  .button--success:not(:disabled):hover {
    border-color: var(--ds-color-success-500);
    background-color: var(--ds-color-success-500);
  }

  .button--success.button--outline:not(:disabled):hover {
    color: var(--ds-color-neutral-0);
    background-color: var(--ds-color-success-600);
  }

  .button--success.button--text:not(:disabled):hover {
    background: none;
    color: var(--ds-color-success-500);
  }

  .button--success:not(:disabled):active {
    border-color: var(--ds-color-success-600);
    background-color: var(--ds-color-success-600);
  }

  .button--success.button--outline:not(:disabled):active {
    border-color: var(--ds-color-success-700);
    background-color: var(--ds-color-success-700);
  }

  .button--success.button--text:not(:disabled):active {
    color: var(--ds-color-success-700);
  }

  /** Neutral */
  .button--neutral {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-neutral-600);
    background-color: var(--ds-color-neutral-600);
  }

  .button--neutral.button--outline,
  .button--neutral.button--text {
    color: var(--ds-color-neutral-600);
  }

  .button--neutral:not(:disabled):hover {
    border-color: var(--ds-color-neutral-500);
    background-color: var(--ds-color-neutral-500);
  }

  .button--neutral.button--outline:not(:disabled):hover {
    color: var(--ds-color-neutral-0);
    background-color: var(--ds-color-neutral-600);
  }

  .button--neutral.button--text:not(:disabled):hover {
    background: none;
    color: var(--ds-color-neutral-500);
  }

  .button--neutral:not(:disabled):active {
    border-color: var(--ds-color-neutral-600);
    background-color: var(--ds-color-neutral-600);
  }

  .button--neutral.button--outline:not(:disabled):active {
    border-color: var(--ds-color-neutral-700);
    background-color: var(--ds-color-neutral-700);
  }

  .button--neutral.button--text:not(:disabled):active {
    color: var(--ds-color-neutral-700);
  }

  /** Warning */
  .button--warning {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-warning-600);
    background-color: var(--ds-color-warning-600);
  }

  .button--warning.button--outline,
  .button--warning.button--text {
    color: var(--ds-color-warning-600);
  }

  .button--warning:not(:disabled):hover {
    border-color: var(--ds-color-warning-500);
    background-color: var(--ds-color-warning-500);
  }

  .button--warning.button--outline:not(:disabled):hover {
    color: var(--ds-color-neutral-0);
    background-color: var(--ds-color-warning-600);
  }

  .button--warning.button--text:not(:disabled):hover {
    background: none;
    color: var(--ds-color-warning-500);
  }

  .button--warning:not(:disabled):active {
    border-color: var(--ds-color-warning-600);
    background-color: var(--ds-color-warning-600);
  }

  .button--warning.button--outline:not(:disabled):active {
    border-color: var(--ds-color-warning-700);
    background-color: var(--ds-color-warning-700);
  }

  .button--warning.button--text:not(:disabled):active {
    color: var(--ds-color-warning-700);
  }

  /** Danger */
  .button--danger {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-danger-600);
    background-color: var(--ds-color-danger-600);
  }

  .button--danger.button--outline,
  .button--danger.button--text {
    color: var(--ds-color-danger-600);
  }

  .button--danger:not(:disabled):hover {
    border-color: var(--ds-color-danger-500);
    background-color: var(--ds-color-danger-500);
  }

  .button--danger.button--outline:not(:disabled):hover {
    color: var(--ds-color-neutral-0);
    background-color: var(--ds-color-danger-600);
  }

  .button--danger.button--text:not(:disabled):hover {
    background: none;
    color: var(--ds-color-danger-500);
  }

  .button--danger:not(:disabled):active {
    border-color: var(--ds-color-danger-600);
    background-color: var(--ds-color-danger-600);
  }

  .button--danger.button--outline:not(:disabled):active {
    border-color: var(--ds-color-danger-700);
    background-color: var(--ds-color-danger-700);
  }

  .button--danger.button--text:not(:disabled):active {
    color: var(--ds-color-danger-700);
  }

  /** Small */
  .button--small {
    min-height: var(--ds-input-height-small);
    font-size: var(--ds-button-font-size-small);
    border-radius: var(--ds-input-border-radius-small);
  }

  /** Medium */
  .button--medium {
    min-height: var(--ds-input-height-medium);
    font-size: var(--ds-button-font-size-medium);
    border-radius: var(--ds-input-border-radius-medium);
  }

  /** Large */
  .button--large {
    min-height: var(--ds-input-height-large);
    font-size: var(--ds-button-font-size-large);
    border-radius: var(--ds-input-border-radius-large);
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

  /** Disabled */
  .button--disabled * {
    pointer-events: none;
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
