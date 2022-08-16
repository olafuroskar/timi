import { act, renderHook } from '@testing-library/react';
import { useTimestring } from '@/timi/timestring/hooks/useTimestring';

describe('onChange', () => {
  test('should be 01:10 after blurring from 01:00 => 01:10', async () => {
    const hook = renderHook(() => useTimestring('01:00'));
    // Erase last char
    await act(async () => hook.result.current.onChange('01:0'));
    // Erase last char
    await act(async () => hook.result.current.onChange('01:'));
    // Insert 1
    await act(async () => hook.result.current.onChange('01:1'));
    // Insert 0
    await act(async () => hook.result.current.onChange('01:10'));
    // Unfocus from input
    await act(async () => hook.result.current.onBlur());

    expect(hook.result.current.value).toBe('01:10');
  });
});

export {};
