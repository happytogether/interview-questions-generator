import React, { useEffect } from 'react'
import "./Booking.scss";
import Logo from "../../components/Logo";
import Footer from '../../components/Footer';
import { useSpring, animated } from 'react-spring';
import { motion } from "framer-motion";
import * as easings from 'd3-ease'
import DelayLink from '../../ultils/DelayLink';
import Arrow from '../../components/shapes/Arrow';

function Booking() {
  const fadeIn = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:1000 }, config: { duration: 800, easing: easings.easeCubic } });
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="booking">
        <header style={{"height": "100px", "background": "#f3f4f6"}}>
          <Logo size="100px" color="var(--blue)"/>
          <span className="close absolute right-14 z-30">
            <DelayLink delay="600" to="./" goBackHome="true">
              <Arrow size="100px" rotate="180deg" color="#000" />
            </DelayLink>
          </span>
        </header>
        <animated.div style={fadeIn}>
          <iframe src="https://react-calendso-interview-production.up.railway.app/anni/30mins" frameborder="0" allowfullscreen></iframe>
        </animated.div>
        <Footer />
      </div>
    </motion.div>
  );
}

export default Booking;
