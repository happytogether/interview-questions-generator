import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import SegmentsAnimation from './SegmentsAnimation';
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../ultils/TransitionSet';
import Menu from './Menu';

export default function Navigation(props) {
  const bgColorValue = props.bgColorValue;
  const [ menuOpen, setMenuOpen ] = useState(false);
  const noShowColor = props.noShowColor;
  const menuColorSet = props.menuColorSet;

  function handleClick(value) {
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
        <div onClick={()=>handleClick(!menuOpen)} className="fixed right-5 top-5 z-30">
          <div style={{width: '3.5rem', height: '25px'}} className="flex flex-col">
            {
              <Menu bar={6} gap="gap-1" menuColorSet={menuColorSet} barHeight={3} menuOpen={menuOpen} />
            }
          </div>
        </div>
      }
      <AnimatePresence>
        {

          menuOpen && <div className="w-screen h-screen fixed flex flex-row left-0 top-0 z-20">
            <SegmentsAnimation segment={10} menuColorSet={menuColorSet} type="fullscreen-bar" noShowColor={noShowColor} x={-20} y={-20} zIntervalFrom={-20} zIntervalTo={-20} delay={50} bgColorValue={bgColorValue}></SegmentsAnimation>
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
          </div>
        }
      </AnimatePresence>
    </>
  )
}
