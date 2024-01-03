/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#animating_dialogs */

import {css} from 'lit';

export default css`
  :host {
    --size: 25rem;
    --header-spacing: var(--ds-spacing-large);
    --content-spacing: var(--ds-spacing-large);
    --footer-spacing: var(--ds-spacing-large);
  }

  .drawer {
    margin: 0;
    padding: 0;
    border: none;
    max-height: 100%;
    max-width: 100%;

    opacity: 0;
    transition: opacity var(--ds-transition-medium) ease,
      translate var(--ds-transition-medium) ease,
      display var(--ds-transition-medium) ease allow-discrete,
      overlay var(--ds-transition-medium) ease allow-discrete;
  }

  .drawer::backdrop {
    opacity: 0;
    background-color: hsl(240 3.8% 46.1% / 33%);
    transition: opacity 250ms ease, display 250ms ease allow-discrete,
      overlay 250ms ease allow-discrete;
  }

  .drawer[open],
  .drawer[open]::backdrop {
    opacity: 1;
  }

  /** Inline */
  .drawer--inline {
    height: 100%;
    width: var(--size);
  }

  .drawer--inline.drawer--end {
    translate: 100%;
    inset-inline-start: initial;
  }

  .drawer--inline.drawer--start {
    translate: -100%;
    inset-inline-end: initial;
  }

  /** Block */
  .drawer--block {
    width: 100%;
    height: var(--size);
  }

  .drawer--block.drawer--end {
    translate: 0 100%;
    inset-block-start: initial;
  }

  .drawer--block.drawer--start {
    inset-block-end: initial;
  }

  .drawer--inline.drawer--end[open],
  .drawer--inline.drawer--start[open],
  .drawer--block.drawer--start[open],
  .drawer--block.drawer--end[open] {
    translate: 0;
  }

  @starting-style {
    .drawer[open],
    .drawer[open]::backdrop {
      opacity: 0;
    }

    /** Inline */
    .drawer--inline.drawer--end[open] {
      translate: 100%;
    }

    .drawer--inline.drawer--start[open] {
      translate: -100%;
    }

    /** Block */
    .drawer--block.drawer--end[open] {
      translate: 0 100%;
    }

    .drawer--block.drawer--start[open] {
      translate: 0 -100%;
    }
  }

  /** Body */
  .drawer__body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .drawer__header {
    padding: var(--header-spacing);
  }

  .drawer__content {
    flex-grow: 1;
    overflow: auto;
    padding: var(--content-spacing);
  }

  .drawer__footer {
    padding: var(--footer-spacing);
  }
`;
