import DelayLink from '../ultils/DelayLink';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <ul className="relative py-10" style={{"width": "200px", "margin": "0 auto"}}>
        <li className="my-2">
          <DelayLink delay="300" to="./booking">Quick Video Chat</DelayLink>
        </li>
        <li className="my-2">
          <DelayLink delay="300" to="https://github.com/happytogether">Github</DelayLink>
        </li>
        <li className="my-2">
          <DelayLink delay="300" to="/credit">Credit</DelayLink>
        </li>
        <li className="my-2">
          <DelayLink delay="300" to="/report">Report</DelayLink>
        </li>
      </ul>
    </footer>
  )
}
