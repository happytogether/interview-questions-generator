import React, { useContext, useState, useEffect, useRef } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { useSpring, animated, config } from 'react-spring';
import Tetris from './tetris/Tetris';
import Shapes from './shapes/Shapes';
import Questions from './Questions';
import Moon from './shapes/Moon';
import StraightWave from './shapes/StraightWave';
import Triangle from './shapes/Triangle';

export default function HorizontalList(props) {
  let questions;
  let cat;
  if (props.data && props.data.length > 0){
    for (let key in props.data) {
      if (props.data[key].cat == props.category) {
        questions = props.data[key].questions;
        cat = props.data[key].cat;
      }
    }
  }
  const containerRef = useRef(null);
  const [{ x }, set] = useSpring(() => ({
    x: 0,
  }));

  let randomNumArr = [];

  function randomShape(){
    // assume we have 4 different shapes
    let randomNum;
    for (let i = 0; i <= 8; i++) {
      let loaded = false;
      randomNum = Math.floor( Math.random() * 8);
      if (i == 0) {
        randomNumArr.push(randomNum);
      } else {
        while (!loaded && (randomNum !== randomNumArr[i -1])) {
          randomNumArr.push(randomNum);
          loaded = true;
        }
      }
    }
  }
  let randomNumArrReverse = randomNumArr.reverse();
  randomShape();
  const styles ={
    width: "100%",
    height: "100%"
  }
  return (

    <div style={styles}>
        <Questions questions={questions} cat={cat}/>
    </div>
  )
}
