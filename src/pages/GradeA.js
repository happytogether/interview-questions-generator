import React, { useState, useContext, useRef, useEffect } from 'react';
import Reward from '../components/Reward/Reward';
import RewardAnswers from './RewardAnswers';
import { DefaultSet, TwitchSet, MemphisSet1, MemphisSet2, IceCreamSet } from "../components/Reward/MemphisSets";
import {GradeASet} from './GradeASet';
const imgSrc = GradeASet()[0];

export default function GradeA(props) {
  const answers = props.userAnswers;
  const gradePercentage = props.gradePercentage;
  const canvasInput = useRef(null);

  useEffect(()=> {
    setTimeout(() => {
      canvasInput.current.rewardMe();
    }, 300)
  }, [])

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-rows items-center">
        <div className="text-8xl mx-4">
          {
            <span>{gradePercentage}</span>
          }
        </div>
        <div className="w-96 text-black white-bg">
          <div>Nice done. Seems like you like Anni's answers pretty much.</div>
        </div>
      </div>
      <div className="flex flex-rows">
        <RewardAnswers userAnswers={answers} />
        <img className="m-6" width="200px" src={imgSrc} />
      </div>
      <Reward ref={canvasInput} type='emoji' config = {{"emoji": DefaultSet(), "elementCount": 15, "elementSize": 100}}></Reward>
    </div>
  )
}
