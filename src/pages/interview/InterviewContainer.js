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
import { defaultQuestionsNum } from '../../Actions';

export default function InterviewContainer(props) {
  //console.log(123, props.location.state);
  const { questionsState, dispatch } = useContext(QuestionsStore);
  useEffect(
    () => {
      fetchQuestionsDataAction(dispatch, props.location.state && props.location.state.questionsNum || defaultQuestionsNum());
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
    <motion.div initial={{ opacity: 0.5}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0.5}} onClick={()=>handleRandomBg()} className={`static2 box-bg`}>
      <Logo backArrow backArrowColor="white" menuColor="white" color="#fff" bg="black" />
      {
        questionsState.data.length && <InterviewQuestions categoryIndex={categoryIndex} steps={questionsState.data.length} completedSteps={completedSteps} answers={answers || []} />
      }
    </motion.div>
  )
}
