import { ResizableInput } from '@/timi/timestring/components/ResizableInput';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { useTimestring } from '../src';
import { TimeType } from '../src/types';

export default {
  title: 'ResizableInput',
  component: ResizableInput,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ResizableInput>;

const ResizableInputDefaultTemplate: ComponentStory<typeof ResizableInput> = () => {
  const { value, onChange, onBlur } = useTimestring('00:00');

  return (
    <ResizableInput value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
  );
};

const ResizableInputWithHoursTemplate: ComponentStory<typeof ResizableInput> = () => {
  const { value, onChange, onBlur } = useTimestring('00:00:00', TimeType.WithHours);

  return (
    <ResizableInput value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
  );
};

const ResizableInputWithMsTemplate: ComponentStory<typeof ResizableInput> = () => {
  const { value, onChange, onBlur } = useTimestring('00:00.000', TimeType.WithMs);

  return (
    <ResizableInput value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
  );
};

export const ResizableInputDefault = ResizableInputDefaultTemplate.bind({});
export const ResizableInputWithHours = ResizableInputWithHoursTemplate.bind({});
export const ResizableInputWithMs = ResizableInputWithMsTemplate.bind({});
