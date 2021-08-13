import DelayLink from '../ultils/DelayLink';
import Arrow from './shapes/Arrow';
import { isMobile } from "react-device-detect";

export default function Logo(props) {
  const color = props.color;
  const bgColorValue = props.bgColorValue;
  const primaryColor = bgColorValue[0][0];
  const primaryTextColor = bgColorValue[0][1];
  const secondaryColor = bgColorValue[1][0];
  const secondaryTextColor = bgColorValue[1][1];
  const thirdColor = bgColorValue[2][0];
  const thirdTextColor = bgColorValue[2][1];
  const fourthColor = bgColorValue[3][0];
  const fourthTextColor = bgColorValue[3][1];
  const logoTextColor = props.logoTextColor;
  const arrowColor = props.arrowColor;
  const nobackArrow = props.nobackArrow;
  const menuColor = props.menuColor;
  const noMenu = props.noMenu;
  const goBackHome = props.goBackHome;
  const styles = {
    color: logoTextColor,
    background: props.bg
  }
  return (
    <div className="fixed w-full z-10">
      <div style={styles} className="fixed text-base px-2 my-5 ml-4 z-30 logo">
        <DelayLink to={{
          pathname: "/",
          state: {
            bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
            textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
          }}}>
          <span className="sm:hidden">// Anni Wang ++</span>
        </DelayLink>
        <DelayLink to="/">
          <span className="smup:hidden">A.W.</span>
        </DelayLink>
      </div>
      {
        !nobackArrow && <span className={`fixed close ${isMobile? 'right-7 -mt-1': 'right-14'} z-30`}>
          <DelayLink to={{
            pathname: `${goBackHome? '/': './'}`,
            state: {
              bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor],
              textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor]
            }}}>
            <Arrow size={isMobile?'40px': '60px'} rotate="180deg" color={arrowColor} />
          </DelayLink>
        </span>
      }
    </div>
  )
}
