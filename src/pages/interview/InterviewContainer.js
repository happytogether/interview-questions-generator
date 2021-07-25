import React, { useState, useContext, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { MouseContext } from "../../context/mouse-context";
import useMousePosition from "../../hooks/useMousePosition";
import InterviewQuestions from './InterviewQuestions';
import Arrow from '../../components/shapes/Arrow';
import getRandomDifferent from '../../getRandomDifferent';
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import Logo from '../../components/Logo';
import useSound from 'use-sound';
import clickSfx from '../../components/click.mp3';
import { motion } from "framer-motion"
import { QuestionsStore } from '../../Store';
import { fetchQuestionsDataAction } from '../../Actions';
import DelayLink from '../../ultils/DelayLink';
import { initialQuestionsNum } from '../../Actions';
import FlickHand from '../../components/shapes/FlickHand';
import useCookie from "../../hooks/useCookie";
import Smile from "../../components/shapes/Smile";
import Sad from "../../components/shapes/Sad";

export default function InterviewContainer(props) {
  //console.log(123, props.location.state);
  const { questionsState, dispatch } = useContext(QuestionsStore);
  useEffect(
    () => {
      fetchQuestionsDataAction(dispatch, props.location.state && props.location.state.questionsNum || JSON.parse(localStorage.getItem('questionsNum'))
        ? JSON.parse(localStorage.getItem('questionsNum'))
        : initialQuestionsNum());
    },
    []
  );
  const categoryIndex = useParams().categoryIndex;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('category'+categoryIndex)));
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  const cursorSide = x > window.innerWidth / 2 ? "right" : "left";
  const pathname = useHistory().location.pathname.match(/.*\/([^/]+)\/[^/]+/)[1] || "";
  const [completedSteps, setCompletedSteps] = useState([]);
  const [cookie, updateCookie] = useCookie("onboarding", "false"); // make sure onboarding panel only show once.

  useEffect(() => {
    if (pathname == 'interview') {
      document.body.classList.add('new-interview');
    }
  }, [])

  useEffect(() => {
    setBg(getRandomDifferent(bgArr, bg));
  }, [data])

  useEffect(()=> {
    setAnswers(JSON.parse(localStorage.getItem('category'+categoryIndex)));
  }, [categoryIndex]);

  useEffect(() => {
    setCompletedSteps(JSON.parse(localStorage.getItem('completedSteps')));
  }, [])

  const [bg, setBg] = useState("dot-bg");
  const bgArr = ["honey-comb-bg", "pie-bg", "equilateral-triangles-bg","rect-bg", "triangle-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg"];
  const history = useHistory();

  function handleRandomBg() {
    setBg(getRandomDifferent(bgArr, bg));
  }
  const randomIndex = Math.random() > .5 ? 0: 1;
  return (
    <div onClick={()=>handleRandomBg()} className={`static2 box-bg`}>
      <Logo backArrow backArrowColor="white" menuColor="white" color="#fff" bg="black" />
      {
        cookie && <div onClick={() => {updateCookie("hidden")}} className={`${cookie} onboarding absolute w-full h-full z-50 bg-white flex flex-col items-center justify-center`}>

            <ul className="flex flex-row items-center">
              <li className="flex flex-col justify-center items-center">
                <Sad size="50px" color="#fff" opacity="1" />
              </li>
              <li><FlickHand size="200px" color="#fff" /></li>
              <li className="flex flex-col justify-center items-center">
                <Smile size="50px" color="#fff" opacity="1" />
              </li>
            </ul>
            <div className="text-2xl mb-5 text-white">Flick right - like the answer. </div>
            <div className="text-2xl text-white">Flick left - dislike the answer. </div>
        </div>
      }
      {
        questionsState.data.length && <InterviewQuestions categoryIndex={categoryIndex} steps={questionsState.data.length} completedSteps={completedSteps} answers={answers || []} />
      }

    </div>
  )
}
