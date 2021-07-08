import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';

export function Up() {
  const { up } = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:50 }, config: { duration: 800, easing: easings.easeCubic } })
  return <animated.div style={{ up }} />
}

export function Down() {
  return useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:-50 }, config: { duration: 800, easing: easings.easeCubic } });
}
