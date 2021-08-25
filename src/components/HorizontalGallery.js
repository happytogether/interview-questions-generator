import React, { useState, useMemo } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import { useDrag } from 'react-use-gesture';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import { ColorSet } from './Sets/ColorSet';
import getRandomFromArray from '../ultils/GetRandomFromArray';

export default function HorizontalGallery(props) {
  const item = props.item;
  const colorSet = useMemo(()=>getRandomFromArray(ColorSet), []);
  const secondaryColor = props.secondaryColor;
  const randomNegativeValue = -260*item.horizontalGallery.length;
  const randomPositiveValue = 0;
  const [dir, setDir] = useState(-1);
  const { f, r } = useSpring({ f: dir===-1 ? 0 : 1, r: dir===-1 ? -3 : 3});
  const cards = useSprings(
    item.horizontalGallery.length,
    [...Array(item.horizontalGallery.length).keys()].map((i) => ({ opacity: 1, x: dir === 1 ? (i/item.horizontalGallery.length) *randomPositiveValue: (i/item.horizontalGallery.length) *randomNegativeValue, y: 0, z: 0 }))
  )
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    setDir(dir);
  })

  return (
  <animated.div {...bind()} style={{height: dir === -1 ? '400px': '600px'}} className={`h-gallery w-screen flex justify-center items-center pb-10 relative`}>
      <ScrollContainer className={`${dir===1 ? 'pl-20':'pl-20'} scroll-container py-5 flex flex-nowrap overflow-x-auto`} horizontal={true} hideScrollbars={false}>
        {

          cards.map(({ x, y, z, opacity, background }, index) => (
            <animated.li className={`p-5 whitespace-pre-wrap bg-${colorSet[index%6][0]} flex flex-col`}
              key={index} style={{
                opacity,
                background,
                color: colorSet[index%6][1],
                transform: interpolate(
                  [x, y, z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                  (x, y, z, f, r) => `translate3d(${x}px,${y}px,${z}px) rotateX(${f * r}deg)`
                )
              }}>
              <span className="border-b">{item.horizontalGallery[index].title}</span>
              <div className="flex flex-row mt-5 p-5" dangerouslySetInnerHTML={ {__html: item.horizontalGallery[index].answer} }></div>
            </animated.li>
          ))
        }
      </ScrollContainer>
      <div className="absolute -z-10 w-screen flex justify-center items-center" style={{height: '400px'}}>
        <span></span>
      </div>
    </animated.div>
  )
}
