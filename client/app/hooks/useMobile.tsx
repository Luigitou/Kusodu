'use client';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      console.log('resize');
    };

    window.addEventListener('resize', useDebounce(handleResize, 500));
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
}
