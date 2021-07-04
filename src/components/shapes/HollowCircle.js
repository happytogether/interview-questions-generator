export default function HollowCircle(props) {
  const styles = {
    backgroundColor: "blue",
    borderRadius: "50%",
    width: props.size +"px",
    height: props.size + "px",
    position: "absolute"
  }
  const hollowStyle = {
    width: (props.size/ 2 - 10) + "px",
    height: (props.size/ 2 - 10) + "px",
    borderRadius: "50%",
    transform: "rotate(45deg)"
  }
  const randomDropShadow = ["drop-shadow-left-bottom", "drop-shadow-left-top",  "drop-shadow-right-top", "drop-shadow-right-bottom"];

  return (
    <div className={`hollow-circle flex items-center justify-center border-image ${randomDropShadow[Math.floor(Math.random()*4)]}`} style={styles}>
      <span className={props.color} style={hollowStyle}></span>
    </div>
  )
}
