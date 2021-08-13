import React, { useContext, useState, useEffect, useMemo } from 'react';
import Footer from '../../components/Footer';
import GoToTop from '../../ultils/GoToTop';
import Logo from '../../components/Logo';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import { motion } from "framer-motion";
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionShort2, pageVariants } from '../../ultils/TransitionSet';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet2 } from '../../components/ColorSet';
import InviewBar from '../../components/inview/InviewBar';
import { HomeStore } from "../../Store";
import { fetchHomepageJsonAction } from "../../Actions";
import DelayLink from '../../ultils/DelayLink';

function GalleryList(props) {

  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'green';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'purple';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'yellow';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'white';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'pink';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'var(--gray-dark)';
  const { state, homeDispatch } = useContext(HomeStore);

  useEffect(() => {
    state.data.length === 0 && fetchHomepageJsonAction(homeDispatch);
  },[state.data]);

  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet2),
    []
  );

  return (
    <div id="outer-container" className={`gallery ${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo goBackHome={true} logoTextColor={primaryTextColor} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <HamburgerMenu barColor={secondaryTextColor} panelBgColor={thirdColor} panelTextColor={thirdTextColor} crossColor={thirdTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className={`w-screen min-h-screen report bg-primary-secondary pt-20`}>
        <div className="min-h-screen flex flex-row flex-wrap justify-center gap-40 items-start pb-40 mt-40 lg:mt-10">
          {
            state.data.map((item, i) => (
              <motion.div key={i} variants={pageVariants} initial='initialAlpha1' transition={i%2 === 1 ?pageTransitionShort: pageTransitionShort2} exit='down' animate="in" className={`${i%2 === 1 ? 'mt-40 lg:mt-0': null} xl:w-8/12 lg:w-11/12 p-20 lg:p-10 w-4/12 h-5/6 bg-white default-window`}>
                <div className={`flex ${i%2===0 ? 'flex-row': 'flex-row-reverse'} gap-10 w-full h-full lg:flex-col`}>
                  <div className={`lg:w-screen w-1/12 h-full relative`}>
                    {
                      [0,1,2,3,4].map((item, index)=>(
                        <InviewBar key={index} index={index} />
                      ))
                    }
                    <div className={`text-black lowercase font-semibold text-4xl py-5 ${i%2===1?'ml-4':''}`}>
                      {state.data && state.data[i].cat.split(" ")[0]}
                    </div>
                  <div className="clear-both"></div>
                </div>
                <div className="lg:w-full w-11/12 pl-10">
                  <div className="text-xl pb-4 mb-10">
                    {item.catFigcaption}
                  </div>
                  <button className="text-left border rounded-sm py-3 px-6">
                    <DelayLink to={{
                      pathname: `/gallery/${i}`,
                      state: {
                        bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0], bgColorValue[4][0], bgColorValue[5][0]],
                        textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1], bgColorValue[4][1], bgColorValue[5][1]],
                      }
                    }}>Questions Gallery</DelayLink>
                  </button>
                </div>
              </div>
            </motion.div>
            ))
          }
        </div>
        <motion.div className="w-full" variants={pageVariants} transition={pageTransitionShort} exit='down'>
          {
            <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
          }
        </motion.div>
      </div>
      <GoToTop />
    </div>
  )
}

export default GalleryList;
