import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import { MouseContext } from "./../context/mouse-context";
import DotRing from "./DotRing/DotRing";
import Logo from '../components/Logo';
import Moon from '../components/shapes/Moon';
import Cannon from '../components/shapes/Cannon';
import Rect from '../components/shapes/Rect';
import InviewText from '../components/inview/InviewText';
import InviewText2 from '../components/inview/InviewText2';
import SegmentsAnimation from '../components/SegmentsAnimation';
import InviewHorizontalBar from '../components/inview/InviewHorizontalBar';
import { bgSet } from '../components/BackgroundSet';
import getRandomFromArray from '../ultils/GetRandomFromArray';
import { motion } from "framer-motion";
import { content, upMotion, downMotion } from './AnimationSet';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../ultils/TransitionSet';
import { SplitText, LetterWrapperProp, WordWrapperProp, LineWrapperProp } from '@cyriacbr/react-split-text';
import { BgColorSet, ColorSet } from '../components/ColorSet';

export default function HomeHeader(props) {
  const prePrimaryColor = props.prePrimaryColor;
  const preSecondaryColor = props.preSecondaryColor;
  const preThirdColor = props.preThirdColor;
  const preFourthColor = props.preFourthColor;
  const bgColorValue = props.bgColorValue;
  const leftColor = props.leftColor;
  const rightColor = bgColorValue[5][0];
  const rightRectColor = bgColorValue[5][2] === preSecondaryColor ? bgColorValue[6][2] : bgColorValue[5][2];
  const primaryColor = bgColorValue[0][0];
  const primaryTextColor = bgColorValue[0][1];
  const secondaryColor = bgColorValue[1][0];
  const secondaryTextColor = bgColorValue[1][1];
  const thirdColor = bgColorValue[2][0];
  const thirdTextColor = bgColorValue[2][1];
  const fourthColor = bgColorValue[3][0];
  const fourthTextColor = bgColorValue[3][1];
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
  const trans1 = (x, y) => `translate3d(${-x / 30}px, ${y / 60}px,0)`
  const trans2 = (x, y) => `translate3d(${-x / 8 + 35}px,${y / 8 - 230}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${-y / 6 - 200}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${-y / 3.5}px,0)`
  const trans5 = (x, y) => `translate3d(${-x / 60}px,${y / 60}px,0)`
  const [props1, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  const randomBg = useMemo(()=>getRandomFromArray(bgSet), []);
  const barColorSet = useMemo(
    () => getRandomFromArray(BgColorSet.filter((color, index) => {
      return color[0]!== leftColor;
  })),[]);

  return (
    <motion.div variants={content} animate="animate"
    initial="initial" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })} className="h-screen w-screen flex flex-row homehead md:h-auto md:flex-col-reverse">
      <div className={`relative w-3/5 relative h-full lg:w-full lg:h-screen`}>
        <motion.div className={`${leftColor} flex items-center justify-center w-full h-full`} variants={pageVariants} transition={pageTransition2} initial='initial' exit='leftOut' animate='in'>
          <div>
            <animated.div  style={{ transform: props1.xy.interpolate(trans5) }}>
              <motion.div variants={pageVariants} transition={pageTransition} initial='initial' animate='in' exit='leftOut' className={`${randomBg[0]} flex items-center justify-center tall-rect w-8/12 sm:w-11/12 md:w-9/12 bg-gray-lightest text-blue p-10 default-window border`}>
                <span className={`w-24 h-24 ${randomBg[1]} block`}></span>
              </motion.div>
            </animated.div>
          </div>
        </motion.div>
        <motion.div variants={pageVariants} transition={pageTransition3} initial='initial' exit='leftOut' animate='in' className="lg:hidden absolute left-1/4 bottom-1/4">
          <Moon bgColor={leftColor} />
        </motion.div>
      </div>
      <div className={`w-2/5 flex lg:w-full lg:h-auto relative`}>
        <motion.div className="bg-gray-light flex items-center justify-center w-full h-full lg:h-screen" variants={pageVariants} transition={pageTransition} initial='initial' animate='in' exit='leftOut'>
          <div className="w-9/12 mt-10 text-2xl lg:text-xl items-center justify-center homehead-right">
            <motion.div variants={pageVariants} transition={pageTransition} initial='initial' animate='in' exit='leftOut' className={`text-left p-8`}>
              <SplitText
                WordWrapper={({ wordIndex, countIndex, children }) => (
                  <span>
                  <InviewText variants="upReveal" index={countIndex}>
                    {children}
                  </InviewText>
                  </span>
                )}

              >
                Anni Wang is an UX Engineer, a Design Technologist. a designer and coder, a prototyper.
              </SplitText>
            </motion.div>
          </div>
          <animated.div style={{ transform: props1.xy.interpolate(trans1) }} className="cannon absolute z-20 w-full">
            <Cannon />
          </animated.div>
          <div style={{ width: "50px" }} className="flex flex-col justify-center absolute left-0 top-0 h-full">
            <SegmentsAnimation segment={8} barWidth={25} type="bar" x={-20} y={-20} zIntervalFrom={-20} zIntervalTo={-20} delay={50} bgColorValue={bgColorValue} barColorSet={barColorSet}></SegmentsAnimation>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
