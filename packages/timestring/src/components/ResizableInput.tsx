import React, { useRef } from 'react';
import { useAutoResizeInput } from '../hooks/useAutoResizeInput';

/**
 * Input component that resizes its width when the input value changes.
 * @param px For Safari provide the horizontal padding that is used on the input, if any.
 * @returns
 */
export const ResizableInput: React.FC<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    px?: number;
  }
> = ({ value, px, ...props }) => {
  const ref = useRef<HTMLInputElement>(null);
  useAutoResizeInput(value, ref, px);
  return <input {...props} value={value} ref={ref} />;
};
