import React, { useState, useRef } from 'react';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import { BallonSet } from "../Reward/MemphisSets";
import Reward from '../Reward/Reward.js';
import { CannonSvg } from '../Sets/SvgSet';
import cannonSfx from '../cannon.mp3';
import useSound from 'use-sound';

export default function Cannon(props) {
  const [play] = useSound(cannonSfx);
  const canvasInput = useRef(null);
  const [showBang, setShowBang] = useState(false);

  function confetti(){
    canvasInput.current.rewardMe();
  }

  function handleCannonClick() {
    play();
    confetti();
    setShowBang(true);
    setTimeout(() => {
      setShowBang(false);
    }, 400)
  }

  return (
    <>
      <div className="relative right-1/3 top-0">
        {showBang ? 'Bang!': 'click=!click'}
      </div>
      <div onClick={()=>handleCannonClick()}>
        <div style={{transform: 'rotate(130deg)'}}>
          {CannonSvg()}
          <Reward ref={canvasInput} type='emoji' config = {{"emoji": BallonSet(), "elementCount": 5, "spread": 1200, "decay": 0.6, "elementSize": 180, "lifetime": 500}}></Reward>
        </div>
      </div>
    </>
  )
}
