export type DsShowEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-show': DsShowEvent;
  }
}
