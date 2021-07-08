import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

class MondrianArt extends PureComponent {
  constructor(props) {
    super(props);
  }

  colorMap = {
    0: "var(--purple)",
    1: "var(--red)",
    2: "var(--green)",
    3: "var(--yellow)",
    4: "var(--orange)"
  };
  generateBlocks = (items) => {
    return items && items.map((item, i) => (
      <div
        key={`blocks-${i}`}
        className={`text-black leading-4 p-4 flex justify-center flex-col items-center credit-block-${i}`}
        style={{
          animation: "scaleIn 0.25s ease 0s",
          animationDelay: `${i * 0.15}s`,
          transform: "scale(0)",
          animationFillMode: "forwards",
          gridColumn: `span ${Math.floor(Math.random() * 3 + 1)}`,
          gridRow: `span ${Math.floor(Math.random() * 3 + 1)}`,
          backgroundColor: this.colorMap[Math.floor(Math.random() * 5)]
        }}
      >
      <div className="z-0 credit-logo" style={{"background-image": `url(${item.imgSrc})`}}></div>
      <div className="relative z-10">
        <a href={`${item.link}`}>{item.title}</a>
      </div>
      </div>
    ));
  };
  render() {
    const { items } = this.props
    console.log('123' + items);
    return (
      <div>
        <div className="MondrianArt p-20 md:p-0"
          style={{
            background: "#070908",
            display: "grid",
            gridAutoColumns: "150px",
            gridAutoRows: "150px",
            gridAutoFlow: "dense",
            gridGap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gridTemplateRows: "repeat(auto-fit, minmax(200px, 1fr))",
            overflow: "hidden",
            width: "100vw",
            height: "auto"
          }}
        >
          {this.generateBlocks(items.credit)}
        </div>
      </div>
    );
  }
}
export default MondrianArt;
