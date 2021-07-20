import { useParams } from 'react-router-dom';
import React, { useState, useContext, useRef, useEffect } from 'react';
import ReactStoreIndicator from 'react-score-indicator'
import "./Report.scss";
import Logo from "../../components/Logo";
import Footer from '../../components/Footer';
import { useSpring, animated } from 'react-spring';
import { motion } from "framer-motion";
import * as easings from 'd3-ease';
import Smile from '../../components/shapes/Smile';
import Sad from '../../components/shapes/Sad';
import Triangle from '../../components/shapes/memphis/Triangle';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "../../components/Reward/MemphisSets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Arrow from '../../components/shapes/Arrow';
import Sun from '../../components/shapes/Sun';
import DelayLink from '../../ultils/DelayLink';
import { GradeASet } from '../confettiSet/GradeASet';
import { fetchQuestionsDataAction,  fetchQuestionsNumDataAction, stepDoneAction, stepsAddAnswersAction, defaultQuestionsNum } from '../../Actions';
import { QuestionsStore, QuestionsNumStore, StepperStore, UserAnswersStore } from '../../Store';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

function Report() {

  window.scrollTo(0, 0);

  const { questionsState, dispatch } = useContext(QuestionsStore);
  // fetch data from json file
  useEffect(
    () => {
      questionsState.data.length === 0 && fetchQuestionsDataAction(dispatch, defaultQuestionsNum());
    },
    []
  );
  const { questionsNumState, questionsNumDispatch } = useContext(QuestionsNumStore);
  const { stepperState, stepperDispatch } = useContext(StepperStore);
  const { userAnswersState, userAnswersDispatch } = useContext(UserAnswersStore);
  const [rightAnswerSum, setRightAnswerSum] = useState(0);

  useEffect(()=>{
    setRightAnswerSum(userAnswersState.data.reduce(function(a,b) { return a.concat(b) }) // flatten array
     .reduce(function(a,b) { return a + b }, 0))
  }, [userAnswersState.data])


  const [questionsSum, setQuestionsSum] = useState(0);

  useEffect(()=>{
    const temp = questionsNumState.data.reduce((a, b) => a + b, 0);
    setQuestionsSum(temp);
  }, [])

  //const fadeIn = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:1000 }, config: { duration: 3000, easing: easings.easeCubic } });
  const setArray = [DonutSet(), IceCreamSet(), TwitchSet(), DefaultSet(), FruitSet(), FruitSet2(), BallonSet()];
  const set = setArray[Math.floor(Math.random()*setArray.length)];
  const notify = () => toast("You haven't finished - Tech Section, UX Section");
  useEffect(() => {
    setTimeout(() => {
      notify();
    }, 1000)
  }, [])
  const bgColorArray = ["orange", "yellow", "green", "green", "purple", "pink", "blue", "red"];
  const bgColor = bgColorArray[Math.floor(Math.random()*bgColorArray.length)];
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    setImgSrc(GradeASet()[0]);
  },[])

  return (
    <div>
      <header style={{"height": "100px"}} className="absolute w-full left-0 top-0">
        <Logo color="var(--blue)" />
        <span className="close absolute right-14 z-30">
          <DelayLink delay="600" to="./" goBackHome="true">
            <Arrow size="100px" rotate="180deg" color="#fff" />
          </DelayLink>
        </span>
      </header>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className={`w-screen h-screen report bg-${bgColor} flex justify-center items-center py-10`}>
        <div className="xl:w-11/12 lg:mt-20 lg:p-10 w-6/12 h-5/6 bg-white p-20 default-window mt-20">
          <div className="flex flex-row w-full h-full lg:flex-col">
            <div className="lg:w-screen w-6/12 h-full">
              <div className="w-6/12 bg-cover bg-center bg-no-repeat" style={{"backgroundImage": `url(${imgSrc})`, "backgroundColor": "var(--purple)", "backgroundSize": "120px auto", "height": "300px"}}></div>
              <div className="text-black lowercase font-semibold text-4xl py-5">statistics<br />report</div>
              <div class="float-left">
                <ReactStoreIndicator width={150} value={(rightAnswerSum/questionsSum).toFixed(2)*100} maxValue={100} />
              </div>
              <div className="clear-both"></div>
              {
                /*
                <div className="text-5xl pb-5 border my-5 inline-block p-5">78% <span className="text-xl">Score</span></div>
                */
              }

            </div>
            <div className="lg:w-full w-6/12">
              <Sun />
              <ul>
                <li className="border-3 py-6"><p className="block my-3">From the statistics, Anni Wang might be a good fit</p><p> if you are looking for an UX Enginner, Design Technoligist or a prototyper who loves animation. Book a quick online chat here.</p></li>
                <li className="py-10 flex flex-row relative" >
                  {
                    set.map((item, index) =><div className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
                  }
                </li>
                <li className="py-10">
                  <ul>
                    {
                      questionsState.data.map((item, index) => (
                        <li>
                            <DelayLink to={`./interview/${index}`} delay="1000">{item.cat} </DelayLink>

                            <span className="text-xs text-gray">/ checkmark</span>
                            <ul className="flex flex-row">
                              {
                                item.questions.map((q, i) => (
                                  <li>
                                    {
                                      userAnswersState.data[index][i] === 1 ? <Smile size="32px" opacity="1"  />: <Sad size="32px" opacity=".3" />
                                    }
                                  </li>
                                ))
                              }
                            </ul>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Report;
