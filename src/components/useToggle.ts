'use client';
import { useCallback, useState } from 'react';

const useToggle = (
  initialValue: boolean = false
): [boolean, () => void, () => void, () => void] => {
  const [show, setShow] = useState(initialValue);

  const toggle = useCallback(() => {
    setShow((prevState) => !prevState);
  }, []);

  const close = useCallback(() => {
    setShow(false);
  }, []);

  const open = useCallback(() => {
    setShow(true);
  }, []);

  return [show, toggle, close, open];
};

export default useToggle;
