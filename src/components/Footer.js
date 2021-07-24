import DelayLink from '../ultils/DelayLink';
import { Link } from "react-router-dom";
import './Footer.scss';

export default function Footer() {
  return (
    <footer className={`flex flex-col p-5 items-center bg-purple text-white`}>
      <ul className="relative flex flex-col" style={{"width": "200px"}}>
        <li className="my-2 link">
          <DelayLink delay="300" to="./booking">- Quick Video Chat</DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink delay="300" to="https://github.com/happytogether">- Github</DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink delay="300" to="/credit">- Credit</DelayLink>
        </li>
        <li className="my-2 link">
          <DelayLink delay="300" to="/report">- Report</DelayLink>
        </li>
      </ul>
      @/// Anni Wang /// 2021
    </footer>
  )
}
