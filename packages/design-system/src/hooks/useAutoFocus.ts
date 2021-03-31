import { useEffect, useRef, MutableRefObject } from 'react';

export function useAutoFocus<T extends HTMLElement>(
  shouldFocus = true,
): MutableRefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus();
    }
  }, [ref.current, shouldFocus]);

  return ref;
}
