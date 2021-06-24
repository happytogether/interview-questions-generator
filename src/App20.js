import logo from './logo.svg';
import './App.css';
import { useSpring, animated, config } from 'react-spring';
import { useState, useEffect, useRef } from 'react';
import { useDrag } from 'react-use-gesture';
import DraggableSVG from './components/DraggableSVG';
import DynamicGrid from './components/DynamicGrid';


function LoopTrue() {
  const styles = useSpring({
    //loop: true,
    from: { x: Math.random() * 50, y: Math.random() *50 },
    to: { x: Math.random() * 50, y: Math.random() *50 },
  })

  return (
    <animated.div
      style={{
        ...styles,
      }}
    ><svg width="100%" height="100%" viewBox="0 0 338 267" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M338 120.853C338 206.224 319.341 267 233.783 267C148.225 267 0 206.224 0 120.853C0 35.481 69.3585 0 154.917 0C240.475 0 338 35.481 338 120.853Z" fill="#F5DE0A"/>
    </svg></animated.div>
  )
}

function P1() {
  return (
    <div></div>
  );
}

function P2() {
  return (
    <div></div>
  );
}

function P3() {
  return (
    <div></div>
  );
}

function Morph() {
  const [active, setActive] = useState(false);
  const { x } = useSpring({ config: { duration: 2800 }, x: active ? 1 : 0 });

  useEffect(() => {
    const id = setTimeout(() => {
      setActive(!active);
    }, 2800);

    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
      <svg
        viewBox="0 0 210 297"
        height="100%"
        width="100%"
        onClick={() => setActive(!active)}
      >
        <animated.path
          d={x.to({
            range: [0, 1],
            output: [
              "M92 211C36.526 218.143 15.1589 150.595 8 95.0001C0.841055 39.4049 -13.474 8.14334 42 0.999998C97.474 -6.14334 132.841 39.4049 140 95.0001C147.159 150.595 147.474 203.857 92 211Z",
              "M105.247 220.743C49.7734 227.886 8.72044 220.847 1.56149 165.252C-5.59745 109.657 21.4918 8.25549 76.9658 1.11215C132.44 -6.03119 161.299 36.0688 168.458 91.664C175.617 147.259 160.721 213.599 105.247 220.743Z",

            ],
          })}
          style={{
            fill: x.to({
              range: [0, 1],
              output: ["#0AF5D9", "#F5DE0A"],
            }),
          }}
        />
      </svg>
    )
}

function Morph2() {
  const [active, setActive] = useState(false);
  const { x } = useSpring({ config: { duration: 3800 }, x: active ? 1 : 0 });

  useEffect(() => {
    const id = setTimeout(() => {
      setActive(!active);
    }, 3800);

    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
      <svg
        width="100%" height="100%" viewBox="0 0 398 270"
        onClick={() => setActive(!active)}
      >
        <animated.path
          d={x.to({
            range: [0, 1],
            output: [
              "M338 120.853C338 206.224 319.341 267 233.783 267C148.225 267 0 206.224 0 120.853C0 35.481 69.3585 0 154.917 0C240.475 0 338 35.481 338 120.853Z",
              "M386 75C360 153 366 161 298 131C84.1075 36.6357 0 136.372 0 51C0 -34.3716 118.442 15 204 15C289.558 15 386 -10.3716 386 75Z",
            ],
          })}
          style={{
            fill: x.to({
              range: [0, 1],
              output: ["#F5DE0A", "#0AF5D9"],
            }),
          }}
        />
      </svg>
    )
}


function App() {
  const inputRef = useRef();
  const [{ x }, set] = useSpring(() => ({
    x: 0,
  }));
  const bind = useDrag(
    ({ movement: [x], velocity, down, direction: [dx], tap }) => {
      if (!down) {
        if (x > -100) {
          set({ x: 0 });
        } else if (x < -300) {
          set({ x: -400 });
        } else {
          set({ x: -200 });
        }
        return;
      }
      set({ x });
    },
    {
      initial: () => [x.get(), 0],
      bounds: { left: -400, right: 0, top: 0, bottom: 476 },
      rubberband: true,
    }
  );
  return (
    <div className="App">
      <div className="fixed w-screen h-screen" style={{zIndex: 0}}>
        {/*<svg width="100%" height="100%" viewBox="0 0 1295 693" preserveAspectRatio="none"
       xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path d="M150,350 L700 200 L750 400 L1200 100 L1000 600Z" fill="none" stroke="red" stroke-width="4" stroke-dasharray="10,10" />
          <path d="M20,30 L40,5 L60,30 L80,55 L100,30" fill="none" stroke="#fff" stroke-width="0.2" />
        </svg>*/}
      </div>
      <div style={{zIndex: 1}}>
        <svg ref={inputRef} width="171" height="224" viewBox="0 0 171 224" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M105.247 220.743C49.7734 227.886 8.72044 220.847 1.56149 165.252C-5.59745 109.657 21.4918 8.25549 76.9658 1.11215C132.44 -6.03119 161.299 36.0688 168.458 91.664C175.617 147.259 160.721 213.599 105.247 220.743Z" fill="#0AF5D9"/>
        </svg>
      </div>
      <div className="container" {...bind()}>
        <div className="title">
          <div className="title1">
            <animated.ul
              className="titleList"
              style={{
                y: x.to({
                  range: [-400, -200, 0],
                  output: [-60, -30, 0],
                }),
              }}
            >
              <li className="titleItem">Outstanding</li>
              <li className="titleItem">Extraordinary</li>
              <li className="titleItem">Superb</li>
            </animated.ul>
          </div>
          <div className="title2">2021</div>
          <div className="title3">Shanghai</div>
        </div>
        <svg className="blob" width="256" height="464" viewBox="0 0 256 464">
          <animated.path
            d={x.to({
              range: [-400, -200, 0],
              output: [
                "M 157.81292,131.16918 C 128.33979,127.45582 59.004493,121.76045 53.287478,168.06051 47.570462,214.36057 86.454799,213.14326 77.881699,234.66986 69.308599,256.19646 59.042495,268.13837 67.634107,288.98209 76.225718,309.82581 103.27857,320.05328 138.34249,312.55156 173.40641,305.04984 204.93111,298.87002 208.02612,279.75926 211.12113,260.6485 189.48716,257.88808 188.5557,229.54606 187.62424,201.20404 212.01456,174.45091 200.8528,155.7634 189.69104,137.07589 187.28605,134.88254 157.81292,131.16918 Z",
                "M 157.81292,131.16918 C 128.33979,127.45582 48.756902,138.1566 53.287478,168.06051 57.818054,197.96442 75.182448,197.77187 73.782662,224.42227 72.382877,251.07266 70.314846,257.89078 72.757903,278.7345 75.20096,299.57822 88.114636,303.32873 113.94876,307.60312 139.78288,311.87751 159.84171,314.24141 176.25858,295.13065 192.67546,276.01989 203.83379,256.86332 190.60522,228.5213 177.37665,200.17928 205.866,189.8223 211.10039,171.13479 216.33478,152.44728 187.28605,134.88254 157.81292,131.16918 Z",
                "M 157.81292,131.16918 C 128.33979,127.45582 86.672992,124.83473 71.733144,166.01099 56.793295,207.18725 69.033893,203.92043 80.955976,230.57083 92.87806,257.22123 55.968217,259.9403 59.436033,279.75926 62.90385,299.57822 94.985717,299.83924 132.0922,306.16316 169.19868,312.48708 186.48544,320.38997 198.80328,288.98209 211.12113,257.57422 199.73475,245.59097 195.72902,217.24895 191.72328,188.90693 209.96504,178.54995 215.19943,159.86244 220.43382,141.17493 187.28605,134.88254 157.81292,131.16918 Z",
              ],
            })}
            style={{
              fill: x.to({
                range: [-400, -200, 0],
                output: ["#fdeae7", "#d3eacf", "#eae7fd"],
              }),
            }}
          />
        </svg>
        <animated.div
          className="person person1"
          style={{ transform: x.to((x) => `rotate(${x / 10}deg)`) }}
        >
          <P1 />
        </animated.div>
        <animated.div
          className="person person2"
          style={{ transform: x.to((x) => `rotate(${x / 10 + 20}deg)`) }}
        >
          <P2 />
        </animated.div>
        <animated.div
          className="person person3"
          style={{ transform: x.to((x) => `rotate(${x / 10 + 40}deg)`) }}
        >
          <P3 />
        </animated.div>
        <div className="text">
          Stayed in Shanghai as a design technologist.
        </div>
        <div className="navDots">
          <animated.div
            className="navDot"
            style={{
              backgroundColor: x.to({
                range: [-400, -200, 0],
                output: ["#000", "#000", "#e0c5c0"],
              }),
              transform: x.to({
                range: [-400, -200, 0],
                output: ["scale(1)", "scale(1)", "scale(1.2)"],
              }),
            }}
          ></animated.div>
          <animated.div
            className="navDot"
            style={{
              backgroundColor: x.to({
                range: [-400, -200, 0],
                output: ["#000", "#e0c5c0", "#000"],
              }),
              transform: x.to({
                range: [-400, -200, 0],
                output: ["scale(1)", "scale(1.2)", "scale(1)"],
              }),
            }}
          ></animated.div>
          <animated.div
            className="navDot"
            style={{
              backgroundColor: x.to({
                range: [-400, -200, 0],
                output: ["#e0c5c0", "#000", "#000"],
              }),
              transform: x.to({
                range: [-400, -200, 0],
                output: ["scale(1.2)", "scale(1)", "scale(1)"],
              }),
            }}
          ></animated.div>
        </div>
      </div>
      <div>

        <animated.div
          style={{ transform: x.to((x) => `rotate(${x / 10}deg)`) }}>
          <Morph />
        </animated.div>

        <animated.div
          style={{ transform: x.to((x) => `rotate(${x / 10}deg)`) }}>
          <Morph2 />
        </animated.div>
      </div>
      <div>
        <svg width="100%" height="100%" viewBox="0 0 400 376" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M51.2498 315.178C-19.2368 225.955 -18.9765 131.668 70.3471 61.1023C159.671 -9.46323 294.054 -28.1213 364.54 61.1023C435.027 150.326 391.91 244.613 302.587 315.178C213.263 385.744 121.736 404.402 51.2498 315.178Z" fill="#F55F0A" fill-opacity="0.78"/>
        </svg>
          <div>
            <svg width="100%" height="100%" viewBox="0 0 400 376" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 350 q 150 -200 300 0" stroke="blue" stroke-width="5" fill="none" />
            </svg>
          </div>
        <DraggableSVG />
        <DynamicGrid />
      </div>
    </div>
  );
}

export default App;
