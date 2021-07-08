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
        className={"ring-mouse lg:hidden " + cursorType}
      >
      </div>
      <div
        className={"dot lg:hidden " + cursorType}
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};

export default DotRing;
