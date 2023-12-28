import {css} from 'lit';

export default css`
  :host {
    --divider-width: 10px;

    display: grid;
    overflow: hidden;
  }

  .divider {
    cursor: col-resize;
    background-color: var(--ds-color-neutral-200);
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--ds-color-primary-600);
  }

  /** Disabled */
  :host([disabled]) .divider {
    cursor: not-allowed;
  }
`;
