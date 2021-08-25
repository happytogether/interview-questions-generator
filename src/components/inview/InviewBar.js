import { useMemo, useEffect } from "react";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { LightColorSet } from '../../components/Sets/ColorSet';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";

export default function InviewBar (props) {
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
      y: 0
    },
    visible: {
      scaleY: 50,
      y: index*50,
      transition: {
        duration: .3,
        delay: .25,
      }
    }
  }
  const bgColorValue = useMemo(
    () => GetRandomFromArray(LightColorSet),
    []
  );
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={boxVariants} style={{'borderRight':`10px solid var(--${LightColorSet[Math.floor(Math.random()*LightColorSet.length)%LightColorSet.length]})`, "backgroundSize": "120px auto", "height": "1px", "transformOrigin": "top left"}}>
      {props.children}
    </motion.div>
  )
}
