import React, { useContext, useState, useEffect, useMemo } from 'react';
import Footer from '../../components/Footer/Footer';
import GoToTop from '../../ultils/GoToTop';
import Logo from '../../components/Logo';
import './Gallery.scss';
import { useParams } from 'react-router-dom';
import { motion, useAnimation } from "framer-motion";
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionShort2, pageTransitionEaseIn, pageVariants } from '../../ultils/TransitionSet';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { BgColorSet2, ColorSetNoBlue } from '../../components/Sets/ColorSet';
import HorizontalGallery from '../../components/HorizontalGallery';
import { HomeStore, StepperStore } from "../../Store";
import { DonutSet, IceCreamSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import Arrow from '../../components/shapes/Arrow';
import Marquee from '../../components/Marquee';
import Navigation from '../../components/Navigation';
import GoBackArrow from '../../components/GoBackArrow';
import Questions from './Questions';
import DelayLink from '../../ultils/DelayLink';
import { fetchHomepageJsonAction, stepDoneAction } from "../../Actions";
import { isMobile, isDesktop } from "react-device-detect";

function Gallery(props) {
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


  const [footer, setFooter] = useState(false);
  const { state, homeDispatch } = useContext(HomeStore);
  const categoryIndex= parseInt(useParams().categoryIndex);
  const categoryTitle= state.data.length!==0 && state.data[categoryIndex].cat.split(" ")[0];
  const steps = state.data.length!==0 && state.data.length;
  const prePageIndex = (categoryIndex === 0 ? (steps-1): (categoryIndex-1));
  const nextPageIndex = (categoryIndex === (steps-1)) ? 0: (categoryIndex+1);

  useEffect(() => {
    state.data.length === 0 && fetchHomepageJsonAction(homeDispatch);
  },[state.data]);

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`${thirdColor}`);
    setFooter(true);
  },[])

  const bgColorValue = useMemo(() => GetRandomFromArray(BgColorSet2),[]);
  const logoColorSet = useMemo(
    () => GetRandomFromArray(BgColorSet2.filter((color, index) => {
      return color[0]!== primaryColor;
  })),[]);

  const menuColorSet = useMemo(() => GetRandomFromArray(BgColorSet2.filter((color, index) => {
    return color[0]!== secondaryColor;
  })),[])

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

  return (
    <div id="outer-container" className={`gallery ${primaryColor}-primary-color ${secondaryColor}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo logoColorSet={logoColorSet} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <GoBackArrow color={secondaryTextColor} bgColorValue={bgColorValue} />

      <div id="page-wrap" className={`w-screen min-h-screen bg-primary-secondary`}>
        <div className="flex justify-center">
          <div className="w-8/12 min-h-screen pt-40 flex flex-row flex-wrap gap-20 lg:gap-10 items-start pb-40">
            <div className="w-6/12 lg:w-5/12 md:w-10/12 -mt-20">
              {
                items.map((item, i) => (
                  <div className="mt-40">
                    {
                      i%2!==1 && <Questions i={i} item={item} categoryTitle={categoryTitle} />
                    }
                  </div>
                ))
              }
            </div>
            <div className="w-5/12 lg:w-5/12 md:w-10/12">
              {
                items.map((item, i) => (
                  <div className="mt-40">
                    {
                      i%2!==0 && <Questions i={i} item={item} categoryTitle={categoryTitle} />
                    }
                  </div>
                ))
              }
            </div>
          </div>
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
                      bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0], bgColorValue[4][0], bgColorValue[5][0], bgColorValue[6][0]],
                      textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1], bgColorValue[4][1], bgColorValue[5][1], bgColorValue[6][1]]
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
                      bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0], bgColorValue[4][0], bgColorValue[5][0], bgColorValue[6][0]],
                      textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1], bgColorValue[4][1], bgColorValue[5][1], bgColorValue[6][1]]
                    }}}>
                    <Arrow size={isMobile?'60px': '100px'} color={secondaryTextColor} />
                  </DelayLink>
                  <span className={`block w-full text-center`} style={{"color": secondaryTextColor}} >{state.data.length!==0 && state.data[categoryIndex < 3 ? categoryIndex+1: 0].cat}</span>
                </div>
              </div>
            </div>
          </div>
          <Marquee bgColor={fifthColor} bgColorValue={bgColorValue} />
        </motion.div>
      }
    </div>
    <motion.div className="w-full" variants={pageVariants} transition={pageTransitionEaseIn} exit='down'>
      {
        jsonLoaded && footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
      }
    </motion.div>
    <GoToTop />
    <Navigation menuColorSet={menuColorSet} bgColorValue={bgColorValue}/>
  </div>
  );
}

export default Gallery;
