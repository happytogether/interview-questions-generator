import React, { useContext, useState, useEffect, useMemo } from 'react';
import Footer from '../../components/Footer';
import GoToTop from '../../ultils/GoToTop';
import Logo from '../../components/Logo';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import './Gallery.scss';
import Highlight from 'react-highlight'
import './Highlight.scss';
import { useParams } from 'react-router-dom';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionShort2, pageTransitionEaseIn, pageVariants } from '../../ultils/TransitionSet';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';
import { HomeStore, StepperStore } from "../../Store";
import { fetchHomepageJsonAction, stepDoneAction } from "../../Actions";
import { isMobile, isDesktop } from "react-device-detect";
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import Arrow from '../../components/shapes/Arrow';
import InviewBar from '../../components/inview/InviewBar';
import DelayLink from '../../ultils/DelayLink';
const setArray = [TwitchSet(), DefaultSet()];

function Gallery(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'green';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'purple';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'yellow';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'white';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'pink';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'var(--gray-dark)';

  const [footer, setFooter] = useState(false);

  const { state, homeDispatch } = useContext(HomeStore);
  const steps = 4;
  const categoryIndex= parseInt(useParams().categoryIndex);
  const prePageIndex = (categoryIndex === 0 ? (steps-1): (categoryIndex-1));
  const nextPageIndex = (categoryIndex === (steps-1)) ? 0: (categoryIndex+1);

  useEffect(() => {
    state.data.length === 0 && fetchHomepageJsonAction(homeDispatch);
  },[state]);

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`bg-${thirdColor}`);
    setFooter(true);
  },[])

  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );

  const [items,setItems]=useState([]);
  const [jsonLoaded, setJsonLoaded] = useState(false);

  const getItems=(file)=>{
    fetch(file
    ,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setItems(myJson);
        setJsonLoaded(true);
      });
  }
  // get json file
  useEffect(()=>{
    getItems('/questions/'+categoryIndex+'.json')
  },[])

  const set = useMemo(
    () => GetRandomFromArray(setArray)[0],[]);

  return (
    <div id="outer-container" className={`gallery ${primaryColor}-primary-color ${secondaryColor}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo logoTextColor={primaryTextColor} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <HamburgerMenu barColor={secondaryTextColor} panelBgColor={thirdColor} panelTextColor={thirdTextColor} crossColor={thirdTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className={`w-screen min-h-screen report bg-primary-secondary pt-20`}>
        <div className="min-h-screen flex flex-row flex-wrap justify-center gap-40 items-start pb-40 mt-40 lg:mt-10">
        {
          items.map((item, i) => (
            <motion.div key={i} variants={pageVariants} initial='initialAlpha1' transition={i%2 === 1 ?pageTransitionShort: pageTransitionShort2} exit='down' animate="in" className={`${i%2 === 1 ? 'mt-40 lg:mt-0': null} xl:w-8/12 lg:w-11/12 p-20 lg:p-10 w-4/12 bg-white default-window`}>
              <div className={`flex ${i%2===0 ? 'flex-row': 'flex-row-reverse'} gap-10 w-full h-full lg:flex-col`}>
                <div className={`lg:w-screen w-1/12 h-full relative`}>
                  {
                    [0,1,2,3,4].map((item, index)=>(
                      <InviewBar key={index} index={index} />
                    ))
                  }
                  <div className={`text-black lowercase font-semibold text-4xl py-5 ml-1`}>
                    {state.data && state.data[categoryIndex].cat.split(" ")[0]}
                  </div>
                <div className="clear-both"></div>
              </div>
              <div className="lg:w-full w-11/12 pl-10">
                <div className="text-2xl border-b mb-10">0{i+1}. {item.title}</div>
                <Highlight innerHTML={true}>{item.answer}</Highlight>
                <Highlight language="javascript">
                  {item.example}
                </Highlight>
                <Highlight language="">
                  {item.error}
                </Highlight>
              </div>
            </div>
          </motion.div>
          ))
        }
      </div>
      {
        jsonLoaded && <motion.div variants={pageVariants} initial='initial' transition='pageTransitionDelay2' exit='down' animate="in" >
          <div className="flex w-full">
            <div className="w-3/5">
              <div className={`flex flex-col items-end lg:items-center`}>
                <div className="mr-20 lg:mr-0 mb-20 flex flex-col items-center">
                  <DelayLink to={{
                    pathname: "./"+prePageIndex,
                    state: {
                      bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0]],
                      textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1]]
                    }}}>
                    <Arrow rotate="180deg" size={isMobile?'60px': '100px'} color={primaryTextColor} />
                  </DelayLink>
                  <span className="block" style={{"color": primaryTextColor}}>{state.data.length!==0 && state.data[categoryIndex > 1 ? categoryIndex-1: state.data.length-1].cat}</span>
                </div>
              </div>
            </div>
            <div className="w-2/5">
              <div className={`flex flex-col items-start lg:items-center`}>
                <div className="ml-20 lg:ml-0 mb-20 flex flex-col items-center">
                  <DelayLink to={{
                    pathname: "./"+nextPageIndex,
                    state: {
                      bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0]],
                      textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1]]
                    }}}>
                    <Arrow size={isMobile?'60px': '100px'} color={secondaryTextColor} />
                  </DelayLink>
                  <span className={`block w-full text-center`} style={{"color": secondaryTextColor}} >{state.data.length!==0 && state.data[categoryIndex < 3 ? categoryIndex+1: 0].cat}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      }

      <motion.div className="w-full" variants={pageVariants} transition={pageTransitionEaseIn} exit='down'>
        {
          footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
        }
      </motion.div>
    </div>
    <GoToTop />
  </div>
  );
}

export default Gallery;
