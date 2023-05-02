const throttle = (callback, time) => {
  let timer = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, time);
    }
  };
};

export { throttle };
