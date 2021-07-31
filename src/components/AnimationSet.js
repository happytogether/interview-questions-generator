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
      ease: [0.6, -0.05, 0.01, 0.99],
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

export { content, downMotion, upMotion, largeUpMotion, upMotionSlow }
