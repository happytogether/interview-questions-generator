import React, { useState, useContext, useRef, useEffect } from 'react';
import Reward from '../../components/Reward/Reward';
import RewardAnswers from './RewardAnswers';
import { DefaultSet, TwitchSet, MemphisSet1, MemphisSet2, IceCreamSet, HeartBrokenSet } from "../../components/Reward/MemphisSets";
import {GradeASet} from '../confettiSet/GradeASet';
import { useSpring, animated } from 'react-spring';
import { useParams } from 'react-router-dom';

export default function GradeA(props) {
  const index= parseInt(useParams().categoryIndex);
  const answers = props.userAnswers;
  const gradePercentage = props.gradePercentage;
  const canvasInput = useRef(null);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(()=> {
    setTimeout(() => {
      canvasInput.current.rewardMe();
    }, 300)
  }, [])

  useEffect(() => {
    setImgSrc(GradeASet()[0]);
  }, [index])

  const fadeIn = useSpring({ to: { opacity: 1, scale: 1}, from: { opacity: 0, scale: 0 } });
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-rows items-center">
        <div className="sm:hidden text-8xl mx-4 ">
          {
            <span>{gradePercentage}</span>
          }
        </div>
        <div className="w-96 sm:text-base sm:w-screen sm:px-12 my-6">
          <div>Nice Pick. Seems like you like Anni's answers pretty much.</div>
        </div>
      </div>
      <div className="flex flex-rows relative">
        <div className="sm:hidden">
          <RewardAnswers userAnswers={answers} />
        </div>
        <animated.div className="relative flex justify-center" style={fadeIn}>
          <img className="m-6 sm:w-4/12 " width="200px" src={imgSrc} />
        </animated.div>
        <div className="absolute left-1/2 top-0">
          <Reward ref={canvasInput} type='emoji' pos='center' config = {{"emoji": DefaultSet(), "elementCount": 15, "elementSize": 100}}></Reward>
        </div>
      </div>
    </div>
  )
}
