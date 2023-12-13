export type DsShowFinishEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-show-finish': DsShowFinishEvent;
  }
}
