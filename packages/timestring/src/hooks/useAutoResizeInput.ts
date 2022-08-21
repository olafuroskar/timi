import { RefObject, useEffect } from 'react';
import { isSafari } from 'react-device-detect';

/**
 * Hook that resizes the input that the ref refers to.
 * @param value
 * @param ref
 * @param px the horizontal padding of the input the ref refers to
 */
export const useAutoResizeInput = (
  value: string | number | readonly string[] | undefined,
  ref: RefObject<HTMLInputElement>,
  px: number = 0
) => {
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.width = '0px';
    ref.current.style.width = `${ref.current.scrollWidth + (isSafari ? px * 4 * 2 : 0) + 2}px`;
  }, [px, ref, value]);
};
