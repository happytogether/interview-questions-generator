import React, { useContext, useState, useEffect, useRef } from 'react';
import { MouseContext } from "./../context/mouse-context";
import Reward from './Reward/Reward.js';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet2, BallonSet } from "./Reward/MemphisSets";
import DotRing from "./DotRing/DotRing";
import Sun2 from './shapes/Sun2';
import Wave from './shapes/Wave';
import Wave2 from './shapes/Wave2';
import Shapes from './shapes/Shapes.js';
import Sun3 from './shapes/Sun3';
import { useSpring, animated } from 'react-spring';
import Logo from '../components/Logo';
import useSound from 'use-sound';
import cannonSfx from './cannon.mp3';
import jumpSfx from './jump.mp3';
import cuteSfx from './cute.mp3';
import clickSfx from './click.mp3';
import ClickSoundLink from './ClickSoundLink';

export default function HomeHead(props) {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const styles = {
    padding: "40px",
    border: "1px solid",
    boxShadow: "-10px 10px blue",
    backgroundColor: "#fdee21",
    color: "blue",
    width: "100%"
  }
  const styleRight = {
    padding: "40px",
    height: "250px"
  }

  const randomBg = ["dot-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg"];

  const [play] = useSound(cannonSfx);
  const [playJump] = useSound(jumpSfx);
  const [playCute] = useSound(cuteSfx);
  const [playClick] = useSound(clickSfx);

  const canvasInput = useRef(null);
  function confetti(){
    canvasInput.current.rewardMe();
  }

  useEffect(() => {
    setTimeout(() => {
      confetti();
    }, 1000)
  }, [])

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
  const trans1 = (x, y) => `rotate(130deg) translate3d(${x / 60}px,${y / 10}px,0)`
  const trans2 = (x, y) => `translate3d(${-x / 8 + 35}px,${y / 8 - 230}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${-y / 6 - 200}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${-y / 3.5}px,0)`
  const trans5 = (x, y) => `translate3d(${-x / 60}px,${y / 60}px,0)`
  const [props1, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  const [showBang, setShowBang] = useState(false);

  function handleCannonClick() {
    play();
    confetti();
    setShowBang(true);
    setTimeout(() => {
      setShowBang(false);
    }, 400)
  }

  function handleRedirect() {
    playClick();
    setTimeout(() => {
      window.location.href = "./report"
    }, 200)
  }

  const up1 = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:50 } });
  const down1 = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:-50 }});

  return (
    <main onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })} className="h-screen w-screen p-8 flex justify-items-center items-center md:flex-col md:h-auto md:my-10">

      <Logo color="var(--blue)" />
      {
        showBang && <span className="absolute bang">Bang!</span>
      }
      <animated.div onClick={()=>handleCannonClick()} style={{ transform: props1.xy.interpolate(trans1) }} className="cannon absolute z-20 w-screen">
        <img src="/img/cannon.svg" />
        <Reward ref={canvasInput} type='emoji' config = {{"emoji": BallonSet(), "elementCount": 5, "spread": 1200, "decay": 0.6, "elementSize": 180, "lifetime": 500}}></Reward>
      </animated.div>



      <div className="flex-1" style={styles}>
        <h2 className="text-3xl border-b-2 pb-2">Interview<br /><input type="text" placeholder="Anni Wang" />and get some FUN.</h2>

        <p>*Questions will be randomly gernerated.</p>

        <div className="text-left">
          <h4></h4>
          <div className="flex mt-2 space-x-4">
            <div className="border rounded-sm py-3 px-6">
              <ClickSoundLink text="Start Interview Process" link="./report" />
            </div>
          </div>
        </div>
        {
          /*<Wave />*/
        }
        {
        /*<animated.div style={up1}>
          <animated.div onClick={()=>playJump()} className="sm:hidden" style={{ transform: props1.xy.interpolate(trans5)}}>
            <Sun2 size="100px" />
          </animated.div>
        </animated.div>
        <animated.div style={down1}>
          <animated.div onClick={()=>playCute()} className="sm:hidden" style={{ transform: props1.xy.interpolate(trans1)}}>
            <Wave2 size="100px" />
          </animated.div>
        </animated.div>*/
      }
      </div>
      <div className="flex-1 mt-10 text-2xl md:text-xl" >
        <div className={`text-left ${randomBg[Math.floor(Math.random()*6)]}`} style={styleRight}>
          <span className="p-3 my-3 bg-white leading-normal">Anni Wang is an UX Engineer, a Design Technologist. </span><br />
          <span className="p-1 mx-4 bg-white">a designer and coder</span>
          <span className="p-2 mx-4 bg-white">,a prototyper.</span><br /><br /><br />
        </div>
      </div>
    </main>
  )
}
