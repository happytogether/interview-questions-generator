import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
import { motion } from "framer-motion";
import Restart from '../../components/shapes/Restart';
import GradeA from './GradeA';
import GradeF from './GradeF';
import Arrow from '../../components/shapes/Arrow';
import { Link } from 'react-router-dom';
import DelayLink from '../../ultils/DelayLink';

export default function QuestionsDone(props) {
  const questions = props.questions;
  const index = props.index;
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('category'+index)));
  const nextArrow = (index === (props.steps-1)) ? false: true; // if in last step, show no arrow
  const preArrow = (index === 0) ? false: true;
  const nextPageIndex = (index === (props.steps-1)) ? 0: (index+1);
  const prePageIndex = (index === 0 ? (props.steps-1): (index-1));
  const [gradePercentage, setGradePercentage] = useState();
  const [grade, setGrade] = useState();
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  function redo() {
    props.redo();
    props.rightWrongNumReset();
  }

  useEffect(() => {
    setAnswers(JSON.parse(localStorage.getItem('category'+index)));
  },[index])

  useEffect(() => {
    if (answers && answers.length !== 0) {
      setGradePercentage(((answers.reduce(reducer)/questions.length)*100).toFixed(0)+'%');
      setGrade((answers.reduce(reducer)/questions.length) > 0.6 ? "A": "F");
    }
  }, [answers])

  useEffect(() => {
    const rightNum = answers&&answers.length!==0 ? answers.reduce(reducer): 0;
    props.totalRightWrongNum(rightNum, questions.length - rightNum);
  }, [answers])

  useEffect(() => {
    //console.log(grade);
  },[grade])

  const content = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const upMotion = {
    initial: { y: 150, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const upMotion2 = {
    initial: { y: 150, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
      <motion.div variants={content} animate="animate" initial="initial" className="w-full h-full absolute flex flex-col items-center justify-center text-3xl text-white">
        <div className="flex flex-rows">
          <motion.div variants={upMotion}>
            {
              grade === "A" && <GradeA userAnswers={answers} gradePercentage={gradePercentage} />
            }
            {
              grade === "F" && <GradeF userAnswers={answers} gradePercentage={gradePercentage} />
            }
          </motion.div>
        </div>
        <div className="flex items-center flex-row z-30 relative">
          <motion.div className={`mx-5`} variants={upMotion}>
            <DelayLink to={`./${prePageIndex}`}>
              <Arrow rotate="180deg" size="80px" color="#fff" />
            </DelayLink>
          </motion.div>
          <motion.div className="mx-5" variants={upMotion2} onClick={() => redo()}>
            <Restart size="80px" />
          </motion.div>
          <motion.div className={`mx-5`} variants={upMotion}>
            <DelayLink to={`./${nextPageIndex}`}>
              <Arrow size="80px" color="#fff" />
            </DelayLink>
          </motion.div>
        </div>
      </motion.div>
  )
}
