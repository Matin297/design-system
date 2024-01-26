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

  .tab:enabled:hover,
  .tab--active:enabled {
    color: var(--active-color);
  }

  .tab:enabled:focus-visible {
    outline: var(--ds-focus-ring);
    outline-offset: calc(
      -1 * var(--ds-focus-ring-width) - var(--ds-focus-ring-offset)
    );
  }
`;
