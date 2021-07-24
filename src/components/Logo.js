import DelayLink from '../ultils/DelayLink';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import Arrow from './shapes/Arrow';

export default function Logo(props) {
  const color = props.color;
  const backArrowColor = props.backArrowColor;
  const backArrow = props.backArrow;
  const menuColor = props.menuColor;
  const styles = {
    color: color,
    background: props.bg
  }
  return (
    <div className="fixed w-full z-30">
      <div style={styles} className="text-base p-2 m-4 z-30 logo flex absolute items-center justify-center">
        <DelayLink delay="600" to="/">
          <span className="sm:hidden">/// Anni Wang ///</span>
        </DelayLink>
      </div>
      {
        backArrow && <span className="close absolute right-14 z-30">
          <DelayLink delay="600" to="./" goBackHome="true">
            <Arrow size="60px" rotate="180deg" color={backArrowColor} />
          </DelayLink>
        </span>
      }
      <HamburgerMenu color={menuColor} />
    </div>
  )
}
