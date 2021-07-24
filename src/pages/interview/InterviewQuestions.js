import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
import { motion } from "framer-motion";
import { useDrag } from 'react-use-gesture';
import Arrow from '../../components/shapes/Arrow';
import FlickHand from '../../components/shapes/FlickHand';
import Smile from "../../components/shapes/Smile";
import Sad from "../../components/shapes/Sad";
import { MouseContext } from "../../context/mouse-context";
import useMousePosition from "../../hooks/useMousePosition";
import useCookie from "../../hooks/useCookie";
import getRandomDifferent from '../../getRandomDifferent';
import Reward from '../../components/Reward/Reward';
import Logo from "../../components/Logo";
import { DefaultSet, TwitchSet, MemphisSet1, MemphisSet2 } from "../../components/Reward/MemphisSets";
import Restart from '../../components/shapes/Restart';
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";
import CategoryQuestionsDone from './CategoryQuestionsDone';
import CategoryQuestionsNotDone from './CategoryQuestionsNotDone';
import SmileSadFace from './SmileSadFace';
import Memphis16_1 from '../../components/shapes/memphis16/Memphis16_1';
import Memphis16_2 from '../../components/shapes/memphis16/Memphis16_2';
import Memphis16_3 from '../../components/shapes/memphis16/Memphis16_3';
import Memphis16_4 from '../../components/shapes/memphis16/Memphis16_4';
import Memphis16_5 from '../../components/shapes/memphis16/Memphis16_5';
import Sun3 from '../../components/shapes/Sun3';
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import Stepper from '../../components/Stepper';
import { QuestionsStore, StepperStore, UserAnswersStore } from '../../Store';
import { useParams, useHistory, Link } from 'react-router-dom';
import { stepDoneAction, stepsResetAnswersAction } from "../../Actions";

export default function Questions(value) {
  const index= parseInt(useParams().categoryIndex);
  const { questionsState, dispatch } = useContext(QuestionsStore);
  const questions = questionsState.data[index].questions;
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('category'+index)));
  const [done, setDone] = useState(answers && answers.length === questions.length ? true: false);// check if user finished interview for this category
  const { userAnswersState, userAnswersDispatch } = useContext(UserAnswersStore);

  useEffect(() => {
    setAnswers(JSON.parse(localStorage.getItem('category'+index)));
  },[index])

  /*useEffect(()=>{
    setDone(answers && answers.length === questions.length ? true: false);
  },[answers])*/

  const steps = value.steps;
  const completedSteps = value.completedSteps;
  const title = questionsState.data.length!==0 && questionsState.data[index].cat;
  const [cookie, updateCookie] = useCookie("onboarding", "false"); // make sure onboarding panel only show once.
  const [userAnswers, setUserAnswers] = useState(answers);
  const [rightAnswerNum, setRightAnswerNum] = useState(0);
  const [wrongAnswerNum, setWrongAnswerNum] = useState(0);
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  const cursorSide = x > window.innerWidth / 2 ? "right" : "left";
  const { stepperState, stepperDoneDispatch } = useContext(StepperStore);
  useEffect(()=>{
    setDone(userAnswersState.data[index].length === questions.length ? true: false);
  },[userAnswersState.data[index].length])

  useEffect(()=>{
    rightWrongNumReset();
    userAnswersState.data[index].forEach((item, i) => {
      if (item === 1) {
        setRightAnswerNum(prevRightAnswerNum => prevRightAnswerNum+1)
      } else if (item === 0) {
        setWrongAnswerNum(prevWrongAnswerNum => prevWrongAnswerNum+1)
      }
    })
  },[userAnswersState.data[index].length])

  function handleClick(e) {
    // This will prevent any synthetic events from firing after this one
    e.stopPropagation()
  }
  const titlePos = questions.length > 8 ? "inset-y-1/4": "-my-14";
  const [gradeFBg, setGradeFBg] = useState();

  function totalRightWrongNum(right, wrong) {
    //setRightAnswerNum(right);
    //setWrongAnswerNum(wrong);
    setGradeFBg(wrong > right ? "left": "right");
  }

  function rightWrongNumReset() {
    setRightAnswerNum(0);
    setWrongAnswerNum(0);
  }

  function redo() {
    setDone(false);
    userAnswersState.data[index].length = 0;
    stepsResetAnswersAction(userAnswersState.data, userAnswersDispatch);
  }
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
  const piePosX = window.innerWidth - 100;
  const piePosY = window.innerHeight + 50;
  const [props1, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
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
  const rotateMotion = {
    initial: { transform: 'rotate(0deg)' },
    animate: {
      transform: 'rotate(360deg)',
      transition: {
        duration: .8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };


  return (
    <motion.div variants={content}
    animate="animate"
    initial="initial" onMouseMove={() => cursorChangeHandler(!done?cursorSide: gradeFBg)}>
      <div onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <div className="xl:hidden">
          {
            !done&&<MouseLeftRight />
          }
        </div>
        {
          <Stepper steps={steps} activeStep={index} />
        }
        <animated.div className={`absolute left-10 top-3/4 xl:hidden ${ done?'opacity-15': 'opacity-50' }`} style={{ transform: props1.xy.interpolate(trans5) }}>
          <Memphis16_1 size="200px" />
        </animated.div>
        <animated.div className={`absolute left-60 top-1/2 xl:hidden ${ done?'opacity-15': 'opacity-50' }`} style={{ transform: props1.xy.interpolate(trans5) }}>
          <Memphis16_3 size="600px" />
        </animated.div>
        <animated.div className={`absolute right-1/4 bottom-0 xl:hidden ${ done?'opacity-15': 'opacity-50' }`} style={{ transform: props1.xy.interpolate(trans1) }}>
          <Memphis16_4 size="400px" />
        </animated.div>

        <div className="absolute left-10 top-1/2 -my-14 z-30 xl:hidden">
          <motion.div variants={rotateMotion}>
            <Sun3 />
          </motion.div>
          <h1 className="text-white inset-y-1/2 text-4xl w-36 z-20">0{parseInt(index)+1}.{title} / <span className="text-sm">Restart</span></h1>
          <Arrow size="40px" color="#fff" />
          <SmileSadFace questions={questions} rightWrongNum={userAnswersState.data[index]} rightAnswerNum={rightAnswerNum} wrongAnswerNum={wrongAnswerNum} />
        </div>
          {
            !done && <CategoryQuestionsNotDone questions={questions || []} index={index} redo={redo} steps={steps} setDone={setDone} rightWrongNumReset={rightWrongNumReset}/>
          }
          {
            done && <CategoryQuestionsDone questions={questions || []} index={index} redo={redo} steps={steps} questions={questions} answers={answers} totalRightWrongNum={totalRightWrongNum} rightWrongNumReset={rightWrongNumReset} />
          }
        <div onClick={() => {updateCookie("hidden")}} className={`${cookie} onboarding absolute w-full h-full z-10 bg-white flex flex-cols items-center justify-center`}>
          <FlickHand size="200px" color="#fff" />
          <span className="text-3xl">Flick right to tell Anni - you like her answer.</span>
        </div>
      </div>
    </motion.div>
  )
}
