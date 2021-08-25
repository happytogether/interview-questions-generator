import React, { useContext} from 'react';
import DelayLink from '../ultils/DelayLink';
import { Link } from "react-router-dom";
import './Footer.scss';
import GetRandomFromArray from '../ultils/GetRandomFromArray';
import useBoop from '../hooks/use-boop';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import SegmentsAnimation from '../components/SegmentsAnimation';

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
  const fifthColor = bgColorValue[4][0];
  const fifthTextColor = bgColorValue[4][1];
  const sixthColor = bgColorValue[5][0];
  const sixthTextColor = bgColorValue[5][1];

  const item = props.item;
  const [style, trigger] = useBoop({ scale: 1.2 });

  return (
    <li className="my-2 link" onMouseEnter={trigger}>
      <DelayLink to={{
        pathname: item.link,
        state: {
          bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
          textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
        }}}>
        <animated.svg style={style} className="inline-block mr-4" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill={textColor} d={item.path} /></animated.svg>
        <span className="px-1">
            {item.title}
        </span>
      </DelayLink>
      <ul className="ml-10">
        {
          item.subLink && item.subLink.map((sublink, i)=> (
            <li className={`${i===item.subLink.length-1 ? '': 'my-4'} link text-sm`}>
              <DelayLink to={{
                pathname: sublink.link,
                state: {
                  bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
                  textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
                }}}>
                <span className="px-1">
                    {sublink.title}
                </span>
              </DelayLink>
            </li>
          ))
        }
      </ul>
    </li>
  )
}
