import { useSpring, animated } from 'react-spring';
import Moon from './shapes/Moon';
import Sun from './shapes/Sun';
import Sun2 from './shapes/Sun2';
import Sun3 from './shapes/Sun3';
import Wave from './shapes/Wave';
import Square from './shapes/Square';
import StraightWave from './shapes/StraightWave';
import Rect from './shapes/Rect';
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
import { Link } from 'react-router-dom';
import DelayLink from '../ultils/DelayLink';
import './Item.scss';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const piePosX = window.innerWidth - 100;
const piePosY = window.innerHeight + 50;
const trans1 = (x, y) => `translate3d(${-x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${-x / 8 + 35}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${-y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${-y / 3.5}px,0)`
const trans5 = (x, y) => `translate3d(${-x / 60}px,${y / 60}px,0)`
const trans6 = (x, y) => `translate3d(${piePosX}px,${piePosY}px,0)`

const content = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const downMotion = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};
const upMotion = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export default function Items(props) {
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
  const up1 = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:50 }, config: { duration: 800, easing: easings.easeCubic } });
  const down1 = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:50 }, config: { duration: 800, easing: easings.easeCubic } });
  return (
    <motion.ul
          variants={content}
          animate="animate"
          initial="initial" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      {
        props.items && props.items.length>0 && props.items.map((item, index)=><li key={index} value={props.value}  className={`item flex flex-row items-center justify-center md:flex-col ${flexDirection[index%2]}`}>

          <div className={`h-full ${colorPalette[index%4]} flex items-center justify-center`}>
            <div className="sm:hidden">
              <Rect color={rectPalette[index%4]} index={index}/>
            </div>
            <motion.div variants={upMotion}>
              <animated.div style={{ transform: props1.xy.interpolate(trans5) }}>
                <div className={`rect flex items-center justify-center sm:transform-gpu sm:scale-80 ${randomBgArr[Math.floor(Math.random()*11)]} ${categoryMainShape[index%4]}`}>
                  <span className={randomBgArr[Math.floor(Math.random()*11)]}></span>
                </div>
              </animated.div>
            </motion.div>
            <motion.div variants={downMotion}>
              <animated.div className="sm:hidden" style={{ transform: props1.xy.interpolate(trans3) }}>
                <Sun3 clicked={clicked} />
              </animated.div>
            </motion.div>
          </div>
          <div className="flex justify-center items-center h-full" style={{"backgroundColor": "var(--gray-light)"}}>
          <animated.div style={up1}>
            <figcaption className={`md:py-14 mx-28 ${textAlign[index%2]}`} style={{maxWidth: "250px"}}>
              <h3 className="text-5xl">{item.cat}</h3>
              <div className="my-3">{item.catFigcaption}</div>
              <button onClick={() => { setClicked(!clicked); cursorChangeHandler( clicked + "-clicked")}} className="text-left border rounded-sm py-3 px-6">
                {
                  /*
                    <ClickSoundLink text="View Questions" link={`/questions/${index+1}`} />
                  */
                }
                <DelayLink delay="600" to={`/interview/${index}`}>Questions Gallery</DelayLink>
              </button>
            </figcaption>
          </animated.div>
          </div>
        </li>)
      }
    </motion.ul>
  )
}
