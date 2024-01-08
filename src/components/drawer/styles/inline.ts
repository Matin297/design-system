import {css} from 'lit';

export default css`
  .drawer--inline {
    height: 100%;
    width: var(--size);
    inset-block: 0;
  }

  .drawer--inline.drawer--start {
    inset-inline-start: 0;
    inset-inline-end: initial;
    animation: inline-start-slide-out var(--ds-transition-medium);
  }

  .drawer--inline.drawer--start[open] {
    animation: inline-start-slide-in var(--ds-transition-medium);
  }

  .drawer--inline.drawer--end {
    inset-inline-end: 0;
    inset-inline-start: initial;
    animation: inline-end-slide-out var(--ds-transition-medium);
  }

  .drawer--inline.drawer--end[open] {
    animation: inline-end-slide-in var(--ds-transition-medium);
  }

  /** Inline Start Keyframes */
  @keyframes inline-start-slide-in {
    from {
      opacity: 0;
      transform: translateX(-100%);
      display: none;
    }

    to {
      opacity: 1;
      transform: translateX(0%);
      display: block;
    }
  }

  @keyframes inline-start-slide-out {
    from {
      opacity: 1;
      transform: translateX(0%);
      display: block;
    }

    to {
      opacity: 0;
      transform: translateX(-100%);
      display: none;
    }
  }

  /** Inline End Keyframes */
  @keyframes inline-end-slide-in {
    from {
      opacity: 0;
      transform: translateX(100%);
      display: none;
    }

    to {
      opacity: 1;
      transform: translateX(0%);
      display: block;
    }
  }

  @keyframes inline-end-slide-out {
    from {
      opacity: 1;
      transform: translateX(0%);
      display: block;
    }

    to {
      opacity: 0;
      transform: translateX(100%);
      display: none;
    }
  }
`;
