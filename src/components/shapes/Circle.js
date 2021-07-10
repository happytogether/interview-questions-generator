import { useContext} from "react";
import { MouseContext } from "../../context/mouse-context";

export default function Circle(props) {
  const { cursorChangeHandler } = useContext(MouseContext);
  const styles = {
    backgroundColor: "transparent",
    border: "3px solid var(--gray-dark)",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    position: "absolute",
    top: "70%",
    left: "45%"
  }
  let clicked = false;

  return (
    <div style={styles} onMouseEnter={() => cursorChangeHandler("hovered")}
  onMouseLeave={() => cursorChangeHandler("")} onClick={() => { clicked = !clicked; cursorChangeHandler( clicked + "-clicked")}}></div>
  )
}
