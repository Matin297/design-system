import {css} from 'lit';

export default css`
  :host {
    --track-size: 2px;
    --track-color: var(--ds-color-neutral-200);
    --active-color: var(--ds-color-primary-600);

    --group-spacing: var(--ds-spacing-medium);
    --tab-spacing: var(--ds-spacing-medium) var(--ds-spacing-large);

    display: block;
  }

  .tab-group {
    display: flex;
    gap: var(--group-spacing);
  }

  .tab-group__tab-list {
    display: flex;
    position: relative;
  }

  .tab-group__active-indicator {
    position: absolute;
    background-color: var(--active-color);

    transition: translate var(--ds-transition-fast) ease,
      width var(--ds-transition-fast) ease;
  }

  /** Block */
  :host([direction='block']) .tab-group__tab-list {
    flex-direction: row;
  }

  :host([direction='block']) .tab-group__active-indicator {
    inset-inline-start: 0;
    height: var(--track-size);
  }

  /** Block - Start */
  :host([direction='block']) .tab-group--start {
    flex-direction: column;
  }

  :host([direction='block']) .tab-group--start .tab-group__tab-list {
    border-block-end: var(--track-size) solid var(--track-color);
  }

  :host([direction='block']) .tab-group--start .tab-group__active-indicator {
    inset-block-start: 100%;
  }

  /** Block - End */
  :host([direction='block']) .tab-group--end {
    flex-direction: column-reverse;
  }

  :host([direction='block']) .tab-group--end .tab-group__tab-list {
    border-block-start: var(--track-size) solid var(--track-color);
  }

  :host([direction='block']) .tab-group--end .tab-group__active-indicator {
    inset-block-end: 100%;
  }

  /** Inline */
  :host([direction='inline']) .tab-group__tab-list {
    flex-direction: column;
  }

  :host([direction='inline']) .tab-group__active-indicator {
    inset-block-start: 0;
    width: var(--track-size);
  }

  /** Inline - Start */
  :host([direction='inline']) .tab-group--start {
    flex-direction: row;
  }

  :host([direction='inline']) .tab-group--start .tab-group__tab-list {
    border-inline-end: var(--track-size) solid var(--track-color);
  }

  :host([direction='inline']) .tab-group--start .tab-group__active-indicator {
    inset-inline-start: 100%;
  }

  /** Inline - End */
  :host([direction='inline']) .tab-group--end {
    flex-direction: row-reverse;
  }

  :host([direction='inline']) .tab-group--end .tab-group__tab-list {
    border-inline-start: var(--track-size) solid var(--track-color);
  }

  :host([direction='inline']) .tab-group--end .tab-group__active-indicator {
    inset-inline-end: 100%;
  }
`;
