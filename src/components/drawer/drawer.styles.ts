import {css} from 'lit';
import backdropStyles from './styles/backdrop';
import inlineStyles from './styles/inline';
import blockStyles from './styles/block';

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
    z-index: var(--ds-z-index-drawer);
    box-shadow: var(--ds-shadow-large);
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

  /** Backdrop */
  ${backdropStyles}

  /** Inline */
  ${inlineStyles}

  /** Block */
  ${blockStyles}
`;
