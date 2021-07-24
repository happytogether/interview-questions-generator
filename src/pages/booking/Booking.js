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
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div id="outer-container" className="booking">
      <Logo backArrow backArrowColor="var(--blue)" menuColor="var(--blue)" color="var(--blue)"/>
      <div id="page-wrap">
        <iframe className="w-9/12" src="https://react-calendso-interview-production.up.railway.app/anni/30mins" frameborder="0" allowfullscreen></iframe>
        <Footer />
      </div>
    </div>
  );
}

export default Booking;
