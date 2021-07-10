import React, { useState, useContext, useRef, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { MouseContext } from "../context/mouse-context";
import useMousePosition from "../hooks/useMousePosition";
import Questions from './Questions';
import Arrow from '../components/shapes/Arrow';
import getRandomDifferent from '../getRandomDifferent';
import MouseLeftRight from "../components/DotRing/MouseLeftRight";
import Logo from "../components/Logo";
import useSound from 'use-sound';
import clickSfx from '../components/click.mp3';
import { motion } from "framer-motion"

export default function QuestionsMock() {
  const categoryIndex = "questions/1";
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [answers, setAnswers] = useState([]);
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  const cursorSide = x > window.innerWidth / 2 ? "right" : "left";
  const pathname = "questions";

  useEffect(() => {
    fetch(`${categoryIndex}.json`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [categoryIndex]);

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
  }, []);

  const [bg, setBg] = useState("dot-bg");
  const bgArr = ["honey-comb-bg", "pie-bg", "equilateral-triangles-bg","rect-bg", "triangle-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg"];
  const history = useHistory();

  function handleRandomBg() {
    setBg(getRandomDifferent(bgArr, bg));
  }

  const [playClick] = useSound(clickSfx);
  function handleHistoryGoBack() {
      playClick();
      setTimeout(()=> {
        history.goBack();
      }, 300)
  }

  return (
    <motion.div initial={{ opacity: 0.5}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0.5}} onClick={()=>handleRandomBg()} className={`static2 ${cursorType == "left" ? "red-main-color": ""} ${bg}`}>
      <div className="text-sm">
        <Logo color="#fff" bg="black" />
      </div>
      <span onClick={()=>handleHistoryGoBack()} className="close absolute top-6	right-14 z-30">
        <Arrow size="100px" rotate="180deg"/>
      </span>
      {
        data && data.questions.length !=0 && <Questions categoryQuestions={data.questions} categoryTitle={data.title} categoryIndex={categoryIndex} answers={answers || []} />
      }
    </motion.div>
  )
}
