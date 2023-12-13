// make a specific property non-optional
export type WithRequiredProp<T, K extends keyof T> = T & {[P in K]-?: T[P]};
