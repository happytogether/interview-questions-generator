import BurgerMenu from 'react-burger-menu';
import { IceCreamSet,DefaultSet } from "../../components/Reward/MemphisSets";

export default function HamburgerMenu(props){
  const color = props.color;
  var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '24px',
    right: '1.5rem',
    top: '1.5rem'
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
    height: '100%'
  },
  bmMenu: {
    background: 'var(--purple)',
    fontSize: '1.15em'
  },
  bmItemList: {
    color: 'white'
  },
  bmOverlay: {
    background: 'transparent'
  }
}
  const Menu = BurgerMenu["push"];
  const setArray = [IceCreamSet(), DefaultSet()];
  const set = setArray[Math.floor(Math.random()*setArray.length)];

  return (
    <Menu styles={ styles }
      id="push"
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
      right
    >
      <div className="w-full h-full flex flex-row p-10 relative">
        <a className="link menu-item bold my-3 block border-bottom" href="/">Home</a>
        <a className="link menu-item bold my-3 block" href="/newInterview">Interview Anni Now!</a>
        <a className="link menu-item bold my-3 block" href="/report">Interview Report</a>
        <a className="link menu-item bold my-3 block" href="/gallery/0">Questions Gallery</a>
        <a className="link menu-item text-sm block my-2 pl-2" href="/gallery/0"> - Tech Questions</a>
        <a className="link menu-item text-sm block my-2 pl-2" href="/gallery/1"> - UX Questions</a>
        <a className="link menu-item text-sm block my-2 pl-2" href="/gallery/2"> - Experience Questions</a>
        <a className="link menu-item text-sm block my-2 pl-2" href="/gallery/3"> - Personal Questions</a>
        <a className="link menu-item bold my-3 block" href="/booking">Book Video Chat</a>
        <a className="link menu-item bold my-3 block" href="">Credit</a>
        <a className="flex flex-row absolute bottom-5 pr-5">
          {
            set.map((item, index) =><div className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
          }
        </a>
      </div>


    </Menu>

  );
}
