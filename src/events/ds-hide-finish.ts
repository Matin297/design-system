export type DsHideFinishEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-hide-finish': DsHideFinishEvent;
  }
}
