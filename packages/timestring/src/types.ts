export enum TimeType {
  Default,
  WithHours,
  WithMs,
  WithHoursAndMs
}

export type Time =
  | {
      type: TimeType.Default;
      minutes: number;
      seconds: number;
    }
  | {
      type: TimeType.WithHours;
      hours: number;
      minutes: number;
      seconds: number;
    }
  | {
      type: TimeType.WithMs;
      minutes: number;
      seconds: number;
      milliseconds: number;
    }
  | {
      type: TimeType.WithHoursAndMs;
      hours: number;
      minutes: number;
      seconds: number;
      milliseconds: number;
    };

export type TimeAndTimestring = { time: Time; timeString: string };

export type GetTimeAndTimestring = (value: string) => TimeAndTimestring | undefined;

export type GetTimeAndTimestringTemp = (value: string) => TimeAndTimestring | undefined;
