import {css} from 'lit';

export default css`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    width: var(--size);
    height: var(--size);
    font-family: var(--ds-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--ds-font-weight-normal);
    color: var(--ds-color-neutral-0);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--ds-color-neutral-400);
  }

  .avatar--circle {
    border-radius: var(--ds-border-radius-circle);
  }

  .avatar--rounded {
    border-radius: var(--ds-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }
`;
