import { useContext, useRef, useEffect } from "react";
import Reward from '../Reward/Reward.js';
import { FruitSet2 } from "../Reward/MemphisSets";
import handleViewport from 'react-in-viewport';
import useSound from 'use-sound';
import fruitnanjiSfx from '../fruitnanji.mp3';

export default function Sun3(props) {
  const styles = {
    width: "100px",
    height: "100px",
    position: "absolute",
    top: "2%",
    left: "40%"
  }

  const canvasInput = useRef(null);
  function confetti(){
    canvasInput.current.rewardMe();
  }

  const [playFoam] = useSound(fruitnanjiSfx);

  function handleClick() {
    confetti();
    playFoam();
  }
  /*useEffect(() => {
    const interval = setInterval(() => {
      canvasInput.current.rewardMe();
    }, 2000);
    return () => clearInterval(interval);
  }, []);*/

  const Block = (props: { inViewport: boolean }) => {
    const { inViewport, forwardedRef } = props;
    const color = inViewport ? '#217ac0' : '#ff9800';
    const text = inViewport ? 'In viewport' : 'Not in viewport';
    return (
      <div className="viewport-block" ref={forwardedRef}>
        <h3>{ text }</h3>
      </div>
    );
  };
  const randomSize = [1, 5, 2, 10];
  const ViewportBlock = handleViewport(Block, /** options: {}, config: {} **/);

  return (
    <div className="hover-rotate" onClick={()=>handleClick()} style={styles}>
      <svg viewBox="0 0 88 48">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-324.000000, -405.000000)">
                  <g transform="translate(324.000000, 405.000000)">
                      <path d="M85.39814,5.00609647 C84.0014292,4.97306805 82.8095625,6.0218474 82.6862483,7.41005727 C80.9730992,26.79215 64.7155078,42.2215032 44.9643558,42.6803441 C23.9449028,43.1681485 6.60703881,26.9852392 5.31580744,6.46036318 C5.22816269,5.07266144 4.05718807,4 2.66353464,4 C1.11599334,4 -0.0931984702,5.31097418 0.00565665424,6.85009853 C1.50020346,30.1676545 21.2044757,48.5426345 45.0912369,47.9877571 C67.5410318,47.4664162 86.0238827,29.9379799 87.9892653,7.91259737 C88.125828,6.3780462 86.9426239,5.04268179 85.39814,5.00609647" id="Fill-9" fill="#E26141"></path>
                      <path d="M55,12 C55,5.37261875 49.6278893,0 43,0 C36.3726187,0 31,5.37261875 31,12 C31,18.6273813 36.3726187,24 43,24 C49.6278893,24 55,18.6273813 55,12" fill="#F4C3AE"></path>
                  </g>
              </g>
          </g>
      </svg>
      {
        /*
        <ViewportBlock onEnterViewport={() => {setTimeout(() => {
          confetti();
        }, 1000)}} onLeaveViewport={() => console.log('leave')} />
        */
      }


      <Reward ref={canvasInput} type='emoji' config = {{"emoji": FruitSet2(), "elementCount": 1, "spread": 50, "decay": 0.91, "elementSize": 80}}></Reward>
    </div>
  )
}
