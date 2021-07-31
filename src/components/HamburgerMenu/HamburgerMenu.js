import BurgerMenu from 'react-burger-menu';
import DelayLink from '../../ultils/DelayLink';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { Link } from "react-router-dom";
import './HamburgerMenu.scss';
import {
  isMobile
} from "react-device-detect";

export default function HamburgerMenu(props){
  const color = props.color;
  const rightPos = isMobile ? '.5rem': '1.5rem';
  const topPos = isMobile ? '.5rem': '1.5rem';
  const bgTextColorArray = [['orange', 'var(--gray-dark)'], ['yellow', 'var(--gray-dark)'], ['green', 'var(--gray-dark)'], ['purple', 'white'], ['pink', 'var(--gray-dark)'], ['blue', 'white']]; // first element - bg, 2nd - text color
  const bgTextColor = GetRandomFromArray(bgTextColorArray);
  const primaryColor = props.primaryColor ? props.primaryColor:'';
  const primaryTextColor = props.primaryTextColor ? props.primaryTextColor:'';;
  const secondaryColor = props.secondaryColor ? props.secondaryColor:'';
  const secondaryTextColor = props.secondaryTextColor?props.secondaryTextColor:'';
  const thirdColor = props.thirdColor?props.thirdColor:'';
  const thirdTextColor = props.thirdTextColor?props.thirdTextColor:'';

  var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '24px',
    right: rightPos,
    top: topPos
  },
  bmBurgerBars: {
    background: color
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '36px',
    width: '36px'
  },
  bmCross: {
    background: 'white',
    width: "4px",
    height: "20px"
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: '0'
  },
  bmMenu: {
    background: thirdColor,
    fontSize: '1.15em'
  },
  bmItemList: {
    color: 'var(--gray-dark)'
  },
  bmOverlay: {
    background: 'transparent'
  }
}
  const Menu = BurgerMenu["push"];

  return (
    <Menu styles={ styles }
      id="push"
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
      right
    >
      <ul className="w-full h-full flex flex-row p-8 relative text-base">
        <li className="link">
          <DelayLink delay="600" to={{
            pathname: "/",
            state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
            <span className="menu-item bold my-3 block border-bottom">Home</span>
          </DelayLink>
        </li>
        <li className="link">
          <DelayLink delay="600" to={{
            pathname: "/interview",
            state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
            <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={bgTextColor[0][1]} d="M8.4,9.464c4.05-1.286,4.693-5.014,4.179-8.357c0,0,0-0.193,0.129-0.129C16.629,2.907,21,6.957,21,13.193 C21,17.821,17.336,22,12,22c-5.786,0-9-4.05-9-8.871c0-2.893,1.929-5.786,4.179-7.071c0,0,0.193,0,0.193,0.129 c0,0.643,0.257,2.25,0.964,3.214L8.4,9.464z"/></svg>
            <span className="menu-item bold my-3 border-bottom">Interview Anni</span>
          </DelayLink>
        </li>
        <li className="link">
          <DelayLink delay="600" to={{
            pathname: "/report",
            state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
            <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={bgTextColor[0][1]} d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm-3 3h-7v1h7v-1z"/></svg>
            <span className="menu-item bold my-3 border-bottom">Interview Report</span>
          </DelayLink>
        </li>
        <li className="link">
          <DelayLink delay="600" to={{
            pathname: "/gallery/0",
            state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
            <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={bgTextColor[0][1]} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>
            <span className="menu-item bold my-3 border-bottom">Questions Gallery</span>
          </DelayLink>
          <ul className="ml-5">
            <li className="link">
              <DelayLink delay="600" to={{
                pathname: "/gallery/0",
                state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
                <span className="menu-item text-sm block my-2 pl-6">Tech Questions</span>
              </DelayLink>
            </li>
            <li className="link">
              <DelayLink delay="600" to={{
                pathname: "/gallery/1",
                state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
                <span className="menu-item text-sm block my-2 pl-6">UX Questions</span>
              </DelayLink>
            </li>
            <li className="link">
              <DelayLink delay="600" to={{
                pathname: "/gallery/2",
                state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
                <span className="menu-item text-sm block my-2 pl-6">Experience Questions</span>
              </DelayLink>
            </li>
            <li className="link">
              <DelayLink delay="600" to="/gallery/3">
                <span className="menu-item text-sm block my-2 pl-6">Personal Questions</span>
              </DelayLink>
            </li>
          </ul>
        </li>
        <li className="link">
          <DelayLink delay="600" to={{
            pathname: "/booking",
            state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
            <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={bgTextColor[0][1]} d="M13.5 8c.276 0 .5.224.5.5v7c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5v-7c0-.276.224-.5.5-.5h11zm2.5 0c0-1.104-.896-2-2-2h-12c-1.104 0-2 .896-2 2v8c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-8zm6 1.854v4.293l-2-1.408v-1.478l2-1.407zm2-3.854l-6 4.223v3.554l6 4.223v-12z"/></svg>
            <span className="menu-item bold my-3 border-bottom">Book Video Chat</span>
          </DelayLink>
        </li>
        <li className="link">
          <DelayLink delay="600" to={{
            pathname: "/credit",
            state: {bgTextColor: [primaryColor, secondaryColor, primaryTextColor, secondaryTextColor, thirdColor, thirdTextColor]}}}>
            <svg className="inline-block mr-4" viewBox="0 0 24 24"><path fill={bgTextColor[0][1]} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z"/></svg>
            <span className="menu-item bold my-3 border-bottom">Credit</span>
          </DelayLink>
        </li>
      </ul>
    </Menu>

  );
}
