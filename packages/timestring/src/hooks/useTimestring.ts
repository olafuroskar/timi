import { useCallback, useState } from 'react';
import { TimeAndTimestring, TimeType } from '@/timi/timestring/types';
import {
  getDefaultInitialState,
  getTimeAndTimestring,
  getTimeAndTimestringTemp
} from '@/timi/timestring/utils/timeUtils';

export const useTimestring = (initialTimeString: string, type: TimeType = TimeType.Default) => {
  const initialState = getTimeAndTimestring(type, initialTimeString);
  const [state, setState] = useState<TimeAndTimestring>(
    initialState || getDefaultInitialState(type)
  );

  const onChange = useCallback(
    (newString: string) => {
      // If the new string is not a valid temporary time string then we do nothing.
      // Otherwise we set the timestring as the new value
      const result = getTimeAndTimestringTemp(type, newString);
      if (result) setState(result);
    },
    [type]
  );

  const onBlur = useCallback(() => {
    // We can safely assume that the value matches the regular expression here as the initial value
    // of value will always match and on every change the value is checked against the regex.
    const result = getTimeAndTimestring(type, state.timeString);
    if (result) setState(result);
  }, [state.timeString, type]);

  return {
    value: state.timeString,
    time: state.time,
    onChange,
    onBlur
  };
};
