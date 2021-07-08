export default function Arrow(props) {
  const size = props.size;
  const deg = props.rotate;
  const styles = {
    "width": size,
    "height": size,
    "transform": "rotate("+ deg +")"
  }
  return (
    <div className="float-left arrow">
      <svg style={styles} viewBox="0 0 117.25 86.75">
        <path style={{"stroke": "white"}} className="arrow-cursor__path" d="M111.45,42.5,74.65,5.7l-9.9,9.9,20.6,20.6H6.45v14h78.9L64.75,70.8l9.9,9.9,36.8-36.8A1,1,0,0,0,111.45,42.5Z" />
      </svg>
    </div>
  )
}
