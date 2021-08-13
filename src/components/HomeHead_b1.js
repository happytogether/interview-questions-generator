import React, { useContext, useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { MouseContext } from "./../context/mouse-context";
import MainLeft from './MainLeft';
import Reward from './Reward/Reward.js';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "./Reward/MemphisSets";
import DotRing from "./DotRing/DotRing";
import Logo from '../components/Logo';
import Rect from '../components/shapes/Rect';
import DelayLink from '../ultils/DelayLink';
import useSound from 'use-sound';
import cannonSfx from './cannon.mp3';
import { motion } from "framer-motion";
import { content, upMotion, downMotion } from './AnimationSet';

export default function HomeHead(props) {
  const bgColorValue = props.bgColorValue;
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
    "perspective": "350px",
    "perspectiveOrigin": "50% 50%"
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

  return (
    <div className="h-screen w-screen flex flex-row homehead md:flex-col md:h-auto">
      <div className={`w-3/5 bg-gray-light flex items-center justify-center lg:w-full lg:py-20`}>
        <div className="lg:hidden">
          <Rect color='var(--orange)' index={1}/>
        </div>
        <motion.div variants={upMotion} className="w-8/12 sm:w-11/12 md:w-9/12 mt-10 text-2xl lg:text-xl homehead-right ml-20 lg:ml-0 lg:mt-20">
          <div className={`text-left p-8`}>
            <span className="p-3 my-3 bg-white leading-normal">Anni Wang is an UX Engineer, a Design Technologist. </span><br />
            <span className="p-1 mx-4 bg-white">a designer and coder</span>
            <span className="p-2 mx-4 bg-white">,a prototyper.</span><br /><br /><br />
          </div>
        </motion.div>
      </div>
      <div className={`w-2/5 flex bg-${bgColorValue[0][0]} justify-center items-center h-full lg:w-full lg:py-20`}>
        <motion.div variants={upMotion} className={`w-8/12 sm:w-11/12 md:w-9/12 bg-gray-lightest text-blue p-10 default-window border`}>
          <h2 className="text-3xl pb-2 border-b border-r">Interview<br /><input className="w-6/12 sm:w-full" type="text" placeholder="Anni Wang" />and get some FUN.</h2>
          <p className="my-5">*Questions will be randomly gernerated.</p>
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
        </motion.div>
      </div>
    </div>
  )
}
