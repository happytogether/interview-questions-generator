import React, { useState, useContext, useRef, useEffect } from 'react';
import Rain from '../../components/Rain';
import '../../components/Rain/style.css';
import {GradeFSet} from '../../components/confettiSet/GradeFSet';
import Reward from '../../components/Reward/Reward';
import { HeartBrokenSet } from "../../components/Reward/MemphisSets";
import { useParams } from 'react-router-dom';
import { PageTransitionColorsStore } from '../../Store';

export default function GradeF(props) {
  const index= parseInt(useParams().categoryIndex);
  const gradePercentage = props.gradePercentage;
  const canvasInputF = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const { pageTransitionColorsState, pageTransitionColorsDispatch} = useContext(PageTransitionColorsStore);
  const primaryTextColor = pageTransitionColorsState.data[0][1];

  useEffect(()=> {
    setTimeout(() => {
      canvasInputF.current.rewardMe();
    }, 300)
  }, [])

  useEffect(() => {
    setImgSrc(GradeFSet()[0]);
  }, [index])
  return (
    <div style={{"color": primaryTextColor}} className="flex items-center justify-center flex-col w-screen">
      <Rain numDrops="25" />
      <div className="w-4/12 flex flex-rows items-center">
        <div className="sm:text-base sm:w-screen sm:px-12 text-2xl my-6 pr-2 border-r text-right mr-5 w-9/12">
          {
            <div>Oh no, Seems like you don't like Anni's answers that much.</div>
          }
        </div>
        <div className="sm:hidden text-6xl mx-4 w-3/12">
          {
            <span>{gradePercentage}</span>
          }
        </div>
      </div>
      <div className="relative flex justify-center">
        <img className="my-6 sm:w-8/12" width="200px" src={imgSrc} />
        <div class="absolute left-1/2 top-0">
          <Reward ref={canvasInputF} type='emoji' config = {{"emoji": HeartBrokenSet(), "elementCount": 10, "elementSize": 100, "spread": 150}}></Reward>
        </div>
      </div>
    </div>
  )
}
