import React, { useState, useMemo, useEffect } from 'react'
import getRandomFromInterval from "../getRandomFromInterval";
import DelayLink from '../ultils/DelayLink';
import Arrow from './shapes/Arrow';
import { isMobile } from "react-device-detect";
import { SplitText, LetterWrapperProp, WordWrapperProp, LineWrapperProp } from '@cyriacbr/react-split-text';
import { ColorSet } from './ColorSet';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import SegmentsAnimation from './SegmentsAnimation';
import pianoSfx from './piano.mp3';

let audio = new Audio(pianoSfx);

export default function Logo(props) {
  const color = props.color;
  const bgColorValue = props.bgColorValue;
  const primaryColor = bgColorValue[0][0];
  const primaryTextColor = bgColorValue[0][1];
  const secondaryColor = bgColorValue[1][0];
  const secondaryTextColor = bgColorValue[1][1];
  const thirdColor = bgColorValue[2][0];
  const thirdTextColor = bgColorValue[2][1];
  const fourthColor = bgColorValue[3][0];
  const fourthTextColor = bgColorValue[3][1];
  const fifthColor = bgColorValue[4][0];
  const fifthTextColor = bgColorValue[4][1];
  const sixthColor = bgColorValue[5][0];
  const sixthTextColor = bgColorValue[5][1];
  const arrowColor = props.arrowColor;
  const nobackArrow = props.nobackArrow;
  const menuColor = props.menuColor;
  const noMenu = props.noMenu;
  const goBackHome = props.goBackHome;
  const noShowColor = props.noShowColor;
  const [open, setOpen] = useState(false)
  const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
  const randomValue = getRandomFromInterval(-200, 200);
  const logoText = 'Anni Wang';
  const logoTextAnimation = useSprings(
    logoText.length,
    [...Array(logoText.length).keys()].map((i) => ({ delay: i * 50, opacity: 1, x: 0, y: open? -20: 0, z: open? getRandomFromInterval(-20, 20): 0}))
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
    audio.play();
  }

  return (
    <div className="logo fixed w-full z-10" onMouseEnter={isMobile ? () => { return false; } : handleMouseOver}>
      <div className="fixed text-base px-2 my-5 ml-4 z-30 logo">
        <div>
          <DelayLink to={{
            pathname: "/",
            state: {
              bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
              textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
            }}}>
            <span className="xl:hidden">
              <SegmentsAnimation noShowColor={noShowColor} largeBar={true} segment={logoText.length} type="colorBgText" x={0} y={-20} zIntervalFrom={-20} zIntervalTo={20} delay={50}>{logoText}</SegmentsAnimation>
            </span>
          </DelayLink>
          <DelayLink to={{
            pathname: `${goBackHome? '/': './'}`,
            state: {
              bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
              textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
            }}}>
            <span className="xlup:hidden">A.W.</span>
          </DelayLink>
        </div>
        {
          !nobackArrow && <span className={`z-30`}>
            <DelayLink to={{
              pathname: `${goBackHome? '/': './'}`,
              state: {
                bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
                textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
              }}}>
              <Arrow size={isMobile?'35px': '100px'} rotate="180deg" color={arrowColor} />
            </DelayLink>
          </span>
        }
      </div>
    </div>
  )
}
