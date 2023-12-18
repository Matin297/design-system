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

  .button--default:not(:disabled):active {
    border-color: var(--ds-color-primary-400);
    background-color: var(--ds-color-primary-100);
  }

  .button--default.button--outline:not(:disabled):active {
    border-color: var(--ds-color-primary-700);
    background-color: var(--ds-color-primary-700);
  }

  /** Primary */
  .button--primary {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-primary-600);
    background-color: var(--ds-color-primary-600);
  }

  .button--primary.button--outline {
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

  .button--primary:not(:disabled):active {
    border-color: var(--ds-color-primary-600);
    background-color: var(--ds-color-primary-600);
  }

  .button--primary.button--outline:not(:disabled):active {
    border-color: var(--ds-color-primary-700);
    background-color: var(--ds-color-primary-700);
  }

  /** Success */
  .button--success {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-success-600);
    background-color: var(--ds-color-success-600);
  }

  .button--success.button--outline {
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

  .button--success:not(:disabled):active {
    border-color: var(--ds-color-success-600);
    background-color: var(--ds-color-success-600);
  }

  .button--success.button--outline:not(:disabled):active {
    border-color: var(--ds-color-success-700);
    background-color: var(--ds-color-success-700);
  }

  /** Neutral */
  .button--neutral {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-neutral-600);
    background-color: var(--ds-color-neutral-600);
  }

  .button--neutral.button--outline {
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

  .button--neutral:not(:disabled):active {
    border-color: var(--ds-color-neutral-600);
    background-color: var(--ds-color-neutral-600);
  }

  .button--neutral.button--outline:not(:disabled):active {
    border-color: var(--ds-color-neutral-700);
    background-color: var(--ds-color-neutral-700);
  }

  /** Warning */
  .button--warning {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-warning-600);
    background-color: var(--ds-color-warning-600);
  }

  .button--warning.button--outline {
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

  .button--warning:not(:disabled):active {
    border-color: var(--ds-color-warning-600);
    background-color: var(--ds-color-warning-600);
  }

  .button--warning.button--outline:not(:disabled):active {
    border-color: var(--ds-color-warning-700);
    background-color: var(--ds-color-warning-700);
  }

  /** Danger */
  .button--danger {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-danger-600);
    background-color: var(--ds-color-danger-600);
  }

  .button--danger.button--outline {
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

  .button--danger:not(:disabled):active {
    border-color: var(--ds-color-danger-600);
    background-color: var(--ds-color-danger-600);
  }

  .button--danger.button--outline:not(:disabled):active {
    border-color: var(--ds-color-danger-700);
    background-color: var(--ds-color-danger-700);
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
`;
