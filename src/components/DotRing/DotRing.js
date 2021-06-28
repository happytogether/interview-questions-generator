import React, { useContext } from "react";
import "./DotRing.scss";
import useMousePosition from "../../hooks/useMousePosition";
import { MouseContext } from "../../context/mouse-context";
import Smile from '../shapes/Smile';
import Sad from '../shapes/Sad';
const DotRing = () => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  return (
    <>
      <div
        style={{ left: `${x}px`, top: `${y}px` }}
        className={"ring " + cursorType}
      >
      </div>
      <div className={`arrow-cursor ${cursorType}`} style={{ left: `${x}px`, top: `${y}px` }}>
				<svg class="arrow-cursor__icon" viewBox="0 0 117.25 86.75">
					<path style={{"stroke": "white"}} class="arrow-cursor__path" d="M111.45,42.5,74.65,5.7l-9.9,9.9,20.6,20.6H6.45v14h78.9L64.75,70.8l9.9,9.9,36.8-36.8A1,1,0,0,0,111.45,42.5Z" />
				</svg>
			</div>
      <div className={`text-white flex items-center flex-col justify-center smile-cursor ${cursorType}`} style={{ left: `${x}px`, top: `${y}px` }}>
        {
          cursorType == "right" ? <Smile size="100px" color="#fff" opacity="1" />: <Sad size="100px" color="#fff" opacity="1" />
        }
        {
          cursorType == "right" ? <div>Not to bad!</div>: <div>Disagree</div>
        }

      </div>
      <div
        className={"dot " + cursorType}
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};

export default DotRing;
