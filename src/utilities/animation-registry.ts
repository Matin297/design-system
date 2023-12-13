interface ElementAnimation {
  keyframes: Keyframe[];
  options?: KeyframeAnimationOptions;
}

const animationRegistry = new Map<string, ElementAnimation>();

export function setAnimation(name: string, animation: ElementAnimation) {
  animationRegistry.set(name, animation);
}

export function getAnimation(name: string) {
  return (
    animationRegistry.get(name) ?? {
      keyframes: [],
      options: {duration: 0},
    }
  );
}
