import { act, renderHook } from '@testing-library/react';
import { useTimestring } from '@/timi/timestring/hooks/useTimestring';

type Step = { before: string; after: string };
type StateFlow = { init: string; steps: Step[]; final: string };

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

const getStateFlows = (init: string, steps: { step: Step; final: string }[]): StateFlow[] =>
  steps.map((step, i) => ({
    init: init,
    steps: steps.slice(0, i + 1).map(({ step }) => step),
    final: step.final
  }));

const stateFlows1 = getStateFlows('00:00', steps1);
const stateFlows2 = getStateFlows('00:00', steps2);

const testOnChangeAndOnBlur = (stateFlow: StateFlow) => {
  test(`${stateFlow.init} => ${stateFlow.steps.map(({ before }) => before).join(' => ')}${
    stateFlow.steps.length ? ' =>' : ''
  } ${stateFlow.final}`, () => {
    const hook = renderHook(() => useTimestring(stateFlow.init));

    stateFlow.steps.forEach(async ({ before, after }) => {
      act(() => hook.result.current.onChange(before));
      expect(hook.result.current.value).toBe(after);
    });

    act(() => hook.result.current.onBlur());
    expect(hook.result.current.value).toBe(stateFlow.final);
  });
};

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
