import React, { useContext, useState, useEffect, useMemo, useRef } from 'react';
import Footer from '../../components/Footer/Footer';
import GoToTop from '../../ultils/GoToTop';
import Logo from '../../components/Logo';
import { motion } from "framer-motion";
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { BgColorSet, ColorSet2 } from '../../components/Sets/ColorSet';
import { HomeStore } from "../../Store";
import { fetchHomepageJsonAction } from "../../Actions";
import DelayLink from '../../ultils/DelayLink';
import List from './List';
import Marquee from '../../components/Marquee';
import GoBackArrow from '../../components/GoBackArrow';
import Navigation from '../../components/Navigation';
import Moon from '../../components/shapes/Moon';
import Rect from '../../components/shapes/Rect';
import Sticky from 'react-stickynode';
import useResizeObserver from '../../hooks/useResizeObserver.js';

function GalleryList(props) {

  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'bg-yellow';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'bg-purple';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'bg-yellow';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'bg-purple';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'bg-red';
  const sixthColor = props.location.state ? props.location.state.bgColor[5]: 'bg-blue';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'white';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'white';
  const sixthTextColor = props.location.state ? props.location.state.textColor[5]: 'white';
  const { state, homeDispatch } = useContext(HomeStore);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    state.data.length === 0 && fetchHomepageJsonAction(homeDispatch);
    setFooter(true);
  },[state.data]);

  const bgColorValue = useMemo(() => GetRandomFromArray(BgColorSet),[]);
  const logoColorSet = useMemo(
    () => GetRandomFromArray(BgColorSet.filter((color, index) => {
      return color[0]!== primaryColor;
  })),[]);

  const menuColorSet = useMemo(() => GetRandomFromArray(BgColorSet.filter((color, index) => {
    return color[0]!== secondaryColor;
  })),[])

  const [height, setHeight] = useState(0);
  const pageWrapRef = useRef(null);
  const doHeightAdjustment = () => {
    setHeight(pageWrapRef.current && pageWrapRef.current.clientHeight);
  };
  useResizeObserver({callback: doHeightAdjustment, element: pageWrapRef});
  const heroText = "Interview";
  return (
    <div id="outer-container" className={`gallery ${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo logoColorSet={logoColorSet} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <Sticky enabled={true} top={window.innerHeight / 2} bottomBoundary={height - 200}>
        <GoBackArrow color={primaryTextColor} noShowColor={primaryColor} bgColorValue={bgColorValue} goBackHome={true} />
      </Sticky>
      <div id="page-wrap" ref={pageWrapRef} className={`w-screen min-h-screen flex flex-col justify-center report bg-primary-secondary`}>
        <div style={{height: "34rem", color: primaryTextColor}} className={`relative m-10 mt-20 ${primaryColor} flex flex-col justify-center items-center`}>
          <span className="text-9xl lg:text-6xl sm:text-5xl inline-block text-white" style={{transform: 'rotate(-8deg)'}}>
            {
              heroText.length!==0 && [...Array(heroText.length).keys()].map((text, index) => (
                <span className={`${BgColorSet[index%6][0]}`} style={{color: BgColorSet[index%6][1]}}>{heroText[index]}</span>
              ))
            }
            <br />Questions<br />Gallery
          </span>
          <span className="w-4/12 inline-block mt-20 pl-40">
            HTML, CSS, Javascript, Framework Questions and other Front End Questions are included.
          </span>
          <div className="absolute right-1/3 bottom-0 z-20">
            <Moon bgColor={thirdColor} />
            <Rect bgColor={fourthColor} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-8/12 min-h-screen ml-20 lg:ml-0 flex flex-row flex-wrap gap-24 lg:gap-10 items-start pb-40 mt-80 lg:mt-10">
            <div className="w-full">
              {
                state.data.map((item, i) => (
                  <div className={`w-full float-left`}>
                    {
                      <List i={i} item={item} categoryTitle={item.cat.split(" ")[0]} categoryExample={item.example} bgColorValue={bgColorValue} />
                    }
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Marquee bgColor={fifthColor} bgColorValue={bgColorValue} />
        }
      </motion.div>
      <motion.div id="footer" variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
        }
      </motion.div>
      <GoToTop />
      <Navigation menuColorSet={menuColorSet} bgColorValue={bgColorValue} />
    </div>
  )
}

export default GalleryList;
