import React, { useState } from 'react'
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import getRandomFromInterval from "../../getRandomFromInterval";
import useSound from 'use-sound';
import springSfx from '../spring.mp3';
import { BasicColorSet } from '../ColorSet';

export default function Moon2(props) {
  const styles = {
    width: "100px",
    height: "100px",
    bottom: "15%",
    left: "15%",
    zIndex: 9
  }
  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 });
  const bgColor = props.bgColor;
  const colorSet = BasicColorSet.filter((item) => {
    return item !== bgColor
  })
  const randomValue = getRandomFromInterval(-200, 200);
  const cards = useSprings(
    5,
    [0, 1, 2, 3, 4].map((i) => ({ opacity: 1, x: open? (i/5) *randomValue: 0, y: open? (i/5) *randomValue: 0, z: open ? (i / 5) * 80 : 0, background: colorSet[i]}))
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
          <svg width="96px" height="96px" viewBox="0 0 96 96" className="absolute">
              <title>Combined Shape</title>
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="23_502" transform="translate(-168.000000, -154.000000)" fill={`var(--${colorSet[index]})`}>
                      <path d="M216,154 C242.509668,154 264,175.490332 264,202 C264,228.509668 242.509668,250 216,250 C189.490332,250 168,228.509668 168,202 C168,175.490332 189.490332,154 216,154 Z M216,177 C202.192881,177 191,188.192881 191,202 C191,215.807119 202.192881,227 216,227 C229.807119,227 241,215.807119 241,202 C241,188.192881 229.807119,177 216,177 Z" id="Combined-Shape"></path>
                  </g>
              </g>
          </svg>
          {index === 4 && <animated.div style={{ transform: f.interpolate([0, 1], ['scale(0.7)', 'scale(1)']) }} />}
        </animated.div>
      ))}
    </div>
  )
}
