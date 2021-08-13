import * as React from 'react';
import { useEffect } from "react";
import { SplitText, LetterWrapperProp, WordWrapperProp } from '@cyriacbr/react-split-text';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const LetterWrapper: React.FC<LetterWrapperProp> = ({
  children,
  countIndex,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const boxVariants = {
    hidden: {
      x: '-100%',
      scaleX: 1
    },
    visible: {
      x: '0%',
      opacity: 1,
      scaleX: 1,
      transition: {
        ease: 'anticipate',
        duration: 0.5,
        delay: 1
      }
    }
  }

  useEffect(() => {
    if(inView) {
      controls.start('visible');
    }
    if(!inView) {
      controls.start('hidden');
    }
  }, [controls, inView])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{children}</span>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <motion.span ref={ref} initial="hidden" animate={controls} variants={boxVariants}
          style={{ display: 'inline-block', transformOrigin: '0% 50%' }}
        >
          {children}
        </motion.span>
      </span>
    </div>
  );
};
const WordWrapper: React.FC<WordWrapperProp> = ({ children }) => {
  return <span style={{ whiteSpace: 'pre' }}>{children}</span>;
};
const MemoizedLetterWrapper = React.memo(LetterWrapper);
const MemoizedWordWrapper = React.memo(WordWrapper);

export const LetterDash: React.FC = () => {
  return (
    <SplitText
      LetterWrapper={MemoizedLetterWrapper}
      WordWrapper={MemoizedWordWrapper}
    >
      Anni Wang is an UX Engineer, a Design Technologist.
    </SplitText>
  );
};
