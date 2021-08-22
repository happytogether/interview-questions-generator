import { useContext, useState, useEffect, useMemo } from "react";
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import getRandomFromInterval from "../getRandomFromInterval";
import InviewBar2 from './inview/InviewBar2';
import { ColorSet } from './ColorSet';
import { motion } from "framer-motion";
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../ultils/TransitionSet';

export default function SegmentsAnimation(props) {

  const bgColorValue = props.bgColorValue;
  const noShowColor = props.noShowColor;
  const barWidth = props.barWidth;
  const segment = props.segment;
  const type = props.type;
  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
  const x = props.x;
  const y = props.y;
  const zIntervalFrom = props.zIntervalFrom;
  const zIntervalTo = props.zIntervalTo;
  const delay = props.delay;
  const transitionSet = [pageTransition, pageTransition2, pageTransition3, pageTransitionShort];
  const colorSet = ColorSet.filter((color, index) => {
    return color[0]!== noShowColor;
  })
  const childAnimation = useSprings(
    segment,
    [...Array(segment).keys()].map((i) => ({ delay: i * delay, opacity: 1, x: open? x: 0, y: open? y: 0, z: open? -20: 0}))
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

  function generateAnimatedBlocks({x,y,z}, index) {
    switch (type) {
      case "text":
        return (
          <animated.span className={`inline-block animate-block ${props.children[index]===' '? 'mx-1': null}`} onMouseEnter={() => handleMouseOver()}
            key={index} style={{
              transformOrigin: 'center center',
              transform: interpolate(
                [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
              )
            }}>
            {props.children[index]}
          </animated.span>
        )
      case "bar":
        return (
          <animated.span className="inline-block animate-block" onMouseEnter={() => handleMouseOver()}
            key={index} style={{
              transformOrigin: 'center center',
              transform: interpolate(
                [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
              )
            }}>
            <InviewBar2 key={index} index={index} barWidth={barWidth} colorSet={props.colorSet} noShowColor={noShowColor} />
          </animated.span>
        )
      case "img":
        return (
          <animated.span onMouseEnter={() => handleMouseOver()} className={`inline-block animate-block`}
            key={index} style={{
              transform: interpolate(
                [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px) rotateX(${f * r}deg)`
              )
            }}> {props.children[index]}
          </animated.span>
        )
      case "colorBgText":
        return (
          <motion.span className="inline-block" variants={pageVariants} initial='initial' transition={{ duration: 1 + Math.random(), type: "tween", ease: "anticipate" }} exit='down' animate="in">
            <animated.span onMouseEnter={() => handleMouseOver()} className={`px-1 ${props.largeBar ? 'py-20': 'py-1'} inline-block animate-block bg-${colorSet[index%colorSet.length][0]}`}
              key={index} style={{
                color: colorSet[index%colorSet.length][1],
                transform: interpolate(
                  [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                  (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px) rotateX(${f * r}deg)`
                )
              }}> {props.children[index]}
            </animated.span>
          </motion.span>
        )
      default:
        return (
          <animated.span className="inline-block animate-block" onMouseEnter={() => handleMouseOver()}
            key={index} style={{
              transformOrigin: 'center center',
              transform: interpolate(
                [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
              )
            }}>
            <InviewBar2 key={index} index={index} noShowColor={noShowColor} />
          </animated.span>
        )
    }
    return (
      <animated.span className="inline-block animate-block" onMouseEnter={() => handleMouseOver()}
        key={index} style={{
          transformOrigin: 'center center',
          transform: interpolate(
            [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
            (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
          )
        }}>
        {type === 'text' ? props.children[index]: <InviewBar2 key={index} index={index} noShowColor={noShowColor} />}
      </animated.span>
    )
  }

  return (
    <>
      {
        childAnimation.map(({ x, y, z }, index) => (
          generateAnimatedBlocks({x,y,z}, index)
      ))}
    </>
  )
}
