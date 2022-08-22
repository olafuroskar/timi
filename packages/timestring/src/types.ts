export enum TimeType {
  Default,
  WithHours,
  WithMs,
  WithHoursAndMs
}

export type TimeDefault = { type: TimeType.Default; minutes: number; seconds: number };
export type TimeWithHours = {
  type: TimeType.WithHours;
  hours: number;
  minutes: number;
  seconds: number;
};
export type TimeWithMs = {
  type: TimeType.WithMs;
  minutes: number;
  seconds: number;
  milliseconds: number;
};
export type TimeWithHoursAndMs = {
  type: TimeType.WithHoursAndMs;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export type Time = TimeDefault | TimeWithHours | TimeWithMs | TimeWithHoursAndMs;

export type TimeAndTimestring = { time: Time; timeString: string };

export type GetTimeAndTimestring = (value: string) => TimeAndTimestring | undefined;

export type GetTimeAndTimestringTemp = (value: string) => TimeAndTimestring | undefined;
