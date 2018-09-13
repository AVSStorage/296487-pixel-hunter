const createTimer = (time) => {
  if (time >= 0) {
    time--;
  }

  const result = {
    done: false,
    time
  };

  if (time < 0) {
    result.done = true;
  }

  return result;
};

export {createTimer};
