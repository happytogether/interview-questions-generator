import HollowCircle from './HollowCircle';
import DirectionPad from './DirectionPad';
import Square from './Square';
import Moon from './Moon';
import StraightWave from './StraightWave';
import Triangle from './Triangle';
import GridSvg from './GridSvg';
import Sun from './Sun';
import Wave from './Wave';

export default function Tetris(props) {
  let shapeType = props.type;

  switch(props.type) {
    case 0:
      return shapeType = <HollowCircle />
    case 1:
      return shapeType = <DirectionPad />
    case 2:
      return shapeType = <Square />
    case 3:
      return shapeType = <Moon />
    case 4:
      return shapeType = <StraightWave />
    case 5:
      return shapeType = <Triangle />
    case 6:
      return shapeType = <GridSvg />
    case 7:
      return shapeType = <Sun />
    case 7:
      return shapeType = <Wave />
    default:
      return shapeType = <Moon />
  }

  return (
    <div>
      {shapeType}
    </div>
  )
}
