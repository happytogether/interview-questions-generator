import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
import { useParams } from 'react-router-dom';
import { useDrag } from 'react-use-gesture';
import Restart from '../../components/shapes/Restart';
import { DefaultSet } from "../../components/Reward/MemphisSets";
import { stepDoneAction, stepsAddAnswersAction } from "../../Actions";
import { Store, QuestionsStore, StepperStore, UserAnswersStore, PageTransitionColorsStore } from '../../Store';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet, ColorSetWhiteText, ColorSetDarkText } from '../../components/Sets/ColorSet';
import {
  isMobile
} from "react-device-detect";

export default function QuestionsNotDone(data) {
  let completedStepsArray = [];
  const { questionsState, dispatch } = useContext(QuestionsStore);
  const { stepperState, stepperDispatch } = useContext(StepperStore);
  const { userAnswersState, userAnswersDispatch } = useContext(UserAnswersStore);
  const { pageTransitionColorsState, pageTransitionColorsDispatch} = useContext(PageTransitionColorsStore);
  const categoryIndex = useParams().categoryIndex;
  const questions = questionsState.data[categoryIndex].questions;
  const [userAnswers, setUserAnswers] = useState([]);
  const [rightAnswerNum, setRightAnswerNum] = useState(0);
  const [wrongAnswerNum, setWrongAnswerNum] = useState(0);
  const cardsPosArr = isMobile ? [[0, 15]]: [[-15, 15]];
  const [cardsPos, setCardsPos] = useState(cardsPosArr[Math.floor(Math.random()*cardsPosArr.length)]); // cards initial direction
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
        setUserAnswers(userAnswers => [...userAnswers,0]);
        userAnswersState.data[categoryIndex].push(0);
        stepsAddAnswersAction(userAnswersState.data, userAnswersDispatch);
      }
      if (dir == 1 && isGone) {
        setUserAnswers(userAnswers => [...userAnswers,1]);
        userAnswersState.data[categoryIndex].push(1);
        stepsAddAnswersAction(userAnswersState.data, userAnswersDispatch);
      }
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === questions.length) {
      setTimeout(function(){
        //data.rightWrongNumReset();
        data.setDone(true);
        completedStepsArray = [...completedStepsArray, categoryIndex];
        stepDoneAction([...stepperState.data, parseInt(categoryIndex)], stepperDispatch);
        localStorage.setItem('stepperState', JSON.stringify([...stepperState.data, parseInt(categoryIndex)]));
        localStorage.setItem('userAnswersState', JSON.stringify(userAnswersState.data));
      }, 600);
    }
  })

  useEffect(() => {
    gone.clear() || set((i) => to(i));
  }, [cardsPos])

  function handleClick(e) {
    e.stopPropagation()
  }

  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );

  return (
    <div>
      <div className={`question-window h-screen flex items-center sm:items-start`}>
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div key={i} style={{ x, y }} className="flex items-center justify-center absolute w-full">
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div {...bind(i)} className={`bg-${bgColorValue[i][0]} sm:w-full sm:mx-3 w-60vw`} onClick={handleClick}  style={{ transform: interpolate([rot, scale], trans) }}>
              <span style={{"color": bgColorValue[i][1]}} className="p-5 text-xl"><span className="text-5xl">{props.length - i < 10 ? "0"+ (props.length - i): props.length - i}</span>.{questions[i].title}</span>
              <span style={{"height": "350px", "color": bgColorValue[i][1]}} className="p-5 text-base overflow-y-scroll" dangerouslySetInnerHTML={ {__html: questions[i].answer} } />
            </animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
