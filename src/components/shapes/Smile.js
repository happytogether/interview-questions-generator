export default function Smile(props) {
  const color = props.color;
  const size = props.size;
  const opacity = props.opacity === "1" ? "opacity-100": "opacity-30";

  const styles = {
    "width": size,
    "opacity": opacity
  }
  return (
    <div className={`m-2 ${opacity} hover:opacity-100`} style={styles}>
      <svg viewBox="0 0 400 400" fill={color}>
        <g>
          <g>
            <path d="M200,0C89.543,0,0,89.543,0,200s89.543,200,200,200s200-89.543,200-200S310.457,0,200,0z M200,384
              C98.38,384,16,301.62,16,200S98.38,16,200,16s184,82.38,184,184S301.62,384,200,384z"/>
          </g>
        </g>
        <g>
          <g>
            <path d="M302.971,245.553c-0.03-0.011-0.06-0.022-0.091-0.033c-4.136-1.554-8.749,0.538-10.303,4.674
              c-0.006,0.015-0.011,0.031-0.017,0.046C279.6,285.6,242.4,309.36,200,309.36c-42.4,0-80-24-92.64-59.12
              c-1.524-4.153-6.127-6.284-10.28-4.76s-6.284,6.127-4.76,10.28c15.36,41.6,58.56,69.6,107.68,69.6s92.32-27.92,107.68-69.52
              C309.22,251.699,307.112,247.093,302.971,245.553z"/>
          </g>
        </g>
        <g>
          <g>
            <path d="M118.48,106.24c-16.569,0-30,13.431-30,30s13.431,30,30,30s30-13.431,30-30S135.049,106.24,118.48,106.24z M118.48,150.24
              c-7.732,0-14-6.268-14-14c0-7.732,6.268-14,14-14c7.732,0,14,6.268,14,14C132.48,143.972,126.212,150.24,118.48,150.24z"/>
          </g>
        </g>
        <g>
          <g>
            <path d="M281.52,106.24c-16.569,0-30,13.431-30,30s13.431,30,30,30s30-13.431,30-30S298.089,106.24,281.52,106.24z M281.52,150.24
              c-7.732,0-14-6.268-14-14c0-7.732,6.268-14,14-14s14,6.268,14,14C295.52,143.972,289.252,150.24,281.52,150.24z"/>
          </g>
        </g>
      </svg>
    </div>
  )
}
