import HollowCircle from './HollowCircle';
import DirectionPad from './DirectionPad';
import Square from './Square';
import Moon from './Moon';
import StraightWave from './StraightWave';
import Triangle from './memphis/Triangle';
import GridSvg from './GridSvg';
import Sun from './Sun';
import Sun2 from './Sun2';
import Sun3 from './Sun3';
import Wave from './Wave';

export default function Tetris(props) {
  let shapeType = props.type;

  switch(props.type) {
    case 0:
      return shapeType = <HollowCircle />
      break;
    case 1:
      return shapeType = <DirectionPad />
      break;
    case 2:
      return shapeType = <Square />
      break;
    case 3:
      return shapeType = <Sun3 size="50px" />
      break;
    case 4:
      return shapeType = <StraightWave />
      break;
    case 5:
      return shapeType = <Triangle size="50px" />
      break;
    case 6:
      return shapeType = <Sun size="50px" />
      break;
    case 7:
      return shapeType = <Sun2 size="50px" />
      break;
    case 8:
      return shapeType = <Wave />
      break;
    default:
      return shapeType = <Moon />
  }

  return (
    <div>
      {shapeType}
    </div>
  )
}
