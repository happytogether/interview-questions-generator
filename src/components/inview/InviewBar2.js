import { useMemo, useEffect } from "react";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { BasicColorSet } from '../../components/ColorSet';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";

export default function InviewBar2 (props) {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const index = props.index;
  const noShowColor = props.noShowColor;

  useEffect(() => {
    if(inView) {
      controls.start('visible');
    }
    if(!inView) {
      controls.start('hidden');
    }
  }, [controls, inView])

  const colorSet = BasicColorSet.filter((item) => {
    return item !== noShowColor
  })

  const boxVariants = {
    hidden: {
      scaleX: 0
    },
    visible: {
      scaleX: 25,
      transition: {
        duration: .3,
        delay: .25,
      }
    }
  }
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={boxVariants} className={`relative bg-cover bg-center bg-no-repeat`} style={{'backgroundColor':`var(--${colorSet[Math.floor(Math.random()*colorSet.length)]})`, "backgroundSize": "120px auto", "width": "1px", "height": "50px", "transformOrigin": "left center"}}></motion.div>
  )
}
