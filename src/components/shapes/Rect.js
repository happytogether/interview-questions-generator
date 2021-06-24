export default function Rect(props) {
  // define right left and position here with index
  const randomPos = ["right-0", "left-0"];
  return (
    <div className={`item-rect ${randomPos[props.index%2]} ${props.color}`}></div>
  )
}
