import { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import MondrianArt from '../../components/MondrianArt';
import Footer from '../../components/Footer/Footer';
import Logo from '../../components/Logo';
import Sun from '../../components/shapes/Sun';
import { motion } from "framer-motion";
import { content, largeUpMotion} from '../../components/Sets/AnimationSet';
import DelayLink from '../../ultils/DelayLink';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import Arrow from '../../components/shapes/Arrow';
import { DonutSet, IceCreamSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import GoToTop from '../../ultils/GoToTop';
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';
import { BgColorSet, BgColorSetHome } from '../../components/Sets/ColorSet';
import SegmentsAnimation from '../../components/SegmentsAnimation';
import { isMobile } from "react-device-detect";
import Marquee from '../../components/Marquee';
import Navigation from '../../components/Navigation';
import Menu from '../../components/Menu';
import Moon from '../../components/shapes/Moon';
import Rect from '../../components/shapes/Rect';

function Credit(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'bg-blue';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'bg-yellow';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'bg-yellow';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'bg-purple';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'bg-red';
  const sixthColor = props.location.state ? props.location.state.bgColor[5]: 'bg-blue';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'white';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'var(--gray-dark)';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'white';
  const sixthTextColor = props.location.state ? props.location.state.textColor[5]: 'white';
  const [items,setItems]=useState([]);
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`${thirdColor}`);
    setFooter(true);
  },[])

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
    getItems('/credit/credit.json')
  },[])

  const setArray = [DefaultSet()];
  const set = useMemo(
    () => GetRandomFromArray(setArray)[0],[]);

  const bgColorValue = useMemo(
    () => GetRandomFromArray(BgColorSet),
    []
  );

  const logoColorSet = useMemo(
    () => GetRandomFromArray(BgColorSet.filter((color, index) => {
      return color[0]!== primaryColor;
  })),[]);

  const menuColorSet = useMemo(() => GetRandomFromArray(BgColorSet.filter((color, index) => {
    return color[0]!== secondaryColor;
  })),[])

  const [menuOpen, setMenuOpen] = useState(false);
  function handleClick() {
    setMenuOpen(!menuOpen);
  }
  const heroText ="Credit";
  return (
    <motion.div variants={content}
    animate="animate"
    initial="initial" id="outer-container" className={`${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue} />
      <Logo goBackHome={true} arrowColor={secondaryTextColor} logoColorSet={logoColorSet} bgColorValue={bgColorValue} />
      <div id="page-wrap" className={`w-screen min-h-screen bg-primary-secondary py-10`}>
        <div style={{height: "34rem", color: primaryTextColor}} className={`relative m-10 mt-20 ${primaryColor} flex flex-col justify-center items-center`}>
          <span className="text-9xl lg:text-6xl sm:text-5xl inline-block" style={{transform: 'rotate(-8deg)'}}>
            {
              heroText.length!==0 && [...Array(heroText.length).keys()].map((text, index) => (
                <span className={`${BgColorSet[index%6][0]}`} style={{color: BgColorSet[index%6][1]}}>{heroText[index]}</span>
              ))
            }
            <br />Page
          </span>
          <span className="w-4/12 inline-block mt-20 pl-40">
            HTML, CSS, Javascript, Framework Questions and other Front End Questions are included.
          </span>
          <div className="absolute right-1/3 bottom-0 z-20">
            <Moon bgColor={thirdColor} />
            <Rect bgColor={fourthColor} />
          </div>
        </div>
        <motion.div variants={pageVariants} initial='initial' transition={pageTransition} exit='down' animate="in" className="flex flex-row justify-center items-center ">
          <motion.div variants={pageVariants} initial='initial' transition={pageTransition2} exit='down' animate="in" className="absolute z-20 right-40 top-40 sm:hidden">
            <Sun size="150px" noShowColor={secondaryColor} />
          </motion.div>
          <div className="xl:w-8/12 lg:w-11/12 lg:mt-20 lg:p-10 sm:p-5 w-6/12 h-5/6 bg-white p-20 default-window mt-20">
            <div className="lg:w-full flex flex-row lg:flex-col">
              <div className={`lg:w-full w-3/12 bg-cover bg-center bg-no-repeat ${secondaryColor}`} style={{"backgroundImage": `url(/img/gradeA/5.svg)`, "backgroundSize": "120px auto", "height": "300px"}}></div>
              <div className="lg:w-full w-9/12 flex flex-col justify-center items-center">
                <div className="lg:w-full w-9/12 text-base text-purple p-5 text-purple">
                  <p><span className="block mb-3">Thanks to:</span>There are many open source resources online. Sperical thanks to the following great projects and tutorials I found online.</p>
                  <div className="flex flex-row mt-10 w-9/12 lg:w-full">
                    <SegmentsAnimation segment={set.length} type="img" x={-20} y={-20} zIntervalFrom={-20} zIntervalTo={200} delay={50} bgColorValue={bgColorValue}>
                      {
                        set.map((item, index) =><div key={index} className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
                      }
                    </SegmentsAnimation>
                  </div>
                </div>
              </div>
            </div>
            {
                jsonLoaded && <MondrianArt items={items}/>
            }
          </div>
        </motion.div>
      </div>
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          jsonLoaded && <Marquee bgColor={fifthColor} bgColorValue={bgColorValue} />
        }
      </motion.div>
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
        }
      </motion.div>
      <GoToTop />
      <Navigation menuColorSet={menuColorSet} bgColorValue={bgColorValue} />
    </motion.div>

  );
}

export default Credit;
