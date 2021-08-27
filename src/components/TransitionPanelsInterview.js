import React, { useMemo } from 'react';
import { motion } from "framer-motion";
import { pageTransition, pageTransition2, pageTransition3, pageVariants } from '../ultils/TransitionSet';

export default function TransitionPanels(props) {
  const bgColorValue = props.bgColorValue;

  return (
    <>
      <motion.div initial='leftInitial' exit='leftOut' variants={pageVariants} transition={pageTransition} className={`panel left ${bgColorValue[3][0]} w-3/5 h-screen fixed z-9999`}></motion.div>
      <motion.div initial='rightInitial' exit='rightOut' variants={pageVariants} transition={pageTransition} className={`panel right ${bgColorValue[5][0]} w-2/5 right-0 h-screen fixed z-9999`}></motion.div>
    </>
  )
}
