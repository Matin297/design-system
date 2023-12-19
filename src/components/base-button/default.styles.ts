import {css} from 'lit';

export default css`
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
`;
