import {css} from 'lit';

export default css`
  :host {
    --track-size: 2px;
    --track-color: var(--ds-color-neutral-200);
    --active-color: var(--ds-color-primary-600);

    --panel-spacing: var(--ds-spacing-medium) 0;
    --tab-spacing: var(--ds-spacing-medium) var(--ds-spacing-large);

    display: block;
  }

  .tab-group {
    display: flex;
  }

  .tab-group__list {
    position: relative;
  }

  .tab-group__active-indicator {
    position: absolute;
    inset-inline-start: 0;
    height: var(--track-size);
    background-color: var(--active-color);

    transition: translate var(--ds-transition-fast) ease,
      width var(--ds-transition-fast) ease;
  }

  /** Start */
  .tab-group--start {
    flex-direction: column;
  }

  .tab-group--start .tab-group__list {
    border-bottom: var(--track-size) solid var(--track-color);
  }

  .tab-group--start .tab-group__active-indicator {
    inset-block-start: 100%;
  }

  /** End */
  .tab-group--end {
    flex-direction: column-reverse;
  }

  .tab-group--end .tab-group__list {
    border-top: var(--track-size) solid var(--track-color);
  }

  .tab-group--end .tab-group__active-indicator {
    inset-block-end: 100%;
  }
`;
