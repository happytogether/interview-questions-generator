export default function Arrow(props) {
  const size = props.size;
  const deg = props.rotate;
  const color = props.color;
  const styles = {
    "width": size,
    "height": size,
    "transform": "rotate("+ deg +")"
  }
  const strokeStyles = {
    "stroke": color
  }
  return (
    <div className="arrow mx-5 mt-2">
      <svg style={styles} viewBox="0 0 106 76">
          <g stroke="none" stroke-width="2" fill="none" fill-rule="evenodd">
              <g transform="translate(0.450000, 0.700000)" fill="none" fill-rule="nonzero">
                  <path style={strokeStyles} d="M105,36.8 L68.2,-2.66453526e-15 L58.3,9.9 L78.9,30.5 L-2.66453526e-15,30.5 L-2.66453526e-15,44.5 L78.9,44.5 L58.3,65.1 L68.2,75 L105,38.2 C105.381143,37.8111565 105.381143,37.1888435 105,36.8 Z"></path>
              </g>
          </g>
      </svg>
      </div>
  )
}
