import {css} from 'lit';

export default css`
  :host {
    --size: 31rem;

    --header-spacing: var(--ds-spacing-large);
    --main-spacing: var(--ds-spacing-large);
    --footer-spacing: var(--ds-spacing-large);
  }

  .dialog,
  .dialog__panel {
    max-width: calc(100vw - var(--ds-spacing-2x-large));
    max-height: calc(100vh - var(--ds-spacing-2x-large));
  }

  .dialog {
    padding: 0;
    border: none;

    width: var(--size);
    border-radius: var(--ds-border-radius-medium);
    box-shadow: var(--ds-shadow-x-large);

    animation: dialog-fade-out var(--ds-transition-medium);
  }

  .dialog[open] {
    animation: dialog-fade-in var(--ds-transition-medium);
  }

  .dialog[open]::backdrop {
    animation: backdrop-fade-in 250ms;
    background-color: hsl(240 3.8% 46.1% / 33%);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
  }

  .dialog__header {
    padding: var(--header-spacing);
  }

  .dialog__main {
    flex: 1 1 auto;
    overflow: auto;
    padding: var(--main-spacing);
  }

  .dialog__footer {
    padding: var(--footer-spacing);
  }

  @keyframes dialog-fade-in {
    from {
      opacity: 0;
      scale: 0.8;
      display: none;
    }

    to {
      opacity: 1;
      scale: 1;
      display: block;
    }
  }

  @keyframes dialog-fade-out {
    from {
      opacity: 1;
      scale: 1;
      display: block;
    }

    to {
      opacity: 0;
      scale: 0.8;
      display: none;
    }
  }

  @keyframes backdrop-fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;
