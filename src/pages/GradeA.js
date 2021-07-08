import React, { useState, useContext, useRef, useEffect } from 'react';
import Reward from '../components/Reward/Reward';
import RewardAnswers from './RewardAnswers';
import { DefaultSet, TwitchSet, MemphisSet1, MemphisSet2, IceCreamSet, HeartBrokenSet } from "../components/Reward/MemphisSets";
import {GradeASet} from './GradeASet';
import { useSpring, animated } from 'react-spring';
const imgSrc = GradeASet()[0];

export default function GradeA(props) {
  const answers = props.userAnswers;
  const gradePercentage = props.gradePercentage;
  const canvasInput = useRef(null);

  useEffect(()=> {
    setTimeout(() => {
      canvasInput.current.rewardMe();
    }, 500)
  }, [])
  const fadeIn = useSpring({ to: { opacity: 1, scale: 1}, from: { opacity: 0, scale: 0 } });
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-rows items-center">
        <div className="text-8xl mx-4">
          {
            <span>{gradePercentage}</span>
          }
        </div>
        <div className="w-96">
          <div>Nice done. Seems like you like Anni's answers pretty much.</div>
        </div>
      </div>
      <div className="flex flex-rows relative">
        <RewardAnswers userAnswers={answers} />
        <animated.div style={fadeIn}>
          <img className="m-6" width="200px" src={imgSrc} />
        </animated.div>
        <div class="absolute left-1/2 top-0">
          <Reward ref={canvasInput} type='emoji' pos='center' config = {{"emoji": DefaultSet(), "elementCount": 15, "elementSize": 100}}></Reward>
        </div>
      </div>
    </div>
  )
}
