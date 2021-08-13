import React, { useContext} from 'react';
import DelayLink from '../ultils/DelayLink';
import { Link } from "react-router-dom";
import './Footer.scss';
import GetRandomFromArray from '../ultils/GetRandomFromArray';

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
  return (
    <footer className={`flex flex-col items-center p-5 z-0 bg-${bgColor}-gray`} style={{"color": textColor}}>
      <ul className="relative flex flex-col w-3/5 sm:w-4/5">
        <li className="my-2 link">
          <DelayLink to={{
            pathname: "/interview",
            state: {
              bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
              textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
            }}}>
            <svg className="inline-block mr-4" width="24" height="24" viewBox="0 0 24 24"><path fill={textColor} d="M8.4,9.464c4.05-1.286,4.693-5.014,4.179-8.357c0,0,0-0.193,0.129-0.129C16.629,2.907,21,6.957,21,13.193 C21,17.821,17.336,22,12,22c-5.786,0-9-4.05-9-8.871c0-2.893,1.929-5.786,4.179-7.071c0,0,0.193,0,0.193,0.129 c0,0.643,0.257,2.25,0.964,3.214L8.4,9.464z"/></svg>
            <span>Interview Anni</span>
          </DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink to={{
            pathname: "/booking",
            state: {
              bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
              textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
            }}}>
            <svg className="inline-block mr-4" width="24" height="24" viewBox="0 0 24 24"><path fill={textColor} d="M13.5 8c.276 0 .5.224.5.5v7c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5v-7c0-.276.224-.5.5-.5h11zm2.5 0c0-1.104-.896-2-2-2h-12c-1.104 0-2 .896-2 2v8c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-8zm6 1.854v4.293l-2-1.408v-1.478l2-1.407zm2-3.854l-6 4.223v3.554l6 4.223v-12z"/></svg>
            <span>Quick Video Chat</span>
           </DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink to="https://github.com/happytogether">
            <svg className="inline-block mr-4" width="24" height="24" viewBox="0 0 24 24"><path fill={textColor} d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span>Github</span>
          </DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink to={{
            pathname: "/credit",
            state: {
              bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
              textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
            }}}>
            <svg className="inline-block mr-4" width="24" height="24" viewBox="0 0 24 24"><path fill={textColor} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z"/></svg>
            <span>Credit</span>
          </DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink to={{
            pathname: "/report",
            state: {
              bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
              textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
            }}}>
          <svg className="inline-block mr-4" width="24" height="24" viewBox="0 0 24 24"><path fill={textColor} d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm-3 3h-7v1h7v-1z"/></svg>
          <span>Report</span>
          </DelayLink>
        </li>
      </ul>
      <div className="mt-5 -ml-10">
        // @Anni Wang {new Date().getFullYear()} ++
      </div>

    </footer>
  )
}
