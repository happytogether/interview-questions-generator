import { useState, useEffect, useContext, useMemo } from 'react';
import { motion } from "framer-motion";
import { fetchHomepageJsonAction, stepDoneAction, initialInterviewCategoryQuestionsCount } from "./Actions";
import { HomeStore, StepperStore } from "./Store";
import { MouseContext } from "./context/mouse-context";
import HomeHead from './components/HomeHead';
import Items from './components/Items';
import Footer from './components/Footer';
import DotRing from "./components/DotRing/DotRing";
import Arrow from "./components/shapes/Arrow";
import Logo from "./components/Logo";
import { downMotion } from './components/AnimationSet';
import { pageTransition, pageTransition2, pageTransition3, pageVariants } from './ultils/TransitionSet';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import GetRandomFromArray from './ultils/GetRandomFromArray';
import { ColorSet } from './components/ColorSet';
import TransitionPanels from './components/TransitionPanels';

function Home() {
  const { state, homeDispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch} = useContext(StepperStore);
  const bgColorValue = useMemo(() => GetRandomFromArray(ColorSet),[]);

  useEffect(() => {
    state.data.length === 0 && fetchHomepageJsonAction(homeDispatch);
  },[state]);

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`${bgColorValue[0][0]}-primary-color`);
    document.body.classList.add(`${bgColorValue[1][0]}-secondary-color`);
  },[])

  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const [ items,setItems ]=useState([]);

  // deal with category here
  const [ category,setCategory ]= useState("");
  const [ categoryIndex, setCategoryIndex ] = useState();
  const [ categoryQuestions, setCategoryQuestions ] = useState([]);
  const [ categoryTitle, setCategoryTitle ] = useState();

  function handleCategoryChange(newCategory, index) {
    setCategory(newCategory);
    setCategoryIndex(index);
    setCategoryQuestions(items[index].questions);
    setCategoryTitle(items[index].cat);
  }

  return (
    <motion.div>
      <DotRing />
      <TransitionPanels bgColorValue={bgColorValue}/>
      <div id="outer-container">
        <Logo nobackArrow logoTextColor='var(--blue)' arrowColor='var(--blue)' />
        <HamburgerMenu barColor='var(--blue)' panelBgColor='green' panelTextColor='var(--gray-dark)' crossColor='white' bgColorValue={bgColorValue} />
        <motion.div variants={pageVariants} transition={pageTransition} exit='down' id="page-wrap">
          <HomeHead bgColorValue={bgColorValue} />
          <Items items={state.data} bgColorValue={bgColorValue} />
          <Footer bgColor='blue' textColor='white' bgColorValue={bgColorValue} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
