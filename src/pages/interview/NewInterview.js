import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider';
import Logo from '../../components/Logo';
import Chip from '@material-ui/core/Chip';
import { fetchDataAction, fetchQuestionsDataAction, fetchQuestionsNumDataAction, initialQuestionsNum, stepResetAction, stepsResetAnswersAction } from '../../Actions';
import { HomeStore } from '../../Store';
import DelayLink from '../../ultils/DelayLink';
import Footer from '../../components/Footer';
import Arrow from '../../components/shapes/Arrow';
import Sun from '../../components/shapes/Sun';
import { GradeASet } from '../confettiSet/GradeASet';
import { StepperStore, UserAnswersStore, QuestionsNumStore } from '../../Store';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import Memphis16_1 from '../../components/shapes/memphis16/Memphis16_1';
import Memphis16_2 from '../../components/shapes/memphis16/Memphis16_2';
import Memphis16_3 from '../../components/shapes/memphis16/Memphis16_3';
import Memphis16_4 from '../../components/shapes/memphis16/Memphis16_4';
import Memphis16_5 from '../../components/shapes/memphis16/Memphis16_5';
import Wave from '../../components/shapes/Wave';
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import { DefaultSet } from "../../components/Reward/MemphisSets";
import { motion } from "framer-motion";
import { content, upMotion} from '../../components/AnimationSet';
import GoToTop from '../../ultils/GoToTop';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';
import './NewInterview.scss';

function NewInterview(props) {
  const primaryColor = props.location.state ? props.location.state.bgTextColor[0]: 'blue';
  const secondaryColor = props.location.state ? props.location.state.bgTextColor[1]: 'purple';
  const primaryTextColor = props.location.state ? props.location.state.bgTextColor[2]: 'white';
  const secondaryTextColor = props.location.state ? props.location.state.bgTextColor[3]: 'white';
  const thirdColor = props.location.state ? props.location.state.bgTextColor[4]: '';
  const thirdTextColor = props.location.state ? props.location.state.bgTextColor[5]: '';
  const defaultValueArray = initialQuestionsNum();
  const defaultQuestionsSum = defaultValueArray.reduce((a, b) => a + b, 0);
  const { state, dispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch } = useContext(StepperStore);
  const { userAnswersState, userAnswersDispatch } = useContext(UserAnswersStore);
  const { questionsNumState, questionsNumDispatch } = useContext(QuestionsNumStore);

  const pathname = useHistory().location.pathname;
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    document.body.classList = "";
    //document.body.classList.add(`${primaryColor?primaryColor:'yellow'}-primary-color`);
    //document.body.classList.add(`${secondaryColor?secondaryColor:'blue'}-secondary-color`);
  },[])

  useEffect(() => {
    if (pathname == '/newInterview') {
      document.body.classList.add('new-interview');
    }
    setFooter(true);
  }, [])

  useEffect(
    () => {
      state.data.length === 0 && fetchDataAction(dispatch); // fetch basic json if not loaded in home
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

  function dispatchQuestionsNum(){
    fetchQuestionsDataAction(dispatch, questionsNum);
    fetchQuestionsNumDataAction(questionsNum, questionsNumDispatch); // dispatch questions num
    stepResetAction([], stepperDispatch); // start new steps
    stepsResetAnswersAction([[],[],[],[]], userAnswersDispatch);
    localStorage.setItem('questionsNum', JSON.stringify(questionsNum));
    localStorage.setItem('steps', JSON.stringify([]));
    localStorage.setItem('completedSteps', JSON.stringify([]));
    localStorage.setItem('stepsAnswers', JSON.stringify([[],[],[],[]]));
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
  up: {
    y: -300
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
      <div id="page-wrap" className={`w-screen min-h-screen bg-primary-secondary flex justify-center items-center py-10`}>
        <motion.div variants={pageVariants} initial='initial' transition={pageTransition} exit='down' animate="in" className="2xl:w-8/12 xl:w-9/12 lg:w-11/12 lg:mt-20 lg:p-10 w-6/12 h-5/6 bg-white p-20 sm:p-5 default-window mt-20">
          <div className="flex flex-row w-full h-full lg:flex-col">
            <div className="lg:w-full w-6/12 h-full">
              <div className={`w-9/12 lg:w-full bg-cover bg-center bg-no-repeat bg-${secondaryColor}`} style={{"backgroundImage": `url("/img/interview.svg")`, "backgroundSize": "150px auto", "height": "300px"}}></div>
              <div className="text-black lowercase font-semibold text-4xl my-10">start to<br />interview <br />Anni</div>
              <div class="float-left w-9/12 flex flex-row">
                {
                  DefaultSet().map((item, index) =><div className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
                }
              </div>
              <div className="clear-both"></div>
            </div>
            <div className="lg:w-full w-7/12">
              <ul>
                <li className="border-3 py-6"><p className="block my-3">Pick your interview prefernces, you can ask min 4 questions or max 36 questions here. Move the slider or click on the chips.</p></li>
                <li className="flex flex-row flex-wrap gap-2 w-full relative mb-10">
                  {
                    chips.map((chip, i) => {
                      const isToggled = i === toggledChipId;
                      return (
                        <li key={chip.id} onClick={()=> {handleChipsValue(chip.default_questions); toggleChip(i)}} className={`text-xs`}>
                          <div className={`p-2 mb-3 border ${isToggled ? "selected" : ""}`} style={{"color": `${isToggled ? '#fff': 'var(--blue)'}`, "backgroundColor": `${isToggled ? 'var(--purple)': ''}`}}>{chip.text}</div>
                        </li>
                      )
                    })
                  }
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
            <button onClick={dispatchQuestionsNum} className="border p-3 rounded-sm">
              <DelayLink to={{
                pathname: "/interview/0",
                state: {questionsNum: questionsNum}
              }}>
              <div className="flex flex-row justify-center items-center lg:text-sm">
                <span>Generate Interview Questions</span>
              </div>
              </DelayLink>
            </button>
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

export default NewInterview;
