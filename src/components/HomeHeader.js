import React, { useContext, useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { MouseContext } from "./../context/mouse-context";
import MainLeft from './MainLeft';
import Reward from './Reward/Reward.js';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "./Reward/MemphisSets";
import DotRing from "./DotRing/DotRing";
import Logo from '../components/Logo';
import Moon from '../components/shapes/Moon';
import Rect from '../components/shapes/Rect';
import InviewBar2 from '../components/inview/InviewBar2';
import InviewText from '../components/inview/InviewText';
import InviewText2 from '../components/inview/InviewText2';
import InviewHorizontalBar from '../components/inview/InviewHorizontalBar';
import DelayLink from '../ultils/DelayLink';
import useSound from 'use-sound';
import cannonSfx from './cannon.mp3';
import { motion } from "framer-motion";
import { content, upMotion, downMotion } from './AnimationSet';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../ultils/TransitionSet';
import { SplitText, LetterWrapperProp, WordWrapperProp, LineWrapperProp } from '@cyriacbr/react-split-text';
import { LetterDash } from '../components/LetterDash';

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
  const randomBg = ["dot-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg"];
  const [play] = useSound(cannonSfx);
  const canvasInput = useRef(null);
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
  const trans1 = (x, y) => `rotate(130deg) translate3d(${x / 60}px,${y / 10}px,0)`
  const trans2 = (x, y) => `translate3d(${-x / 8 + 35}px,${y / 8 - 230}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${-y / 6 - 200}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${-y / 3.5}px,0)`
  const trans5 = (x, y) => `translate3d(${-x / 60}px,${y / 60}px,0)`
  const [props1, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  const [showBang, setShowBang] = useState(false);

  const styles ={
    perspective: "350px",
    perspectiveOrigin: "50% 50%"
  }

  function confetti(){
    canvasInput.current.rewardMe();
  }


  function handleCannonClick() {
    play();
    confetti();
    setShowBang(true);
    setTimeout(() => {
      setShowBang(false);
    }, 400)
  }
  const randomBgArr = ["triangle-bg", "dot-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg", "radial-bg2"]; // do not include radial-bg in not square shape

  return (
    <motion.div style={styles} variants={content} animate="animate"
    initial="initial" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })} className="h-screen w-screen flex flex-row homehead lg:flex-col lg:h-auto">
      <div onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })} className={`relative w-3/5 relative h-full lg:w-full lg:h-auto`}>
        <motion.div className={`bg-${leftColor} flex items-center justify-center w-full h-screen`} variants={pageVariants} transition={pageTransition2} initial='initial' exit='leftOut' animate='in'>
          <div className="transform rotate-60">
            <motion.div variants={pageVariants} transition={pageTransition} initial='initial' animate='in' exit='leftOut' className={`${randomBgArr[Math.floor(Math.random()*11)]} flex items-center justify-center tall-rect w-8/12 sm:w-11/12 md:w-9/12 bg-gray-lightest text-blue p-10 default-window border`}>
              <span className={`w-24 h-24 ${randomBgArr[Math.floor(Math.random()*11)]} block`}></span>
            </motion.div>
          </div>
        </motion.div>
        <div className="lg:hidden absolute left-1/4 bottom-1/4">
          <Moon bgColor={leftColor} />
        </div>
      </div>
      <div className={`w-2/5 flex items-center justify-center lg:w-full lg:h-auto relative`}>
        <motion.div className="bg-gray-light flex items-center w-full h-screen" variants={pageVariants} transition={pageTransition} initial='initial' animate='in' exit='leftOut'>
          <div className="w-9/12 sm:w-11/12 md:w-9/12 mt-10 text-2xl lg:text-xl homehead-right ml-20 lg:ml-0 lg:mt-20">
            <motion.div variants={pageVariants} transition={pageTransition} initial='initial' animate='in' exit='leftOut' className={`text-left p-8`}>
              <SplitText
                WordWrapper={({ wordIndex, countIndex, children }) => (
                  <span>
                  <InviewText index={countIndex}>
                    {children}
                  </InviewText>
                  </span>
                )}

              >
                Anni Wang is an UX Engineer, a Design Technologist. a designer and coder, a prototyper.
              </SplitText>
            </motion.div>
          </div>
          <span className="absolute bang">
            {showBang ? 'Bang!': 'click=!click'}
          </span>
          <animated.div onClick={()=>handleCannonClick()} style={{ transform: props1.xy.interpolate(trans1) }} className="cannon absolute z-20 w-full">
            <img src="/img/cannon.svg" />
            <Reward ref={canvasInput} type='emoji' config = {{"emoji": BallonSet(), "elementCount": 5, "spread": 1200, "decay": 0.6, "elementSize": 180, "lifetime": 500}}></Reward>
          </animated.div>
          <div style={{ width: "50px" }} className="flex flex-col justify-center absolute left-0 top-0 h-full">
              {

                [0,1,2,3,4,5,6,7].map((item, index) => (
                    <InviewBar2 key={index} index={index} noShowColor={leftColor} />
                ))

              }
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
