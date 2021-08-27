import { useContext, useRef, useEffect, useMemo } from "react";
import Reward from '../Reward/Reward.js';
import { IceCreamSet, DonutSet, DefaultSet } from "../Reward/MemphisSets";
import { BgColorSet, BasicColorSet } from '../Sets/ColorSet';
import getRandomFromArray from '../../ultils/GetRandomFromArray';
import useSound from 'use-sound';
import foamSfx from '../../assets/foam.mp3';

export default function Sun(props) {

  const colorSet = useMemo(() => getRandomFromArray(BgColorSet.filter((item) => {
    return item[0]!==props.noShowColor;
  })), []);

  const set = getRandomFromArray([[IceCreamSet(), '80'], [DonutSet(), '50'], [DefaultSet(), '80']]);

  const styles = {
    width: "70px",
    height: "70px",
    position: "absolute",
    top: "15%",
    right: "15%"
  }
  const styles2 = {
    width: "70px",
    height: "70px",
    position: "absolute",
    top: "15%",
    right: "15%",
    transform: "translate(-500px, 0) rotate(300deg)",
    transformOrigin: "right top",
    transition: "all .5s ease"
  }
  const clicked = props.clicked;

  const canvasInput = useRef(null);

  function confetti(){
    canvasInput.current.rewardMe();
  }

  /*useEffect(() => {
    const interval = setInterval(() => {
      canvasInput.current.rewardMe();
    }, 5000);
    return () => clearInterval(interval);
  }, []);*/
  const [playFoam] = useSound(foamSfx);
  function handleClick() {
    confetti();
    playFoam();
  }

  return (
    <div onClick={()=>handleClick()} style={clicked ? styles2: styles}>
      <svg className="transform rotate-90" width="100px" height="100px" viewBox="0 0 296 295">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-3116.000000, -361.000000)">
                  <g transform="translate(59.595000, 292.547000)">
                      <g transform="translate(3057.155000, 68.653000)">
                          <path d="M147.3,0 C187.97,0 224.79,16.487 251.44,43.148 C278.1,69.794 294.59,106.63 294.59,147.298 L0,147.298 C0,65.947 65.95,0 147.3,0" fill={`var(--${colorSet[0][0].substring(3)})`}></path>
                          <path d="M147.3,147.279 C187.97,147.279 224.79,163.766 251.44,190.426 C278.1,217.073 294.59,253.909 294.59,294.577 L0,294.577 C0,213.226 65.95,147.279 147.3,147.279" fill={`var(--${colorSet[1][0].substring(3)})`}></path>
                      </g>
                  </g>
              </g>
          </g>
      </svg>
      <Reward ref={canvasInput} type='emoji' config = {{"emoji": set[0][0] , "elementCount": 5, "spread": 90, "decay": .91, "elementSize":set[0][1]}}></Reward>
    </div>
  )
}
