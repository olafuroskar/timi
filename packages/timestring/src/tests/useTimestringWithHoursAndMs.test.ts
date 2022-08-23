import { getStateFlows, Step, testOnChangeAndOnBlur } from '@/timi/timestring/utils/testUtils';
import { TimeType } from '@/timi/timestring/types';

const steps: { step: Step; final: string }[] = [
  { step: { before: '01:23:4', after: '01:23:4' }, final: '01:23:04.000' },
  { step: { before: '01:23:4.', after: '01:23:4.' }, final: '01:23:04.000' },
  { step: { before: '01:23:4.1', after: '01:23:4.1' }, final: '01:23:04.100' },
  { step: { before: '01:23:4.12', after: '01:23:4.12' }, final: '01:23:04.120' },
  { step: { before: '01:23:4', after: '01:23:4' }, final: '01:23:04.000' },
  { step: { before: '01:23:44', after: '01:23:44' }, final: '01:23:44.000' },
  { step: { before: '01:23:448', after: '01:23:44' }, final: '01:23:44.000' },
  { step: { before: '01:23:445', after: '01:23:44.5' }, final: '01:23:44.500' },
  { step: { before: '01:23:44', after: '01:23:44' }, final: '01:23:44.000' },
  { step: { before: '1:23:44', after: '1:23:44' }, final: '01:23:44.000' },
  { step: { before: '1:23:444', after: '1:23:44.4' }, final: '01:23:44.400' }
];

const stateFlows = getStateFlows('01:23:45.000', steps);

describe('valid onChange and onBlur', () => {
  stateFlows.forEach((stateFlow) => {
    testOnChangeAndOnBlur(stateFlow, TimeType.WithHoursAndMs);
  });
  testOnChangeAndOnBlur({ init: '', steps: [], final: '00:00:00.000' }, TimeType.WithHoursAndMs);
});

describe('invalid onChange and onBlur', () => {
  testOnChangeAndOnBlur(
    { init: '78:34', steps: [], final: '00:00:00.000' },
    TimeType.WithHoursAndMs
  );
  testOnChangeAndOnBlur(
    { init: '78:34', steps: [], final: '00:00:00.000' },
    TimeType.WithHoursAndMs
  );
  testOnChangeAndOnBlur({ init: '24', steps: [], final: '00:00:00.000' }, TimeType.WithHoursAndMs);
});

export {};
