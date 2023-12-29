import {css} from 'lit';

export default css`
  :host {
    --min: 0%;
    --divider-width: 5px;
    --divider-hit-area: 15px;
    --max: calc(100% - var(--divider-width));

    display: grid;
    overflow: hidden;
  }

  .divider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--ds-color-neutral-900);
    background-color: var(--ds-color-neutral-200);
  }

  .divider::after {
    content: '';
    position: absolute;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--ds-color-primary-600);
  }

  /** Horizontal */
  :host(:not([vertical])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    height: 100%;
    width: var(--divider-hit-area);
  }

  /** Vertical */
  :host([vertical]) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    height: var(--divider-hit-area);
    width: 100%;
  }

  /** Disabled */
  :host([disabled]) .divider {
    cursor: not-allowed;
  }
`;
