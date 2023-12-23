export type DsFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ds-focus': DsFocusEvent;
  }
}
