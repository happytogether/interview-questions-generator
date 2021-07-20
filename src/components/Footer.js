import DelayLink from '../ultils/DelayLink';
import { Link } from "react-router-dom";
import './Footer.scss';

export default function Footer() {
  const bgColorArray = ["orange", "yellow", "green",  "purple"];
  const textColorArray = ['white', 'purple', 'purple', 'white'];
  const randomIndex = Math.floor(Math.random()*bgColorArray.length)
  return (
    <footer className={`flex p-10 justify-center bg-${bgColorArray[randomIndex]} text-${textColorArray[randomIndex]}`}>
      <div className="absolute left-0 top-0 h-full" style={{"width": "60%"}}></div>
      <ul className="relative m-5 flex flex-col" style={{"width": "200px"}}>
        <li className="my-2 link">
          <DelayLink delay="300" to="./booking">Quick Video Chat</DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink delay="300" to="https://github.com/happytogether">Github</DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink delay="300" to="/credit">Credit</DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink delay="300" to="/report">Report</DelayLink>
        </li>
        <li className="my-2 link">
          @Anni Wang 2021
        </li>
      </ul>
    </footer>
  )
}
