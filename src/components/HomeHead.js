import React, { useContext, useState, useEffect } from 'react';
import { MouseContext } from "./../context/mouse-context";
import DotRing from "./DotRing/DotRing";
import GridSvg from './shapes/GridSvg';
import Sun from './shapes/Sun';
import Wave from './shapes/Wave';
import Triangle from './shapes/Triangle';
import Slash from './shapes/memphis/Slash';
export default function HomeHead(props) {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const styles = {
    padding: "40px",
    border: "1px solid",
    boxShadow: "-10px 10px blue",
    backgroundColor: "#fdee21",
    color: "blue"
  }
  const styleRight = {
    padding: "40px",
    height: "250px"
  }

  const randomBg = ["dot-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg"];

  return (
    <main className="h-screen w-screen p-8 flex justify-items-center items-center">
      <div className="flex-1" style={styles}>
        <h2 className="text-3xl border-b-2 pb-2">Interview<br /><input type="text" placeholder="Anni Wang" />and get some FUN.</h2>

        <p>*Questions will be randomly gernerated.</p>

        <div className="text-left">
          <h4></h4>
          <div className="flex mt-2 space-x-4">
            <a href="./report" className="border rounded-sm py-3 px-6" onClick={() => { props.getCategories('basic.json')}}>See demo Interview Report</a><br />
          </div>
        </div>
        <Wave />
        <Sun />
        <Triangle />
        <Slash />
      </div>
      <div className="flex-1 text-2xl" >
        <div className={`text-left ${randomBg[Math.floor(Math.random()*6)]}`} style={styleRight}>
          <span className="p-3 my-3 bg-white leading-normal">Anni Wang is an UX Engineer, a Design Technologist. </span><br />
          <span className="p-1 mx-4 bg-white">a designer and coder</span>
          <span className="p-2 mx-4 bg-white">,a prototyper.</span><br /><br /><br />
        </div>
      </div>
    </main>
  )
}
