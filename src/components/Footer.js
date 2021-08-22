import React, { useContext, useState, useEffect} from 'react';
import DelayLink from '../ultils/DelayLink';
import { Link } from "react-router-dom";
import './Footer.scss';
import GetRandomFromArray from '../ultils/GetRandomFromArray';
import useBoop from '../hooks/use-boop';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import FooterList from './FooterList';
import SegmentsAnimation from '../components/SegmentsAnimation';
import useSound from 'use-sound';
import clickSfx from '../components/click.mp3';

export default function Footer(props) {
  const bgColor = props.bgColor;
  const textColor = props.textColor;
  const bgColorValue = props.bgColorValue;
  const primaryColor = bgColorValue[0][0];
  const primaryTextColor = bgColorValue[0][1];
  const secondaryColor = bgColorValue[1][0];
  const secondaryTextColor = bgColorValue[1][1];
  const thirdColor = bgColorValue[2][0];
  const thirdTextColor = bgColorValue[2][1];
  const fourthColor = bgColorValue[3][0];
  const fourthTextColor = bgColorValue[3][1];
  const copyright = '// @Anni Wang ' + new Date().getFullYear() + ' ++';
  const [list, setList] = useState();
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const getList=(file)=>{
    fetch(file
    ,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setList(myJson);
        console.log(list);

        setJsonLoaded(true);
      });
  }
  // get json file
  useEffect(()=>{
    getList('/navigation.json')
  },[])


  const [style, trigger] = useBoop({ rotation: '10deg', scale: 1.2 });

  return (
    <footer className={`flex flex-col items-center py-10 z-0 bg-${bgColor}-gray`} style={{"color": textColor}}>
      <ul className="relative flex flex-col w-3/5">
        {
          jsonLoaded && list.map((item, index) => (
            <FooterList item={item} textColor={textColor} bgColorValue={bgColorValue}  />
          ))
        }
      </ul>
      <div className="mt-5 -ml-10">
        <SegmentsAnimation segment={copyright.length} type="text" x={-5} y={0} zIntervalFrom={-20} zIntervalTo={-20} delay={50} bgColorValue={bgColorValue}>
          {copyright}
        </SegmentsAnimation>
      </div>

    </footer>
  )
}
