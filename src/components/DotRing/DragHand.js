import React, { useContext } from "react";
import "./DotRing.scss";
import useMousePosition from "../../hooks/useMousePosition";
import { MouseContext } from "../../context/mouse-context";
import Smile from '../shapes/Smile';
import Sad from '../shapes/Sad';
const DragHand = () => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  return (
    <>
      <div
        style={{ left: `${x}px`, top: `${y}px` }}
        className={"hand " + cursorType}
      >Hand
      </div>
    </>
  );
};

export default DragHand;
