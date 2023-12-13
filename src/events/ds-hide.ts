export type DsHideEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-hide': DsHideEvent;
  }
}
