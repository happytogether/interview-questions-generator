import { useMemo, useEffect } from "react";
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";

export default function InviewText (props) {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const index = props.index;
  const duration = props.duration || .25;
  const delay = props.delay || 0.025;
  const variants = props.variants;
  let textVariant;

  useEffect(() => {
    if(inView) {
      controls.start('visible');
    }
    if(!inView) {
      controls.start('hidden');
    }
  }, [controls, inView])

  switch (variants) {
    case "fadeIn":
      textVariant = {
        hidden: {
          opacity: '0'
        },
        visible: {
          opacity: '1',
          transition: {
            ease: 'easeOut',
            duration: duration,
            delay: delay * index,
          }
        }
      }
      break;
    case "upReveal":
      textVariant = {
        hidden: {
          rotate: 15,
          y: '100%',
        },
        visible: {
          rotate: 0,
          y: '0',
          transition: {
            ease: 'easeOut',
            duration: duration,
            delay: delay * index,
          }
        }
      }
      break;
    case "downReveal":
      textVariant = {
        hidden: {
          y: '-100%',
        },
        visible: {
          y: '0',
          transition: {
            ease: 'easeOut',
            duration: .3,
            delay: delay * index,
          }
        }
      }
      break;
    default:
      textVariant = {
        hidden: {
          y: '100%',
        },
        gone: {
          opacity: '0'
        },
        visible: {
          y: '0',
          transition: {
            ease: 'easeOut',
            duration: .3,
            delay: delay * index,
          }
        }
      }
  }

  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );
  return (
    <span className={`overflow-hidden inline-block leading-none`}>
      <motion.span
        ref={ref} initial="hidden" exit="exit" animate={controls} variants={textVariant}
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {props.children}
      </motion.span>
    </span>
  )
}
