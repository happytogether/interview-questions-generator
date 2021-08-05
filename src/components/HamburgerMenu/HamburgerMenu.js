import { motion } from "framer-motion";
import BurgerMenu from 'react-burger-menu';
import DelayLink from '../../ultils/DelayLink';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';
import { Link } from "react-router-dom";
import './HamburgerMenu.scss';
import {
  isMobile
} from "react-device-detect";

export default function HamburgerMenu(props){
  const rightPos = isMobile ? '.5rem': '1.5rem';
  const topPos = isMobile ? '.5rem': '1.5rem';
  const bgColorValue = props.bgColorValue;
  const barColor = props.barColor;
  const crossColor = props.crossColor;
  const panelBgColor = props.panelBgColor;
  const panelTextColor = props.panelTextColor;
  const primaryColor = bgColorValue[0][0];
  const primaryTextColor = bgColorValue[0][1];
  const secondaryColor = bgColorValue[1][0];
  const secondaryTextColor = bgColorValue[1][1];
  const thirdColor = bgColorValue[2][0];
  const thirdTextColor = bgColorValue[2][1];
  const fourthColor = bgColorValue[3][0];
  const fourthTextColor = bgColorValue[3][1];

  var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '24px',
    right: rightPos,
    top: topPos
  },
  bmBurgerBars: {
    background: barColor
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '36px',
    width: '36px'
  },
  bmCross: {
    background: crossColor,
    width: "4px",
    height: "20px"
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: '0'
  },
  bmMenu: {
    background: panelBgColor,
    fontSize: '1.15em'
  },
  bmItemList: {
    color: panelTextColor
  },
  bmOverlay: {
    background: 'transparent'
  }
}
  const Menu = BurgerMenu["push"];

  return (
    <motion.div>
      <Menu styles={ styles }
        id="push"
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        right
      >
        <ul className={`w-full h-full flex flex-row p-8 relative text-base bg-${panelBgColor}`}>
          <li className="link">
            <DelayLink to={{
              pathname: "/",
              state: {
                bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
              }}}>
              <span className="menu-item bold my-3 block border-bottom">Home</span>
            </DelayLink>
          </li>
          <li className="link">
            <DelayLink to={{
              pathname: "/interview",
              state: {
                bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
              }}}>
              <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={panelTextColor} d="M8.4,9.464c4.05-1.286,4.693-5.014,4.179-8.357c0,0,0-0.193,0.129-0.129C16.629,2.907,21,6.957,21,13.193 C21,17.821,17.336,22,12,22c-5.786,0-9-4.05-9-8.871c0-2.893,1.929-5.786,4.179-7.071c0,0,0.193,0,0.193,0.129 c0,0.643,0.257,2.25,0.964,3.214L8.4,9.464z"/></svg>
              <span className="menu-item bold my-3 border-bottom">Interview Anni</span>
            </DelayLink>
          </li>
          <li className="link">
            <DelayLink to={{
              pathname: "/report",
              state: {
                bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
              }}}>
              <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={panelTextColor} d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm-3 3h-7v1h7v-1z"/></svg>
              <span className="menu-item bold my-3 border-bottom">Interview Report</span>
            </DelayLink>
          </li>
          <li className="link">
            <DelayLink to={{
              pathname: "/gallery/0",
              state: {
                bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
              }}}>
              <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={panelTextColor} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>
              <span className="menu-item bold my-3 border-bottom">Questions Gallery</span>
            </DelayLink>
            <ul className="ml-5">
              <li className="link">
                <DelayLink to={{
                  pathname: "/gallery/0",
                  state: {
                    bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                    textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
                  }}}>
                  <span className="menu-item text-sm block my-2 ml-6">Tech Questions</span>
                </DelayLink>
              </li>
              <li className="link">
                <DelayLink to={{
                  pathname: "/gallery/1",
                  state: {
                    bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                    textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
                  }}}>
                  <span className="menu-item text-sm block my-2 ml-6">UX Questions</span>
                </DelayLink>
              </li>
              <li className="link">
                <DelayLink to={{
                  pathname: "/gallery/2",
                  state: {
                    bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                    textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
                  }}}>
                  <span className="menu-item text-sm block my-2 ml-6">Experience Questions</span>
                </DelayLink>
              </li>
              <li className="link">
              <DelayLink to={{
                pathname: "/gallery/3",
                state: {
                  bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                  textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
                }}}>
                <span className="menu-item text-sm block my-2 ml-6">Personal Questions</span>
              </DelayLink>
              </li>
            </ul>
          </li>
          <li className="link">
            <DelayLink to={{
              pathname: "/booking",
              state: {
                bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
              }}}>
              <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={panelTextColor} d="M13.5 8c.276 0 .5.224.5.5v7c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5v-7c0-.276.224-.5.5-.5h11zm2.5 0c0-1.104-.896-2-2-2h-12c-1.104 0-2 .896-2 2v8c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-8zm6 1.854v4.293l-2-1.408v-1.478l2-1.407zm2-3.854l-6 4.223v3.554l6 4.223v-12z"/></svg>
              <span className="menu-item bold my-3 border-bottom">Book Video Chat</span>
            </DelayLink>
          </li>
          <li className="link">
            <DelayLink to={{
              pathname: "/credit",
              state: {
                bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
                textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
              }}}>
              <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={panelTextColor} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z"/></svg>
              <span className="menu-item bold my-3 border-bottom">Credit</span>
            </DelayLink>
          </li>
        </ul>
      </Menu>
    </motion.div>
  );
}
