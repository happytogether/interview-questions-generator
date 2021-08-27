import { useMemo } from 'react';
import getRandomFromArray from '../ultils/GetRandomFromArray';
import SegmentsAnimation from './SegmentsAnimation';
import { BgColorSet, MarqueeColorSet } from './Sets/ColorSet';
import DelayLink from '../ultils/DelayLink';

export default function Marquee(props) {
  const bgColor = props.bgColor;
  const bgColorValue = props.bgColorValue;
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

  let textColor;
  switch (bgColor) {
    case "pink":
      textColor = 'blue';
      break;
    case "orange":
      textColor = 'purple';
      break;
    case "yellow":
      textColor = 'blue';
      break;
    case "blue":
      textColor = 'yellow';
      break;
    case "red":
      textColor = 'white';
      break;
    case "green":
      textColor = 'graydark';
      break;
    case "purple":
      textColor = 'white';
      break;
    default:
      textColor = 'blue';
  }

  const marqueeColorSet = useMemo(() => getRandomFromArray(BgColorSet.filter((color, index) => {
    return color[0]!== bgColor;
  })),[])

  return (
    <DelayLink to={{
      pathname: "/interview",
      state: {
        bgColor: [primaryColor, secondaryColor, thirdColor, fourthColor, fifthColor, sixthColor],
        textColor: [primaryTextColor, secondaryTextColor, thirdTextColor, fourthTextColor, fifthTextColor, sixthTextColor]
      }}}>
      <div className={`marquee-container py-10 ${bgColor} text-${textColor} relative text-3xl md:text-2xl font-bold overflow-hidden`}>
        <div className="marquee">
          <span>
            <SegmentsAnimation logoColorSet={marqueeColorSet} segment={9} type="text" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
              Interview
            </SegmentsAnimation>
          </span>
          <span className="px-10">
            <SegmentsAnimation logoColorSet={marqueeColorSet} segment={4} type="text" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
              Anni
            </SegmentsAnimation>
          </span>
          <span>
            <SegmentsAnimation logoColorSet={marqueeColorSet} segment={9} type="text" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
              Interview
            </SegmentsAnimation>
          </span>
          <span className="px-10">
            <SegmentsAnimation logoColorSet={marqueeColorSet} segment={4} type="text" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
              Anni
            </SegmentsAnimation>
          </span>
        </div>
        <div className="marquee">
          <span>
            <SegmentsAnimation logoColorSet={marqueeColorSet} segment={9} type="text" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
              Interview
            </SegmentsAnimation>
          </span>
          <span className="px-10">
            <SegmentsAnimation logoColorSet={marqueeColorSet} segment={4} type="text" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
              Anni
            </SegmentsAnimation>
          </span>
          <span>
            <SegmentsAnimation logoColorSet={marqueeColorSet} segment={9} type="text" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
              Interview
            </SegmentsAnimation>
          </span>
          <span className="px-10">
            <SegmentsAnimation logoColorSet={marqueeColorSet} segment={4} type="text" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
              Anni
            </SegmentsAnimation>
          </span>
        </div>
      </div>
    </DelayLink>

  )
}
