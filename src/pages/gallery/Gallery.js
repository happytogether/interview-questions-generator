import React, { useContext, useState, useEffect, useMemo } from 'react';
import Footer from '../../components/Footer';
import GoToTop from '../../ultils/GoToTop';
import Logo from '../../components/Logo';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import './Gallery.scss';
import { useParams } from 'react-router-dom';
import { motion, useAnimation } from "framer-motion";
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionShort2, pageTransitionEaseIn, pageVariants } from '../../ultils/TransitionSet';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSetNoBlue } from '../../components/ColorSet';
import HorizontalGallery from '../../components/HorizontalGallery';
import { HomeStore, StepperStore } from "../../Store";
import { DonutSet, IceCreamSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import Arrow from '../../components/shapes/Arrow';
import Marquee from '../../components/Marquee';
import Questions from './Questions';
import DelayLink from '../../ultils/DelayLink';
import { fetchHomepageJsonAction, stepDoneAction } from "../../Actions";
import { isMobile, isDesktop } from "react-device-detect";

function Gallery(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'green';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'purple';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'yellow';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'white';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'pink';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'var(--gray-dark)';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'orange';
  const fifthTextColor = props.location.state ? props.location.state.textColor[4]: 'var(--gray-dark)';


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
    document.body.classList.add(`bg-${thirdColor}`);
    setFooter(true);
  },[])

  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSetNoBlue),
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

  return (
    <div id="outer-container" className={`gallery ${primaryColor}-primary-color ${secondaryColor}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo noShowColor={primaryColor} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <HamburgerMenu barColor={secondaryTextColor} panelBgColor={thirdColor} panelTextColor={thirdTextColor} crossColor={thirdTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className={`w-screen min-h-screen report bg-primary-secondary`}>
        <div className="questions-container gap-x-20 pt-48 xl:pt-36 w-full flex flex-wrap flex-row col-count-2 justify-center items-center">
          {
            items.map((item, i) => (
              item.horizontalGallery ? <><Questions i={i} item={item} categoryTitle={categoryTitle} />
              <HorizontalGallery item={item} secondaryColor={secondaryColor} />
              </>: <><Questions i={i} item={item} categoryTitle={categoryTitle} />
              </>
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
          <Marquee bgColor={fifthColor} />
        </motion.div>
      }
    </div>
    <motion.div className="w-full" variants={pageVariants} transition={pageTransitionEaseIn} exit='down'>
      {
        jsonLoaded && footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
      }
    </motion.div>
    <GoToTop />
  </div>
  );
}

export default Gallery;
