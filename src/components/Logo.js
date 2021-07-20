import DelayLink from '../ultils/DelayLink';

export default function Logo(props) {
  const color = props.color;
  const styles = {
    color: color,
    background: props.bg
  }
  return (
    <div style={styles} className="text-base p-2 m-4 z-30 logo flex absolute items-center justify-center">
      <DelayLink delay="600" to="/">
        <span className="sm:hidden">/// Anni Wang ///</span>
      </DelayLink>
    </div>
  )
}
