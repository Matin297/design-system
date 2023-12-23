export type DsHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-hide': DsHideEvent;
  }
}
