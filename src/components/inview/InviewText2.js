import { useMemo, useEffect } from "react";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";

export default function InviewText2 (props) {
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
      x: '100%',
    },
    visible: {
      x: '0',
      transition: {
        ease: 'easeOut',
        duration: .3,
        delay: 0.025 * index,
      }
    }
  }
  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );
  return (
    <span className="overflow-hidden inline-block">
      <motion.span
        ref={ref} initial="hidden" animate={controls} variants={boxVariants}
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {props.children}
      </motion.span>
    </span>
  )
}
