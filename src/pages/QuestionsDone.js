import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
import Restart from '../components/shapes/Restart';
import GradeA from './GradeA';
import GradeF from './GradeF';

export default function QuestionsDone(props) {
  const questions = props.questions;
  const [answers, setAnswers] = useState([]);
  const index = props.index;
  const [gradePercentage, setGradePercentage] = useState();
  const [grade, setGrade] = useState();
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  function redo() {
    props.redo();
    props.rightWrongNumReset();
  }
  useEffect(()=> {
    setAnswers(JSON.parse(localStorage.getItem('category'+ index)));
  }, []);

  useEffect(() => {
    //console.log('length', answers.length, grade, answers);
    if (answers.length !== 0) {
      setGradePercentage(((answers.reduce(reducer)/questions.length)*100).toFixed(0)+'%');
      setGrade((answers.reduce(reducer)/questions.length) > 0.6 ? "A": "F");
    }
  }, [answers])

  useEffect(() => {
    const rightNum = answers.length!=0 && answers.reduce(reducer);
    props.totalRightWrongNum(rightNum, questions.length - rightNum);
  }, [answers])

  useEffect(() => {
    //console.log(grade);
  },[grade])

  return (
    <div className="w-full h-full absolute flex flex-col items-center justify-center text-3xl text-white">
      <div className="flex flex-rows">
        {
          grade === "A" && <GradeA userAnswers={answers} gradePercentage={gradePercentage} />
        }
        {
          grade === "F" && <GradeF userAnswers={answers} gradePercentage={gradePercentage} />
        }
      </div>
      <div className="flex items-center z-30 relative" onClick={() => redo()}>
        <Restart size="80px" />
      </div>
    </div>
  )
}
