import React, { useEffect, useState, useMemo } from 'react'
import "./Booking.scss";
import Logo from "../../components/Logo";
import Footer from '../../components/Footer/Footer';
import { useSpring, animated } from 'react-spring';
import { motion } from "framer-motion";
import DelayLink from '../../ultils/DelayLink';
import GoToTop from '../../ultils/GoToTop';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { BgColorSet, ColorSet } from '../../components/Sets/ColorSet';
import TransitionPanels from '../../components/TransitionPanels';
import Navigation from '../../components/Navigation';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionEaseOut, pageVariants } from '../../ultils/TransitionSet';
import Marquee from '../../components/Marquee';

function Booking(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'bg-pink';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'bg-green';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'bg-yellow';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'var(--gray-dark)';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'bg-purple';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'white';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'bg-red';
  const fifthTextColor = props.location.state ? props.location.state.textColor[4]: 'white';

  const [footer, setFooter] = useState(false);
  const bgColorValue = useMemo(
    () => GetRandomFromArray(BgColorSet),[]);
  const logoColorSet = useMemo(
    () => GetRandomFromArray(BgColorSet.filter((color, index) => {
      return color[0]!== primaryColor;
  })),[]);
  const menuColorSet = useMemo(() => GetRandomFromArray(BgColorSet.filter((color, index) => {
    return color[0]!== secondaryColor;
  })),[])
  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`${thirdColor}`);
    setFooter(true);
  },[])

  return (
    <div id="outer-container" className="booking">
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo goBackHome={true} logoColorSet={logoColorSet} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className="bg-primary-secondary">
        <iframe className="w-9/12" src="https://react-calendso-interview-production.up.railway.app/anni/30mins" frameborder="0" allowfullscreen></iframe>
        <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
          <Marquee bgColor={fifthColor} bgColorValue={bgColorValue} />
        </motion.div>
        <motion.div variants={pageVariants} initial='initial' transition={pageTransition} exit='rightInitial500' animate='in'>
          {
            footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
          }
        </motion.div>

      </div>
      <GoToTop />
      <Navigation menuColorSet={menuColorSet}  bgColorValue={bgColorValue} />
    </div>
  );
}

export default Booking;
