import { useMemo } from 'react';
import getRandomFromArray from '../ultils/GetRandomFromArray';
import SegmentsAnimation from './SegmentsAnimation';
import { BgColorSet, MarqueeColorSet } from './ColorSet';

export default function Marquee(props) {
  const bgColor = props.bgColor;
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
    <div className={`marquee-container py-5 ${bgColor} text-${textColor} relative text-3xl md:text-2xl font-bold overflow-hidden`}>
      <div className="marquee">
        <span>
          <SegmentsAnimation logoColorSet={marqueeColorSet} segment={9} type="colorBgText" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
            Interview
          </SegmentsAnimation>
        </span>
        <span className="px-10">
          <SegmentsAnimation logoColorSet={marqueeColorSet} segment={4} type="colorBgText" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
            Anni
          </SegmentsAnimation>
        </span>
        <span>
          <SegmentsAnimation logoColorSet={marqueeColorSet} segment={9} type="colorBgText" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
            Interview
          </SegmentsAnimation>
        </span>
        <span className="px-10">
          <SegmentsAnimation logoColorSet={marqueeColorSet} segment={4} type="colorBgText" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
            Anni
          </SegmentsAnimation>
        </span>
      </div>
      <div className="marquee">
        <span>
          <SegmentsAnimation logoColorSet={marqueeColorSet} segment={9} type="colorBgText" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
            Interview
          </SegmentsAnimation>
        </span>
        <span className="px-10">
          <SegmentsAnimation logoColorSet={marqueeColorSet} segment={4} type="colorBgText" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
            Anni
          </SegmentsAnimation>
        </span>
        <span>
          <SegmentsAnimation logoColorSet={marqueeColorSet} segment={9} type="colorBgText" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
            Interview
          </SegmentsAnimation>
        </span>
        <span className="px-10">
          <SegmentsAnimation logoColorSet={marqueeColorSet} segment={4} type="colorBgText" x={-15} y={0} zIntervalFrom={-20} zIntervalTo={200} delay={50} noShowColor={bgColor}>
            Anni
          </SegmentsAnimation>
        </span>
      </div>
    </div>
  )
}
