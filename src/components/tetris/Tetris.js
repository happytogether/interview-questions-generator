import TetrisT from './TetrisT';
import TetrisSquare from './TetrisSquare';
import TetrisSkew from './TetrisSkew';
import TetrisStraight from './TetrisStraight';
import TetrisL from './TetrisL';
import './Tetris.css';


export default function Tetris(props) {
  const size = props.size;
  let tetrisType;
  switch(props.type) {
    case 0:
      return tetrisType = <TetrisT />
    case 1:
      return tetrisType = <TetrisSquare />
    case 2:
      return tetrisType = <TetrisL />
    case 3:
      return tetrisType = <TetrisSkew />
    case 4:
      return tetrisType = <TetrisStraight />
    default:
      return tetrisType = <TetrisSkew />
  }

  return (
    <div>
      {tetrisType}
    </div>
  )
}
