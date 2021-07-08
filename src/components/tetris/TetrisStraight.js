
export default function TetrisStraight(props) {
  return (
    <div className="tetris-container" style={{width: "50px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
      <div className="bg-red-500 border-1 border-solid border-gray-900"></div>
      <div className="bg-yellow-500 border-1 border-solid border-gray-900"></div>
      <div className="bg-blue-500 border-1 border-solid border-gray-900"></div>
      <div className="bg-transparent border-none"></div>
      <div className="bg-transparent border-none"></div>
      <div className="bg-transparent border-none"></div>
    </div>
  )
}