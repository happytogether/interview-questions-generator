import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Arrow from './shapes/Arrow';
import FlickHand from './shapes/FlickHand';
import Smile from "./shapes/Smile";
import Sad from "./shapes/Sad";
import { MouseContext } from "../context/mouse-context";
import useMousePosition from "../hooks/useMousePosition";
import useCookie from "../hooks/useCookie";
import getRandomDifferent from '../getRandomDifferent';
import Reward from './Reward/Reward';
import RewardAnswers from './RewardAnswers';
import { DefaultSet, TwitchSet, MemphisSet1, MemphisSet2 } from "./Reward/MemphisSets";
import Triangle from './shapes/memphis/Triangle';
import Wave2 from './shapes/Wave2';
import Slash from './shapes/memphis/Slash';
import Square from './shapes/memphis/Square';
import Restart from './shapes/Restart';
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";


export default function Questions(value) {
  // in question Page...
  // First step, we get data from parent component, [questions, categoryTitle, categoryIndex and answers from localstorage if questions done.]
  const answers = value.answers || [];
  const questions = value.categoryQuestions;
  const title = value.categoryTitle;
  const index= value.categoryIndex;

  // step2, we need to set some initial values
    // 2-1, make sure if onBoarding animation has played
    // 2-2, check if user already finished(done) this category, check data.answers from localStorage and make sure the length is == questions.length
    // 2-3, userAnswers are currently processing answers, if users decided to restart the questions process, we erase the answers from localstorage and use useranswers instead.
    // 2-4 set right, wrong answer num to 0

  const [cookie, updateCookie] = useCookie("onboarding", "false"); // make sure onboarding panel only show once.
  const [done, setDone] = useState(answers && answers.length === questions.length ? true: false);// check if user finished interview for this category
  const [userAnswers, setUserAnswers] = useState(answers);
  const [rightAnswerNum, setRightAnswerNum] = useState(0);
  const [wrongAnswerNum, setWrongAnswerNum] = useState(0);

  // step 3, set cards initial position and random cards position.
  const cardsPosArr = [[10, 10], [10, -10], [-10, 10], [-10, -10],[-20,20], [20,20], [-20, -20], [20, -20]];
  const [cardsPos, setCardsPos] = useState([-10, 10]); // cards initial direction

  //step 4, set react spring animation here.
    // These two are just helpers, they curate spring data, propss that are later being interpolated into css
  const to = (i) => ({ x: i *cardsPos[0], y: i*cardsPos[1], scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
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
        setUserAnswers(userAnswers => [...userAnswers,0]);
        localStorage.setItem('category' + index, userAnswers);
      }
      if (dir == 1 && isGone) {
        setRightAnswerNum(rightAnswerNum + 1); // swipe to right side
        setUserAnswers(userAnswers => [...userAnswers,1]);
      }
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === questions.length) {
      setTimeout(function(){
        //gone.clear() || set((i) => to(i));
        //setRightAnswerNum(0);
        //setWrongAnswerNum(0);
        setDone(true);
        confetti();
      }, 600);
    }
  })

  useEffect(() => {
    localStorage.setItem('category' + index, JSON.stringify(userAnswers))
  }, [userAnswers]);

  useEffect(() => {
    gone.clear() || set((i) => to(i));
  }, [cardsPos])

  function redo() {
    setUserAnswers([]);
    setDone(false);
    setRightAnswerNum(0);
    setWrongAnswerNum(0);
    setCardsPos(getRandomDifferent(cardsPosArr, cardsPos));
  }


  // step 5, initial confetti here
  const canvasInput = useRef(null);
  function confetti(){
    canvasInput.current.rewardMe();
  }


  function handleClick(e) {
    // This will prevent any synthetic events from firing after this one
    e.stopPropagation()
  }

  const titlePos = questions.length > 8 ? "inset-y-1/4": "-my-14";

  /* react spring animation
  const fadeIn = useSpring({ to: { x: 0, opacity: 1, scale: 1.2}, from: { opacity: 0, scale: 0.1, x:-1000 } });
  */

  /*const [grade, setGrade] = useState(Math.floor((rightAnswerNum/questions.length)*100)+'%');
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  useEffect(()=> {
    setGrade(Math.floor((answers.reduce(reducer)/questions.length)*100));
  }, [answers])*/

  return (
    <div>
      <div>
        <div className="absolute left-10 top-1/2 -my-14 z-30" onClick={() => redo()}>
          <h1 className="text-white inset-y-1/2 text-4xl w-36 z-20">{title} / <span className="text-sm">Restart</span></h1>
          {
            !done && <div><Arrow size="40px" /></div>
          }
          {
            done && <div className="flex flex-rows gap-3">
              {
                /*
                <Triangle size="30px" />
                <Slash size="30px" />
                <Wave2 size="30px" />
                <Square size="30px" />
                */
              }
            </div>
          }

          <div className="flex flex-rols">
            <div>
              {
                props.map((item, i) => (
                  i < rightAnswerNum ? <Smile size="30px" color="#fff" opacity="1" key={i} />: <Smile size="30px" color="#fff" opacity=".5" key={i} />
                ))
              }
            </div>
            <div>
              {
                props.map((item, i) => (
                  i < wrongAnswerNum ? <Sad size="30px" color="#fff" opacity="1" key={i} />: <Sad size="30px" color="#fff" opacity=".5" key={i} />
                ))
              }
            </div>
          </div>

        </div>
          <div className="w-full h-full absolute flex flex-col items-center justify-center text-3xl text-white">
            <div className="flex flex-rows">
              <div className="text-8xl mx-4">
                {
                  done&&<span>{Math.floor((rightAnswerNum/questions.length)*100)+'%'}</span>
                }
              </div>
              <div className="w-96 text-black white-bg">
                {
                  done&&<animated.div>Nice done. Seems like you like Anni's answers pretty much.</animated.div>
                }
              </div>
            </div>

            <Reward ref={canvasInput} type='emoji' config = {{"emoji": DefaultSet()}}></Reward>

            {
              /*done && <RewardAnswers answers={answers} userAnswers={userAnswers} />*/
              done && <animated.div><ReactRain numDrops="50" /></animated.div>
            }
            {
              done && <img className="my-6" width="200px" src="/img/rain.svg" />

            }
            <div className="flex items-center" onClick={() => redo()}>
              <Restart size="80px" />
            </div>
          </div>
          <div className="question-window">
            {
              /*<Window questions={questions} />*/
            }
            {!done && props.map(({ x, y, rot, scale }, i) => (
              <animated.div key={i} style={{ x, y }} className="flex items-center justify-center absolute w-full h-full">
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
