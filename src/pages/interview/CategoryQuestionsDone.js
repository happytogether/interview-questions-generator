import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
import { motion } from "framer-motion";
import Restart from '../../components/shapes/Restart';
import GradeA from './GradeA';
import GradeF from './GradeF';
import Arrow from '../../components/shapes/Arrow';
import { Link } from 'react-router-dom';
import DelayLink from '../../ultils/DelayLink';
import { StepperStore, UserAnswersStore } from '../../Store';
import { stepResetAction } from "../../Actions";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';
export default function QuestionsDone(props) {
  const questions = props.questions;
  const index = props.index;
  const answersLocalStroage = JSON.parse(localStorage.getItem('stepsAnswers'))[index];
  const [answers, setAnswers] = useState(answersLocalStroage);
  const lastStep = (index === (props.steps-1))? true: false;
  const preArrow = (index === 0) ? false: true;
  const nextPageIndex = (index === (props.steps-1)) ? 0: (index+1);
  const prePageIndex = (index === 0 ? (props.steps-1): (index-1));
  const [gradePercentage, setGradePercentage] = useState();
  const [grade, setGrade] = useState();
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const { stepperState, stepperDispatch } = useContext(StepperStore);


  function redo() {
    props.redo();
    props.rightWrongNumReset();
    //stepsResetAnswersAction([], stepperDispatch);
    const temp = stepperState.data.filter(function(item) {
      return item!==index;
    })
    stepResetAction(temp, stepperDispatch);
  }

  useEffect(() => {
    setAnswers(answersLocalStroage);
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

  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );
  const pageVariants = {
  initial: {
    x: "-100vw"
  },
  leftInitial: {
    x: '-100vw'
  },
  rightInitial: {
    x: '100vw'
  },
  in: {
    x: 0
  },
  leftOut: {
    x: "0"
  },
  rightOut: {
    x: "0"
  },
  down: {
    y: 300
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1.2
};

  return (
    <div>
      {
        lastStep && <>
          <motion.div initial='leftInitial' exit='leftOut' variants={pageVariants} transition={pageTransition} className={`panel left bg-${bgColorValue[0][0]} w-3/5 h-screen absolute z-9999`}></motion.div>
          <motion.div initial='rightInitial' exit='rightOut' variants={pageVariants} transition={pageTransition} className={`panel right bg-${bgColorValue[1][0]} w-2/5 right-0 h-screen absolute z-9999`}></motion.div>
        </>
      }
      <motion.div variants={content} animate="animate" initial="initial" className="w-full h-full absolute flex flex-col items-center justify-center sm:justify-start sm:mt-10 text-3xl text-white">
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
          <motion.div className={`mx-5 flex flex-col items-center ${index==0?' hidden':''}`} variants={upMotion}>
            <DelayLink to={`./${prePageIndex}`}>
              <Arrow rotate="180deg" size="60px" color="#fff" />
            </DelayLink>
            <span className="text-sm">Step {index}</span>
          </motion.div>
          <motion.div className="mx-5" variants={upMotion2} onClick={() => redo()}>
            <Restart size="60px" />
          </motion.div>
          <motion.div className={`mx-5 flex flex-col items-center`} variants={upMotion}>
            <DelayLink to={{
              pathname: nextPageIndex===0? '/report': './'+nextPageIndex,
              state: {bgTextColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][0], bgColorValue[2][1]]}
            }}>
              <Arrow size="60px" color="#fff" />
            </DelayLink>
            <span className={`text-sm ${index === (props.steps-1)?' hidden':''}`}>Step {index+2}</span>
            <span className={`text-sm ${index === (props.steps-1)?'':'hidden'}`}>see report</span>
          </motion.div>
        </div>
      </motion.div>
      </div>
  )
}
