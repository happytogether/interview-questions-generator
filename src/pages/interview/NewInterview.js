import React, { useState, useContext, useEffect } from 'react';
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
import './NewInterview.scss';

function NewInterview() {

  const defaultValueArray = initialQuestionsNum();
  const defaultQuestionsSum = defaultValueArray.reduce((a, b) => a + b, 0);
  const { state, dispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch } = useContext(StepperStore);
  const { userAnswersState, userAnswersDispatch } = useContext(UserAnswersStore);
  const { questionsNumState, questionsNumDispatch } = useContext(QuestionsNumStore);

  const pathname = useHistory().location.pathname;

  useEffect(() => {
    if (pathname == '/newInterview') {
      document.body.classList.add('new-interview');
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(
    () => {
      state.data.length === 0 && fetchDataAction(dispatch);
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
      "text": "UX Focus",
      "default_questions": [3,5,3,2],
      "color": "var(--pink)"
    },
    {
      "text": "Leadership Focus",
      "default_questions": [2,2,5,3],
      "color": "var(--purple)"
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
    <motion.div id="outer-container" variants={content}
    animate="animate"
    initial="initial">
      <Logo backArrow backArrowColor="white" menuColor="white" color="var(--blue)" />
      <div id="page-wrap" className={`w-screen h-screen report bg-gray-purple flex justify-center items-center py-10`}>
        <motion.div variants={upMotion} className="xl:w-8/12 lg:w-11/12 lg:mt-20 lg:p-10 w-6/12 h-5/6 bg-white p-20 default-window mt-20">
          <div className="flex flex-row w-full h-full lg:flex-col">
            <div className="lg:w-screen w-6/12 h-full">
              <div className="w-9/12 bg-cover bg-center bg-no-repeat" style={{"backgroundImage": `url("/img/interview.svg")`, "backgroundColor": "var(--purple)", "backgroundSize": "150px auto", "height": "300px"}}></div>
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
                <li className="flex flex-row flex-wrap mb-20">
                  {
                    chips.map((chip, i) => {
                      const isToggled = i === toggledChipId;
                      return (
                        <li key={chip.id} onClick={()=> {handleChipsValue(chip.default_questions); toggleChip(i)}} className={`text-xs flex-2 m-2 mb-3`}>
                          <span className={`p-2 border rounded-sm ${isToggled ? "selected" : ""}`} style={{"color": `${isToggled ? '#fff': 'var(--blue)'}`, "border": `2px solid`, "backgroundColor": `${isToggled ? 'var(--blue)': ''}`}}>{chip.text}</span>
                        </li>
                      )
                    })
                  }
                </li>
                <li>
                  <ul className="flex flex-col text-blue">
                    <div className="-ml-10">
                      {
                        state.data.map((item, index) => (
                          <li className="material-slider mb-10 flex flex-row">
                            <div className="w-4/12 pr-6 text-right text-sm">{item.cat}</div>
                            <div className="w-8/12">
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
              <div className="flex flex-row justify-center items-center">
                <span>Generate Interview Questions</span>
              </div>
              </DelayLink>
            </button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
}

export default NewInterview;
