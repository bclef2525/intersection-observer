import React, { useCallback } from 'react';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const useIntersectionObserver = (ref:React.RefObject<any>, callback:()=>void) => {
  const onIntersection = useCallback(([entry]: IntersectionObserverEntry[], _observer:IntersectionObserver) => {
    if (entry.isIntersecting) {
      callback();
    }
  },[callback]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, options);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onIntersection, ref]);

  return [ref];
};

export default useIntersectionObserver;
