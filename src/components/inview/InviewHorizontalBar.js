import { useMemo, useEffect } from "react";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../Sets/ColorSet';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";

export default function InviewHorizontalBar (props) {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const index = props.index;
  useEffect(() => {
    if(inView) {
      controls.start('visible');
    }
    if(!inView) {
      controls.start('hidden');
    }
  }, [controls, inView])

  const boxVariants = {
    hidden: {
      scaleY: 0,
    },
    visible: {
      scaleY: 50,
      transition: {
        duration: 1.5,
        delay: .25,
      }
    }
  }
  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={boxVariants} className={`relative bg-cover bg-center bg-no-repeat`} style={{'backgroundColor':`var(--${ColorSet[Math.floor(Math.random()*ColorSet.length)][0]})`, "backgroundSize": "120px auto", "height": "25px", "width": "50px", "transformOrigin": "top center"}}></motion.div>
  )
}
