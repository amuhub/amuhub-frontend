import React, { useEffect } from "react";
import { useState } from "react";

const useDebounce = (value, timeout, callback) => {
  const [timer, setTimer] = useState(null);

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    clearTimer();

    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
  }, [value]);
};

export default useDebounce;
