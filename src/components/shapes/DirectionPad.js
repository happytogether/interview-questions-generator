
export default function DirectionPad(props) {
  return (
    <div className="tetris-container" style={{width: "70px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
      <div className="bg-transparent border-none"></div>
      <div className="bg-yellow-500 border border-b-0 border-solid border-gray-900"></div>
      <div className="bg-transparent border-none"></div>
      <div className="bg-red-500 border border-r-0 border-solid border-gray-900"></div>
      <div className="bg-green-500 border-none"></div>
      <div className="bg-blue-500 border border-l-0 border-solid border-gray-900"></div>
      <div className="bg-transparent border-none"></div>
      <div className="bg-yellow-500 border border-t-0 border-solid border-gray-900"></div>
      <div className="bg-transparent border-none"></div>
    </div>
  )
}