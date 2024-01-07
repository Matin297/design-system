/*
 * Stops all active animations on element.
 * Tries to synchronize animation cancelation with browser rendering cycle.
 * Returns a promise that will resolve after all animations are stopped.
 */
export function stopAnimations(element: HTMLElement) {
  const animationPromises = element.getAnimations().map(
    (animation) =>
      new Promise((resolve) => {
        requestAnimationFrame(resolve);
        animation.cancel();
      })
  );

  return Promise.all(animationPromises);
}

/*
 * Animates an element using keyframes.
 * Returns a promise that will resolve after the animation is finished or canceled.
 */
export function performAnimation(
  element: HTMLElement,
  keyframes: Keyframe[],
  options?: KeyframeAnimationOptions
) {
  return new Promise((resolve) => {
    const animation = element.animate(keyframes, {
      ...options,
      duration: prefersReducedMotion() ? 0 : options?.duration,
    });

    animation.addEventListener('finish', resolve, {once: true});
    animation.addEventListener('cancel', resolve, {once: true});
  });
}

/** Waits for all animations on an element to finish */
export function waitForAnimationsToFinish(element: HTMLElement) {
  return Promise.allSettled(
    element.getAnimations().map((animation) => animation.finished)
  );
}

export function shimKeyframesAutoHeight(
  keyframes: Keyframe[],
  calculatedValue: number
) {
  return keyframes.map(({height, ...props}) => ({
    ...props,
    height: height === 'auto' ? calculatedValue + 'px' : height,
  }));
}

/** Tells if the user enables reduced motion setting in their browser or OS */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
