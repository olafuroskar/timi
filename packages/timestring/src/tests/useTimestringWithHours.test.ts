import { getStateFlows, Step, testOnChangeAndOnBlur } from '@/timi/timestring/utils/testUtils';
import { TimeType } from '@/timi/timestring/types';

const steps: { step: Step; final: string }[] = [
  { step: { before: '01:23:4', after: '01:23:4' }, final: '01:23:04' },
  { step: { before: '01:23:', after: '01:23:' }, final: '01:23:00' },
  { step: { before: '01:23', after: '01:23' }, final: '01:23:00' },
  { step: { before: '01:2', after: '01:2' }, final: '01:02:00' },
  { step: { before: '01:', after: '01:' }, final: '01:00:00' },
  { step: { before: '01', after: '01' }, final: '01:00:00' },
  { step: { before: '0', after: '0' }, final: '00:00:00' },
  { step: { before: '', after: '' }, final: '00:00:00' },
  { step: { before: ':', after: ':' }, final: '00:00:00' },
  { step: { before: ':3', after: ':3' }, final: '00:03:00' },
  { step: { before: ':3:', after: ':3:' }, final: '00:03:00' },
  { step: { before: ':3:1', after: ':3:1' }, final: '00:03:01' },
  { step: { before: ':3:10', after: ':3:10' }, final: '00:03:10' },
  { step: { before: '2:3:10', after: '2:3:10' }, final: '02:03:10' },
  { step: { before: '22:3:10', after: '22:3:10' }, final: '22:03:10' },
  { step: { before: '22::10', after: '22::10' }, final: '22:00:10' }
];

const stateFlows = getStateFlows('01:23:45', steps);

describe('valid onChange and onBlur', () => {
  stateFlows.forEach((stateFlow) => {
    testOnChangeAndOnBlur(stateFlow, TimeType.WithHours);
  });
  testOnChangeAndOnBlur({ init: '', steps: [], final: '00:00:00' }, TimeType.WithHours);
});

describe('invalid onChange and onBlur', () => {
  testOnChangeAndOnBlur({ init: '78:34', steps: [], final: '00:00:00' }, TimeType.WithHours);
  testOnChangeAndOnBlur({ init: '78:34', steps: [], final: '00:00:00' }, TimeType.WithHours);
  testOnChangeAndOnBlur({ init: '24', steps: [], final: '00:00:00' }, TimeType.WithHours);
});

export {};
