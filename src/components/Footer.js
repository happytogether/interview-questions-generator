import ClickSoundLink from './ClickSoundLink';

export default function Footer() {
  return (
    <footer>
      <ul className="relative" style={{"width": "200px", "margin": "0 auto", "top": "-80px"}}>
        <li className="my-2">
          <ClickSoundLink text="Quick Video Chat" link="./report" />
        </li>
        <li className="my-2">
          <ClickSoundLink text="Github" link="https://github.com/happytogether" />
        </li>
        <li className="my-2">
          <ClickSoundLink text="About" link="./aboutme" />
        </li>
        <li className="my-2">
          <ClickSoundLink text="Credit" link="./credit" />
        </li>
      </ul>
    </footer>
  )
}
