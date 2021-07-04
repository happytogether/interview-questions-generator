import "./Report.scss";
import Logo from "./components/Logo";
import { useSpring, animated } from 'react-spring';

function Report() {
  const fadeIn = useSpring({ to: { y: 0, opacity: 1}, from: { opacity: 0, y:1000 } });
  return (
    <div className="report">
      <div className="absolute z-30" style={{"left": 0, "top": 0, "width": "200px"}}>
        <Logo color="var(--blue)" />
      </div>
      <animated.div style={fadeIn}>
        <iframe src="https://react-calendso-interview-production.up.railway.app/anni/30mins" frameborder="0" allowfullscreen></iframe>
      </animated.div>
    </div>

  );
}

export default Report;
