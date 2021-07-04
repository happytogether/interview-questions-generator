import ClickSoundLink from './ClickSoundLink';

export default function Logo(props) {
  const color = props.color;
  const bg = props.bg;
  const styles = {
    color: color,
    background: props.bg
  }
  return (
    <div style={styles} className="text-base p-2 m-4 z-30 logo flex absolute items-center justify-center">
      <ClickSoundLink text="/// Logo ///" link="/"/>
    </div>
  )
}
