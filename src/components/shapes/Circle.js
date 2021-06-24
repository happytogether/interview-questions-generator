import { useContext, useState } from "react";
import DotRing from "../DotRing/DotRing";
import { MouseContext } from "../../context/mouse-context";

export default function Circle(props) {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const styles = {
    backgroundColor: "transparent",
    border: "3px solid var(--gray-dark)",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    position: "absolute",
    top: "70%",
    left: "45%",
    boxShadow: "10px 0 orange, 11px 0 orange, 12px 0 orange, 13px 0 orange, 14px 0 orange, 15px 0 orange, 15px 0 orange, 16px 0 orange, 17px 0 orange, 19px 0 orange, 20px 0 orange, 21px 0 orange, 22px 0 orange, 23px 0 orange, 24px 0 orange, 25px 0 orange, 27px 0 orange, 28px 0 orange, 29px 0 orange, 30px 0 orange"
  }
  let clicked = false;

  return (
    <div style={styles} onMouseEnter={() => cursorChangeHandler("hovered")}
  onMouseLeave={() => cursorChangeHandler("")} onClick={() => { clicked = !clicked; cursorChangeHandler( clicked + "-clicked")}}></div>
  )
}
