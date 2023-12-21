import {css} from 'lit';

export default css`
  .button--neutral.button--fill {
    color: var(--ds-color-neutral-0);
    border-color: var(--ds-color-neutral-600);
    background-color: var(--ds-color-neutral-600);
  }

  .button--neutral.button--outline,
  .button--neutral.button--text {
    color: var(--ds-color-neutral-600);
  }

  .button--neutral.button--fill:not(:disabled):hover {
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

  .button--neutral.button--fill:not(:disabled):active {
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
`;
