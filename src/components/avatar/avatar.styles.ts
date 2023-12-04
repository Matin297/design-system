import {css} from 'lit';

export default css`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    width: var(--size);
    height: var(--size);
    font-size: calc(var(--size) * 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: silver;
    overflow: hidden;
  }

  .avatar--circle {
    border-radius: 50%;
  }

  .avatar--rounded {
    border-radius: 4px;
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
