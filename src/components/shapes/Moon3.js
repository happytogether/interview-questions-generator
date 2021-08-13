import React, { useState } from 'react'
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import getRandomFromInterval from "../../getRandomFromInterval";
import getRandomDifferent from '../../getRandomDifferent';
import useSound from 'use-sound';
import springSfx from '../spring.mp3';

export default function Moon3(props) {
  const styles = {
    width: "100px",
    height: "100px",
    bottom: "15%",
    left: "15%",
    zIndex: 9
  }
  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
  const bg = ["var(--red)", "var(--yellow)", "var(--purple)", "var(--green)", "var(--orange)"];

  const randomValue = -138;
  const cards = useSprings(
    5,
    [0, 1, 2, 3, 4].map((i) => ({ opacity: 1, x: open? (i/5) *randomValue: 0, y: open? (i/5) *randomValue: 0, z: open ? (i / 5) * 80 : 0, background: bg[i]}))
  )

  const [playSpring, { stop }] = useSound(springSfx);

  function handleMouseOver() {
    setOpen(true);
    playSpring();
  }
  function handleMouseLeave() {
    setOpen(false);
    stop();
  }
  return (
    <div className="absolute flex items-center justify-center" style={styles} onMouseEnter={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()}>
      {cards.map(({ x, y, z, opacity, background }, index) => (
        <animated.div
          key={index} style={{
            opacity,
            background,
            transform: interpolate(
              [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
              (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px) rotateX(${f * r}deg)`
            )
          }}>
          <svg width="96px" height="96px" viewBox="0 0 24 24" className="absolute"><path fill={bg[index]} d="M24 22h-24l12-20z"/></svg>
          {index === 4 && <animated.div style={{ transform: f.interpolate([0, 1], ['scale(0.7)', 'scale(1)']) }} />}
        </animated.div>
      ))}
    </div>
  )
}
