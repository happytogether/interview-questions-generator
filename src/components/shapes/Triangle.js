
export default function Triangle(props) {
  const styles = {
    width: "200px",
    height: "200px",
    position: "absolute",
    top: "15%",
    left: "15%"
  }
  return (
    <div style={styles}>
      <svg viewBox="0 0 93 81">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-302.000000, -328.000000)">
                <g transform="translate(302.124000, 328.351000)">
                    <polyline id="Fill-300" fill="#F9C856" mask="url(#mask-2)" points="46.323 0 0 80.233 92.645 80.233 46.323 0"></polyline>
                </g>
            </g>
        </g>
      </svg>
    </div>
  )
}
