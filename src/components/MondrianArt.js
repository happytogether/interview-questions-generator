import React, { useEffect, useRef } from "react";
import Reward from './Reward/Reward.js';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, ThunderSet } from "./Reward/MemphisSets";
import Radium, { StyleRoot } from 'radium';

function MondrianArt(props) {
  const items = props.items;
  const colorMap = {
    0: "var(--pink)",
    1: "var(--purple)",
    2: "var(--green)",
    3: "var(--yellow)",
    4: "var(--orange)"
  };
  const setsArray = {
    0: DonutSet(),
    1: IceCreamSet(),
    2: TwitchSet(),
    3: DefaultSet(),
    4: FruitSet(),
    5: FruitSet2(),
    6: ThunderSet()
  }
  const setsSizeArray = {
    0: "100",
    1: "60",
    2: "180",
    3: "50",
    4: "100",
    5: "100",
    6: "100"
  }

  const itemsRef = useRef([]);

  useEffect(() => {
     itemsRef.current = itemsRef.current.slice(0, items.length);
  }, [items]);

  function confetti(i){
    //console.log(elRefs);
    itemsRef.current[i].rewardMe();
  }

  function generateBlocks(items) {
    return items && items.map((item, i) => (
      <div
        key={`blocks-${i}`} onClick={()=>confetti(i)}
        className={`relative text-black leading-4 p-4 flex justify-center flex-col items-center credit-block-${i}`}
        style={{
          gridColumn: `span ${Math.floor(Math.random() * 3 + 1)}`,
          gridRow: `span ${Math.floor(Math.random() * 3 + 1)}`,
          backgroundColor: colorMap[Math.floor(Math.random() * 5)],
          '@media (max-width: 640px)': {
            gridColumn: 'span 3',
            gridRow: 'span 1'
          },
        }}
      >
        <div className="z-0 credit-logo" style={{"background-image": `url(${item.imgSrc})`}}></div>
        <div className="relative z-10">
          <a href={`${item.link}`}>{item.title}</a>
        </div>
        <div className="absolute top-50 left-50">
          <Reward ref={el => itemsRef.current[i] = el} type='emoji' config = {{"emoji": setsArray[i%7], "elementCount": 7, "spread": 100, "decay": 0.91, "elementSize": setsSizeArray[i%7]}}></Reward>
        </div>
      </div>
    ));
  };

  return (
    <StyleRoot>
      <div>
          <div className="MondrianArt mt-10 lg:mt-0"
          style={{
            display: "grid",
            gridAutoColumns: "150px",
            gridAutoRows: "150px",
            gridAutoFlow: "dense",
            gridGap: "5px",
            gridTemplateColumns: "repeat(auto-fit, minmax(30%, 1fr))",
            gridTemplateRows: "repeat(auto-fit, minmax(200px, 1fr))",
            overflow: "hidden",
            width: "100%",
            height: "auto"
          }}
        >
          {generateBlocks(props.items.credit)}
        </div>
      </div>
    </StyleRoot>
  );

}
export default MondrianArt;
