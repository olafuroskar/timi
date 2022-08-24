# tími

As of now there is only the one package, but I intend on adding related packages.

# numeric-timestring

> _React hook and component to handle time strings in a single input_

## General

`numeric-timestring` is a package that handles time string input in a single input instead of having to spread values, e.g. minutes, seconds, between multiple inputs.

## `useTimestring`

The `useTimestring` handles the value of a input and makes sure input values are valid time strings, and formats the value if needed. It accepts two arguments `initialTimeString: string`, which initializes the `value` to a valid time string and `type: TimeType` which sets the format of the `value`.

### Autoformatting delimeters

The hook knows when delimeters should be added. If the current state of `value` is `12` and then a `3` is added, i.e. `onChange('123')` is called then the state of `value` is set to `12:3`. The same goes for `12:345` => `12:34:5` when using hours and `12:345` => `12:34.5` when using milliseconds, and `12:34:567` => `12:34:56.7` when using both.

The hook returns the following values, to be passed to an input:

- `value: string` The value to be displayed in the input.
- `time: Time` An object that holds the values of the relevant time elements as numbers: `hours, minutes, seconds, milliseconds`.
- `onChange: (newString: string) => void`: Function that formats and/or validates changes to the input.
- `onBlur: () => void`: Function to be called when changes to the input are finished

### Example

```typescript
const { value, onChange, onBlur } = useTimestring('00:00');

return <input value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />;
```

## `ResizableInput`

A simple input component that grows with the width of the given string.

## `TimeType`

There are 4 available _time types_:

| TimeType       | Format         | Constraints                                      |
| -------------- | -------------- | ------------------------------------------------ |
| Default        | `mm:ss`        | `mm` <= 59, `ss` <= 59                           |
| WithHours      | `hh:mm:ss`     | `hh` <= 23, `mm` <= 59, `ss` <= 59               |
| WithMs         | `mm:ss.xxx`    | `mm` <= 59, `ss` <= 59, `xxx` <= 999             |
| WithHoursAndMs | `hh:mm:ss.xxx` | `hh` <= 23, `mm` <= 59, `ss` <= 59, `xxx` <= 999 |

## `Time`

| Attributes           |           |             |          |                  |
| -------------------- | --------- | ----------- | -------- | ---------------- |
| `type` : `TimeType.` | `Default` | `WithHours` | `WithMs` | `WithHoursAndMs` |
| `hours`              | ---       | `number`    | ---      | `number`         |
| `minutes`            | `number`  | `number`    | `number` | `number`         |
| `seconds`            | `number`  | `number`    | `number` | `number`         |
| `milliseconds`       | ---       | ---         | `number` | `number`         |
