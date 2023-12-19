import {css} from 'lit';

export default css`
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
`;
