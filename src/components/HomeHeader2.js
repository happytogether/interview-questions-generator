import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import { MouseContext } from "./../context/mouse-context";
import Reward from './Reward/Reward.js';
import DotRing from "./DotRing/DotRing";
import Logo from '../components/Logo';
import Moon2 from '../components/shapes/Moon2';
import Rect from '../components/shapes/Rect';
import DelayLink from '../ultils/DelayLink';
import InviewBar2 from '../components/inview/InviewBar2';
import ColorBarAnimation from '../components/ColorBarAnimation';
import DelayLinkButton from '../components/DelayLinkButton';
import getRandomFromArray from '../ultils/GetRandomFromArray';
import { bgSet } from '../components/BackgroundSet';
import { motion } from "framer-motion";
import { content, upMotion, downMotion } from './AnimationSet';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionDelay, pageTransitionDelay2, pageVariants } from '../ultils/TransitionSet';
import InviewText from '../components/inview/InviewText';
import { SplitText, LetterWrapperProp, WordWrapperProp, LineWrapperProp } from '@cyriacbr/react-split-text';

export default function HomeHeader2(props) {
  const bgColorValue = props.bgColorValue;
  const leftColor = bgColorValue[4][0];
  const rightColor = bgColorValue[5][0];
  const rightRectColor = bgColorValue[5][2];
  const primaryColor = bgColorValue[0][0];
  const primaryTextColor = bgColorValue[0][1];
  const secondaryColor = bgColorValue[1][0];
  const secondaryTextColor = bgColorValue[1][1];
  const thirdColor = bgColorValue[2][0];
  const thirdTextColor = bgColorValue[2][1];
  const fourthColor = bgColorValue[3][0];
  const fourthTextColor = bgColorValue[3][1];
  const [props1, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  const randomBg = useMemo(()=> getRandomFromArray(bgSet), []);
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
  const trans1 = (x, y) => `translate3d(${-x / 30}px, ${y / 60}px,0)`
  const trans2 = (x, y) => `translate3d(${x / 30}px, ${-y / 60}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${-y / 6 - 200}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${-y / 3.5}px,0)`
  const trans5 = (x, y) => `translate3d(${-x / 60}px,${y / 60}px,0)`

  return (
    <div>
      <div onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })} className="h-screen w-screen flex flex-row homehead lg:flex-col lg:h-auto">
        <div className={`overflow-hidden flex md:flex-col items-center justify-center w-full h-full lg:h-auto relative`}>
          <div className="relative bg-gray-light w-3/5 lg:w-full lg:h-screen flex items-center justify-center h-full">
            <div className="flex flex-col justify-center absolute right-0 top-0 h-full" style={{"width": "25px"}}>
              <ColorBarAnimation bgColorValue={bgColorValue} noShowColor={rightColor} />
            </div>
            <animated.div style={{ transform: props1.xy.interpolate(trans1) }} className="default-window bg-white p-10 w-6/12 lg:w-9/12 mt-10 lg:text-sm lg:ml-0 lg:mt-20 lg:-ml-12">
              <h2 className="text-2xl lg:text-sm border-b pb-1">Interview<br /><span className="w-6/12 border-b pr-20 sm:w-full">Anni Wang </span> here and get some FUN.</h2>
              <p className="text-md my-5"><span>anni ? 'hired' : null</span></p>
              <div className="text-left">
                <div className="flex mt-2 space-x-4">
                  <DelayLinkButton bgColorValue={bgColorValue} pathname={`/interview`} linkText='Start Interview Process' />
                </div>
              </div>
            </animated.div>
            <div className="lg:hidden absolute" style={{right: '35%', bottom: "20%"}}>
              <Moon2 bgColor="leftColor" />
            </div>
          </div>
          <div className={`w-2/5 overflow-hidden relative h-full lg:w-full lg:h-screen`}>
            <div className={`bg-${rightColor} flex items-center justify-center w-full h-full`}>
              <div className="transform rotate-45">
                <animated.div style={{"width": "300px", "height": "300px", transform: props1.xy.interpolate(trans2)}} className={`${randomBg[0]} flex items-center justify-center large-rect w-8/12 sm:w-11/12 md:w-9/12 bg-gray-lightest text-blue p-10 default-window border`}>
                  <span className={`w-24 h-24 ${randomBg[1]} block`}></span>
                </animated.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
