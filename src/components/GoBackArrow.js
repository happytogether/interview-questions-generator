import DelayLink from '../ultils/DelayLink';
import Arrow from './shapes/Arrow';
import { isMobile } from "react-device-detect";
import { motion } from "framer-motion";
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../ultils/TransitionSet';

export default function GoBackArrow(props) {
  const color = props.color;
  const fillColor = props.fillColor;
  const bgColorValue = props.bgColorValue;
  const noShowColor = props.noShowColor;
  const primaryColor = bgColorValue[0][0];
  const primaryTextColor = bgColorValue[0][1];
  const secondaryColor = bgColorValue[1][0];
  const secondaryTextColor = bgColorValue[1][1];
  const thirdColor = bgColorValue[2][0];
  const thirdTextColor = bgColorValue[2][1];
  const fourthColor = bgColorValue[3][0];
  const fourthTextColor = bgColorValue[3][1];
  const fifthColor = bgColorValue[4][0];
  const fifthTextColor = bgColorValue[4][1];
  const sixthColor = bgColorValue[5][0];
  const sixthTextColor = bgColorValue[5][1];
  const goBackHome = props.goBackHome;
  const footerInView = props.footerInView;
  return (
    <motion.div variants={pageVariants} initial='initial' transition={{ duration: 2, type: "tween", ease: "anticipate" }} exit='down' animate="in" layout className={`fixed go-back-arrow right-20 top-0 z-10 lg:hidden z-9999`}>
     <DelayLink to={{
       pathname: `${goBackHome? '/': './'}`,
       state: {
         bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
         textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
       }}}>
       <div className="flex flex-col items-center justify-center text-sm">
         <Arrow size={isMobile?'2rem': '4rem'} rotate="180deg" color={color} noShowColor={noShowColor} fillColor={fillColor} />
         <span style={{color: primaryTextColor}}>Go Back</span>
       </div>
     </DelayLink>
    </motion.div>
  )
}
