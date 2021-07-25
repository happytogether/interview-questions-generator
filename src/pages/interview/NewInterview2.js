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
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import './NewInterview.scss';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const piePosX = window.innerWidth - 100;
const piePosY = window.innerHeight + 50;
const trans5 = (x, y) => `translate3d(${-x / 60}px,${y / 60}px,0)`

const bgColorArray = ["orange", "blue", "yellow", "green", "purple", "blue"];
const randomIndex = Math.floor(Math.random()*bgColorArray.length);

export default function NewInterview() {
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
  const bgColor = bgColorArray[randomIndex];
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
      <div id="outer-container">
        <Logo backArrow backArrowColor="white" color="var(--blue)" menuColor="white" />
        <div id="page-wrap">
          <div className={`bg-blue interview-start text-blue flex justify-center items-center`}>
            <div className="options-container default-window xl:w-8/12  lg:w-11/12 lg:mt-20 lg:p-10 w-6/12 h-5/6 bg-white m-20 p-20 mt-32">
              <div>
                <p className="text-3xl mb-7">Pick Your Preference:</p>
                <ul className="chips flex flex-row flex-wrap gap-2 mb-10 clear-both text-sm">
                  {
                    chips.map((chip, i) => {
                      const isToggled = i === toggledChipId;
                      return (
                        <li key={chip.id} onClick={()=> {handleChipsValue(chip.default_questions); toggleChip(i)}} className={`text-sm flex-2 mb-3`}>
                          <span className={`p-2 border ${isToggled ? "selected" : ""}`} style={{"color": `${isToggled ? '#fff': 'var(--blue)'}`, "border": `2px solid`, "backgroundColor": `${isToggled ? 'var(--blue)': ''}`}}>{chip.text}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="flex flex-row w-full h-full lg:flex-col">
                <div className="lg:w-screen w-6/12 h-full lg:hidden">
                  <div className="bg-cover w-11/12 bg-cover bg-center bg-no-repeat" style={{"backgroundImage": `url("/img/interview.svg")`, "height": "400px"}}></div>
                </div>
                <div className="lg:w-full w-8/12 pl-10 lg:pl-0">
                  <ul>
                    <li className="border-3 py-2 font-semibold text-3xl"></li>
                    <li>
                    <div className="flex flex-col">
                      <ul className="flex flex-col">
                        {
                          state.data.map((item, index) => (
                            <li className="mb-10 flex flex-row">
                              <div className="flex-1 text-right pr-6 text-sm">{item.cat}</div>
                              <div className="flex-2">
                                <Slider key={`categoryIndex`+index} color={bgColorArray[4]} categoryIndex={index} handleQuestionsNum={handleQuestionsNum} defaultValue={questionsNum[index]} />
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                      <hr />
                      <div className="flex flex-row justify-between text-sm mt-5">
                        <span className="text-left">Total</span>
                        <span className="text-right">/ {questionsSum} Questions</span>
                      </div>
                    </div>
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
                    <span className="pl-3"><Arrow size="25px" color="var(--blue)" /></span>
                  </div>
                  </DelayLink>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-0">
            <Memphis16_1 />
          </div>
          <Footer bgColor="yellow" textColor="graydark" />
        </div>
      </div>
  )
}
