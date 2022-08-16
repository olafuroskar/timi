import { useCallback, useState } from 'react';
import { TimeAndTimestring, TimeType } from '@/timi/timestring/types';
import { getTimeAndTimestring, getTimeAndTimestringTemp } from '@/timi/timestring/utils/timeUtils';

export const useTimestring = (initialTimeString: string) => {
  const initialState = getTimeAndTimestring(TimeType.Default, initialTimeString);

  const [state, setState] = useState<TimeAndTimestring>(
    initialState || {
      time: { type: TimeType.Default, minutes: 0, seconds: 0 },
      timeString: '00:00'
    }
  );

  const onChange = useCallback((newString: string) => {
    // If the new string is not a valid temporary time string then we do nothing.
    // Otherwise we set the timestring as the new value
    const result = getTimeAndTimestringTemp(TimeType.Default, newString);
    if (result) setState(result);
  }, []);

  const onBlur = useCallback(() => {
    // We can safely assume that the value matches the regular expression here as the initial value
    // of value will always match and on every change the value is checked against the regex.
    const result = getTimeAndTimestring(TimeType.Default, state.timeString);
    if (result) setState(result);
  }, [state.timeString]);

  return {
    value: state.timeString,
    time: state.time,
    onChange,
    onBlur
  };
};
