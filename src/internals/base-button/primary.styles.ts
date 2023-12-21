import {css} from 'lit';

export default css`
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
`;
