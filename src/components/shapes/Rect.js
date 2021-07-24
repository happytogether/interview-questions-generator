import React, { useState } from 'react';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import getRandomFromInterval from "../../getRandomFromInterval";
import useSound from 'use-sound';
import spring2Sfx from '../spring2.mp3';

export default function Rect(props) {
  // define right left and position here with index
  const randomPos = ["right-0", "left-0"];
  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
  const bg = [ "var(--green)", "var(--pink)", "var(--yellow)", "var(--purple)", "var(--orange)"];
  const randomValue = getRandomFromInterval(-200, 200);
  const cards = useSprings(
    5,
    [0, 1, 2, 3, 4].map((i) => ({ opacity: 1, x: open? (i/5) *randomValue: 0, y: open? (i/5) *randomValue: 0, z: open ? (i / 5) * 80 : 0, background: bg[i]}))
  )
  const [playSpring2, { stop }] = useSound(spring2Sfx);

  function handleMouseOver() {
    setOpen(true);
    playSpring2();
  }

  function handleMouseLeave() {
    setOpen(false);
    stop();
  }

  return (
    <div className={`item-rect absolute ${randomPos[props.index%2]} ${props.color}`} onMouseEnter={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()}>
      {cards.map(({ x, y, z, opacity, background }, index) => (
        <animated.div className="absolute w-full h-full"
          style={{
            opacity,
            background,
            transform: interpolate(
              [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
              (x, y, z, f, r) => `translate3d(0,${y}px,${z}px) rotateX(${f * r}deg)`
            )
          }}>
          {index === 4 && <animated style={{ transform: f.interpolate([0, 1], ['scale(0.7)', 'scale(1)']) }} />}
        </animated.div>
      ))}
    </div>
  )
}
