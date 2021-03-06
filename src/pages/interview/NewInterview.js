import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider';
import Logo from '../../components/Logo';
import Chip from '@material-ui/core/Chip';
import { fetchHomepageJsonAction, fetchInterviewCategoryQuestionsJsonAction, fetchInterviewCategoryQuestionsCountAction, initialInterviewCategoryQuestionsCount, stepResetAction, stepsResetAnswersAction } from '../../Actions';
import { HomeStore } from '../../Store';
import DelayLink from '../../ultils/DelayLink';
import Footer from '../../components/Footer/Footer';
import Arrow from '../../components/shapes/Arrow';
import Sun from '../../components/shapes/Sun';
import { GradeASet } from '../../components/confettiSet/GradeASet';
import { StepperStore, UserAnswersStore, QuestionsNumStore } from '../../Store';
import Wave from '../../components/shapes/Wave';
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import { DefaultSet } from "../../components/Reward/MemphisSets";
import { motion } from "framer-motion";
import { content, upMotion} from '../../components/Sets/AnimationSet';
import GoToTop from '../../ultils/GoToTop';
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import TransitionPanels from '../../components/TransitionPanels';
import { isMobile } from "react-device-detect";
import { ColorSet, BgColorSet, BgColorSetInterview, WhiteText, ColorSetDarkText } from '../../components/Sets/ColorSet';
import './NewInterview.scss';
import { pageTransitionColorsAction } from "../../Actions";
import { PageTransitionColorsStore } from '../../Store';
import SegmentsAnimation from '../../components/SegmentsAnimation';
import Navigation from '../../components/Navigation';
import GoBackArrow from '../../components/GoBackArrow';

function NewInterview(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'bg-pink';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'bg-green';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'bg-yellow';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'bg-purple';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'bg-red';
  const sixthColor = props.location.state ? props.location.state.bgColor[5]: 'bg-blue';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'var(--gray-dark)';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'white';
  const sixthTextColor = props.location.state ? props.location.state.textColor[5]: 'white';

  const defaultValueArray = initialInterviewCategoryQuestionsCount();
  const defaultQuestionsSum = defaultValueArray.reduce((a, b) => a + b, 0);
  const { state, homeDispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch } = useContext(StepperStore);
  const { userAnswersState, userAnswersDispatch } = useContext(UserAnswersStore);
  const { questionsNumState, questionsNumDispatch } = useContext(QuestionsNumStore);
  const { pageTransitionColorsState, pageTransitionColorsDispatch } = useContext(PageTransitionColorsStore);

  const pathname = useHistory().location.pathname;
  const [footer, setFooter] = useState(false);

  const bgColorValue = useMemo(
    () => GetRandomFromArray(BgColorSetInterview),[]);

  const logoColorSet = useMemo(
    () => GetRandomFromArray(BgColorSet.filter((color, index) => {
      return color[0]!== primaryColor;
  })),[]);

  const menuColorSet = useMemo(() => GetRandomFromArray(BgColorSet.filter((color, index) => {
    return color[0]!== secondaryColor;
  })),[])

  useEffect(() => {
    document.body.classList = ""; // remove classes from other pages
    document.body.classList.add(`${thirdColor}`); // to cover the white space when open hamburger menu
    if (pathname == '/newInterview') {
      document.body.classList.add('new-interview');
    }
    setFooter(true);
  },[])

  useEffect(
    () => {
      state.data.length === 0 && fetchHomepageJsonAction(homeDispatch); // fetch basic json if not loaded in home
    },[state])

  const [questionsNum, setQuestionsNum] = useState(defaultValueArray);

  function handleQuestionsNum(index, value) {
    const newArray = questionsNum.map((item, i) => {
      if(i === index) {
        item = value;
    }
      return item;
    });
    setQuestionsNum(newArray);
    setQuestionsSum(sumQuestionsNum(newArray));
  }

  function handleDispatchInterviewQuestions() {
    fetchInterviewCategoryQuestionsJsonAction(homeDispatch, questionsNum);
    fetchInterviewCategoryQuestionsCountAction(questionsNum, questionsNumDispatch); // dispatch questions num
    stepResetAction([], stepperDispatch); // start new steps
    stepsResetAnswersAction([[],[],[],[]], userAnswersDispatch);
    pageTransitionColorsAction(bgColorValue, pageTransitionColorsDispatch);
  }

  function handleChipsValue(arr){
    setQuestionsNum(arr);
    setQuestionsSum(sumQuestionsNum(arr));
  }
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    setImgSrc(GradeASet()[0]);
  },[])
  const [selected, setSelected] = useState(false);
  const chips = [
    {
      "text": "Tech Heavy",
      "default_questions": [5,3,3,2],
      "color": "var(--blue)"
    },
    {
      "text": "Leadership Focus",
      "default_questions": [2,2,5,3],
      "color": "var(--purple)"
    },
    {
      "text": "UX Focus",
      "default_questions": [3,5,3,2],
      "color": "var(--pink)"
    },
    {
      "text": "Experience Focus",
      "default_questions": [2,2,3,5],
      "color": "var(--orange)"
    },
    {
      "text": "Equal Proportion",
      "default_questions": [4,4,4,4],
      "color": "var(--red)"
    }
  ];
  const [toggledChipId, setToggledChipId] = useState(0);

  function sumQuestionsNum(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  const [questionsSum, setQuestionsSum] = useState();

  useEffect(()=> {
    setQuestionsSum(sumQuestionsNum(defaultValueArray));
  }, []);

  function toggleChip(id) {
    setToggledChipId(id);
  }

return (
    <motion.div variants={content}
    animate="animate"
    initial="initial" id="outer-container" className={`${primaryColor}-primary-color ${secondaryColor}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo goBackHome={true} logoColorSet={logoColorSet} arrowColor={primaryTextColor} bgColorValue={bgColorValue} />
      <GoBackArrow noShowColor={secondaryColor} color={secondaryTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className={`w-screen min-h-screen bg-primary-secondary flex justify-center items-center py-10 pb-20`}>
        <motion.div variants={pageVariants} initial='initial' transition={pageTransitionShort} exit='down' animate="in" className="xl:w-9/12 lg:w-11/12 lg:mt-20 lg:p-10 w-6/12 h-5/6 bg-white p-20 sm:p-5 default-window mt-20">
          <div className="flex flex-row w-full h-full lg:flex-col">
            <div className="lg:w-full w-6/12 h-full">
              <motion.div variants={pageVariants} initial='initial' transition={pageTransition2} exit='down' animate="in" className="absolute z-20 -right-40 lg:right-10 top-20">
                <Sun noShowColor={secondaryColor} />
              </motion.div>
              <div className={`w-9/12 lg:w-full bg-cover bg-center bg-no-repeat ${secondaryColor}`} style={{"backgroundImage": `url("/img/interview.svg")`, "backgroundSize": "150px auto", "height": "300px"}}></div>
              <div className="text-black lowercase font-semibold text-4xl my-10">
                <SegmentsAnimation segment={5} type="img" x={-5} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50}>start</SegmentsAnimation>&nbsp;
                <SegmentsAnimation segment={2} type="img" x={-5} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50}>to</SegmentsAnimation>
                <br />
                <SegmentsAnimation segment={9} type="img" x={-5} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50}>interview</SegmentsAnimation>
                 <br />
                <SegmentsAnimation segment={4} type="img" x={-5} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50}>Anni</SegmentsAnimation>
              </div>
              <div className="float-left w-9/12 flex flex-row">
                <SegmentsAnimation segment={DefaultSet().length} type="img" x={-5} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50}>
                  {
                    DefaultSet().map((item, index) =><div key={index} className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
                  }
                </SegmentsAnimation>
              </div>
              <div className="clear-both"></div>
            </div>
            <div className="lg:w-full w-7/12">
              <ul>
                <li className="border-3 py-6"><p className="block my-3">Pick your interview prefernces, you can ask min 4 questions or max 36 questions here. Drag the slider or click on the chips.</p></li>
                <li className="w-full relative mb-10">
                  <ul className="flex flex-row flex-wrap gap-2 ">
                    {
                      chips.map((chip, i) => {
                        const isToggled = i === toggledChipId;
                        return (
                          <li key={chip.id} onClick={()=> {handleChipsValue(chip.default_questions); toggleChip(i)}} className={`text-xs`}>
                            <button className={`p-2 mb-3 border ${isToggled ? "selected" : ""}`} style={{"color": `${isToggled ? '#fff': 'var(--blue)'}`, "backgroundColor": `${isToggled ? 'var(--purple)': ''}`}}>{chip.text}</button>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
                <li>
                  <ul className="flex flex-col text-blue">
                    <div>
                      {
                        state.data.map((item, index) => (
                          <li className="material-slider mb-5">
                            <div className="text-xs">{item.cat}</div>
                            <div>
                              <Slider key={`categoryIndex`+index} categoryIndex={index} handleQuestionsNum={handleQuestionsNum} defaultValue={questionsNum[index]} />
                            </div>
                          </li>
                        ))
                      }
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between text-sm mt-5">
                      <span className="text-left">Total</span>
                      <span className="text-right">/ {questionsSum} Questions</span>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-10 bg-white">
            <button onClick={handleDispatchInterviewQuestions} className="border rounded-sm">
              <DelayLink to={{
                pathname: "/interview/0",
                state: {
                  bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0], bgColorValue[4][0], bgColorValue[5][0], bgColorValue[6][0]],
                  textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1], bgColorValue[4][1], bgColorValue[5][1], bgColorValue[6][1]]
                }}}>
                <div className="p-3 flex flex-row justify-center items-center lg:text-sm">
                  <span>Generate Interview Questions</span>
                </div>
              </DelayLink>
            </button>
          </div>
        </motion.div>
      </div>
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
        }
      </motion.div>

      <GoToTop />
      <Navigation menuColorSet={menuColorSet} bgColorValue={bgColorValue} />
    </motion.div>
  );
}

export default NewInterview;
