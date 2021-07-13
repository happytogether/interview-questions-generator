import React, { useEffect } from 'react'
import ReactStoreIndicator from 'react-score-indicator'
import "./Report.scss";
import Logo from "../../components/Logo";
import Footer from '../../components/Footer';
import { useSpring, animated } from 'react-spring';
import { useContext } from 'react';
import { motion } from "framer-motion";
import * as easings from 'd3-ease';
import Smile from '../../components/shapes/Smile';
import Sun from '../../components/shapes/Sun';
import Triangle from '../../components/shapes/memphis/Triangle';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "../../components/Reward/MemphisSets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from "../../Store";
import Arrow from '../../components/shapes/Arrow';
import DelayLink from '../../ultils/DelayLink';

function Report() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  //const fadeIn = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:1000 }, config: { duration: 3000, easing: easings.easeCubic } });
  const setArray = [DonutSet(), IceCreamSet(), TwitchSet(), DefaultSet(), FruitSet(), FruitSet2(), BallonSet()];
  const set = setArray[Math.floor(Math.random()*setArray.length)];
  const notify = () => toast("You haven't finished - Tech Section, UX Section");
  useEffect(() => {
    setTimeout(() => {
      notify();
    }, 1000)
  }, [])
  const bgColorArray = ["orange", "yellow", "green", "green", "purple", "pink", "blue", "red"];
  const bgColor = bgColorArray[Math.floor(Math.random()*bgColorArray.length)];

  return (
    <div>
    <header style={{"height": "100px"}} className="absolute w-full left-0 top-0">
      <Logo color="var(--blue)" />
      <span className="close absolute right-14 z-30">
        <DelayLink delay="600" to="./" goBackHome="true">
          <Arrow size="100px" rotate="180deg" color="#fff" />
        </DelayLink>
      </span>
    </header>
    <ToastContainer position="top-center" autoClose={5000} />
    <div className={`w-screen h-screen report bg-${bgColor} flex justify-center items-center`}>
      <div className="w-6/12 h-5/6 bg-white p-20">
        <div className="flex flex-row w-full h-full">
          <div className="w-6/12 h-full">
            <div className="w-6/12 h-2/6 bg-cover bg-center" style={{"backgroundImage": "url(/img/gradeA/2.svg)", "backgroundColor": "var(--purple)", "backgroundsSize": "100px auto"}}></div>
            <div className="text-black lowercase font-semibold text-4xl py-5">statistics<br />report</div>
            <div class="float-left">
              <ReactStoreIndicator width={150} value={66} maxValue={100} />
            </div>
            <div className="clear-both"></div>
            {
              /*
              <div className="text-5xl pb-5 border my-5 inline-block p-5">78% <span className="text-xl">Score</span></div>
              */
            }

          </div>
          <div className="w-6/12">
            <Sun />
            <ul>
              <li className="border-3 py-6"><p className="block my-3">From the statistics, Anni Wang might be a good fit</p><p> if you are looking for an UX Enginner, Design Technoligist or a prototyper who loves animation. Book a quick online chat here.</p></li>
              <li className="py-10 flex flex-row relative" >
                {
                  set.map((item, index) =><div className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
                }
              </li>
              <li className="py-10">
                <ul>
                  <li>
                    Tech Questions
                    <ul className="flex flex-row">
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                    </ul>
                  </li>
                  <li>
                    UX Questions
                    <ul className="flex flex-row">
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                    </ul>
                  </li>
                  <li>
                    Experience Questions
                    <ul className="flex flex-row">
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                    </ul>
                  </li>
                  <li>
                    Personal Questions
                    <ul className="flex flex-row">
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                      <li><Smile size="40px" /></li>
                    </ul>
                  </li>
                  <li></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Report;
