import {css} from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  .checkbox {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--ds-input-font-family);
    font-weight: var(--ds-input-font-weight);
    color: var(--ds-input-label-color);
  }

  .checkbox__input {
    margin: 0;
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }

  .checkbox__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--control-size);
    height: var(--control-size);
    border: var(--ds-input-border-width) solid var(--ds-input-border-color);
    border-radius: 2px;
    color: var(--ds-color-neutral-0);
    background-color: var(--ds-input-background-color);
  }

  :host(:not([disabled])) .checkbox__control:hover {
    border-color: var(--ds-input-border-color-hover);
  }

  .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--ds-focus-ring);
    outline-offset: var(--ds-focus-ring-offset);
  }

  .checkbox__label {
    display: inline-block;
    line-height: var(--control-size);
    margin-inline-start: 0.5em;
    user-select: none;
  }

  /** Disabled */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /** Required */
  :host([required]) .checkbox__label::after {
    content: var(--ds-input-required-content);
    margin-inline-start: 4px;
  }

  /** Sizes */
  .checkbox--small {
    --control-size: var(--ds-toggle-size-small);
    font-size: var(--ds-input-font-size-small);
  }

  .checkbox--medium {
    --control-size: var(--ds-toggle-size-medium);
    font-size: var(--ds-input-font-size-medium);
  }

  .checkbox--large {
    --control-size: var(--ds-toggle-size-large);
    font-size: var(--ds-input-font-size-large);
  }

  /** Checked - Indeterminate */
  :host([checked]) .checkbox__control,
  :host([indeterminate]) .checkbox__control {
    border-color: var(--ds-color-primary-600);
    background-color: var(--ds-color-primary-600);
  }

  :host([checked]):host(:not([disabled])) .checkbox__control:hover,
  :host([indeterminate]):host(:not([disabled])) .checkbox__control:hover {
    border-color: var(--ds-color-primary-500);
    background-color: var(--ds-color-primary-500);
  }
`;
