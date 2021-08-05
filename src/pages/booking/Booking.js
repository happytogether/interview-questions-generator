import React, { useEffect, useState, useMemo } from 'react'
import "./Booking.scss";
import Logo from "../../components/Logo";
import Footer from '../../components/Footer';
import { useSpring, animated } from 'react-spring';
import { motion } from "framer-motion";
import * as easings from 'd3-ease'
import DelayLink from '../../ultils/DelayLink';
import GoToTop from '../../ultils/GoToTop';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';
import TransitionPanels from '../../components/TransitionPanels';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';

function Booking(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'pink';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'green';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'yellow';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'var(--gray-dark)';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'purple';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'white';
  const [footer, setFooter] = useState(false);
  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`bg-${thirdColor}`);
    setFooter(true);
  },[])

  return (
    <div id="outer-container" className="booking">
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo logoTextColor={primaryTextColor} arrowColor={secondaryTextColor} />
      <HamburgerMenu barColor={secondaryTextColor} panelBgColor={thirdColor} panelTextColor={thirdTextColor} crossColor={thirdTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className="bg-primary-secondary">
        <iframe className="w-9/12" src="https://react-calendso-interview-production.up.railway.app/anni/30mins" frameborder="0" allowfullscreen></iframe>
        <motion.div variants={pageVariants} initial='initial' transition={pageTransition} exit='rightInitial500' animate='in'>
          {
            footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
          }
        </motion.div>
      </div>
      <GoToTop />
    </div>
  );
}

export default Booking;
