export default function Square(props) {
  const rotateDegree = (Math.floor( Math.random() * 4) * 90) + 'deg';
  const dropShadowIndex = Math.floor( Math.random() * 4);
  const styles = {
    backgroundColor: "transparent",
    borderRadius: "50%",
    width: props.size+"px",
    height: props.size+"px",
    position: "absolute",
    right: "20%",
    bottom: '-50px',
    transform: `rotate(${rotateDegree })`
  }
  const randomDropShadow = ["drop-shadow-left-bottom", "drop-shadow-left-top",  "drop-shadow-right-top", "drop-shadow-right-bottom"];
  const randomBg = ["dot-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg", "radial-bg"]; // do not include radial-bg in not square shape
  const hollowStyle = {
    width: (props.size/ 2 - 10) + "px",
    height: (props.size/ 2 - 10) + "px",
    borderRadius: "50%",
    transform: "rotate(45deg)"
  }

  return (
    <div className={ `hover-rotate flex items-center justify-center border-image ${randomBg[Math.floor(Math.random()*9)]} ${randomDropShadow[dropShadowIndex]} ${props.color}`} style={styles}>
      <span className={props.color} style={hollowStyle}></span>
    </div>
  )
}
