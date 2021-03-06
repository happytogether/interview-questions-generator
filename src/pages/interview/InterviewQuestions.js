import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
import { motion } from "framer-motion";
import { useDrag } from 'react-use-gesture';
import Arrow from '../../components/shapes/Arrow';
import FlickHand from '../../components/shapes/FlickHand';
import { MouseContext } from "../../context/mouse-context";
import useMousePosition from "../../hooks/useMousePosition";
import Reward from '../../components/Reward/Reward';
import Logo from "../../components/Logo";
import { DefaultSet } from "../../components/Reward/MemphisSets";
import Restart from '../../components/shapes/Restart';
import CategoryQuestionsDone from './CategoryQuestionsDone';
import CategoryQuestionsNotDone from './CategoryQuestionsNotDone';
import SmileSadFace from './SmileSadFace';
import Sun3 from '../../components/shapes/Sun3';
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import Stepper from '../../components/Stepper';
import { QuestionsStore, StepperStore, UserAnswersStore, PageTransitionColorsStore } from '../../Store';
import { useParams, useHistory, Link } from 'react-router-dom';
import { stepDoneAction, stepsResetAnswersAction } from "../../Actions";
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';


export default function Questions(value) {
  const index= parseInt(useParams().categoryIndex);
  const { questionsState, dispatch } = useContext(QuestionsStore);
  const { userAnswersState, userAnswersDispatch } = useContext(UserAnswersStore);
  const { stepperState, stepperDoneDispatch } = useContext(StepperStore);
  const { pageTransitionColorsState, pageTransitionColorsDispatch} = useContext(PageTransitionColorsStore);
  const questions = questionsState.data[index].questions;
  const [answers, setAnswers] = useState(userAnswersState.data[index]);
  const [done, setDone] = useState(answers && answers.length === questions.length ? true: false);// check if user finished interview for this category

  const primaryTextColor = pageTransitionColorsState.data[0][1];
  useEffect(() => {
    setAnswers(userAnswersState.data[index]);
  },[index])

  /*useEffect(()=>{
    setDone(answers && answers.length === questions.length ? true: false);
  },[answers])*/

  const steps = value.steps;
  const completedSteps = stepperState.data;
  const title = questionsState.data.length!==0 && questionsState.data[index].cat;
  const [userAnswers, setUserAnswers] = useState(answers);
  const [rightAnswerNum, setRightAnswerNum] = useState(0);
  const [wrongAnswerNum, setWrongAnswerNum] = useState(0);
  const [rightAnswerNumLocalStorage, setRightAnswerNumLocalStorage] = useState(0);
  const [wrongAnswerNumLocalStorage, setWrongAnswerNumLocalStorage] = useState(0);
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  const cursorSide = x > window.innerWidth / 2 ? "right" : "left";

  useEffect(()=> {
    setDone(userAnswersState.data[index].length!==0? userAnswersState.data[index].length === questions.length ? true: false: userAnswersState.data[index].length === questions.length ? true: false);
    rightAnswerNumLocalStorageReset();
    userAnswersState.data[index].forEach((item, i) => {
      if (item === 1) {
        setRightAnswerNumLocalStorage(prevRightAnswerNumLocalStorage => prevRightAnswerNumLocalStorage+1)
      } else if (item === 0) {
        setWrongAnswerNumLocalStorage(prevRightAnswerNumLocalStorage => prevRightAnswerNumLocalStorage+1)
      }
    })
  },[index, done])

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

  function rightAnswerNumLocalStorageReset() {
    setRightAnswerNumLocalStorage(0);
    setWrongAnswerNumLocalStorage(0);
  }

  function redo() {
    setDone(false);
    userAnswersState.data[index].length = 0;
    stepsResetAnswersAction(userAnswersState.data, userAnswersDispatch);
    const stepperData = stepperState.data.filter((item, i) => {
      return item != index;
    })
    localStorage.setItem('userAnswersState', JSON.stringify(userAnswersState.data));
    localStorage.setItem('stepperState', JSON.stringify(stepperData));
    //remove completed steps here
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
          <Stepper steps={steps} activeStep={index} completedSteps={completedSteps} />
        }
        <div className="absolute left-10 top-1/2 -my-14 z-30 xl:hidden">
          <motion.h1 style={{"color": primaryTextColor}} variants={pageVariants} initial='initial' transition={{ duration: 1 + Math.random(), type: "tween", ease: "anticipate" }} exit='down' animate="in" className="inset-y-1/2 text-4xl w-36 z-20">0{parseInt(index)+1}.{title} / <span className="text-sm">Scores</span></motion.h1>
          <motion.div variants={pageVariants} initial='initial' transition={{ duration: 1.2, type: "tween", ease: "anticipate" }} exit='down' animate="in">
            <Arrow size="40px" color={primaryTextColor} />
            {
              !done && <SmileSadFace questions={questions} rightWrongNum={userAnswersState.data[index]} rightAnswerNum={rightAnswerNum} wrongAnswerNum={wrongAnswerNum} />
            }
            {
              done && <SmileSadFace questions={questions} rightWrongNum={userAnswersState.data[index]} rightAnswerNum={rightAnswerNumLocalStorage} wrongAnswerNum={wrongAnswerNumLocalStorage} />
            }
          </motion.div>
        </div>
          {
            !done && <CategoryQuestionsNotDone questions={questions || []} index={index} redo={redo} steps={steps} setDone={setDone} rightWrongNumReset={rightWrongNumReset}/>
          }
          {
            done && <CategoryQuestionsDone questions={questions || []} index={index} redo={redo} steps={steps} questions={questions} answers={answers} totalRightWrongNum={totalRightWrongNum} rightWrongNumReset={rightWrongNumReset} />
          }
      </div>
    </motion.div>
  )
}
