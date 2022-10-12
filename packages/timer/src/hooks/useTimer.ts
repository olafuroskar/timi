import { useEffect, useMemo, useState } from 'react';

const useTimer = <T extends { id: string; millisecs: number }>(
  items: T[],
  accuracy: number = 100
) => {
  // The index of the currently displayed item
  const [currIndex, setCurrIndex] = useState(0);
  // Millisecond value of the time displayed
  const [millis, setMillis] = useState(items[0].millisecs);
  // The fraction of time that has passed of the current item
  const fraction = useMemo(() => millis / items[currIndex].millisecs, [currIndex, items, millis]);
  // The running state of the timer. Is it running or not?
  const [isRunning, setIsRunning] = useState(false);
  // Index of the last item in the items array. Calculated from the items value
  const endIndex = useMemo(() => items.length - 1, [items]);
  // When the currIndex value is changed we also want to update the millis value.
  useEffect(() => {
    setMillis(items[currIndex].millisecs);
  }, [currIndex, items]);

  // Function to start the timer. Undefined if the timer is already running
  const play = !isRunning ? () => setIsRunning(true) : undefined;
  // Function to pause the timer. Undefined if the timer isn't running
  const pause = isRunning ? () => setIsRunning(false) : undefined;
  // Function to skip to the next item. Undefined if we're on the last item
  const next = currIndex === endIndex ? undefined : () => setCurrIndex(currIndex + 1);
  // Function to go back to the last item. Undefined if we're on the first item
  const previous = currIndex === 0 ? undefined : () => setCurrIndex(currIndex - 1);
  // Function to reset the timer to the begininng state.
  const reset = () => {
    // Stop the timer
    setIsRunning(false);
    // Set the index of items to 0 which also sets millis to 0
    setCurrIndex(0);
  };
  // Function to reset the current item
  const resetCurrent = () => {
    // Stop the timer
    setIsRunning(false);
    // Set the number of milliseconds back to the beginning state of the current item
    setMillis(items[currIndex].millisecs);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isRunning) return;

      if (millis <= accuracy && currIndex < endIndex) setCurrIndex(currIndex + 1);
      else if (millis <= 0) {
        reset();
        clearTimeout(timeout);
      } else setMillis(millis - accuracy);
    }, accuracy);

    return () => clearTimeout(timeout);
  }, [accuracy, currIndex, endIndex, isRunning, millis]);

  return {
    items,
    currIndex,
    endIndex,
    millis,
    fraction,
    play,
    pause,
    reset,
    resetCurrent,
    next,
    previous
  };
};

export default useTimer;
