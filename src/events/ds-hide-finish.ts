export type DsHideFinishEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-hide-finish': DsHideFinishEvent;
  }
}
