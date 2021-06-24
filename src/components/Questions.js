import React, { useState, useContext } from 'react';
import { useSprings, animated, to as interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Arrow from './shapes/Arrow';
import FlickHand from './shapes/FlickHand';
import Footer from "./Footer";
import { MouseContext } from "../context/mouse-context";
import useMousePosition from "../hooks/useMousePosition";
import useCookie from "../hooks/useCookie";

export default function Questions(value) {
  let questions = value.questions;
  const categoryTitle = value.cat;
  const [cookie, updateCookie] = useCookie("onboarding", "false"); // make sure onboarding panel only show once.
  const [rightAnswerNum, setRightAnswerNum] = useState(0);
  const [wrongAnswerNum, setWrongAnswerNum] = useState(0);


  const title = value.questionTitle;
  const answer = value.questionAnswer;
  let num = value.questionNumber;
  // change question number to start from 1
  num++;
  num = num < 10 ? num = "0" + num: num;


  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // These two are just helpers, they curate spring data, values that are later being interpolated into css
  const to = (i) => ({ x: i *-10, y: i*10, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
  const from = (i) => ({ x: 0, y: -1000, rot: 0, scale: 1.5 })
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  const trans = (r, s) => `perspective(0) rotateX(30deg) scale(${s})`


  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, set] = useSprings(questions.length, (i) => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    set((i) => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      if (dir == -1 && isGone) setRightAnswerNum(rightAnswerNum + 1)
      if (dir == 1 && isGone) setWrongAnswerNum(wrongAnswerNum + 1)
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === questions.length) {
      /*setTimeout(function(){
        gone.clear() || set((i) => to(i));
        setRightAnswerNum(0);
        setWrongAnswerNum(0);
      }, 600);*/
    }
  })

  function redo() {
    gone.clear() || set((i) => to(i));
    setRightAnswerNum(0);
    setWrongAnswerNum(0);
  }

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  const cursorSide = x > window.innerWidth / 2 ? "right" : "left";

  return (
    <div>
      <div onMouseMove={() => cursorChangeHandler(cursorSide)}>
        <div className="flex items-center justify-center checkmark-container">
          {
            /*props.map((item, i) => (
              i < rightAnswerNum ? <Checkmark checked="true" key={i} />: <Checkmark key={i} />
            ))*/
          }
          {
            /*props.map((item, i) => (
              i < wrongAnswerNum ? <Cross crossed="true" key={i} />: <Cross key={i} />
            ))*/
          }
        </div>
        {
          /*<div className="score-panel flex items-center justify-center">
          <span className="bg-white mx-2 px-2">{rightAnswerNum}</span>
          <h3 style={{"font-size": "1rem"}} className="text-white text-center">Interview<br /> Score</h3>
          <span className="bg-white mx-2 px-2">{wrongAnswerNum}</span>
        </div>*/
        <div>
          <h1 className="absolute text-white inset-y-1/2 text-3xl left-10 w-36">{categoryTitle} / <span className="text-sm">Tinder Way</span><Arrow size="40px" /></h1>
        </div>
        }
          <div className="question-window">
            {props.map(({ x, y, rot, scale }, i) => (
              <animated.div key={i} style={{ x, y }} onMouseMove={() => cursorChangeHandler("hand")} className="flex items-center justify-center absolute w-full h-full">
                {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                <animated.div {...bind(i)} className="rainbow-bg" style={{ transform: interpolate([rot, scale], trans) }}>
                  <span className="p-5 text-3xl bg-white"><span className="text-5xl">{i<10? "0"+i: i}</span>.{questions[i].title}</span>
                  <span style={{"height": "200px"}} className="p-5 text-2xl overflow-y-scroll bg-white">{questions[i].answer}</span>
                </animated.div>
              </animated.div>
            ))}
            <div className="text-sm absolute z-0" onClick={() => redo()}>Redo Questions</div>
          </div>
        </div>
        <div onClick={() => {updateCookie("hidden")}} className={`${cookie} onboarding absolute w-full h-full z-10 bg-white flex flex-cols items-center justify-center`}>
          <FlickHand size="200px" color="#fff" />
          <span className="text-3xl">Flick right to tell Anni - you like her answer.</span>
        </div>
    </div>
  )
}
