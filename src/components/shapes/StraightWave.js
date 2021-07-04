
export default function StraightWave(props) {
  const styles = {
    width: "100px",
    height: "100px",
    position: "absolute",
    top: "15%",
    left: "15%"
  }
  return (
    <div style={styles}>
      <svg viewBox="0 0 78 12">
        <g stroke="none" strokeWidth="5" fill="none" fillRule="evenodd">
            <g transform="translate(-302.000000, -200.000000)" fill="#E98C8F">
                <polyline id="Fill-356" points="303.494 211.217 315.928 201.319 328.669 211.464 341.417 201.319 354.164 211.464 366.912 201.319 379.349 211.217 379.972 210.434 366.912 200.041 354.164 210.186 341.417 200.041 328.67 210.186 315.928 200.041 302.871 210.434 303.494 211.217"></polyline>
            </g>
        </g>
      </svg>
    </div>
  )
}
