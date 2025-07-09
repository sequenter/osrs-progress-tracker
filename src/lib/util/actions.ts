/**
 * On long press action, while mouse down is held on the element, invokes a callback every 50ms interval, after a timeout of 300ms has
 * passed.
 * @param element The element for the action to occur on
 * @param options Options containing callback and enabled state
 * @returns Action
 */
export const longpress = (element: HTMLButtonElement, options: { callback: () => void; enabled: boolean }) => {
  if (options.enabled) {
    let timeoutId = 0;
    let intervalId = 0;

    const clearTimers = () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };

    const setTimers = () => {
      timeoutId = setTimeout(() => {
        intervalId = setInterval(() => {
          options.callback();
        }, 50);
      }, 300);
    };

    element.addEventListener('mousedown', setTimers);
    element.addEventListener('mouseup', clearTimers);
    element.addEventListener('mouseleave', clearTimers);

    return {
      destroy() {
        clearTimers();

        element.removeEventListener('mousedown', setTimers);
        element.removeEventListener('mouseup', clearTimers);
        element.removeEventListener('mouseleave', clearTimers);
      }
    };
  }

  return {};
};
