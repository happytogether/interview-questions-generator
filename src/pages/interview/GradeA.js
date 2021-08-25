import React, { useState, useContext, useRef, useEffect } from 'react';
import Reward from '../../components/Reward/Reward';
import RewardAnswers from './RewardAnswers';
import { DefaultSet, IceCreamSet, HeartBrokenSet } from "../../components/Reward/MemphisSets";
import {GradeASet} from '../../components/confettiSet/GradeASet';
import { useSpring, animated } from 'react-spring';
import { useParams } from 'react-router-dom';
import { PageTransitionColorsStore } from '../../Store';


export default function GradeA(props) {
  const index= parseInt(useParams().categoryIndex);
  const answers = props.userAnswers;
  const gradePercentage = props.gradePercentage;
  const canvasInput = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const { pageTransitionColorsState, pageTransitionColorsDispatch} = useContext(PageTransitionColorsStore);
  const primaryTextColor = pageTransitionColorsState.data[0][1];

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
    <div style={{"color": primaryTextColor}} className="flex items-center justify-center flex-col w-screen">
      <div className="flex flex-rows items-center w-4/12 xl:w-6/12 lg:w-8/12 md:w-full sm:w-full">
        <div className="sm:text-base sm:w-screen sm:px-12 text-2xl my-6 text-right mr-5 w-9/12">
          {
            <div>Nice Pick, Seems like you like Anni's answers.</div>
          }
        </div>
        <div className="sm:hidden text-5xl border-b w-3/12">
          {
            <span>{gradePercentage}</span>
          }
        </div>
      </div>
      <div className="flex flex-rows relative">
        <div className="sm:hidden">
          <RewardAnswers primaryTextColor={props.primaryTextColor} userAnswers={answers} />
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
