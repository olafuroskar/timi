import { getStateFlows, Step, testOnChangeAndOnBlur } from '@/timi/timestring/utils/testUtils';
import { TimeType } from '@/timi/timestring/types';

const steps: { step: Step; final: string }[] = [
  { step: { before: '01:23.00', after: '01:23.00' }, final: '01:23.000' },
  { step: { before: '01:23.0', after: '01:23.0' }, final: '01:23.000' },
  { step: { before: '01:23.', after: '01:23.' }, final: '01:23.000' },
  { step: { before: '01:23.3', after: '01:23.3' }, final: '01:23.300' },
  { step: { before: '01:23.32', after: '01:23.32' }, final: '01:23.320' },
  { step: { before: '01:23.321', after: '01:23.321' }, final: '01:23.321' },
  { step: { before: '01:2.321', after: '01:2.321' }, final: '01:02.321' },
  { step: { before: '01:.321', after: '01:.321' }, final: '01:00.321' },
  { step: { before: '01.321', after: '01.321' }, final: '00:01.321' }
];

const stateFlows = getStateFlows('01:23.000', steps);

describe('valid onChange and onBlur', () => {
  stateFlows.forEach((stateFlow) => {
    testOnChangeAndOnBlur(stateFlow, TimeType.WithMs);
  });
  testOnChangeAndOnBlur({ init: '', steps: [], final: '00:00.000' }, TimeType.WithMs);
  testOnChangeAndOnBlur({ init: '76', steps: [], final: '00:00.000' }, TimeType.WithMs);
});

describe('invalid onChange and onBlur', () => {
  testOnChangeAndOnBlur({ init: '78:34', steps: [], final: '00:00.000' }, TimeType.WithMs);
  testOnChangeAndOnBlur({ init: '78:34', steps: [], final: '00:00.000' }, TimeType.WithMs);
});

export {};
