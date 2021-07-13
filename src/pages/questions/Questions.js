import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
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
import { DefaultSet, TwitchSet, MemphisSet1, MemphisSet2 } from "../../components/Reward/MemphisSets";
import Restart from '../../components/shapes/Restart';
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";
import QuestionsDone from './QuestionsDone';
import QuestionsNotDone from './QuestionsNotDone';
import SmileSadFace from './SmileSadFace';
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import Stepper from '../../components/Stepper';
import { Store } from '../../Store';
import { useParams, useHistory, Link } from 'react-router-dom';
import { StepperStore, StepsAnswersStore } from '../../Store';
import { stepDoneAction, stepsResetAnswersAction } from "../../Actions";

export default function Questions(value) {
  const index= parseInt(useParams().categoryIndex);
  const { state, dispatch } = useContext(Store);
  const questions = state.data.length!==0 && state.data[index].questions;
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('category'+index)));
  const [done, setDone] = useState(answers && answers.length === questions.length ? true: false);// check if user finished interview for this category
  const { stepsAnswersState, stepsAnswersDispatch } = useContext(StepsAnswersStore);

  useEffect(() => {
    setAnswers(JSON.parse(localStorage.getItem('category'+index)));
  },[index])

  /*useEffect(()=>{
    setDone(answers && answers.length === questions.length ? true: false);
  },[answers])*/

  const steps = value.steps;
  const completedSteps = value.completedSteps;
  const title = state.data.length!==0 && state.data[index].cat;
  const [cookie, updateCookie] = useCookie("onboarding", "false"); // make sure onboarding panel only show once.
  const [userAnswers, setUserAnswers] = useState(answers);
  const [rightAnswerNum, setRightAnswerNum] = useState(0);
  const [wrongAnswerNum, setWrongAnswerNum] = useState(0);
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  const cursorSide = x > window.innerWidth / 2 ? "right" : "left";
  const { stepperState, stepperDoneDispatch } = useContext(StepperStore);

  useEffect(()=>{
    setDone(stepsAnswersState.data[index].length === questions.length ? true: false);
  },[stepsAnswersState.data[index].length])

  useEffect(()=>{
    rightWrongNumReset();
    stepsAnswersState.data[index].forEach((item, i) => {
      if (item === 1) {
        setRightAnswerNum(prevRightAnswerNum => prevRightAnswerNum+1)
      } else if (item === 0) {
        setWrongAnswerNum(prevWrongAnswerNum => prevWrongAnswerNum+1)
      }
    })
  },[stepsAnswersState.data[index].length])

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
    stepsAnswersState.data[index].length = 0;
    stepsResetAnswersAction(stepsAnswersState.data, stepsAnswersDispatch);
  }

  return (
    <div onMouseMove={() => cursorChangeHandler(!done?cursorSide: gradeFBg)}>
      {
        !done&&<MouseLeftRight />
      }
      {
        <Stepper steps={steps} activeStep={index} completedSteps={completedSteps} />
      }
      <div className="absolute left-10 top-1/2 -my-14 z-30">

        <h1 className="text-white inset-y-1/2 text-4xl w-36 z-20">0{parseInt(index)+1}.{title} / <span onClick={() => redo()} className="text-sm">Restart</span></h1>
        <Arrow size="40px" color="#fff" />
        <SmileSadFace questions={questions} rightWrongNum={stepsAnswersState.data[index]} rightAnswerNum={rightAnswerNum} wrongAnswerNum={wrongAnswerNum} />
      </div>
        {
          !done && <QuestionsNotDone questions={questions || []} index={index} redo={redo} steps={steps} setDone={setDone} rightWrongNumReset={rightWrongNumReset}/>
        }
        {
          done && <QuestionsDone questions={questions || []} index={index} redo={redo} steps={steps} questions={questions} answers={answers} totalRightWrongNum={totalRightWrongNum} rightWrongNumReset={rightWrongNumReset} />
        }
      <div onClick={() => {updateCookie("hidden")}} className={`${cookie} onboarding absolute w-full h-full z-10 bg-white flex flex-cols items-center justify-center`}>
        <FlickHand size="200px" color="#fff" />
        <span className="text-3xl">Flick right to tell Anni - you like her answer.</span>
      </div>
    </div>
  )
}
