const pageVariants = {
  initial: {
    y: '100vh',
    opacity:0
  },
  initialYNegative100vh: {
    y: '-100vh',
    opacity: 0
  },
  initialXNegative100vw: {
    x: '-100vw',
    opacity: 0
  },
  initialAlpha1: {
    x: 0
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
  xin: {
    x: 0,
    opacity: 1
  },
  leftOut: {
    x: "0"
  },
  rightOut: {
    x: "0"
  },
  down: {
    y: '100vh'
  }
};
const pageTransitionEaseOut = {
  type: "tween",
  ease: "easeOut",
  duration: 1.5
};
const pageTransitionEaseIn = {
  type: "tween",
  ease: "easeIn",
  duration: 1.5
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
export { pageTransitionEaseOut, pageTransitionEaseIn, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageTransitionShort2, pageVariants }
