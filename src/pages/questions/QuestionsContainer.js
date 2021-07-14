import React, { useState, useContext, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { MouseContext } from "../../context/mouse-context";
import useMousePosition from "../../hooks/useMousePosition";
import Questions from './Questions';
import Arrow from '../../components/shapes/Arrow';
import getRandomDifferent from '../../getRandomDifferent';
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import useSound from 'use-sound';
import clickSfx from '../../components/click.mp3';
import { motion } from "framer-motion"
import { Store } from '../../Store';
import { fetchDataAction } from '../../Actions';
import DelayLink from '../../ultils/DelayLink';

export default function QuestionsContainer() {
  const { state, dispatch } = useContext(Store);
  // fetch data from json file
  useEffect(
    () => {
      state.data.length === 0 && fetchDataAction(dispatch);
    },
    [state]
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
    if (pathname == 'questions') {
      document.body.classList.add('questions-page');
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
        exit={{ opacity: 0.5}} onClick={()=>handleRandomBg()} className={`static2 ${cursorType == "left" ? "red-main-color": ""} pie-bg`}>
      <span className="close absolute top-6	right-14 z-30 sm:hidden">
        <DelayLink to="/" delay="300" goBackHome="true">
          <Arrow size="100px" rotate="180deg" color="#fff" />
        </DelayLink>
      </span>
      {
        state.data.length && <Questions categoryIndex={categoryIndex} steps={state.data.length} completedSteps={completedSteps} answers={answers || []} />
      }
    </motion.div>
  )
}
