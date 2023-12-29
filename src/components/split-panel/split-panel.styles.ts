import {css} from 'lit';

export default css`
  :host {
    --min: 0%;
    --divider-width: 10px;
    --max: calc(100% - var(--divider-width));

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

  /** Vertical */
  :host([vertical]) .divider {
    cursor: row-resize;
  }
`;
