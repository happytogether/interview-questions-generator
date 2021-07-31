import React, { useEffect } from 'react'
import "./Booking.scss";
import Logo from "../../components/Logo";
import Footer from '../../components/Footer';
import { useSpring, animated } from 'react-spring';
import { motion } from "framer-motion";
import * as easings from 'd3-ease'
import DelayLink from '../../ultils/DelayLink';
import GoToTop from '../../ultils/GoToTop';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';

function Booking() {
  const bgTextColorArray = [['orange', 'var(--gray-dark)'], ['yellow', 'var(--gray-dark)'], ['green', 'var(--gray-dark)'], ['purple', 'white'], ['pink', 'var(--gray-dark)'], ['blue', 'white']]; // first element - bg, 2nd - text color
  const bgTextColor = GetRandomFromArray(bgTextColorArray);
  return (
    <div id="outer-container" className="booking">
      <Logo backArrow backArrowColor={bgTextColor[0][1]} menuColor={bgTextColor[0][1]} color="var(--gray-dark)" />
      <div id="page-wrap" className={`bg-gray-${bgTextColor[0][0]}`}>
        <iframe className="w-9/12" src="https://react-calendso-interview-production.up.railway.app/anni/30mins" frameborder="0" allowfullscreen></iframe>
        <Footer bgColor={bgTextColorArray[1][0]} textColor={bgTextColorArray[1][1]} />
      </div>
      <GoToTop />
    </div>
  );
}

export default Booking;
