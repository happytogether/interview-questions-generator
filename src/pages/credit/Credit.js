import { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import MondrianArt from '../../components/MondrianArt';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import Sun from '../../components/shapes/Sun';
import { motion } from "framer-motion";
import { content, largeUpMotion} from '../../components/AnimationSet';
import DelayLink from '../../ultils/DelayLink';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import Arrow from '../../components/shapes/Arrow';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import { DonutSet, IceCreamSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import GoToTop from '../../ultils/GoToTop';
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';
import { ColorSet } from '../../components/ColorSet';
import SegmentsAnimation from '../../components/SegmentsAnimation';
import { isMobile } from "react-device-detect";
import Marquee from '../../components/Marquee';
import Navigation from '../../components/Navigation';

function Credit(props) {
  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'green';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'purple';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'yellow';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'white';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'blue';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'white';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'orange';
  const fifthTextColor = props.location.state ? props.location.state.textColor[4]: 'var(--gray-dark)';
  const [items,setItems]=useState([]);
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
    document.body.classList.add(`bg-${thirdColor}`);
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
    () => GetRandomFromArray(ColorSet),
    []
  );

  window.addEventListener("hashchange", function(){
    //console.log('has changed');
  });

  return (
    <motion.div variants={content}
    animate="animate"
    initial="initial" id="outer-container" className={`${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo goBackHome={true} noShowColor={primaryColor} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className={`w-screen min-h-screen bg-primary-secondary py-10`}>
        <motion.div variants={pageVariants} initial='initial' transition={pageTransition} exit='down' animate="in" className="flex flex-row justify-center items-center ">
          <motion.div variants={pageVariants} initial='initial' transition={pageTransition2} exit='down' animate="in" className="absolute z-20 right-40 top-40 sm:hidden">
            <Sun size="150px" noShowColor={secondaryColor} />
          </motion.div>
          <div className="xl:w-8/12 lg:w-11/12 lg:mt-20 lg:p-10 sm:p-5 w-6/12 h-5/6 bg-white p-20 default-window mt-20">
            <div className="lg:w-full flex flex-row lg:flex-col">
              <div className={`lg:w-full w-3/12 bg-cover bg-center bg-no-repeat bg-${secondaryColor}`} style={{"backgroundImage": `url(/img/gradeA/5.svg)`, "backgroundSize": "120px auto", "height": "300px"}}></div>
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
          jsonLoaded && <Marquee bgColor={fifthColor} />
        }
      </motion.div>
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
        }
      </motion.div>
      <GoToTop />
      <Navigation bgColorValue={bgColorValue}/>
    </motion.div>

  );
}

export default Credit;
