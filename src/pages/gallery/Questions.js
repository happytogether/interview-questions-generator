import React, { useContext, useState, useEffect, useMemo } from 'react';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import './Highlight.scss';
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionShort2, pageTransitionEaseIn, pageVariants } from '../../ultils/TransitionSet';
import InviewBar from '../../components/inview/InviewBar';
import { fetchHomepageJsonAction, stepDoneAction } from "../../Actions";
import { SplitText, LetterWrapperProp, WordWrapperProp, LineWrapperProp } from '@cyriacbr/react-split-text';
import InviewText from '../../components/inview/InviewText';
import Parallax from '../../components/Parallax';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import getRandomFromInterval from "../../ultils/getRandomFromInterval";
import SegmentsAnimation from '../../components/SegmentsAnimation';
import { ColorSet } from '../../components/ColorSet';

export default function Questions(props){
  const i = props.i;
  const item = props.item;
  const categoryTitle = props.categoryTitle;

  function generateQuestionBlock(blockIndex) {
    return (
        <div className={`bg-white default-window py-20 px-10 lg:p-10 lg:w-10/12 flex gap-10 w-full h-full lg:flex-col`}>
          <div className={`lg:w-screen h-full relative`}>
            <div style={{ width: "10px" }} className="overflow-hidden flex flex-col justify-center h-full">
              <SegmentsAnimation segment={5} type="bar-light"></SegmentsAnimation>
            </div>
            <div style={{width: '300px'}} className={`text-black lowercase font-semibold text-4xl py-5 -ml-2`}>
              <SegmentsAnimation segment={categoryTitle.length} type="text" x={0} y={-20} zIntervalFrom={-20} zIntervalTo={-20} delay={50}>{categoryTitle}</SegmentsAnimation>
            </div>
          <div className="clear-both"></div>
        </div>
        <div className={`lg:w-full w-11/12 ${blockIndex%2 === 1 ? 'pl-10': null}`}>
          <div className="text-xl border-b mb-10">
            {
              /*
              <SplitText
                LineWrapper={({ lineIndex, children }) => (
                  <span>
                  <InviewText variants="downReveal" index={lineIndex} duration={.5} delay={.125}>
                    {children}
                  </InviewText>
                  </span>
                )}
              >
                0{i+1}. {item.title}
              </SplitText>
              */
            }
            0{blockIndex+1}.{item.title}
          </div>
          <div className="absolute right-5 bottom-5 more-answer flex flex-row justify-center items-center bg-green text-sm">
            <span>More</span>
            <span className="more-answer-arrow"></span>
          </div>
          <div className="mb-10" style={{minHeight: '130px'}}>
            {item.answer}
          </div>
          {
            item.example && <SyntaxHighlighter language="javascript">
              {item.example}
            </SyntaxHighlighter>
          }
          {
            item.error && <SyntaxHighlighter language="javascript">
              {item.error}
            </SyntaxHighlighter>
          }
        </div>
      </div>
    )
  }

  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
  const randomValue = getRandomFromInterval(-200, 200);
  const text = categoryTitle;
  const textAnimation = useSprings(
    text.length,
    [...Array(text.length).keys()].map((i) => ({ delay: i * 50, opacity: 1, x: 0, y: open? -20: 0, z: open? getRandomFromInterval(-20, 20): 0}))
  )
  const timing = 250;
  useEffect(() => {
    // We only want to act when we're going from
    // not-booped to booped.
    if (!open) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setOpen(false);
    }, timing);
    // Just in case our component happens to
    // unmount while we're booped, cancel
    // the timeout to avoid a memory leak.
    return () => {
      window.clearTimeout(timeoutId);
    };
    // Trigger this effect whenever `isBooped`
    // changes. We also listen for `timing` changes,
    // in case the length of the boop delay is
    // variable.
  }, [open, timing]);

  function handleMouseOver() {
    setOpen(true);
  }

  return (
    <motion.div key={i} variants={pageVariants} initial='initialAlpha1' transition={i%2 === 1 ?pageTransitionShort: pageTransitionShort2} exit='down' animate="in" className={`${i%2===1 ? 'my-20': 'my-10'} list`}>

        {
          generateQuestionBlock(i)
        }

    </motion.div>
  )
}
