import { BgColorSet } from '../Sets/ColorSet';

export default function Arrow(props) {
  const size = props.size;
  const deg = props.rotate;
  const color = props.color;
  const noShowColor = props.noShowColor
  const colorSet = BgColorSet.filter((color, index) => {
    return color[0] !== noShowColor;
  })
  const fillColor = props.fillColor;
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
        <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1" gradientTransform="rotate(90 .5 .5)">
          <stop offset="0%" stop-color={`var(--${colorSet[0][0].substring(3)})`}></stop>
          <stop offset="15%" stop-color={`var(--${colorSet[0][0].substring(3)})`}></stop>
          <stop offset="15%" stop-color={`var(--${colorSet[1][0].substring(3)})`}></stop>
          <stop offset="30%" stop-color={`var(--${colorSet[1][0].substring(3)})`}></stop>
          <stop offset="30%" stop-color={`var(--${colorSet[2][0].substring(3)})`}></stop>
          <stop offset="45%" stop-color={`var(--${colorSet[2][0].substring(3)})`}></stop>
          <stop offset="45%" stop-color={`var(--${colorSet[3][0].substring(3)})`}></stop>
          <stop offset="60%" stop-color={`var(--${colorSet[3][0].substring(3)})`}></stop>
          <stop offset="60%" stop-color={`var(--${colorSet[4][0].substring(3)})`}></stop>
          <stop offset="75%" stop-color={`var(--${colorSet[4][0].substring(3)})`}></stop>
          <stop offset="75%" stop-color={`var(--${colorSet[5][0].substring(3)})`}></stop>
          <stop offset="90%" stop-color={`var(--${colorSet[5][0].substring(3)})`}></stop>
          <stop offset="90%" stop-color={`var(--${colorSet[0][0].substring(3)})`}></stop>
          <stop offset="100%" stop-color={`var(--${colorSet[0][0].substring(3)})`}></stop>
        </linearGradient>
        </defs>
        <g stroke="none" stroke-width=".5" fill="none" fill-rule="evenodd">
            <g transform="translate(0.450000, 0.700000)" fill="url(#g)" fill-rule="nonzero">
                <path style={strokeStyles} d="M105,36.8 L68.2,-2.66453526e-15 L58.3,9.9 L78.9,30.5 L-2.66453526e-15,30.5 L-2.66453526e-15,44.5 L78.9,44.5 L58.3,65.1 L68.2,75 L105,38.2 C105.381143,37.8111565 105.381143,37.1888435 105,36.8 Z"></path>
            </g>
        </g>
      </svg>
      </div>
  )
}
