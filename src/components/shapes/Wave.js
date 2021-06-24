
export default function Wave(props) {
  const styles = {
    width: "150px",
    height: "50px",
    background: "transparent",
    position: "absolute",
    top: "80%",
    left: (randomIntFromInterval(55, 70) + "%") // 50 -70%
  }

  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const randomDropShadow = ["drop-shadow-left-bottom", "drop-shadow-left-top",  "drop-shadow-right-top", "drop-shadow-right-bottom"];

  return (
    <div className="wave-hover" style={styles}>
      <svg className={`${randomDropShadow[Math.floor(Math.random()*4)]}`} viewBox="0 0 73 12">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-610.000000, -163.000000)" fill="#605795">
                <polyline id="Fill-234" transform="translate(646.410766, 169.190109) rotate(-270.000000) translate(-646.410766, -169.190109) " points="640.926266 143.963609 647.827266 132.819609 651.241266 134.932609 645.648266 143.963609 651.895266 154.053609 645.648266 164.142609 651.895266 174.231609 645.648266 184.320609 651.895266 194.412609 644.995266 205.560609 641.580266 203.446609 647.172266 194.412609 640.926266 184.320609 647.172266 174.231609 640.926266 164.142609 647.172266 154.053609 640.926266 143.963609"></polyline>
            </g>
        </g>
      </svg>
    </div>
  )
}
