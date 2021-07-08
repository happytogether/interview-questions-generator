import ClickSoundLink from './ClickSoundLink';

export default function Footer() {
  return (
    <footer>
      <ul className="relative py-10" style={{"width": "200px", "margin": "0 auto"}}>
        <li className="my-2">
          <ClickSoundLink text="Quick Video Chat" link="./booking" />
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
        <li className="my-2">
          <ClickSoundLink text="Report" link="./report" />
        </li>
      </ul>
    </footer>
  )
}
