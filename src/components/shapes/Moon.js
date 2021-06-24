
export default function Moon(props) {
  const rotateDegree = (Math.floor( Math.random() * 12) * 30) + 'deg';
  const styles = {
    width: "100px",
    height: "100px",
    position: "absolute",
    bottom: "-15%",
    left: "15%",
    transform: `rotate(${rotateDegree })`,
    zIndex: 9
  }
  const randomDropShadow = ["drop-shadow-left-bottom", "drop-shadow-left-top",  "drop-shadow-right-top", "drop-shadow-right-bottom"];
  return (
    <div style={styles}>
      <svg className={`hover-rotate ${randomDropShadow[Math.floor(Math.random()*4)]}`} viewBox="0 0 42 39">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-553.000000, -175.000000)" fill="#605795">
                  <path d="M592.066,191.098 C589.641,193.151 586.013,192.849 583.961,190.425 C580.099,185.864 573.247,185.295 568.686,189.157 C564.126,193.018 563.556,199.87 567.419,204.431 C569.47,206.856 569.17,210.484 566.745,212.536 C564.321,214.589 560.693,214.288 558.64,211.863 C550.68,202.462 551.853,188.339 561.254,180.379 C570.655,172.419 584.779,173.592 592.739,182.993 C594.792,185.417 594.49,189.046 592.066,191.098" id="Fill-247"></path>
              </g>
          </g>
      </svg>
    </div>
  )
}
