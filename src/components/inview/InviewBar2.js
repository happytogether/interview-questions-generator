import { useMemo, useEffect } from "react";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { BasicColorSet, LightColorSet } from '../../components/ColorSet';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';

export default function InviewBar2 (props) {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const index = props.index;
  const barColorSet = props.barColorSet;
  const barWidth = props.barWidth || 25;
  const barHeight = props.barHeight || 50;
  const gap = props.gap || 0;
  const transitionSet = [pageTransition, pageTransition2, pageTransition3, pageTransitionShort];
  useEffect(() => {
    if(inView) {
      controls.start('visible');
    }
    if(!inView) {
      controls.start('hidden');
    }
  }, [controls, inView])

  /*
  const colorSet = (props.colorSet === 'light' ? LightColorSet: BasicColorSet).filter((item) => {
    return item !== noShowColor;
  });
  */

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
    <motion.div ref={ref} initial="hidden" animate={controls} variants={boxVariants} className={`${barColorSet && barColorSet[Math.floor(Math.random()*barColorSet.length)][0]} relative bg-cover bg-center bg-no-repeat mb-${gap}`} style={{"backgroundSize": "120px auto", "width": "1px", "height": barHeight, "transformOrigin": "left center"}}></motion.div>
  )
}
