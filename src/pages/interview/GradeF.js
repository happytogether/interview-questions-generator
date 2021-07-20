import React, { useState, useContext, useRef, useEffect } from 'react';
import Rain from '../../components/Rain';
import '../../components/Rain/style.css';
import {GradeFSet} from '../confettiSet/GradeFSet';
import Reward from '../../components/Reward/Reward';
import { HeartBrokenSet, ThunderSet } from "../../components/Reward/MemphisSets";
import { useParams } from 'react-router-dom';

export default function GradeF(props) {
  const index= parseInt(useParams().categoryIndex);
  const gradePercentage = props.gradePercentage;
  const canvasInputF = useRef(null);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(()=> {
    setTimeout(() => {
      canvasInputF.current.rewardMe();
    }, 300)
  }, [])

  useEffect(() => {
    setImgSrc(GradeFSet()[0]);
  }, [index])
  const randomIndex = Math.random() > .5 ? 0: 1;
  return (
    <div className="flex items-center justify-center flex-col">
      <Rain numDrops="25" />
      <div className="flex flex-rows items-center">
        <div className="sm:hidden text-8xl mx-4">
          {
            <span>{gradePercentage}</span>
          }
        </div>
        <div className="w-96 sm:text-base sm:w-screen sm:px-12 my-6">
          {
            <div>Oh no, Seems like you don't like Anni's answers that much.</div>
          }
        </div>
      </div>
      <div className="relative flex justify-center">
        <img className="my-6 sm:w-8/12" width="200px" src={imgSrc} />
        <div class="absolute left-1/2 top-0">
          <Reward ref={canvasInputF} type='emoji' config = {{"emoji": randomIndex ?HeartBrokenSet():ThunderSet(), "elementCount": randomIndex?10:5, "elementSize": randomIndex?100: 50, "spread": 150}}></Reward>
        </div>
      </div>
    </div>
  )
}
