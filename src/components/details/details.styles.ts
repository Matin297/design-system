import {css} from 'lit';

export default css`
  .details {
    border: solid 1px var(--ds-color-neutral-200);
    border-radius: var(--ds-border-radius-medium);
    user-select: none;
  }

  .details__header,
  .details__content {
    padding: var(--ds-spacing-medium);
  }

  .details__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus-visible {
    outline: var(--ds-focus-ring);
    outline-offset: calc(1px + var(--ds-focus-ring-offset));
  }

  .details__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: rotate var(--ds-transition-medium) ease;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
  }

  /** Open */
  .details[open] slot[name='expand-icon'],
  .details:not([open]) slot[name='collapse-icon'] {
    display: none;
  }

  .details[open] .details__icon {
    rotate: 90deg;
  }

  .details[open] .details__body {
    height: auto;
  }

  .details:not([open]) .details__body {
    height: 0;
  }

  /** Disabled */
  .details--disabled {
    opacity: 0.5;
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
  }
`;
