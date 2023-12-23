import type {WithRequiredProp} from '../utilities/types';

type DsEventInit<T> = T extends keyof GlobalEventHandlersEventMap
  ? GlobalEventHandlersEventMap[T] extends CustomEvent<
      Record<PropertyKey, unknown>
    >
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<
        Record<PropertyKey, never>
      >
      ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>
      : Partial<
          GlobalEventHandlersEventMap[T]
        > extends GlobalEventHandlersEventMap[T]
      ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>
      : WithRequiredProp<
          CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>,
          'detail'
        >
    : CustomEventInit
  : CustomEventInit;

type DsCustomEvent<T> = T extends keyof GlobalEventHandlersEventMap
  ? GlobalEventHandlersEventMap[T] extends CustomEvent<unknown>
    ? GlobalEventHandlersEventMap[T]
    : CustomEvent<unknown>
  : CustomEvent<unknown>;

type WithDetailsEvent<T> = T extends keyof GlobalEventHandlersEventMap
  ? GlobalEventHandlersEventMap[T] extends CustomEvent<
      Record<PropertyKey, unknown>
    >
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<
        Record<PropertyKey, never>
      >
      ? never
      : Partial<
          GlobalEventHandlersEventMap[T]
        > extends GlobalEventHandlersEventMap[T]
      ? never
      : T
    : never
  : never;

type WithDetailsEventsMap = {
  [T in keyof GlobalEventHandlersEventMap as WithDetailsEvent<T>]: true;
};

type WithoutDetailsEvent<T> = T extends keyof GlobalEventHandlersEventMap
  ? GlobalEventHandlersEventMap[T] extends CustomEvent<
      Record<PropertyKey, unknown>
    >
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<
        Record<PropertyKey, never>
      >
      ? T
      : Partial<
          GlobalEventHandlersEventMap[T]
        > extends GlobalEventHandlersEventMap[T]
      ? T
      : never
    : T
  : T;

type WithoutDetailsEventsMap = {
  [T in keyof GlobalEventHandlersEventMap as WithoutDetailsEvent<T>]: true;
};

type DsEventMap = WithDetailsEventsMap | WithoutDetailsEventsMap;

export {
  DsEventMap,
  DsEventInit,
  DsCustomEvent,
  WithDetailsEvent,
  WithDetailsEventsMap,
  WithoutDetailsEvent,
  WithoutDetailsEventsMap,
};
