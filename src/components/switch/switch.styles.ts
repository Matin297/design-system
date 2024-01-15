/**
 * This component is heavily inspired by the link below:
 * @see https://web.dev/articles/building/a-switch-component
 */

import {css} from 'lit';

export default css`
  :host {
    --thumb-size: 20px;
    --thumb-color: var(--ds-color-neutral-0);

    --track-padding: 2px;
    --track-size: calc(var(--thumb-size) * 2);
    --track-active-color: var(--ds-color-primary-600);
    --track-inactive-color: var(--ds-color-neutral-400);

    display: inline-block;
  }

  .switch {
    gap: 1rem;
    display: flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: space-between;
  }

  .switch__input {
    --thumb-position: 0%;

    border: none;
    display: grid;
    flex-shrink: 0;
    cursor: pointer;
    appearance: none;
    box-sizing: content-box;

    border-radius: var(--track-size);
    padding: var(--track-padding);
    block-size: var(--thumb-size);
    inline-size: var(--track-size);

    background-color: var(--track-inactive-color);
    transition: background-color var(--ds-transition-fast) ease;
  }

  .switch__input:checked {
    --thumb-position: calc(var(--track-size) - 100%);
    background-color: var(--track-active-color);
  }

  .switch__input:indeterminate {
    --thumb-position: calc(var(--track-size) / 2 - 50%);
  }

  .switch__input::before {
    content: '';
    border-radius: 50%;

    inline-size: var(--thumb-size);
    block-size: var(--thumb-size);
    background-color: var(--thumb-color);

    transform: translateX(var(--thumb-position));
    transition: transform var(--ds-transition-fast) ease;
  }
`;
