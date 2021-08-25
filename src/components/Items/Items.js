import { useContext, useState, useEffect, useMemo } from "react";
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import { motion } from "framer-motion";
import Moon from '../shapes/Moon';
import Sun3 from '../shapes/Sun3';
import Wave from '../shapes/Wave';
import Rect from '../shapes/Rect';
import DotRing from "../DotRing/DotRing";
import { MouseContext } from "../../context/mouse-context";
import { Store } from '../../Store';
import DelayLink from '../../ultils/DelayLink';
import { Link } from "react-router-dom";
import './Item.scss';
import { content, upMotion, downMotion, upMotionSlow } from '../Sets/AnimationSet';
import { bgSet } from '../BackgroundSet';
import { BgColorSet } from '../Sets/ColorSet';
import getRandomFromArray from '../../ultils/GetRandomFromArray';
import InviewText from '../inview/InviewText';
import DelayLinkButton from '../DelayLinkButton';
import { SplitText, LetterWrapperProp, WordWrapperProp, LineWrapperProp } from '@cyriacbr/react-split-text';
import { pageTransition, pageTransition2, pageTransition3, pageVariants } from '../../ultils/TransitionSet';
import SegmentsAnimation from '../SegmentsAnimation';


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
  const randomBg = useMemo(()=> getRandomFromArray(bgSet));
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
  const barColorSet = BgColorSet;

  return (
    <motion.ul onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      {
        props.items && props.items.length>0 && props.items.map((item, index)=><li key={index} value={props.value}  className={`item relative flex flex-row items-center min-h-screen justify-center lg:h-auto lg:flex-col lg:flex-col-reverse ${flexDirection[index%2]}`}>
          <div className={`h-full ${bgColorValue[index+1][0]} flex items-center justify-center lg:w-full lg:py-20`}>
            <motion.div variants={upMotion}>
              <animated.div style={{ transform: props1.xy.interpolate(trans5) }}>
                <div className={`default-window flex items-center justify-center sm:transform-gpu sm:scale-80 ${randomBg[0]} ${categoryMainShape[index%4]}`}>
                  <span className={randomBg[1]}></span>
                </div>
              </animated.div>
            </motion.div>
            {
              index %2 !==1 ? <motion.div variants={downMotion}>
                <animated.div className="lg:hidden" style={{ transform: props1.xy.interpolate(trans3) }} >
                  <Sun3 clicked={clicked} />
                </animated.div>
                <motion.div variants={downMotion}>
                  <animated.div className="lg:hidden">
                    <Moon bgColor={bgColorValue[index+1][0]} />
                  </animated.div>
                </motion.div>
              </motion.div> : null
            }

          </div>
          <div className="relative overflow-hidden flex justify-center items-center h-full lg:w-full lg:py-20" style={{"backgroundColor": "var(--gray-light)"}}>
            <div className={`flex flex-col justify-center absolute right-0 top-0 h-full`} style={{width: "25px", zIndex: 0}}>
              <SegmentsAnimation barColorSet={barColorSet} segment={8} barWidth={25} type="bar" x={-20} y={-20} zIntervalFrom={-20} zIntervalTo={-20} delay={50} bgColorValue={bgColorValue} noShowColor={bgColorValue[index+1][0]}></SegmentsAnimation>
            </div>
            <motion.div variants={pageVariants} transition={pageTransition} exit='down' className="z-10">
              <figcaption className={`md:py-14 mx-28 ${textAlign[index%2]}`} style={{maxWidth: "250px"}}>
                <h3 className="text-5xl">
                  <SplitText
                    LineWrapper={({ lineIndex, children }) => (
                      <span>
                      <InviewText variants="upReveal" index={lineIndex} delay={0.025}>
                        {children}
                      </InviewText>
                      </span>
                    )}

                  >
                    {item.cat}
                  </SplitText>
                </h3>
                <div className="my-3">
                  <SplitText
                    WordWrapper={({ wordIndex, countIndex, children }) => (
                      <span>
                      <InviewText variants="upReveal" index={countIndex}>
                        {children}
                      </InviewText>
                      </span>
                    )}
                  >
                    {item.catFigcaption}
                  </SplitText>
                </div>
                <DelayLinkButton bgColorValue={bgColorValue} pathname={`/gallery/${index}`} linkText='Questions Gallery' />
              </figcaption>
              {
                index%2 === 1 ? <div className="lg:hidden absolute left-2/3 bottom-1/4">
                  <Rect index={index} />
                </div>: null
              }
            </motion.div>
          </div>
        </li>)
      }
    </motion.ul>
  )
}
