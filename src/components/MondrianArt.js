import React, { useEffect, useRef } from "react";
import Reward from './Reward/Reward.js';
import { DonutSet, IceCreamSet, DefaultSet, FruitSet } from "./Reward/MemphisSets";
import Radium, { StyleRoot } from 'radium';

function MondrianArt(props) {
  const items = props.items;
  const colorMap = {
    0: "var(--pink)",
    1: "var(--purple)",
    2: "var(--green)",
    3: "var(--yellow)"
  };
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
        key={`blocks-${i}`}
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
        <div className="z-0 credit-logo" style={{"backgroundImage": `url(${item.imgSrc})`}}></div>
        <div className="relative z-10">
          <a href={`${item.link}`}>{item.title}</a>
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
