import { useContext, useState } from "react";
import DotRing from "../DotRing/DotRing";
import { MouseContext } from "../../context/mouse-context";

export default function Sun(props) {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const styles = {
    width: "70px",
    height: "70px",
    position: "absolute",
    top: "15%",
    right: "15%"
  }
  const randomDropShadow = ["drop-shadow-left-bottom", "drop-shadow-left-top",  "drop-shadow-right-top", "drop-shadow-right-bottom"];

  return (
    <div style={styles} onMouseEnter={() => cursorChangeHandler("hovered")}
  onMouseLeave={() => cursorChangeHandler("")}>
      <svg className={`${randomDropShadow[Math.floor(Math.random()*4)]}`} viewBox="0 0 36 36">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-297.000000, -146.000000)">
                <g transform="translate(297.199000, 146.184000)">
                    <path d="M17.717,10.287 C18.073,10.287 18.422,10.321 18.766,10.37 L18.766,0 L16.668,0 L16.668,10.37 C17.011,10.321 17.359,10.287 17.717,10.287" id="Fill-342" fill="#605795"></path>
                    <path d="M13.263,11.78 L5.931,4.448 L4.447,5.931 L11.78,13.263 C12.202,12.701 12.701,12.202 13.263,11.78" id="Fill-343" fill="#605795"></path>
                    <path d="M23.653,13.263 L30.985,5.931 L29.502,4.448 L22.17,11.78 C22.731,12.202 23.23,12.701 23.653,13.263" id="Fill-344" fill="#605795"></path>
                    <path d="M25.063,16.668 C25.112,17.012 25.145,17.36 25.145,17.717 C25.145,18.074 25.112,18.422 25.063,18.765 L35.433,18.765 L35.433,16.668 L25.063,16.668" id="Fill-345" fill="#605795"></path>
                    <path d="M10.287,17.717 C10.287,17.36 10.321,17.012 10.369,16.668 L5.68434189e-14,16.668 L5.68434189e-14,18.765 L10.369,18.765 C10.321,18.422 10.287,18.074 10.287,17.717" id="Fill-346" fill="#605795"></path>
                    <path d="M22.17,23.653 L29.502,30.986 L30.985,29.502 L23.653,22.17 C23.23,22.732 22.731,23.231 22.17,23.653" id="Fill-347" fill="#605795"></path>
                    <path d="M11.78,22.17 L4.447,29.502 L5.931,30.986 L13.263,23.653 C12.701,23.231 12.202,22.732 11.78,22.17" id="Fill-348" fill="#605795"></path>
                    <path d="M17.717,25.146 C17.359,25.146 17.011,25.112 16.668,25.063 L16.668,35.433 L18.766,35.433 L18.766,25.063 C18.422,25.112 18.073,25.146 17.717,25.146" id="Fill-349" fill="#605795"></path>
                    <path d="M22.17,17.717 C22.17,20.176 20.176,22.17 17.717,22.17 C15.257,22.17 13.263,20.176 13.263,17.717 C13.263,15.257 15.257,13.263 17.717,13.263 C20.176,13.263 22.17,15.257 22.17,17.717" id="Fill-350" fill="#E98C8F"></path>
                </g>
            </g>
        </g>
      </svg>
    </div>
  )
}
