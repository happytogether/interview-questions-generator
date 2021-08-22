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
import { DonutSet, IceCreamSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Arrow from '../../components/shapes/Arrow';
import Sun from '../../components/shapes/Sun';
import DelayLink from '../../ultils/DelayLink';
import { GradeASet } from '../../components/confettiSet/GradeASet';
import { GradeFSet } from '../../components/confettiSet/GradeFSet';
import { fetchInterviewCategoryQuestionsJsonAction, fetchInterviewCategoryQuestionsCountAction, stepDoneAction, stepsAddAnswersAction, initialInterviewCategoryQuestionsCount } from '../../Actions';
import { HomeStore, QuestionsStore, QuestionsNumStore, StepperStore, UserAnswersStore } from '../../Store';
import { motion } from "framer-motion";
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';
import { content, upMotion} from '../../components/AnimationSet';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import GoToTop from '../../ultils/GoToTop';
import TransitionPanels from '../../components/TransitionPanels';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { fetchHomepageJsonAction } from "../../Actions";
import { isMobile } from "react-device-detect";
import SegmentsAnimation from '../../components/SegmentsAnimation';
import Marquee from '../../components/Marquee';

function Report(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'pink';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'green';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'yellow';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'var(--gray-dark)';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'purple';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'white';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'orange';
  const fifthTextColor = props.location.state ? props.location.state.textColor[4]: 'var(--gray-dark)';
  // get homepage json if not in store
  const { state, homeDispatch } = useContext(HomeStore);
  const logoTitle = " Anni Wang ";
  useEffect(() => {
    state.data.length === 0 && fetchHomepageJsonAction(homeDispatch);
  },[state.data]);

  const { questionsState, dispatch } = useContext(QuestionsStore);
  const { questionsNumState, questionsNumDispatch } = useContext(QuestionsNumStore);
  const { stepperState, stepperDispatch } = useContext(StepperStore);
  const { userAnswersState, userAnswersDispatch } = useContext(UserAnswersStore);
  const [interviewDone, setInterviewDone] = useState(false);
  const [footer, setFooter] = useState(false);

  // fetch data from json file if no data from store

  const [questionsNumData, setQuestionsNumData] = useState(questionsNumState.data);

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`bg-${thirdColor}`);
    setFooter(true);
  },[])

  const stepperData = stepperState.data;
  const [ rightAnswerSum, setRightAnswerSum ] = useState(0);
  const [questionsData, setQuestionsData] = useState([]);


  useEffect(()=>{
    setRightAnswerSum(userAnswersState.data && userAnswersState.data.length!==0 && userAnswersState.data.reduce(function(a,b) { return a.concat(b) }) // flatten array
     .reduce(function(a,b) { return a + b }, 0))
  }, [userAnswersState.data]);


  const [questionsSum, setQuestionsSum] = useState();

  useEffect(()=>{
    setQuestionsSum((questionsNumState.data && questionsNumState.data.length!==0) ? questionsNumState.data.reduce(function(a,b) { return a + b }, 0): 0);
  }, [questionsNumState.data])

  useEffect(() => {
    stepperState.data.length === 4 ? setInterviewDone(true): setInterviewDone(false);
  },[stepperState.data])

    useEffect(() => {
      !interviewDone && toast(CustomToastWithLink)
    },[interviewDone])

  //const fadeIn = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:1000 }, config: { duration: 3000, easing: easings.easeCubic } });
  const setArray = [DefaultSet()];
  const set = useMemo(
    () => GetRandomFromArray(setArray)[0],[]);

  const CustomToastWithLink = () => (
    <div>
      <Link to="/interview/0">You havn't finished the whole interview process. <br /><span className="link">Click to finish the interview.</span></Link>
    </div>
  );

  const notify = () => toast(CustomToastWithLink);
  useEffect(() => {
    setTimeout(() => {
      //notify();
    }, 1000)
  }, [])

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (!interviewDone) {
      setImgSrc('/img/hardworking.svg');
    } else {
      (rightAnswerSum/questionsSum).toFixed(2)*100 >= 66 ? setImgSrc(GradeASet()[0]): setImgSrc(GradeFSet()[0]);
    }
  },[interviewDone])


  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );

  const GreenCheckbox = withStyles({
    root: {
      color: 'var(--purple)',
      '&$checked': {
        color: 'var(--pruple)',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  function reportDialog() {
      if (interviewDone) {
        const dialog = (rightAnswerSum/questionsSum).toFixed(2)*100 >=66 ? <div><p className="block my-3">Based on the statistics, it seems like &nbsp;
        <SegmentsAnimation segment={logoTitle.length} type="text" x={0} y={-5} zIntervalFrom={-20} zIntervalTo={200} delay={50} bgColorValue={bgColorValue}>
          {logoTitle}
        </SegmentsAnimation>
         &nbsp; might be a good fit.</p><p className="block my-3">You can contact Anni to see if she is available.</p><p><DelayLink to='/interview'>or <span className="link">click here</span></DelayLink> to redo the interview.</p></div>: <div className="block my-3">Based on the statistics, it seems like
         <SegmentsAnimation segment={logoTitle.length} type="text" x={0} y={-5} zIntervalFrom={-20} zIntervalTo={200} delay={50} bgColorValue={bgColorValue}>
          {logoTitle}
         </SegmentsAnimation>
        might not be a good fit.<p className="block my-3">If you're looking for a UX Engineer, Deisgn Technologist or a prototyper. Feel free not to contact me.</p></div>
        return dialog;
      } else {
        switch(stepperState.data.length) {
          case 0:
            return <div className="block my-3">You haven't started the interview process. <p className="block my-3">You'll need to finish the 4 steps interview process to see the final report. <span className="link">Click here</span></p></div>
            break;
          case 1:
            return <p className="block my-3">You haven't finished the whole interview process.</p>
            break;
          case 2:
            return <div><p className="block my-3">You haven't finished the whole interview process.</p> <p><span className="link">Click here</span> to finish the interview process and see the final report.</p></div>
            break;
          case 3:
            return <p className="block my-3">You haven't finished the whole interview process. Go back to the interview process to see the final report.</p>
            break;
          default:
            return <p>You haven't started the interview process.</p>
      }
    }
  }

  return (
    <motion.div variants={content}
    animate="animate"
    initial="initial" id="outer-container" className={`${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo goBackHome={true} noShowColor={primaryColor} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <HamburgerMenu barColor={secondaryTextColor} panelBgColor={thirdColor} panelTextColor={thirdTextColor} crossColor={thirdTextColor} bgColorValue={bgColorValue} />
      <ToastContainer position="top-center" draggable={true} draggablePercent={25} autoClose={10000} />
      <div id="page-wrap" className={`w-screen min-h-screen report bg-primary-secondary flex justify-center items-center py-10`}>
        <motion.div variants={pageVariants} initial='initial' transition={pageTransitionShort} exit='down' animate="in" className="xl:w-8/12 lg:w-11/12 lg:mt-20 p-20 lg:p-10 w-6/12 h-5/6 bg-white default-window mt-20">
          <div className="flex flex-row w-full h-full lg:flex-col">
            <div className="lg:w-screen w-6/12 h-full">
              <div className="w-6/12 bg-cover bg-center bg-no-repeat" style={{"backgroundImage": `url(${imgSrc})`, "backgroundColor": `var(--${secondaryColor?secondaryColor:'blue'})`, "backgroundSize": "120px auto", "height": "300px"}}></div>
              <div className="text-black lowercase font-semibold text-4xl py-5">
                statistics<br />report
              </div>
              <div className="float-left">
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
              <motion.div variants={pageVariants} initial='initial' transition={pageTransition2} exit='down' animate="in" className="absolute -right-40 lg:right-10 top-20">
                <Sun noShowColor={secondaryColor} />
              </motion.div>
              <ul>
                <li className="border-3 py-6">
                  {reportDialog()}
                </li>
                <li className="py-10 flex flex-row relative" >

                  <SegmentsAnimation segment={set.length} type="img" x={-20} y={-20} zIntervalFrom={-20} zIntervalTo={200} delay={50} bgColorValue={bgColorValue}>
                    {
                      set.map((item, index) =><div key={index} className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
                    }
                  </SegmentsAnimation>

                </li>
                <li className="py-10">
                  <ul>
                    {
                      questionsNumState.data && questionsNumState.data.map((item, index) => (
                        <li key={index} className="my-5 flex flex-row items-start">
                          {
                            stepperData.includes(index) ? <GreenCheckbox checked='checked' name="checked" />: <GreenCheckbox disabled name="checkbox" />
                          }
                          <div>
                            <div>
                              <DelayLink to={`./interview/${index}`}>{state.data && state.data.length!==0 && state.data[index].cat} </DelayLink>
                              <span className="text-xs text-gray"> / {stepperData.includes(index)? <span>Done</span>: null}</span>
                            </div>
                            <ul className="flex flex-row">
                              {
                                [...Array(parseInt(item)).keys()].map((q, i) => (
                                  <li key={i}>
                                    {
                                      userAnswersState.data && userAnswersState.data[index][i] === 1 ? <Smile size="32px" opacity="1"  />: <Sad size="32px" opacity=".3" />
                                    }
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
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
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Marquee bgColor={fifthColor} />
        }
      </motion.div>
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
        }
      </motion.div>
      <GoToTop />
    </motion.div>
  );
}

export default Report;
