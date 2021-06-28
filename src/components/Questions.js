import React, { useState, useContext, useRef } from 'react';
import { useSprings, animated, to as interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Arrow from './shapes/Arrow';
import FlickHand from './shapes/FlickHand';
import Footer from "./Footer";
import Smile from "./shapes/Smile";
import Sad from "./shapes/Sad";
import { MouseContext } from "../context/mouse-context";
import useMousePosition from "../hooks/useMousePosition";
import useCookie from "../hooks/useCookie";
import getRandomDifferent from '../getRandomDifferent';
import Reward from './Reward/Reward';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

export default function Questions(value) {
  let questions;
  let categoryTitle;
  let categoryIndex;
  let catKey;

  if (value.data && value.data.length > 0){
    for (let key in value.data) {
      if (value.data[key].cat == value.category) {
        questions = value.data[key].questions;
        categoryTitle = value.data[key].cat;
        categoryIndex = value.data[key].index;
        catKey = parseInt(key);
      }
    }
  }
  /*let userAnswers = [];
  if (localStorage.getItem('category' + categoryIndex) == null) {
    userAnswers = [];
  } else {
    userAnswers = localStorage.getItem('category' + categoryIndex);
  }*/
  /*const [userAnswers, setUserAnswers] = useState();
  setUserAnswers(localStorage.getItem('category' + categoryIndex) || []);
  console.log('888' + userAnswers);*/
  const userAnswers = [0,0,0];
  const [done, setDone] = useState(userAnswers.length === questions.length ? true: false);// check if user finished interview for this category
  //setUserAnswers(useLocalStorage('category' + categoryIndex));

  const [cookie, updateCookie] = useCookie("onboarding", "false"); // make sure onboarding panel only show once.
  const [userAnswerCookie, setUserAnswerCookie] = useCookie("category4", "");
  //setUserAnswerCookie(JSON.stringify(userAnswers));

  const [rightAnswerNum, setRightAnswerNum] = useState(0);
  const [wrongAnswerNum, setWrongAnswerNum] = useState(0);

  // get user's answer from local storage


  const title = value.questionTitle;
  const answer = value.questionAnswer;
  const testArr = [[10, 10], [10, -10], [-10, 10], [-10, -10],[-20,20], [20,20], [-20, -20], [20, -20]];
  const [pos, setPos] = useState([-10, 10]); // cards initial direction


  // These two are just helpers, they curate spring data, propss that are later being interpolated into css
  const to = (i) => ({ x: i *pos[0], y: i*pos[1], scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
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
      if (dir == -1 && isGone) {
        setWrongAnswerNum(wrongAnswerNum + 1); // swipe to left side
        userAnswers = [...userAnswers, 0];
        localStorage.setItem('category' + categoryIndex, userAnswers);
        console.log('isArray' + Array.isArray(userAnswers), userAnswers.length);
        //writeStorage('category' + categoryIndex, userAnswers);
        //localStorage.setItem('category' + categoryIndex, userAnswers);
      }
      if (dir == 1 && isGone) {
        setRightAnswerNum(rightAnswerNum + 1); // swipe to right side
        userAnswers = [...userAnswers, 1];
        localStorage.setItem('category' + categoryIndex, userAnswers);
        console.log('isArray' + Array.isArray(userAnswers), userAnswers);
      }
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === questions.length) {
      setTimeout(function(){
        //gone.clear() || set((i) => to(i));
        //setRightAnswerNum(0);
        //setWrongAnswerNum(0);
        mockdata();
      }, 600);
    }
  })

  function redo() {
    setDone(false);
    gone.clear() || set((i) => to(i));
    setRightAnswerNum(0);
    setWrongAnswerNum(0);
    setPos(getRandomDifferent(testArr, pos));
  }


  // Now we're just mapping the animated propss to our view, that's it. Btw, this component only renders once. :-)
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  const cursorSide = x > window.innerWidth / 2 ? "right" : "left";

  function handleClick(e) {
    // This will prevent any synthetic events from firing after this one
    e.stopPropagation()
  }

  const buttonInput = useRef(null);

  function mockdata(){
    buttonInput.current.rewardMe();
  }

  const titlePos = questions.length > 8 ? "inset-y-1/4": "-my-14";

  return (
    <div>
      <div onMouseMove={() => cursorChangeHandler(cursorSide)}>
        <div className="flex items-center justify-center checkmark-container">
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
        <div className="absolute left-10 top-1/2 -my-14 z-30" onClick={() => redo()}>
          <h1 className="text-white inset-y-1/2 text-4xl w-36 z-20">{categoryTitle} / <span className="text-sm">Restart</span></h1>
          <div><Arrow size="40px" /></div>
          <div className="flex flex-rols">
            <div>
              {
                !done && props.map((item, i) => (
                  i < rightAnswerNum ? <Smile size="30px" color="#fff" opacity="1" key={i} />: <Smile size="30px" color="#fff" opacity=".5" key={i} />
                ))
              }
            </div>
            <div>
              {
                !done && props.map((item, i) => (
                  i < wrongAnswerNum ? <Sad size="30px" color="#fff" opacity="1" key={i} />: <Sad size="30px" color="#fff" opacity=".5" key={i} />
                ))
              }
            </div>
            <div>
              {
                done && userAnswers.map((item, i) => (
                  item == 1 ? <Smile size="30px" color="#fff" opacity="1" key={i} />: <Smile size="30px" color="#fff" opacity=".5" key={i} />
                ))
              }
            </div>
            <div>
              {
                done && userAnswers.map((item, i) => (
                  item == 0 ? <Sad size="30px" color="#fff" opacity="1" key={i} />: <Sad size="30px" color="#fff" opacity=".5" key={i} />
                ))
              }
            </div>
          </div>

        </div>
        }
          <div className="test absolute flex flex-col items-center justify-center text-3xl text-white">
            <div>Nice done. You just finished 1/4 interview.</div>
            <Reward ref={buttonInput} type='emoji'></Reward>
          </div>
          <div className="question-window">
            {!done && props.map(({ x, y, rot, scale }, i) => (
              <animated.div key={i} style={{ x, y }}  onMouseMove={() => cursorChangeHandler("hand")} className="flex items-center justify-center absolute w-full h-full">
                {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                <animated.div {...bind(i)} className="rainbow-bg" onClick={handleClick}  style={{ transform: interpolate([rot, scale], trans) }}>
                  <span className="p-5 text-3xl bg-white"><span className="text-5xl">{props.length - i < 10 ? "0"+ (props.length - i): props.length - i}</span>.{questions[i].title}</span>
                  <span style={{"height": "200px"}} className="p-5 text-2xl overflow-y-scroll bg-white">{questions[i].answer}</span>
                </animated.div>
              </animated.div>
            ))}
          </div>

        </div>
        <div onClick={() => {updateCookie("hidden")}} className={`${cookie} onboarding absolute w-full h-full z-10 bg-white flex flex-cols items-center justify-center`}>
          <FlickHand size="200px" color="#fff" />
          <span className="text-3xl">Flick right to tell Anni - you like her answer.</span>
        </div>
    </div>
  )
}
