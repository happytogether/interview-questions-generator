export default function Checkmark(props) {
  const checked = props.checked ? "checkmarked" : "checkmark";
  return (
    <div className={`m-7 ${checked}`}>

    </div>
  )
}
