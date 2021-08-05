import React, { useContext, useState, useEffect, useMemo } from 'react';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "../../components/Reward/MemphisSets";
import './Gallery.scss';
import Fullpage  from './Fullpage';
import Highlight from 'react-highlight'
import './Highlight.scss';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet } from '../../components/ColorSet';

function Gallery(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'green';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'purple';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: '';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'white';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: '';

  const bgColor = props.location.state.bgColor;
  const textColor = props.location.state.textColor;
  const index= parseInt(useParams().categoryIndex);

  useEffect(() => {
    document.body.classList = "";
    document.body.classList.add('gallery-page');
  },[]);

  const [items,setItems]=useState([]);
  const [jsonLoaded, setJsonLoaded] = useState(false);

  const getItems=(file)=>{
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
        setItems(myJson);
        setJsonLoaded(true);
      });
  }
  // get json file
  useEffect(()=>{
    getItems('/questions/'+index+'.json')
  },[])

  const setArray = [DonutSet(), IceCreamSet(), TwitchSet(), DefaultSet(), FruitSet(), FruitSet2(), BallonSet()];
  const set = setArray[Math.floor(Math.random()*setArray.length)];
  const randomIndex = Math.floor(Math.random()*set.length) +2;

  function groupJson() {
    let groupSize = 5;
    let rows = [];
    return rows = items.map(function(item, index) {
        // map content to html elements
        return (
          <div className={`${(index)%groupSize === activeList?'active':''} list my-5 leading-tight lg:flex-col px-10`}>
            <div onClick={()=>handleActiveList([index, index%groupSize])}>
              <span className={`text-lg ${(index)%groupSize === activeList[1]?'':''}`}>0{index+1}.</span>
              <span className={`pr-10 border-b text ${(index)%groupSize === activeList[1]?'bg-green text-5xl lg:text-3xl':'text-base'}`}>{item.title}</span>
            </div>
          </div>
        )
    }).reduce(function(r, element, index) {
        // create element groups with size 3, result looks like:
        // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
        index % groupSize === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
    }, []).map(function(rowContent, i) {
        // surround every group with 'row'
        return (
          <div key={i} className={`section flex flex-row align-stretch h-screen w-screen`}>
            <div className={`list-left w-3/5 relative bg-${props.location.state.bgColor[i]} lg:w-full flex flex-col justify-center p-20 pr-40`}>{rowContent}</div>
            <div className={`list-right relative w-2/5 bg-${props.location.state.bgColor[i===0?1:i+2]} lg:w-full flex flex-col justify-center items-center p-20`}>
              <Highlight innerHTML={true}>{items[activeList[0]].answer}</Highlight>
              <Highlight language="javascript">
                {items[activeList[0]].example}
              </Highlight>
              <Highlight language="">
                {items[activeList[0]].error}
              </Highlight>
            </div>
          </div>);
    });
  }
  const [animating, setAnimating] = useState(false);

  function resetActiveList() {
    setActiveList([0,0]);
  }

  function handlePageChange() {
    console.log('finished', animating);
    //setAnimating(false);
    //setActiveList(false);
  }
  const [activeList, setActiveList] = useState([0,0]); // list 2

  function handleActiveList([i1, i2]) {
    setActiveList([i1, i2]);
  }
  const [showFooter, setShowFooter] = useState(false);
  function handleFooter(){
    //setShowFooter(true);
  }

  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );

  return (
    <div id="outer-container" className={`gallery ${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo logoTextColor={primaryTextColor} arrowColor={secondaryTextColor} />
      <HamburgerMenu barColor={secondaryTextColor} panelBgColor={thirdColor} panelTextColor={thirdTextColor} crossColor={thirdTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className={`${animating?'animating': ''} bg-primary-secondary h-screen question-set text-graydark`}>
        {
            jsonLoaded && <Fullpage data={groupJson()} resetActiveList={resetActiveList} />
        }
      </div>
      {showFooter && <Footer />}
  </div>
  );
}

export default Gallery;
