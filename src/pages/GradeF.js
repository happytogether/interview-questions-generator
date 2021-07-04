import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";
import {GradeFSet} from './GradeFSet';
const imgSrc = GradeFSet()[0];

export default function GradeA(props) {
  const gradePercentage = props.gradePercentage;

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-rows items-center">
        <div className="text-8xl mx-4">
          {
            <span>{gradePercentage}</span>
          }
        </div>
        <div className="w-96 text-black white-bg">
          {
            <div>Oh no, Seems like you don't like Anni's answers that much.</div>
          }
        </div>
      </div>
      <img className="my-6" width="200px" src={imgSrc} />
      <ReactRain numDrops="50" />
    </div>
  )
}
