import {css} from 'lit';

export default css`
  :host {
    --border-width: 1px;
    --border-color: var(--ds-color-neutral-200);
    --border-radius: var(--ds-border-radius-medium);
    --padding: var(--ds-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--ds-panel-background-color);
    box-shadow: var(--ds-shadow-x-small);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius);
  }

  .card:not(.card--with-image) .card__image,
  .card:not(.card--with-header) .card__header,
  .card:not(.card--with-body) .card__body,
  .card:not(.card--with-footer) .card__footer {
    display: none;
  }

  .card__header,
  .card__body,
  .card__footer {
    display: block;
    padding: var(--padding);
  }

  .card__image::slotted(img) {
    width: 100%;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__header {
    border-bottom: var(--border-width) solid var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card__footer {
    border-top: var(--border-width) solid var(--border-color);
  }
`;
