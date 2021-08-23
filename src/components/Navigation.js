import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import SegmentsAnimation from './SegmentsAnimation';
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../ultils/TransitionSet';

export default function Navigation(props) {
  const bgColorValue = props.bgColorValue;
  const [ menuOpen, setMenuOpen ] = useState(false);
  const noShowColor = props.noShowColor;

  function handleClick(value) {
    console.log(value);
    setMenuOpen(value);
  }

  const [list, setList] = useState();
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const getList=(file)=>{
    fetch(file
    ,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setList(myJson);
        setJsonLoaded(true);
      });
  }
  // get json file
  useEffect(()=>{
    getList('/navigation.json')
  },[])

  const [filteredList, setFilteredList] = useState();

  useEffect(()=>{
    setFilteredList(list && list.length!==0 && list.filter((item, index) => {
      return item.inMenu;
    }))
  },[list])

  return (
    <>
      {
        !menuOpen && <div onClick={()=>handleClick(true)} className="fixed right-5 top-5">
          <div style={{width: '40px', height: '25px'}} className="flex flex-col">
            <SegmentsAnimation segment={8} barWidth={40} barHeight={3} type="menu-bar" gap={1} x={10} y={0} zIntervalFrom={-20} zIntervalTo={-20} delay={50} bgColorValue={bgColorValue} noShowColor={noShowColor}></SegmentsAnimation>
          </div>
        </div>
      }
      <AnimatePresence>
        {

          menuOpen && <div className="w-screen h-screen fixed flex flex-row left-0 top-0 z-20">
            <SegmentsAnimation segment={10} type="fullscreen-bar" noShowColor={noShowColor} x={-20} y={-20} zIntervalFrom={-20} zIntervalTo={-20} delay={50} bgColorValue={bgColorValue}></SegmentsAnimation>
            <div className="absolute left-0 top-0 w-screen h-screen flex flex-row">
              <div className="w-3/5 lg:w-full h-full z-20 text-white flex justify-center">
                <ul className="flex flex-col h-full w-full xl:w-full text-left text-2xl">
                  {
                    jsonLoaded && <SegmentsAnimation segment={filteredList.length} data={filteredList} type="fullscreen-h-bar" x={-20} y={-20} zIntervalFrom={-20} zIntervalTo={-20} delay={50} bgColorValue={bgColorValue}></SegmentsAnimation>
                  }
                </ul>
              </div>
              <div className="w-2/5 flex justify-center items-center lg:hidden">
                <motion.div variants={pageVariants} initial='initial' transition={{ duration: .3, type: "tween", ease: "anticipate"}} exit='down' animate="in" className="default-window line-bg tall-rect flex justify-center items-center">
                  <span className="w-24 h-24 box-bg block"><img width="100%" src="/img/profile.jpeg" /></span>
                </motion.div>
              </div>
            </div>
            <div className="fixed right-40 top-20 text-white z-20" onClick={()=>handleClick(false)}>
              <div style={{width: '80px', height: '5px'}} className="absolute bg-green transform rotate-45 origin-center"></div>
              <div style={{width: '80px', height: '5px'}} className="absolute bg-purple transform -rotate-45 origin-center"></div>
            </div>
          </div>
        }
      </AnimatePresence>
    </>
  )
}
