import { useSpring, animated } from 'react-spring';
import Moon from './shapes/Moon';
import Sun from './shapes/Sun';
import Sun2 from './shapes/Sun2';
import Sun3 from './shapes/Sun3';
import Wave from './shapes/Wave';
import Rect from './shapes/Rect';
import Moon2 from './shapes/Moon2';
import Circle from './shapes/Circle';
import { useContext, useState, useEffect } from "react";
import DotRing from "./DotRing/DotRing";
import { MouseContext } from "../context/mouse-context";
import HoverIntent from 'react-hoverintent';
import RandomBg from '../RandomBg';
import handleViewport from 'react-in-viewport';
import ClickSoundLink from './ClickSoundLink';
import { motion } from "framer-motion";
import * as easings from 'd3-ease'
import { Store } from '../Store';
import DelayLink from '../ultils/DelayLink';
import { Link } from "react-router-dom";
import './Item.scss';
import { content, upMotion, downMotion, upMotionSlow } from './AnimationSet';
import InviewBar2 from '../components/inview/InviewBar2';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const piePosX = window.innerWidth - 100;
const piePosY = window.innerHeight + 50;
const trans1 = (x, y) => `translate3d(${-x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${-x / 8 + 35}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${-y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${-y / 3.5}px,0)`
const trans5 = (x, y) => `translate3d(${-x / 60}px,${y / 60}px,0)`
const trans6 = (x, y) => `translate3d(${piePosX}px,${piePosY}px,0)`

export default function Items(props) {
  const bgColorValue = props.bgColorValue;
  const colorPalette =["bg-green", "bg-pink", "bg-purple text-white", "bg-yellow"];
  // purple with blue rect by using index number
  const rectPalette = ["bg-blue", "bg-orange", "bg-yellow", "bg-purple"];
  const randomBg = RandomBg();
  const randomBgArr = ["triangle-bg", "dot-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg", "radial-bg2"]; // do not include radial-bg in not square shape
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const categoryMainShape = ["large-rect", "large-wide-rect", "square", "hexagon"];
  const flexDirection = ["", "flex-row-reverse"];
  const textAlign = ["left", "right"];

  const [mouseover, setMouseover] = useState("");
  function handleMouseoverChange(newValue) {
      setMouseover(newValue);
  }
  const [clicked, setClicked] = useState(false);
  const [props1, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  let createArray =  Array.from(Array(8), () => {
    return new Array;
  })

  return (
    <motion.ul onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      {
        props.items && props.items.length>0 && props.items.map((item, index)=><li key={index} value={props.value}  className={`item relative flex flex-row items-center justify-center lg:h-auto lg:flex-col lg:flex-col-reverse ${flexDirection[index%2]}`}>
          <div className={`h-full bg-${bgColorValue[index+1][0]} flex items-center justify-center lg:w-full lg:py-20`}>
            <motion.div variants={upMotion}>
              <animated.div style={{ transform: props1.xy.interpolate(trans5) }}>
                <div className={`default-window flex items-center justify-center sm:transform-gpu sm:scale-80 ${randomBgArr[Math.floor(Math.random()*11)]} ${categoryMainShape[index%4]}`}>
                  <span className={randomBgArr[Math.floor(Math.random()*11)]}></span>
                </div>
              </animated.div>
            </motion.div>
            {
              index %2 !==1 ? <motion.div variants={downMotion}>
                <animated.div className="lg:hidden" style={{ transform: props1.xy.interpolate(trans3) }}>
                  <Sun3 clicked={clicked} />
                </animated.div>
                <motion.div variants={downMotion}>
                  <animated.div className="lg:hidden" style={{ transform: props1.xy.interpolate(trans5) }}>
                    <Moon bgColor={bgColorValue[index+1][0]} />
                  </animated.div>
                </motion.div>
              </motion.div> : null
            }

          </div>
          <div className="relative overflow-hidden flex justify-center items-center h-full lg:w-full lg:py-20" style={{"backgroundColor": "var(--gray-light)"}}>
            <div className={`flex flex-col justify-center absolute right-0 top-0 h-full`} style={{width: "25px", zIndex: 0}}>
                {

                  createArray.map((item, i) => (
                      <InviewBar2 key={i} index={i} noShowColor={bgColorValue[index+1][0]} />
                  ))

                }
            </div>
            <motion.div variants={upMotion} className="z-10">
              <figcaption className={`md:py-14 mx-28 ${textAlign[index%2]}`} style={{maxWidth: "250px"}}>
                <h3 className="text-5xl">{item.cat}</h3>
                <div className="my-3">{item.catFigcaption}</div>
                <button onClick={() => { setClicked(!clicked); cursorChangeHandler( clicked + "-clicked")}} className="delay-link-btn text-left border rounded-sm">
                  <DelayLink to={{
                    pathname: `/gallery/${index}`,
                    state: {
                      bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0], bgColorValue[4][0], bgColorValue[5][0]],
                      textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1], bgColorValue[4][1], bgColorValue[5][1]],
                    }
                  }}>Questions Gallery</DelayLink>
                </button>
              </figcaption>
              {
                index%2 === 1 ? <div className="lg:hidden absolute left-2/3 bottom-1/4">
                  <Rect color={rectPalette[index%4]} index={index} />
                </div>: null
              }
            </motion.div>
          </div>
        </li>)
      }
    </motion.ul>
  )
}
