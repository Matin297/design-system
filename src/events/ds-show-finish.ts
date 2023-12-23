export type DsShowFinishEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-show-finish': DsShowFinishEvent;
  }
}
