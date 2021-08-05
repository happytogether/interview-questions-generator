import DelayLink from '../ultils/DelayLink';
import Arrow from './shapes/Arrow';
import { isMobile } from "react-device-detect";

export default function Logo(props) {
  const color = props.color;
  const bgColorValue = props.bgColorValue;
  const logoTextColor = props.logoTextColor;
  const arrowColor = props.arrowColor;
  const nobackArrow = props.nobackArrow;
  const menuColor = props.menuColor;
  const noMenu = props.noMenu;
  const styles = {
    color: logoTextColor,
    background: props.bg
  }
  return (
    <div className="fixed w-full z-10">
      <div style={styles} className="fixed text-base px-2 my-5 ml-4 z-30 logo">
        <DelayLink to="/">
          <span className="sm:hidden">/// Anni Wang ///</span>
        </DelayLink>
        <DelayLink to="/">
          <span className="smup:hidden">A.W.</span>
        </DelayLink>
      </div>
      {
        !nobackArrow && <span className={`fixed close ${isMobile? 'right-7 -mt-1': 'right-14'} z-30`}>
          <DelayLink to="./" goBackHome="true">
            <Arrow size={isMobile?'40px': '60px'} rotate="180deg" color={arrowColor} />
          </DelayLink>
        </span>
      }
    </div>
  )
}
