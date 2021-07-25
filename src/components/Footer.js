import DelayLink from '../ultils/DelayLink';
import { Link } from "react-router-dom";
import './Footer.scss';

export default function Footer(props) {
  const bgColor = props.bgColor;
  const textColor = props.textColor;
  return (
    <footer className={`flex flex-col p-5 items-center z-0 justify-center bg-${bgColor} text-${textColor}`}>
      <ul className="relative flex flex-col w-3/5">
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
      <div className="mt-10 -ml-10">
        /// @Anni Wang 2021 ///
      </div>

    </footer>
  )
}
