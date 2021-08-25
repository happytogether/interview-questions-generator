import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import { MenuColorSet } from './ColorSet';
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

export default function Menu(props) {
  const bar = props.bar;
  const menuColorSet = props.menuColorSet;
  const delay = props.delay;
  const barHeight = props.barHeight;
  const gap = props.gap;
  const menuOpen = props.menuOpen;

  const contentProps0 = useSpring({
    transform: `translate3d(0px,${menuOpen?34:0}px,0px) rotate(${menuOpen? 45: 0}deg)`,
    width: isMobile ? '2rem' : '3.5rem',
    height: barHeight+'px'
  });
  const contentProps1 = useSpring({
    transform: `translate3d(${menuOpen?300:0}px,0px,0px) rotate(0deg)`,
    width: isMobile ? '2rem' : '3.5rem',
    height: barHeight+'px',
  });
  const contentProps2 = useSpring({
    transform: `translate3d(${menuOpen?300:0}px,0px,0px) rotate(0deg)`,
    width: isMobile ? '2rem' : '3.5rem',
    height: barHeight+'px',
  });
  const contentProps3 = useSpring({
    transform: `translate3d(${menuOpen?300:0}px,0px,0px) rotate(0deg)`,
    width: isMobile ? '2rem' : '3.5rem',
    height: barHeight+'px',
  });
  const contentProps4 = useSpring({
    transform: `translate3d(${menuOpen?300:0}px,0px,0px) rotate(0deg)`,
    width: isMobile ? '2rem' : '3.5rem',
    height: barHeight+'px',
  });
  const contentProps5 = useSpring({
    transform: `translate3d(0px,0px,0px) rotate(${menuOpen? -45: 0}deg)`,
    width: isMobile ? '2rem' : '3.5rem',
    height: barHeight+'px',
  });
  return (
    <div className={`fixed ${isMobile ? 'right-4 top-4': 'right-5 top-5'} flex flex-col ${gap}`} style={{width: isMobile ? '2rem' : '3.5rem', height: '50px'}}>
      <animated.div className={menuColorSet[0][0]} style={contentProps0}></animated.div>
      <animated.div className={menuColorSet[1][0]} style={contentProps1}></animated.div>
      <animated.div className={menuColorSet[2][0]} style={contentProps2}></animated.div>
      <animated.div className={menuColorSet[3][0]} style={contentProps3}></animated.div>
      <animated.div className={menuColorSet[4][0]} style={contentProps4}></animated.div>
      <animated.div className={menuColorSet[5][0]} style={contentProps5}></animated.div>
    </div>
  )
}
