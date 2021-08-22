import React, { useState, useMemo, useEffect } from 'react'
import getRandomFromInterval from "../getRandomFromInterval";
import DelayLink from '../ultils/DelayLink';
import Arrow from './shapes/Arrow';
import { isMobile } from "react-device-detect";
import { SplitText, LetterWrapperProp, WordWrapperProp, LineWrapperProp } from '@cyriacbr/react-split-text';
import { ColorSet } from './ColorSet';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import SegmentsAnimation from './SegmentsAnimation';

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
  }

  return (
    <div className="logo fixed w-full z-10" >
      <div className="fixed text-base px-2 my-5 ml-4 z-30 logo">
        <DelayLink to={{
          pathname: "/",
          state: {
            bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
            textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
          }}}>
          <span className="xl:hidden">
            {
              /*
              <SplitText
                LetterWrapper={({ wordIndex, countIndex, children }) => (
                  <animated.span className={`p-1 bg-${countIndex===4 ? primaryColor: ColorSet[countIndex%6][0]}`} style={{color: ColorSet[countIndex%6][1]}}>
                    {children}
                  </animated.span>
                )}

              >
                {
                  open ? 'hired?': 'Anni Wang'
                }
              </SplitText>
              */
            }

            {
              /*logoTextAnimation.map(({ x, y, z, opacity, background }, index) => (
                <animated.span onMouseEnter={() => handleMouseOver()} className={`px-1 inline-block bg-${ColorSet[index%7][0]}`}
                  key={index} style={{
                    opacity,
                    color: ColorSet[index%7][1],
                    transform: interpolate(
                      [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                      (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px) rotateX(${f * r}deg)`
                    )
                  }}> {logoText[index]}
                </animated.span>
            ))
          */}
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
        !nobackArrow && <span className={`fixed close ${isMobile? 'right-7 -mt-1': 'right-14'} z-30`}>
          <DelayLink to={{
            pathname: `${goBackHome? '/': './'}`,
            state: {
              bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
              textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
            }}}>
            <Arrow size={isMobile?'40px': '60px'} rotate="180deg" color={arrowColor} />
          </DelayLink>
        </span>
      }
    </div>
  )
}
