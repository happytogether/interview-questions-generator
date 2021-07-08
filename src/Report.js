import React, { Component, useEffect  } from 'react'
import ReactStoreIndicator from 'react-score-indicator'
import "./Report.scss";
import Logo from "./components/Logo";
import Footer from './components/Footer';
import { useSpring, animated } from 'react-spring';
import { motion } from "framer-motion";
import * as easings from 'd3-ease';
import Smile from './components/shapes/Smile';
import Sun from './components/shapes/Sun';
import Triangle from './components/shapes/memphis/Triangle';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "./components/Reward/MemphisSets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Report() {
  //const fadeIn = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:1000 }, config: { duration: 3000, easing: easings.easeCubic } });
  const setArray = [DonutSet(), IceCreamSet(), TwitchSet(), DefaultSet(), FruitSet(), FruitSet2(), BallonSet()];
  const set = setArray[Math.floor(Math.random()*setArray.length)];
  const notify = () => toast.error("You haven't finished - Tech Section, UX Section");
  useEffect(() => {
    setTimeout(() => {
      notify();
    }, 1000)
  }, [])
  const bgColorArray = ["orange", "yellow", "green", "green", "purple", "pink", "blue", "red"];
  const bgColor = bgColorArray[Math.floor(Math.random()*bgColorArray.length)];
  return (
    <div>
    <Logo color="var(--blue)" />
    <ToastContainer position="top-center" autoClose={5000} />
    <div className={`w-screen h-screen report bg-${bgColor} flex justify-center items-center`}>
      <div className="w-6/12 h-5/6 bg-white p-20">
        <header className="text-center mb-5">[Your Company Name] - CV generated</header>
        <div className="flex flex-row w-full h-full">
          <div className="w-6/12 h-full">
            <div className="w-6/12 h-2/6 bg-cover bg-center" style={{"backgroundImage": "url(/img/profile.jpeg)"}}></div>
            <div className="text-black lowercase font-semibold text-7xl py-5">Anni <br />Wang</div>
            <div class="float-left">
              <ReactStoreIndicator width={150} value={66} maxValue={100} />
            </div>
            <div className="clear-both"></div>
            {
              /*
              <div className="text-5xl pb-5 border my-5 inline-block p-5">78% <span className="text-xl">Score</span></div>
              */
            }
            <ul>
              <li>
                Tech Questions
                <ul className="flex flex-row">
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                </ul>
              </li>
              <li>
                UX Questions
                <ul className="flex flex-row">
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                </ul>
              </li>
              <li>
                Experience Questions
                <ul className="flex flex-row">
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                </ul>
              </li>
              <li>
                Personal Questions
                <ul className="flex flex-row">
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                  <li><Smile size="20px" /></li>
                </ul>
              </li>
              <li></li>
            </ul>
          </div>
          <div className="w-6/12">
            <Sun />
            <ul>
              <li className="py-10 flex flex-row relative" >
                {
                  set.map((item, index) =><div className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
                }
              </li>
              <li className="py-10">
                <h2 className="text-2xl">Profile</h2>
                <p className="text-black">Anni Wang is an UX Engineer, a Design Technologist, a prototype with more than 10 years development experience.</p>
              </li>
              <li className="py-10">
                <h2 className="text-2xl">Experience</h2>
                <ul className="text-black">
                  <li>Flag Companies in Sillcon Valley</li>
                  <li>Startup</li>
                  <li>Startup accquied by Facebook</li>
                </ul>
              </li>
              <li className="py-10">
                <h2 className="text-2xl">Skills</h2>
              </li>
              <li className="py-10">
                <h2 className="text-2xl">Contact</h2>
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
