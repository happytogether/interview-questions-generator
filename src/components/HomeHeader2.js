import React, { useContext, useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { MouseContext } from "./../context/mouse-context";
import MainLeft from './MainLeft';
import Reward from './Reward/Reward.js';
import DotRing from "./DotRing/DotRing";
import Logo from '../components/Logo';
import Moon2 from '../components/shapes/Moon2';
import Rect from '../components/shapes/Rect';
import DelayLink from '../ultils/DelayLink';
import InviewBar2 from '../components/inview/InviewBar2';
import useSound from 'use-sound';
import cannonSfx from './cannon.mp3';
import { motion } from "framer-motion";
import { content, upMotion, downMotion } from './AnimationSet';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionDelay, pageTransitionDelay2, pageVariants } from '../ultils/TransitionSet';

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
  const randomBg = ["dot-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg"];
  const [props1, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))

  const styles ={
    "perspective": "350px",
    "perspectiveOrigin": "50% 50%"
  }

  const randomBgArr = ["triangle-bg", "dot-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg", "radial-bg2"]; // do not include radial-bg in not square shape

  return (
    <div>
      <div className="h-screen w-screen flex flex-row homehead lg:flex-col lg:h-auto">
        <div className={`overflow-hidden flex lg:flex-col items-center justify-center w-full h-screen lg:h-auto relative`}>
          <div className="relative bg-gray-light w-3/5 flex items-center justify-center h-full">
            <div className="flex flex-col justify-center absolute right-0 top-0 h-full" style={{"width": "25px"}}>
                {

                  [0,1,2,3,4,5,6,7].map((item, index) => (
                      <InviewBar2 key={index} index={index} noShowColor={leftColor} />
                  ))

                }
            </div>
            <div className="default-window bg-white p-10 w-6/12 sm:w-11/12 md:w-9/12 mt-10 lg:text-xl lg:ml-0 lg:mt-20">
              <h2 className="text-2xl border-b pb-1">Interview<br /><span className="w-6/12 border-b pr-20 sm:w-full">Anni Wang </span> here and get some FUN.</h2>
              <p className="text-md my-5"><span>anni ? 'hired' : null</span></p>
              <div className="text-left">
                <div className="flex mt-2 space-x-4">
                  <div className="border rounded-sm py-3 px-6 mt-3">
                  <DelayLink to={{
                    pathname: "/interview",
                    state: {
                      bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                      textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
                    }}}> Start Interview Process</DelayLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden absolute right-1/4 bottom-1/4">
              <Moon2 bgColor="leftColor" />
            </div>
          </div>
          <div className={`w-2/5 overflow-hidden relative h-full lg:w-full lg:h-screen`}>
            <div className={`bg-${rightColor} flex items-center justify-center w-full h-screen`}>
              <div className="transform rotate-45">
                <div style={{"width": "300px", "height": "300px"}} className={`${randomBgArr[Math.floor(Math.random()*11)]} flex items-center justify-center large-rect w-8/12 sm:w-11/12 md:w-9/12 bg-gray-lightest text-blue p-10 default-window border`}>
                  <span className={`w-24 h-24 ${randomBgArr[Math.floor(Math.random()*11)]} block`}></span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
