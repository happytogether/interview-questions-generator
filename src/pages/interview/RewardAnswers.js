import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSpring, useSprings, useTrail, animated, to as interpolate } from 'react-spring';
import Smile from "../../components/shapes/Smile";
import Sad from "../../components/shapes/Sad";
import { PageTransitionColorsStore } from '../../Store';

export default function RewardAnswers(props) {
  //const answers = props.answers;
  const userAnswers = props.userAnswers;
  const length = userAnswers && userAnswers.length || 0;
  const config = { mass: 5, tension: 2000, friction: 200 };

  const [toggle, set1] = useState(true);
  const trail = useTrail(length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });
  let gridRows;

  switch(length) {
    case 1:
      gridRows = "grid-rows-1";
      break;
    case 2:
      gridRows = "grid-rows-2";
      break;
    case 3:
      gridRows = "grid-rows-3";
      break;
    default:
      gridRows = "grid-rows-4";

  }

  const { pageTransitionColorsState, pageTransitionColorsDispatch} = useContext(PageTransitionColorsStore);
  return (
    <div className="flex flex-cols">
      <div className={`grid ${gridRows} grid-flow-col gap-4`}>
        {
          trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={index}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
            }}
          >
            <animated.div style={{ height }} className="flex flex-rows items-center">
              <span>{index+1}.</span>
              {
                userAnswers.length !=0 && userAnswers[index] ==1 ?<Smile size="30px" color={pageTransitionColorsState.data[0][1]} opacity="1" key={index} />: <Sad size="30px" color={pageTransitionColorsState.data[0][1]} opacity="1" key={index} />
              }
            </animated.div>
          </animated.div>
        ))
       }
      </div>
    </div>
  )
}
