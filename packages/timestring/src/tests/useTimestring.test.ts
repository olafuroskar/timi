import { getStateFlows, Step, testOnChangeAndOnBlur } from '@/timi/timestring/utils/testUtils';

const steps1: { step: Step; final: string }[] = [
  { step: { before: '00:0', after: '00:0' }, final: '00:00' },
  { step: { before: '00:', after: '00:' }, final: '00:00' },
  { step: { before: '00', after: '00' }, final: '00:00' },
  { step: { before: '001', after: '00:1' }, final: '00:01' },
  { step: { before: '00:10', after: '00:10' }, final: '00:10' },
  { step: { before: '00:101', after: '00:10' }, final: '00:10' }
];

const steps2: { step: Step; final: string }[] = [
  { step: { before: '0:00', after: '0:00' }, final: '00:00' },
  { step: { before: ':00', after: ':00' }, final: '00:00' },
  { step: { before: ':0', after: ':0' }, final: '00:00' },
  { step: { before: ':', after: ':' }, final: '00:00' }
];

const stateFlows1 = getStateFlows('00:00', steps1);
const stateFlows2 = getStateFlows('00:00', steps2);

describe('valid onChange and onBlur', () => {
  [...stateFlows1, ...stateFlows2].forEach((stateFlow) => {
    testOnChangeAndOnBlur(stateFlow);
  });
  testOnChangeAndOnBlur({ init: '', steps: [], final: '00:00' });
});

describe('invalid onChange and onBlur', () => {
  testOnChangeAndOnBlur({ init: '78:34', steps: [], final: '00:00' });
  testOnChangeAndOnBlur({ init: '78:34', steps: [], final: '00:00' });
});

export {};
