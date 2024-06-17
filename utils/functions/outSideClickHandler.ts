"use client"

import { useEffect, MutableRefObject } from 'react';

export function useOutsideClick(ref: MutableRefObject<HTMLElement | null>, callback: () => void) {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
}