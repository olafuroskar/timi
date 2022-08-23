import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  TimeAndTimestring,
  TimeDefault,
  TimeType
} from '@/timi/timestring/types';
import {
  getStringFromTime,
  parseVal,
  splitAndLast,
  splitAndParse
} from '@/timi/timestring/utils/timeUtils';

/**
 *  (
 *    [0-9]{0,1}                We can have no number or one in the range 0-9
 *    | (
 *        [0-5]{1}[0-9]         or we can have a number in the range 00-59
 *      )
 *  )(
 *    :                         We have : as a delimiter
 *    (
 *      [0-9]{0,1}              Then we can have no number or one in the range 0-9
 *      | (
 *          [0-5][0-9]          or we can have a number in the range 00-59
 *        )
 *    )
 *  ){0,1}                      everything after and including the delimeter can be omitted
 */
const timeStringRegex = new RegExp(
  /^([0-9]{0,1}|([0-5][0-9]))(:([0-9]{0,1}|([0-5][0-9]{1}))){0,1}$/
);

type Props = Partial<Omit<TimeDefault, 'type'>>;

const timeWithHours = ({ minutes = 0, seconds = 0 }: Props): TimeDefault => ({
  type: TimeType.Default,
  minutes,
  seconds
});

const getTimeAndTimestring = ({
  minutes = 0,
  seconds = 0
}: Props): TimeAndTimestring | undefined => {
  const time = timeWithHours({ minutes, seconds });
  return { time, timeString: getStringFromTime(time) };
};

export const getTimeAndTimestringDefault: GetTimeAndTimestring = (value) => {
  if (!value.match(timeStringRegex)) return undefined;

  // {min}:{sec}
  if (value.includes(':')) {
    const [minutes, seconds] = splitAndParse(value, ':');
    return getTimeAndTimestring({ minutes, seconds });
  }
  // {min}
  return getTimeAndTimestring({ minutes: parseVal(value) });
};

export const getTimeAndTimestringTempDefault: GetTimeAndTimestringTemp = (value) => {
  // {min}x
  if (value.match(/^[0-5][0-9][0-9]$/)) {
    const [minutes, seconds] = splitAndLast(value);
    return {
      time: timeWithHours({ minutes, seconds }),
      timeString: `${value.slice(0, -1)}:${seconds}`
    };
  }

  // {min}:{sec}
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}$/)) {
    const [minutes, seconds] = splitAndParse(value, ':');
    return { time: timeWithHours({ minutes, seconds }), timeString: value };
  }

  // {min}
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}$/)) {
    return { time: timeWithHours({ minutes: parseVal(value) }), timeString: value };
  }

  return undefined;
};
