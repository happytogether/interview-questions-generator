export default function Window(props) {
  const title = props.questionTitle;
  const answer = props.questionAnswer;
  let num = props.questionNumber;
  // change question number to start from 1
  num++;
  num = num < 10 ? num = "0" + num: num;

  const colorPalette =["bg-green", "bg-pink", "bg-purple text-white", "bg-yellow"]

  const styles = {
    border: "2px solid darkgray",
    width: "500px",
    height: "400px",
    position: "absolute",
    top: "30%",
    boxShadow: "white 1px 1px, white 2px 2px, white 3px 3px, white 4px 4px, white 5px 5px, white 6px 6px, white 7px 7px, white 8px 8px, white 9px 9px, white 10px 10px, white 11px 11px, white 12px 12px",
    zIndex: 9
  }
  return (
    <div className={`px-4 flex flex-col ${colorPalette[Math.floor( Math.random() * 4)]}`} style={styles}>
      <div className="flex flex-row space-x-1 items-center" style={{width: "100%", height: "10%", borderBottom: "3px solid white"}}>
        <div className="w-4 h-4 rounded-full bg-red"></div>
        <div className="w-4 h-4 rounded-full bg-pink-dark"></div>
        <div className="w-4 h-4 rounded-full bg-gray-darkest"></div>
      </div>

        <div className="py-2 px-10 overflow-hidden" style={{width: "100%", height: "90%"}}>
          <h2><span className="text-5xl">{num}</span>. {title}</h2>
          <button className="border rounded-sm my-10 py-3 px-6">Answer</button>
          <button className="border rounded-sm my-10 py-3 px-6">Answer</button>
          <h3>{answer}</h3>
        </div>
    </div>
  )
}
