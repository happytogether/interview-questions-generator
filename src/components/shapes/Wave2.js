import { useContext, useRef } from "react";
import Reward from '../Reward/Reward.js';
import { MouseContext } from "../../context/mouse-context";
import { DonutSet, IceCreamSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "../Reward/MemphisSets";

export default function Wave2(props) {
  const { cursorChangeHandler } = useContext(MouseContext);
  const size = props.size;
  const styles = {
    width: size,
    height: size
  }
  const canvasInput = useRef(null);
  function confetti(){
    canvasInput.current.rewardMe();
  }

  return (
    <div onClick={()=>confetti()} style={styles} onMouseEnter={() => cursorChangeHandler("hovered")}
  onMouseLeave={() => cursorChangeHandler("")}>
    <svg width="100px" height="100px" viewBox="0 0 295 295">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-3197.000000, -1326.000000)">
                <g transform="translate(131.595000, 311.547000)">
                    <g transform="translate(3065.575000, 1014.815000)">
                        <polygon fill="#F2F3ED" points="9.09494702e-13 294.588 294.59 294.588 294.59 2.27373675e-13 9.09494702e-13 2.27373675e-13"></polygon>
                        <polyline fill="#FE4F64" points="229.32 1.13686838e-13 150.53 1.13686838e-13 294.59 144.058 294.59 1.13686838e-13 229.32 1.13686838e-13"></polyline>
                        <polyline fill="#1E309B" points="4.54747351e-13 75.258 219.33 294.588 256.96 294.588 4.54747351e-13 37.631 4.54747351e-13 75.258"></polyline>
                        <polyline fill="#1E309B" points="9.09494702e-13 1.13686838e-13 294.59 294.588 294.59 256.958 37.63 1.13686838e-13 9.09494702e-13 1.13686838e-13"></polyline>
                        <polyline fill="#1E309B" points="75.27 3.41060513e-13 294.59 219.328 294.59 181.688 112.9 3.41060513e-13 75.27 3.41060513e-13"></polyline>
                        <polyline fill="#0062FF" points="4.54747351e-13 294.588 4.54747351e-13 112.888 181.7 294.588 4.54747351e-13 294.588"></polyline>
                    </g>
                </g>
            </g>
        </g>
    </svg>
    <Reward ref={canvasInput} type='emoji' config = {{"emoji": DefaultSet(),"elementCount": 5, "elementSize": 50}}></Reward>
  </div>
  )
}
