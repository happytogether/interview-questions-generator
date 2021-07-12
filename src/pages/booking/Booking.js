import React, { useEffect } from 'react'
import "./Booking.scss";
import Logo from "../../components/Logo";
import Footer from '../../components/Footer';
import { useSpring, animated } from 'react-spring';
import { motion } from "framer-motion";
import * as easings from 'd3-ease'

function Booking() {
  const fadeIn = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:1000 }, config: { duration: 800, easing: easings.easeCubic } });
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="booking">
        <div className="absolute z-30" style={{"left": 0, "top": 0, "width": "200px"}}>
          <Logo color="var(--blue)" />
        </div>
        <animated.div style={fadeIn}>
          <iframe src="https://react-calendso-interview-production.up.railway.app/anni/30mins" frameborder="0" allowfullscreen></iframe>
        </animated.div>
        <Footer />
      </div>
    </motion.div>
  );
}

export default Booking;
