import "./Report.scss";
import Smile from "./components/shapes/Smile";
import Sad from "./components/shapes/Sad";

function Report() {
  return (
    <div className={`report py-4`} style={{"background": "black"}}>
      <iframe src="https://react-calendso-interview-production.up.railway.app/anni/30mins" frameborder="0" allowfullscreen></iframe>
    </div>

  );
}

export default Report;
