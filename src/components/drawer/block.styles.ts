import {css} from 'lit';

export default css`
  .drawer--block {
    width: 100%;
    height: var(--size);
    inset-inline: 0;
  }

  .drawer--block.drawer--start {
    inset-block-start: 0;
    inset-block-end: initial;
    animation: block-start-slide-out var(--ds-transition-medium);
  }

  .drawer--block.drawer--start[open] {
    animation: block-start-slide-in var(--ds-transition-medium);
  }

  .drawer--block.drawer--end {
    inset-block-end: 0;
    inset-block-start: initial;
    animation: block-end-slide-out var(--ds-transition-medium);
  }

  .drawer--block.drawer--end[open] {
    animation: block-end-slide-in var(--ds-transition-medium);
  }

  /** Block Start Keyframes */
  @keyframes block-start-slide-in {
    from {
      opacity: 0;
      transform: translateY(-100%);
      display: none;
    }

    to {
      opacity: 1;
      transform: translateY(0%);
      display: block;
    }
  }

  @keyframes block-start-slide-out {
    from {
      opacity: 1;
      transform: translateY(0%);
      display: block;
    }

    to {
      opacity: 0;
      transform: translateY(-100%);
      display: none;
    }
  }

  /** Block End Keyframes */
  @keyframes block-end-slide-in {
    from {
      opacity: 0;
      transform: translateY(100%);
      display: none;
    }

    to {
      opacity: 1;
      transform: translateY(0%);
      display: block;
    }
  }

  @keyframes block-end-slide-out {
    from {
      opacity: 1;
      transform: translateY(0%);
      display: block;
    }

    to {
      opacity: 0;
      transform: translateY(100%);
      display: none;
    }
  }
`;
