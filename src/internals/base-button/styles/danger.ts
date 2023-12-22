import {css} from 'lit';

export default css`
  .button--danger {
    border-color: var(--ds-color-danger-600);
  }

  .button--danger.button--fill {
    color: var(--ds-color-neutral-0);
    background-color: var(--ds-color-danger-600);
  }

  .button--danger.button--outline,
  .button--danger.button--text {
    color: var(--ds-color-danger-600);
  }

  .button--danger.button--fill:not(:disabled):hover {
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

  .button--danger.button--fill:not(:disabled):active {
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
`;
