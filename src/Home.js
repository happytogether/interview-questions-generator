import { useState, useEffect, useLayoutEffect, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { fetchHomepageJsonAction, stepDoneAction, initialInterviewCategoryQuestionsCount } from "./Actions";
import { HomeStore, StepperStore } from "./Store";
import { MouseContext } from "./context/mouse-context";
import HomeHeader from './components/HomeHeader';
import HomeHeader2 from './components/HomeHeader2';
import Items from './components/Items/Items';
import Footer from './components/Footer/Footer';
import DotRing from "./components/DotRing/DotRing";
import Arrow from "./components/shapes/Arrow";
import Logo from "./components/Logo";
import { downMotion } from './components/Sets/AnimationSet';
import { pageTransition, pageTransition2, pageTransition3, pageVariants } from './ultils/TransitionSet';
import GetRandomFromArray from './ultils/GetRandomFromArray';
import { BgColorSetHome } from './components/Sets/ColorSet';
import SegmentsAnimation from './components/SegmentsAnimation';
import TransitionPanels from './components/TransitionPanels';
import GoToTop from './ultils/GoToTop';
import Marquee from './components/Marquee';
import Navigation from './components/Navigation';

function Home(props) {
  const { state, homeDispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch} = useContext(StepperStore);
  const bgColorValue = useMemo(() => GetRandomFromArray(BgColorSetHome),[]);
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'bg-purple';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'bg-yellow';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'bg-yellow';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'bg-purple';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'bg-red';
  const sixthColor = props.location.state ? props.location.state.bgColor[5]: 'bg-blue';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'white';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'var(--gray-dark)';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'white';
  const sixthTextColor = props.location.state ? props.location.state.textColor[5]: 'white';

  //left color for homehead.js left panel
  const leftColor = bgColorValue[4][0] === primaryColor ? bgColorValue[6][0] : bgColorValue[4][0];
  const rightColor = bgColorValue[5][0];
  const marqueeColor = bgColorValue[6][0];
  const logoColorSet = useMemo(
    () => GetRandomFromArray(BgColorSetHome.filter((color, index) => {
      return color[0]!== leftColor;
  })),[]);
  const menuColorSet = useMemo(() => GetRandomFromArray(BgColorSetHome.filter((color, index) => {
    return color[0]!== secondaryColor;
  })),[])
  useEffect(() => {
    state.data.length === 0 && fetchHomepageJsonAction(homeDispatch);
  },[state]);

  useLayoutEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`${bgColorValue[0][0]}-primary-color`);
    document.body.classList.add(`${bgColorValue[1][0]}-secondary-color`);
  },[])

  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const [ items,setItems ]=useState([]);


  return (
    <div>
      <DotRing />
      <TransitionPanels bgColorValue={bgColorValue}/>
      <div id="outer-container" className={`${primaryColor}-primary-color ${secondaryColor}-secondary-color`}>
        <Logo nobackArrow logoColorSet={logoColorSet} bgColorValue={bgColorValue} prePrimaryColor={primaryColor} preSecondaryColor={secondaryColor} />
        <motion.div variants={pageVariants} transition={pageTransition} exit='down' id="page-wrap" className="bg-primary-secondary">
          <HomeHeader leftColor={leftColor} bgColorValue={bgColorValue} />
          <HomeHeader2 rightColor={rightColor} bgColorValue={bgColorValue} />
          <Marquee bgColor={marqueeColor} bgColorValue={bgColorValue} />
          <Items items={state.data} bgColorValue={bgColorValue} />
          <Footer bgColor={sixthColor} textColor={sixthTextColor} bgColorValue={bgColorValue} />
        </motion.div>
      </div>
      <GoToTop />
      <Navigation menuColorSet={menuColorSet}  bgColorValue={bgColorValue} />
    </div>
  );
}

export default Home;
