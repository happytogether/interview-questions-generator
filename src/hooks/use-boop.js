// hooks/use-boop.js
import React, { useEffect } from 'react'
import { useSpring } from 'react-spring';

function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}) {
  const [isBooped, setIsBooped] = React.useState(false);
  const style = useSpring({
    display: 'inline-block',
    backfaceVisibility: 'hidden',
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  });

  useEffect(() => {
  // We only want to act when we're going from
  // not-booped to booped.
  if (!isBooped) {
    return;
  }
  const timeoutId = window.setTimeout(() => {
    setIsBooped(false);
  }, timing);
  // Just in case our component happens to
  // unmount while we're booped, cancel
  // the timeout to avoid a memory leak.
  return () => {
    window.clearTimeout(timeoutId);
  };
  // Trigger this effect whenever `isBooped`
  // changes. We also listen for `timing` changes,
  // in case the length of the boop delay is
  // variable.
}, [isBooped, timing]);

  const trigger = React.useCallback(() => {
    setIsBooped(true);
  }, []);
  return [style, trigger];
}

export default useBoop;
