const content = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const downMotion = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    },
  },
};
const upMotion = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};
const largeUpMotion = {
  initial: { y: '100vh', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};
const upMotionSlow = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const rightIn = {
  initial: { x: '100vw'},
  animate: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 1.2,
      ease: 'anticipate',
    },
  }
}

const rightOut = {
  initial: { x: 0},
  exit: {
    x: '100vw',
    transition: {
      type: 'tween',
      duration: 1.2,
      ease: 'anticipate',
    },
  }
}

const leftIn = {
  initial: { x: '-100vw'},
  animate: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 1.2,
      ease: 'anticipate',
    },
  }
}

const leftOut = {
  initial: { x: 0},
  exit: {
    x: '-100vw',
    transition: {
      type: 'tween',
      duration: 1.2,
      ease: 'anticipate',
    },
  }
}

const pageUpMotion = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.2,
      ease: 'anticipate',
    },
  }
}

const pageMotion = {
  initial: { y: 50, opacity: 0},
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.2,
      ease: 'anticipate',
    }
  },
  exit: {
    y: 300,
    transition: {
      type: 'tween',
      duration: 1.2,
      ease: 'anticipate',
    },
  }
}

const pageVariants = {
  initial: {
    y: 50,
    opacity:0
  },
  leftInitial: {
    x: '-100vw'
  },
  rightInitial: {
    x: '100vw'
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
  duration: 1.2
};
export { content, downMotion, upMotion, largeUpMotion, upMotionSlow, leftIn, leftOut, rightIn, rightOut, pageMotion, pageUpMotion }
