import { useParams } from 'react-router-dom';
import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactStoreIndicator from 'react-score-indicator'
import "./Report.scss";
import Logo from "../../components/Logo";
import Footer from '../../components/Footer';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';
import Smile from '../../components/shapes/Smile';
import Sad from '../../components/shapes/Sad';
import Triangle from '../../components/shapes/memphis/Triangle';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Arrow from '../../components/shapes/Arrow';
import Sun from '../../components/shapes/Sun';
import DelayLink from '../../ultils/DelayLink';
import { GradeASet } from '../confettiSet/GradeASet';
import { fetchQuestionsDataAction,  fetchQuestionsNumDataAction, stepDoneAction, stepsAddAnswersAction, initialQuestionsNum } from '../../Actions';
import { QuestionsStore, QuestionsNumStore, StepperStore, UserAnswersStore } from '../../Store';
import { motion } from "framer-motion";
import { content, upMotion} from '../../components/AnimationSet';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import GoToTop from '../../ultils/GoToTop';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';

function Report(props) {
  const primaryColor = props.location.state ? props.location.state.bgTextColor[0]: 'yellow';
  const secondaryColor = props.location.state ? props.location.state.bgTextColor[1]: 'blue';
  const primaryTextColor = props.location.state ? props.location.state.bgTextColor[2]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.bgTextColor[3]: 'white';
  const thirdColor = props.location.state ? props.location.state.bgTextColor[4]: '';
  const thirdTextColor = props.location.state ? props.location.state.bgTextColor[5]: '';
  const { questionsState, dispatch } = useContext(QuestionsStore);
  // fetch data from json file
  useEffect(
    () => {
      questionsState.data.length === 0 && fetchQuestionsDataAction(dispatch, initialQuestionsNum());
    },
    []
  );

  const [footer, setFooter] = useState(false);
  useEffect(() => {
    setFooter(true);
  }, [])

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    //document.body.classList.add(`${primaryColor?primaryColor:'yellow'}-primary-color`);
    //document.body.classList.add(`${secondaryColor?secondaryColor:'blue'}-secondary-color`);
  },[])


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
  const setArray = [DonutSet(), IceCreamSet(), TwitchSet(), DefaultSet(), FruitSet(), FruitSet2()];
  const set = GetRandomFromArray(setArray)[0];
  const CustomToastWithLink = () => (
    <div>
      <Link to="/interview">You havn't finished the interview. <br />Go back to the 4 steps interview.</Link>
    </div>
  );

    const notify = () => toast(CustomToastWithLink);
  useEffect(() => {
    setTimeout(() => {
      notify();
    }, 1000)
  }, [])

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    setImgSrc(GradeASet()[0]); // already randomize in gradeASet
  },[])


  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );
  const pageVariants = {
    initial: {
      y: 50,
      opacity:0
    },
    leftInitial: {
      x: '-100vw'
    },
    rightInitial: {
      x: '100vw'
    },
    in: {
      y: 0,
      opacity: 1
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
    <motion.div variants={content}
    animate="animate"
    initial="initial" id="outer-container" className={`${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <motion.div initial='leftInitial' exit='leftOut' variants={pageVariants} transition={pageTransition} className={`panel left bg-${bgColorValue[0][0]} w-3/5 h-full absolute z-9999`}></motion.div>
      <motion.div initial='rightInitial' exit='rightOut' variants={pageVariants} transition={pageTransition} className={`panel right bg-${bgColorValue[1][0]} w-2/5 right-0 h-full absolute z-9999`}></motion.div>
      <Logo backArrow primaryColor={primaryTextColor} secondaryColor={secondaryTextColor} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} thirdColor={thirdColor} thirdTextColor={thirdTextColor} />
      {
        <HamburgerMenu color={secondaryTextColor?secondaryTextColor:'white'} bgColor={thirdColor?thirdColor:'yellow'} bgTextColor={thirdTextColor?thirdTextColor:'var(--gray-dark)'} primaryColor={bgColorValue[0][0]} secondaryColor={bgColorValue[1][0]} primaryTextColor={bgColorValue[0][1]} secondaryTextColor={bgColorValue[1][1]} thirdColor={bgColorValue[2][0]} thirdTextColor={bgColorValue[2][1]} />
      }
      <ToastContainer position="top-center" draggable={true} draggablePercent={25} autoClose={10000} />
      <div id="page-wrap" className={`w-screen min-h-screen report bg-primary-secondary flex justify-center items-center py-10`}>
        <motion.div variants={pageVariants} initial='initial' transition={pageTransition} exit='down' animate="in" className="xl:w-8/12 lg:w-11/12 lg:mt-20 p-20 lg:p-10 w-6/12 h-5/6 bg-white default-window mt-20">
          <div className="flex flex-row w-full h-full lg:flex-col">
            <div className="lg:w-screen w-6/12 h-full">
              <div className="w-6/12 bg-cover bg-center bg-no-repeat" style={{"backgroundImage": `url(${imgSrc})`, "backgroundColor": `var(--${secondaryColor})`, "backgroundSize": "120px auto", "height": "300px"}}></div>
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
        </motion.div>
      </div>

      <motion.div variants={pageVariants} initial='initial' transition={pageTransition} exit='leftInitial' animate='in'>
        {
          footer && <Footer primaryColor={bgColorValue[0][0]} secondaryColor={bgColorValue[1][0]} primaryTextColor={bgColorValue[0][1]} secondaryTextColor={bgColorValue[1][1]} thirdColor={thirdColor} thirdTextColor={thirdTextColor} />
        }
      </motion.div>

      <GoToTop />
    </motion.div>
  );
}

export default Report;
