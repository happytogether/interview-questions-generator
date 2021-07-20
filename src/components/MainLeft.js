import React, { useContext, useState, useEffect, useRef } from 'react';
import DelayLink from '../ultils/DelayLink';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import getRandomFromInterval from "../getRandomFromInterval";
import useSound from 'use-sound';
import springSfx from './spring.mp3';

export default function MainLeft() {
  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
  const bg = ["var(--red)", "var(--yellow)", "var(--purple)", "var(--green)", "var(--orange)"];
  const randomValue = getRandomFromInterval(-200, 200);
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
  const styles = {
    left: "15%",
    top: "0",
    zIndex: 9
  }
  return (
    <div className="flex-1" style={styles} onMouseEnter={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()}>
      {cards.map(({ x, y, z, opacity, background }, index) => (
        <animated.div key={index} style={{
          opacity,
          background,
          transform: interpolate(
            [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
            (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px) rotateX(${f * r}deg)`
          )
        }} className="absolute">
          <h2 className="text-3xl border-b-2 pb-2">Interview<br /><input type="text" placeholder="Anni Wang" />and get some FUN.</h2>
          <p className="my-5">*Questions will be randomly gernerated.</p>

          <div className="text-left">
            <div className="flex mt-2 space-x-4">
              <div className="border rounded-sm py-3 px-6 mt-3">
                <DelayLink to="./interviewStart" delay="1000">Start Interview Process</DelayLink>
              </div>
            </div>
          </div>
        </animated.div>
        )
      )}
      </div>

    )
  }
