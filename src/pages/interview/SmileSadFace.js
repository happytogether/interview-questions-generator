import React, { useContext } from 'react';
import Smile from '../../components/shapes/Smile';
import Sad from '../../components/shapes/Sad';
import { PageTransitionColorsStore } from '../../Store';

export default function SmileSadFace(props) {
  const questions = props.questions;
  const rightAnswerNum = props.rightAnswerNum;
  const wrongAnswerNum = props.wrongAnswerNum;
  const { pageTransitionColorsState, pageTransitionColorsDispatch} = useContext(PageTransitionColorsStore);
  const primaryTextColor = pageTransitionColorsState.data[0][1];
  return (
    <div className="flex flex-rols">
      <div>
        {
          questions&&questions.map((item, i) => (
            i < rightAnswerNum ? <Smile size="30px" color={primaryTextColor} opacity="1" key={i} />: <Smile size="30px" color={primaryTextColor} opacity=".5" key={i} />
          ))
        }
      </div>
      <div>
        {
          questions&&questions.map((item, i) => (
            i < wrongAnswerNum ? <Sad size="30px" color={primaryTextColor} opacity="1" key={i} />: <Sad size="30px" color={primaryTextColor} opacity=".5" key={i} />
          ))
        }
      </div>
    </div>

  )
}
