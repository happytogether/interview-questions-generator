import Starfish from './beach/Starfish';
import Moon from './shapes/Moon';
import Sun from './shapes/Sun';
import Wave from './shapes/Wave';
import Square from './shapes/Square';
import StraightWave from './shapes/StraightWave';
import Rect from './shapes/Rect';
import Circle from './shapes/Circle';
import { useContext, useState, useEffect } from "react";
import DotRing from "./DotRing/DotRing";
import { MouseContext } from "../context/mouse-context";
import HoverIntent from 'react-hoverintent';
import RandomBg from '../RandomBg';

export default function Items(props) {
  const colorPalette =["bg-green", "bg-pink", "bg-purple text-white", "bg-yellow"];
  // purple with blue rect by using index number
  const rectPalette = ["bg-blue", "bg-orange", "bg-yellow", "bg-purple"];
  const randomBg = RandomBg();
  const randomBgArr = ["dot-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg", "radial-bg2","rainbow-bg"]; // do not include radial-bg in not square shape
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const categoryMainShape = ["large-rect", "large-wide-rect", "square", "hexagon"];
  const flexDirection = ["", "flex-row-reverse"];
  const textAlign = ["left", "right"];

  const [mouseover, setMouseover] = useState("");
  function handleMouseoverChange(newValue) {
      setMouseover(newValue);
  }

  return (
    <ul>
      {
        props.items && props.items.length>0 && props.items.map((item, index)=><li key={index} value={props.value}  className={`item flex items-center justify-center ${flexDirection[index%2]} ${colorPalette[index%4]}`}>
          <div className={`flex items-center justify-center ${randomBgArr[Math.floor(Math.random()*11)]} ${categoryMainShape[index%4]}`}>
            <span className={randomBgArr[Math.floor(Math.random()*11)]}></span>
          </div>
          <Square size="150" color={colorPalette[index%4]} index={index} />
          <Moon />
          <Sun />
          <Wave />
          <Rect color={rectPalette[index%4]} index={index}/>
          <Circle />
          <HoverIntent
            onMouseOver={() => handleMouseoverChange("hovered")}
            onMouseOut={() => handleMouseoverChange("")}
            sensitivity={10}
            interval={200}
            timeout={0}
          >
            <figcaption className={`mx-28 ${textAlign[index%2]}`} style={{maxWidth: "250px"}}>
              <h3 className="text-5xl">{item.cat}</h3>
              <span>Use Tinder Way to interview me and see if you like my answers.</span>
              <button onMouseEnter={() => cursorChangeHandler("hovered")}
            onMouseLeave={() => cursorChangeHandler("")} className="text-left border rounded-sm py-3 px-6" onClick={() => { props.handleCategoryChange(item.cat); props.openHorizontalList(); props.lockBodyScrolling();props.handleRandomBg(randomBg);}}>View Questions</button>
            </figcaption>
          </HoverIntent>

        </li>)
      }
    </ul>
  )
}
