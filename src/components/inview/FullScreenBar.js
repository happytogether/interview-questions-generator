import { useMemo, useEffect } from "react";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { BasicColorSet, LightColorSet } from '../Sets/ColorSet';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';

export default function FullScreenBar (props) {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const index = props.index;
  const noShowColor = props.noShowColor;
  const barWidth = props.barWidth || 25;
  const transitionSet = [pageTransition, pageTransition2, pageTransition3, pageTransitionShort];
  const direction = props.direction;
  useEffect(() => {
    if(inView) {
      controls.start('visible');
    }
    if(!inView) {
      controls.start('hidden');
    }
  }, [controls, inView])

  const colorSet = (props.colorSet === 'light' ? LightColorSet: BasicColorSet).filter((item) => {
    return item !== noShowColor;
  });

  const boxVariants = {
    hidden: {
      scaleX: 0
    },
    visible: {
      scaleX: barWidth,
      transition: {
        duration: .3,
        delay: .25,
      }
    }
  }
  return (
    <motion.div ref={ref} className={`flex items-center ${direction==='h' ? `h-auto`: 'h-screen'} xl:h-auto justify-center text-xl`}>{props.children}</motion.div>
  )
}
