
export default function GridSvg(props) {
  const styles = {
    width: "120px",
    height: "120px",
    position: "absolute",
    bottom: "15%",
    left: "20%",
    zIndex: 0
  }
  return (
    <div style={styles}>
      <svg viewBox="0 0 106 106">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-375.000000, -303.000000)" fill="var(--orange)">
                <g transform="translate(375.383000, 303.234000)">
                    <polygon points="0 88.265 105.319 88.265 105.319 87.265 0 87.265"></polygon>
                    <polygon points="0 70.712 105.319 70.712 105.319 69.712 0 69.712"></polygon>
                    <polygon points="0 53.159 105.319 53.159 105.319 52.159 0 52.159"></polygon>
                    <polygon points="0 35.606 105.319 35.606 105.319 34.606 0 34.606"></polygon>
                    <polygon points="0 18.052 105.319 18.052 105.319 17.052 0 17.052"></polygon>
                    <polygon points="87.265 105.318 88.265 105.318 88.265 0 87.265 0"></polygon>
                    <polygon points="69.712 105.318 70.712 105.318 70.712 0 69.712 0"></polygon>
                    <polygon points="52.16 105.318 53.16 105.318 53.16 0 52.16 0"></polygon>
                    <polygon points="34.606 105.318 35.606 105.318 35.606 0 34.606 0"></polygon>
                    <polygon points="17.053 105.318 18.053 105.318 18.053 0 17.053 0"></polygon>
                </g>
            </g>
        </g>
      </svg>
    </div>
  )
}
