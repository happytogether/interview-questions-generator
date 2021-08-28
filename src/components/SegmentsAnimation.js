import { useContext, useState, useEffect, useMemo } from "react";
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import InviewBar2 from './inview/InviewBar2';
import MenuBar from './inview/MenuBar';
import FullScreenBar from './inview/FullScreenBar';
import getRandomFromArray from '../ultils/GetRandomFromArray';
import { BgColorSet, LightColorSet } from './Sets/ColorSet';
import { motion } from "framer-motion";
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../ultils/TransitionSet';
import windSfx from '../assets/wind.mp3';
import DelayLink from '../ultils/DelayLink';
import { isMobile } from "react-device-detect";

let audio = new Audio(windSfx);

export default function SegmentsAnimation(props) {
  const bgColorValue = props.bgColorValue;
  const barColorSet = BgColorSet;
  const logoColorSet = props.logoColorSet || BgColorSet;
  const logoNoShowColor = props.logoNoShowColor;
  const barWidth = props.barWidth;
  const barHeight = props.barHeight;
  const gap = props.gap;
  const segment = props.segment;
  const type = props.type;
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { f, r } = useSpring({ f: hovered ? 0 : 1, r: hovered ? -3 : 3 })
  const x = props.x;
  const y = props.y;
  const zIntervalFrom = props.zIntervalFrom;
  const zIntervalTo = props.zIntervalTo;
  const delay = props.delay;
  const transitionSet = [pageTransition, pageTransition2, pageTransition3, pageTransitionShort];
  const colorSet = BgColorSet.filter((color, index) => {
    return color[0]!== props.noShowColor;
  })
  const menuColorSet = props.menuColorSet;
  const data = props.data;
  //const [playWind, { stop }] = useSound(windSfx);
  const bgColorArray = getRandomFromArray(['bg-pink', 'bg-yellow', 'bg-red', 'bg-orange', 'bg-purple', 'bg-blue', 'bg-green']);
  const primaryColor = bgColorArray[0];
  const secondaryColor = bgColorArray[1]
  const childAnimation = useSprings(
    segment,
    [...Array(segment).keys()].map((i) => ({ delay: i * delay, opacity: 1, x: hovered? x: 0, y: hovered? y: 0, z: hovered? -20: 0}))
  )

  const timing = 250;
  useEffect(() => {
    // We only want to act when we're going from
    // not-booped to booped.
    if (!hovered) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setHovered(false);
      audio.pause();
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
  }, [hovered, timing]);

  function handleMouseOver() {
    setHovered(true);
    //playWind();
  }

  function handleBarMouseOver() {
    setHovered(true);
    audio.play();
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
      break;
      case "fullscreen-bar": // menu navigation initial animation
        return (
          <motion.div className={`flex-1 ${menuColorSet[1][0]}`} variants={pageVariants} initial='initialYNegative100vh' transition={{ duration: 1 - .1*index, type: "tween", ease: "anticipate" }} exit='down' animate="in">
            <animated.div
              key={index} style={{
                transformOrigin: 'center center',
                transform: interpolate(
                  [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                  (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
                )
              }}>
              <FullScreenBar key={index} index={index} />
            </animated.div>
          </motion.div>
        )
      break;
      case "fullscreen-h-bar": // menu navigation primary link section
        return (
          <motion.div className={`flex-1 flex items-center ${bgColorValue[index][0]} hover:${menuColorSet[1][0]}`} style={{color: bgColorValue[index][1]}} variants={pageVariants} initial='initialXNegative100vw' transition={{ duration: .5+.2*index, type: "tween", ease: "circOut"}} exit='leftInitial' animate="xin">
            <animated.div className="pl-10"
              key={index} style={{
                transformOrigin: 'center center',
                transform: interpolate(
                  [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                  (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
                )
              }}>
              <FullScreenBar direction="h" key={index} index={index} bgColorValue={bgColorValue}>
                <DelayLink to={{
                  pathname: data[index].link,
                  state: {
                    bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0], bgColorValue[4][0], bgColorValue[5][0]],
                    textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1], bgColorValue[4][1], bgColorValue[5][1]]
                  }}}>
                  <animated.svg className="inline-block mr-4" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill={bgColorValue[index][1]} d={data[index].path} /></animated.svg>
                  <span className="px-1">
                    {data[index].title}
                  </span>
                </DelayLink>
              </FullScreenBar>
            </animated.div>
          </motion.div>
        )
      break;
      case "bar":
        return (
          <animated.span className="inline-block animate-block" onMouseEnter={isMobile ? () => { return false; } : handleBarMouseOver}
            key={index} style={{
              transformOrigin: 'center center',
              transform: interpolate(
                [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
              )
            }}>
            <InviewBar2 key={index} index={index} barWidth={barWidth} noShowColor={props.noShowColor} />
          </animated.span>
        )
      break;
      case "menu-bar":
        return (
          <animated.span className="inline-block animate-block" onMouseEnter={() => handleMouseOver()}
            key={index} style={{
              transformOrigin: 'center center',
              transform: interpolate(
                [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
              )
            }}>
            <MenuBar key={index} index={index} barWidth={barWidth} barHeight={barHeight} gap={gap} />
          </animated.span>
        )
      break;
      case "bar-light":
        return (
          <animated.span className="inline-block animate-block" onMouseEnter={() => handleMouseOver()}
            key={index} style={{
              transformOrigin: 'center center',
              transform: interpolate(
                [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px)`
              )
            }}>
            <InviewBar2 key={index} index={index} barWidth={barWidth} colorSet="light" />
          </animated.span>
        )
      break;
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
      break;
      case "colorBgText":
        return (
          <motion.span className="inline-block" variants={pageVariants} initial='initial' transition={{ duration: 1 + Math.random(), type: "tween", ease: "anticipate" }} exit='down' animate="in">
            <animated.span onMouseEnter={() => handleMouseOver()} className={`px-1 ${props.largeBar ? 'py-20': 'py-1'} inline-block animate-block ${logoColorSet[index%logoColorSet.length][0]}`}
              key={index} style={{
                color: logoColorSet[index%logoColorSet.length][1],
                transform: interpolate(
                  [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                  (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px) rotateX(${f * r}deg)`
                )
              }}> {props.children[index]}
            </animated.span>
          </motion.span>
        )
      break;
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
            <InviewBar2 key={index} index={index} />
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
        {type === 'text' ? props.children[index]: <InviewBar2 barColorSet={barColorSet} key={index} index={index} />}
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
