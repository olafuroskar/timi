import { getTimeAndTimestringTemp } from '@/timi/timestring/utils/timeUtils';
import { TimeType } from '../types';

const validTimeStrings = ['0:00', '0:0', '59', '5', '04'];
const inValidTimeStrings = ['0000', '0-0', '597', '69', 'a'];

describe('onChange default valid strings', () => {
  const testValidTempTimestring = (before: string, after: string) => {
    test(before + ' is a valid temporary string, should be ' + after, async () => {
      const result = getTimeAndTimestringTemp(TimeType.Default, before);
      expect(result?.timeString).toBe(after);
    });
  };

  validTimeStrings.forEach((timeString) => {
    testValidTempTimestring(timeString, timeString);
  });
  testValidTempTimestring('023', '02:3');
  testValidTempTimestring('123', '12:3');
  testValidTempTimestring('000', '00:0');
});

describe('onChange default invalid strings', () => {
  const testInValidTempTimestring = (before: string) => {
    test(before + ' is an invalid temporary string', async () => {
      const result = getTimeAndTimestringTemp(TimeType.Default, before);
      expect(result).toBeUndefined();
    });
  };

  inValidTimeStrings.forEach((timeString) => {
    testInValidTempTimestring(timeString);
  });
});

export {};
