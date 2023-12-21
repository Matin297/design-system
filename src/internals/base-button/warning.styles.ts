import {css} from 'lit';

export default css`
  .button--warning.button--fill {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-warning-600);
    background-color: var(--ds-color-warning-600);
  }

  .button--warning.button--outline,
  .button--warning.button--text {
    color: var(--ds-color-warning-600);
  }

  .button--warning.button--fill:not(:disabled):hover {
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

  .button--warning.button--fill:not(:disabled):active {
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
`;
