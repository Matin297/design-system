export type DsBlurEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-blur': DsBlurEvent;
  }
}
