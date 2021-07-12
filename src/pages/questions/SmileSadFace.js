import Smile from '../../components/shapes/Smile';
import Sad from '../../components/shapes/Sad';

export default function SmileSadFace(props) {
  const questions = props.questions;
  const rightAnswerNum = props.rightAnswerNum;
  const wrongAnswerNum = props.wrongAnswerNum;
  return (
    <div className="flex flex-rols">
      <div>
        {
          questions&&questions.map((item, i) => (
            i < rightAnswerNum ? <Smile size="30px" color="#fff" opacity="1" key={i} />: <Smile size="30px" color="#fff" opacity=".5" key={i} />
          ))
        }
      </div>
      <div>
        {
          questions&&questions.map((item, i) => (
            i < wrongAnswerNum ? <Sad size="30px" color="#fff" opacity="1" key={i} />: <Sad size="30px" color="#fff" opacity=".5" key={i} />
          ))
        }
      </div>
    </div>

  )
}
