import DelayLink from '../ultils/DelayLink';
import SegmentsAnimation from '../components/SegmentsAnimation';

export default function DelayLinkButton(props) {
  const index = props.index;
  const bgColorValue = props.bgColorValue;
  const linkText = props.linkText;
  const pathname = props.pathname;
  return (
    <button className="delay-link-btn text-left border rounded-sm">
      <DelayLink to={{
        pathname: pathname,
        state: {
          bgColor: [bgColorValue[0][0], bgColorValue[1][0], bgColorValue[2][0], bgColorValue[3][0], bgColorValue[4][0], bgColorValue[5][0]],
          textColor: [bgColorValue[0][1], bgColorValue[1][1], bgColorValue[2][1], bgColorValue[3][1], bgColorValue[4][1], bgColorValue[5][1]],
        }
      }}>
        <SegmentsAnimation segment={linkText.length} type="text" x={0} y={0} zIntervalFrom={-20} zIntervalTo={20} delay={50}>{linkText}</SegmentsAnimation>
      </DelayLink>
    </button>
  )
}
