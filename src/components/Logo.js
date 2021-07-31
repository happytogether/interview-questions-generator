import DelayLink from '../ultils/DelayLink';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import Arrow from './shapes/Arrow';
import {
  isMobile
} from "react-device-detect";

export default function Logo(props) {
  const color = props.color;
  const backArrowColor = props.backArrowColor;
  const backArrow = props.backArrow;
  const menuColor = props.menuColor;
  const noMenu = props.noMenu;
  const primaryColor = props.primaryColor ? props.primaryColor:'green';
  const primaryTextColor = props.primaryTextColor ? props.primaryTextColor:'var(--gray-dark)';;
  const secondaryColor = props.secondaryColor ? props.secondaryColor:'gray';
  const secondaryTextColor = props.secondaryTextColor?props.secondaryTextColor:'white';
  const thirdColor = props.thirdColor?props.thirdColor:'purple';
  const thirdTextColor = props.thirdTextColor?props.thirdTextColor:'white';

  const logoTextColor = props.logoTextColor;
  const arrowHamburgerColor = props.arrowHamburgerColor;
  const styles = {
    color: logoTextColor ? logoTextColor: primaryTextColor,
    background: props.bg
  }
  return (
    <div className="fixed w-full z-10">
      <div style={styles} className="fixed text-base px-2 py-5 ml-4 z-30 logo">
        <DelayLink delay="600" to="/">
          <span className="sm:hidden">/// Anni Wang ///</span>
        </DelayLink>
        <DelayLink delay="600" to="/">
          <span className="smup:hidden">A.W.</span>
        </DelayLink>
      </div>
      {
        backArrow && <span className={`fixed close ${isMobile? 'right-7 -mt-1': 'right-14'} z-30`}>
          <DelayLink delay="600" to="./" goBackHome="true">
            <Arrow size={isMobile?'40px': '60px'} rotate="180deg" color={arrowHamburgerColor? arrowHamburgerColor: secondaryTextColor} />
          </DelayLink>
        </span>
      }
      {
        /*
        !noMenu && <HamburgerMenu color={arrowHamburgerColor?arrowHamburgerColor:secondaryTextColor} primaryColor={primaryColor} secondaryColor={secondaryColor} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} thirdColor={thirdColor} thirdTextColor={thirdTextColor} />
        */
      }
    </div>
  )
}
