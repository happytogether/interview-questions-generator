import React, { useContext, useState, useEffect, useMemo } from 'react';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionShort2, pageTransitionEaseIn, pageVariants } from '../../ultils/TransitionSet';
import InviewBar from '../../components/inview/InviewBar';
import InviewText from '../../components/inview/InviewText';
import { fetchHomepageJsonAction, stepDoneAction } from "../../Actions";
import DelayLink from '../../ultils/DelayLink';
import { SplitText, LetterWrapperProp, WordWrapperProp, LineWrapperProp } from '@cyriacbr/react-split-text';
import SegmentsAnimation from '../../components/SegmentsAnimation';
import getRandomFromArray from '../../ultils/GetRandomFromArray';
import { BgColorSet } from '../../components/Sets/ColorSet';

export default function List(props){
  const i = props.i;
  const item = props.item;
  const categoryTitle = props.categoryTitle;
  const bgColorValue = props.bgColorValue;
  const barColorSet = useMemo(
    () => getRandomFromArray(BgColorSet),[]);
  return (
    <motion.div key={i} variants={pageVariants} initial='initial' transition={i%2 === 1 ?pageTransitionShort: pageTransitionShort2} exit='down' animate="in" className={`${i%2 === 1 ? 'mt-40 lg:mt-0': null} p-10 pr-5 h-5/6 bg-white default-window`}>
      <div className={`flex flex-row items-center w-full h-full lg:flex-col`}>
        <div style={{ width: "25px" }} className="relative flex flex-col justify-center">
          <SegmentsAnimation segment={5} barWidth={10} type="bar-light" x={10} y={10} zIntervalFrom={-50} zIntervalTo={20} delay={150} bgColorValue={bgColorValue}></SegmentsAnimation>
          <div style={{left: '35px'}} className={`absolute text-black lowercase font-semibold text-4xl`}>
            <InviewText variants="upReveal">
              {categoryTitle}
            </InviewText>
          </div>
        <div className="clear-both"></div>
      </div>
      <div className={`w-full pl-10`}>
        <div className="text-lg pb-4 mb-5 lg:text-base">
          <SplitText
            WordWrapper={({ wordIndex, countIndex, children }) => (
              <span>
              <InviewText variants="downReveal" index={countIndex} delay={0.025}>
                {children}
              </InviewText>
              </span>
            )}
          >
            {item.catFigcaption}
          </SplitText>
        </div>
        <button className="text-left border rounded-sm py-3 px-3 lg:text-sm">
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
  )
}
