import {css} from 'lit';

export default css`
  /** Small */
  .button--small {
    min-height: var(--ds-input-height-small);
    font-size: var(--ds-button-font-size-small);
    border-radius: var(--ds-input-border-radius-small);
  }

  .button--small .button__label {
    padding: 0 var(--ds-spacing-small);
  }

  /** Medium */
  .button--medium {
    min-height: var(--ds-input-height-medium);
    font-size: var(--ds-button-font-size-medium);
    border-radius: var(--ds-input-border-radius-medium);
  }

  .button--medium .button__label {
    padding: 0 var(--ds-spacing-medium);
  }

  /** Large */
  .button--large {
    min-height: var(--ds-input-height-large);
    font-size: var(--ds-button-font-size-large);
    border-radius: var(--ds-input-border-radius-large);
  }

  .button--large .button__label {
    padding: 0 var(--ds-spacing-large);
  }
`;
