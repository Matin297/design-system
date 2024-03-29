import {css} from 'lit';

export default css`
  :host {
    display: inline-block;
  }

  .tab {
    border: none;
    cursor: pointer;
    white-space: nowrap;
    background-color: transparent;

    font-family: var(--ds-font-sans);
    color: var(--ds-color-neutral-600);
    font-size: var(--ds-font-size-small);
    font-weight: var(--ds-font-weight-semibold);

    padding: var(--tab-spacing);
    border-radius: var(--ds-border-radius-medium);
  }

  .tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab:not(.tab--disabled):hover,
  .tab--active:not(.tab--disabled) {
    color: var(--active-color);
  }

  .tab:not(.tab--disabled):focus-visible {
    outline: var(--ds-focus-ring);
    outline-offset: calc(
      -1 * var(--ds-focus-ring-width) - var(--ds-focus-ring-offset)
    );
  }
`;
