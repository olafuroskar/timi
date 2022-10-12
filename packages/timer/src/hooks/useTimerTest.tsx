import React from 'react';
import useTimer from './useTimer';

export default function TestTimer() {
  const timer = useTimer([]);

  return <div>{timer.currIndex}</div>;
}
