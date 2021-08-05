const pageVariants = {
  initial: {
    y: 100,
    opacity:0
  },
  initialAlpha1: {
    y: 500
  },
  rightInitial500: {
    x: 500
  },
  leftInitial500: {
    x: -500
  },
  leftInitial: {
    x: '-100vw'
  },
  leftInitial2: {
    x: '-150vw'
  },
  leftInitial3: {
    x: '-200vw'
  },
  rightInitial: {
    x: '100vw'
  },
  rightInitial2: {
    x: '150vw'
  },
  rightInitial3: {
    x: '200vw'
  },
  in: {
    y: 0,
    opacity: 1
  },
  leftOut: {
    x: "0"
  },
  rightOut: {
    x: "0"
  },
  down: {
    y: 300
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 2
};

const pageTransition2 = {
  type: "tween",
  ease: "anticipate",
  duration: 2.5
};

const pageTransition3 = {
  type: "tween",
  ease: "anticipate",
  duration: 3
};
const pageTransitionShort = {
  type: "tween",
  ease: "anticipate",
  duration: 1.2
}
const pageTransitionShort2 = {
  type: "tween",
  ease: "anticipate",
  duration: 1.6
}
export { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionShort2, pageVariants }
