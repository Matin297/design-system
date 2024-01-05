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

  /** Inline */
  .drawer--inline {
    height: 100%;
    width: var(--size);
    inset-block: 0;
  }

  .drawer--inline.drawer--end {
    inset-inline-end: 0;
    inset-inline-start: initial;
  }

  .drawer--inline.drawer--start {
    inset-inline-start: 0;
    inset-inline-end: initial;
  }

  /** Block */
  .drawer--block {
    width: 100%;
    height: var(--size);
    inset-inline: 0;
  }

  .drawer--block.drawer--end {
    inset-block-end: 0;
    inset-block-start: initial;
  }

  .drawer--block.drawer--start {
    inset-block-start: 0;
    inset-block-end: initial;
  }
`;
