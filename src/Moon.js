import React, { useState, useMemo} from 'react'
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import { BasicColorSet } from '../ColorSet';
import getRandomFromInterval from "../../getRandomFromInterval";
import getRandomDifferent from "../../getRandomDifferent";
import useSound from 'use-sound';
import springSfx from '../spring.mp3';

export default function Moon(props) {
  const styles = {
    width: "100px",
    height: "100px",
    bottom: "15%",
    left: "15%",
    zIndex: 9
  }
  const bgColor = props.bgColor;
  const colorSet = BasicColorSet.filter((item) => {
    return item !== bgColor
  })
  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
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
          <svg style={{"width": "100px"}} className={`absolute`} viewBox="0 0 42 39">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-553.000000, -175.000000)" fill={`var(--${colorSet[index]})`}>
                <path
                  d="M592.066,191.098 C589.641,193.151 586.013,192.849 583.961,190.425 C580.099,185.864 573.247,185.295 568.686,189.157 C564.126,193.018 563.556,199.87 567.419,204.431 C569.47,206.856 569.17,210.484 566.745,212.536 C564.321,214.589 560.693,214.288 558.64,211.863 C550.68,202.462 551.853,188.339 561.254,180.379 C570.655,172.419 584.779,173.592 592.739,182.993 C594.792,185.417 594.49,189.046 592.066,191.098"
                  id="Fill-247"></path>
              </g>
            </g>
          </svg>
          {index === 4 && <animated.div style={{ transform: f.interpolate([0, 1], ['scale(0.7)', 'scale(1)']) }} />}
        </animated.div>
      ))}
    </div>
  )
}
