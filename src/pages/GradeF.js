import React, { useState, useContext, useRef, useEffect } from 'react';
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";
import {GradeFSet} from './GradeFSet';
import Reward from '../components/Reward/Reward';
import { HeartBrokenSet, ThunderSet } from "../components/Reward/MemphisSets";
const imgSrc = GradeFSet()[0];

export default function GradeA(props) {
  const gradePercentage = props.gradePercentage;
  const canvasInputF = useRef(null);

  useEffect(()=> {
    setTimeout(() => {
      canvasInputF.current.rewardMe();
    }, 300)
  }, [])
  const randomIndex = Math.random() > .5 ? 0: 1;
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-rows items-center">
        <div className="text-8xl mx-4">
          {
            <span>{gradePercentage}</span>
          }
        </div>
        <div className="w-96">
          {
            <div>Oh no, Seems like you don't like Anni's answers that much.</div>
          }
        </div>
      </div>
      <div className="relative">
        <img className="my-6" width="200px" src={imgSrc} />
        <div class="absolute left-1/2 top-0">
          <Reward ref={canvasInputF} type='emoji' config = {{"emoji": randomIndex ?HeartBrokenSet():ThunderSet(), "elementCount": randomIndex?10:5, "elementSize": randomIndex?100: 50}}></Reward>
        </div>
      </div>

      <ReactRain numDrops="50" />
    </div>
  )
}
