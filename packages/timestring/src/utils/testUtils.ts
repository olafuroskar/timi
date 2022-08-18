import { act, renderHook } from '@testing-library/react';
import { useTimestring } from '@/timi/timestring/hooks/useTimestring';
import { TimeType } from '../types';

export type Step = { before: string; after: string };
export type StateFlow = { init: string; steps: Step[]; final: string };

export const getStateFlows = (init: string, steps: { step: Step; final: string }[]): StateFlow[] =>
  steps.map((step, i) => ({
    init: init,
    steps: steps.slice(0, i + 1).map(({ step }) => step),
    final: step.final
  }));

export const testOnChangeAndOnBlur = (stateFlow: StateFlow, type: TimeType = TimeType.Default) => {
  test(`${stateFlow.init} => ${stateFlow.steps.map(({ before }) => before).join(' => ')}${
    stateFlow.steps.length ? ' =>' : ''
  } ${stateFlow.final}`, () => {
    const hook = renderHook(() => useTimestring(stateFlow.init, type));

    stateFlow.steps.forEach(async ({ before, after }) => {
      act(() => hook.result.current.onChange(before));
      expect(hook.result.current.value).toBe(after);
    });

    act(() => hook.result.current.onBlur());
    expect(hook.result.current.value).toBe(stateFlow.final);
  });
};
