import useSound from 'use-sound';
import clickSfx from './click.mp3';

export default function ClickSoundLink(props) {
  const [playClick] = useSound(clickSfx);
  const text = props.text;

  function handleRedirect() {
    playClick();
    setTimeout(() => {
      window.location.href = props.link
    }, 300)
  }

  return (
    <div className="link" onClick={handleRedirect}>
      {text}
    </div>
  )
}
