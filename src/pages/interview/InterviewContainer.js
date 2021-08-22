import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { MouseContext } from "../../context/mouse-context";
import useMousePosition from "../../hooks/useMousePosition";
import InterviewQuestions from './InterviewQuestions';
import Arrow from '../../components/shapes/Arrow';
import getRandomDifferent from '../../getRandomDifferent';
import MouseLeftRight from "../../components/DotRing/MouseLeftRight";
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import Logo from '../../components/Logo';
import { motion } from "framer-motion"
import { QuestionsStore, QuestionsNumStore, UserAnswersStore, PageTransitionColorsStore } from '../../Store';
import { fetchInterviewCategoryQuestionsJsonAction } from '../../Actions';
import DelayLink from '../../ultils/DelayLink';
import { initialInterviewCategoryQuestionsCount } from '../../Actions';
import FlickHand from '../../components/shapes/FlickHand';
import useCookie from "../../hooks/useCookie";
import Smile from "../../components/shapes/Smile";
import Sad from "../../components/shapes/Sad";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';
import { content, upMotion} from '../../components/AnimationSet';

export default function InterviewContainer(props) {
  const { pageTransitionColorsState, pageTransitionColorsDispatch} = useContext(PageTransitionColorsStore);
  const primaryColor = pageTransitionColorsState.data[0][0];
  const primaryTextColor = pageTransitionColorsState.data[0][1];
  const secondaryColor = pageTransitionColorsState.data[1][0];
  const secondaryTextColor = pageTransitionColorsState.data[1][1];
  const thirdColor = pageTransitionColorsState.data[2][0];
  const thirdTextColor =  pageTransitionColorsState.data[2][1];
  const fourthColor =  pageTransitionColorsState.data[3][0];
  const fourthTextColor =  pageTransitionColorsState.data[3][1];

  const { questionsState, dispatch } = useContext(QuestionsStore);
  const { questionsNumState, questionsNumDispatch} = useContext(QuestionsNumStore);
  const { userAnswersState, userAnswersDispatch} = useContext(UserAnswersStore);

  useEffect(
    () => {
      fetchInterviewCategoryQuestionsJsonAction(dispatch, questionsNumState.data);
    },[]);
  const categoryIndex = useParams().categoryIndex;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  const cursorSide = x > window.innerWidth / 2 ? "right" : "left";
  //const pathname = useHistory().location.pathname.match(/.*\/([^/]+)\/[^/]+/)[1] || "";
  const [cookie, updateCookie] = useCookie("onboarding", "false"); // make sure onboarding panel only show once.

  useEffect(() => {
    document.body.classList.add('new-interview');
  }, [])

  useEffect(() => {
    setBg(getRandomDifferent(bgArr, bg));
  }, [data])

  const [bg, setBg] = useState("box-bg");
  const bgArr = ["honey-comb-bg", "pie-bg", "equilateral-triangles-bg","rect-bg", "triangle-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg"];
  const history = useHistory();

  function handleRandomBg() {
    setBg(getRandomDifferent(bgArr, bg));
  }
  const randomIndex = Math.random() > .5 ? 0: 1;

  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );
  const pageVariants = {
  initial: {
    x: "-100vw"
  },
  leftInitial: {
    x: '-100vw'
  },
  rightInitial: {
    x: '100vw'
  },
  in: {
    x: 0
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
    <motion.div>
      <motion.div variants={content}
      animate="animate"
      initial="initial" id="outer-container" className={`${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <Logo logoTextColor={primaryTextColor} noShowColor={primaryColor} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <HamburgerMenu barColor={secondaryTextColor} panelBgColor={thirdColor} panelTextColor={thirdTextColor} crossColor={thirdTextColor} bgColorValue={bgColorValue} />
        <div id="page-wrap" onClick={()=>handleRandomBg()} className={`static2 bg-primary-secondary`}>
          {
            cookie && <div onClick={() => {updateCookie("hidden")}} className={`${cookie} onboarding absolute w-full h-full z-50 bg-white flex flex-col items-center justify-center`}>

                <ul className="flex flex-row items-center">
                  <li className="flex flex-col justify-center items-center">
                    <Sad size="50px" color="#fff" opacity="1" />
                  </li>
                  <li><FlickHand size="200px" color="#fff" /></li>
                  <li className="flex flex-col justify-center items-center">
                    <Smile size="50px" color="#fff" opacity="1" />
                  </li>
                </ul>
                <div className="text-2xl mb-5 text-white">Flick right - like the answer. </div>
                <div className="text-2xl text-white">Flick left - dislike the answer. </div>
            </div>
          }
          {
            questionsState.data.length!==0 && <InterviewQuestions categoryIndex={categoryIndex} steps={questionsState.data.length} primaryColor={primaryColor} primaryTextColor={primaryTextColor} />
          }
        </div>
      </motion.div>
    </motion.div>
  )
}
