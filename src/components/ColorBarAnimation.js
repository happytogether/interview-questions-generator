import { useContext, useState, useEffect, useMemo } from "react";
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import getRandomFromInterval from "../getRandomFromInterval";
import InviewBar2 from './inview/InviewBar2';
import { ColorSet } from '../components/ColorSet';

export default function ColorBarAnimation(props) {
  const bgColorValue = props.bgColorValue;
  const noShowColor = props.noShowColor;
  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
  const randomValue = getRandomFromInterval(-200, 200);
  const barAnimation = useSprings(
    8,
    [...Array(8).keys()].map((i) => ({ delay: i * 50, opacity: 1, x: open? -20: 0, y: open? -20: 0, z: open? -20: 0}))
  )
  const timing = 250;
  useEffect(() => {
    // We only want to act when we're going from
    // not-booped to booped.
    if (!open) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setOpen(false);
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
  }, [open, timing]);

  function handleMouseOver() {
    setOpen(true);
  }

  return (
    <>
      {
        barAnimation.map(({ x, y, z }, i) => (
          <animated.span className="inline-block" onMouseEnter={() => handleMouseOver()}
            key={i} style={{
              transform: interpolate(
                [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, i, i, 0]), r],
                (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px) rotateX(${f * r}deg)`
              )
            }}>
            <InviewBar2 colorSet={ColorSet} key={i} index={i} noShowColor={noShowColor} />
          </animated.span>
      ))}
    </>
  )
}
