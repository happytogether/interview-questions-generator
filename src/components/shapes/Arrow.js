export default function Arrow(props) {
  const color = props.color;
  const size = props.size;
  const deg = props.rotate;
  const styles = {
    "width": size,
    "height": size,
    "transform": "rotate("+ deg +")"
  }
  return (
    <div>
      <svg style={styles} viewBox="0 0 117.25 86.75">
        <path style={{"stroke": "white"}} class="arrow-cursor__path" d="M111.45,42.5,74.65,5.7l-9.9,9.9,20.6,20.6H6.45v14h78.9L64.75,70.8l9.9,9.9,36.8-36.8A1,1,0,0,0,111.45,42.5Z" />
      </svg>
    </div>
  )
}
