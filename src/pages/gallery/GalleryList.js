import React, { useContext, useState, useEffect, useMemo } from 'react';
import Footer from '../../components/Footer';
import GoToTop from '../../ultils/GoToTop';
import Logo from '../../components/Logo';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import { motion } from "framer-motion";
import TransitionPanels from '../../components/TransitionPanels';
import { pageTransitionEaseOut, pageTransition, pageTransition2, pageTransition3, pageTransitionShort, pageVariants } from '../../ultils/TransitionSet';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import { ColorSet2 } from '../../components/ColorSet';
import { HomeStore } from "../../Store";
import { fetchHomepageJsonAction } from "../../Actions";
import DelayLink from '../../ultils/DelayLink';
import List from './List';
import Marquee from '../../components/Marquee';
import Navigation from '../../components/Navigation';

function GalleryList(props) {

  const primaryColor = props.location.state ? props.location.state.bgColor[0]: 'green';
  const secondaryColor = props.location.state ? props.location.state.bgColor[1]: 'purple';
  const thirdColor = props.location.state ? props.location.state.bgColor[2]: 'yellow';
  const primaryTextColor = props.location.state ? props.location.state.textColor[0]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.textColor[1]: 'white';
  const thirdTextColor = props.location.state ? props.location.state.textColor[2]: 'var(--gray-dark)';
  const fourthColor = props.location.state ? props.location.state.bgColor[3]: 'pink';
  const fourthTextColor = props.location.state ? props.location.state.textColor[3]: 'var(--gray-dark)';
  const fifthColor = props.location.state ? props.location.state.bgColor[4]: 'orange';
  const fifthTextColor = props.location.state ? props.location.state.textColor[4]: 'var(--gray-dark)';
  const { state, homeDispatch } = useContext(HomeStore);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    state.data.length === 0 && fetchHomepageJsonAction(homeDispatch);
    setFooter(true);
  },[state.data]);

  const bgColorValue = useMemo(() => GetRandomFromArray(ColorSet2),[]);

  return (
    <div id="outer-container" className={`gallery ${primaryColor?primaryColor:'yellow'}-primary-color ${secondaryColor?secondaryColor:'blue'}-secondary-color`}>
      <TransitionPanels bgColorValue={bgColorValue}/>
      <Logo goBackHome={true} noShowColor={primaryColor} arrowColor={secondaryTextColor} bgColorValue={bgColorValue} />
      <div id="page-wrap" className={`w-screen min-h-screen flex justify-center report bg-primary-secondary pt-20`}>
        <div className="w-8/12 min-h-screen ml-20 xl:ml-0 flex flex-row flex-wrap gap-24 lg:gap-10 items-start pb-40 mt-40 lg:mt-10">
          <div className="w-5/12 lg:w-5/12 md:w-10/12 -mt-40">
            {
              state.data.map((item, i) => (
                <div className="mt-40">
                  {
                    i%2!==1 && <List i={i} item={item} categoryTitle={item.cat.split(" ")[0]} bgColorValue={bgColorValue} />
                  }
                </div>
              ))
            }

          </div>

          <div className="w-5/12 lg:w-5/12 md:w-10/12">
            {
              state.data.map((item, i) => (
                <div className="mt-40">
                  {
                    i%2!==0 && <List i={i} item={item} categoryTitle={item.cat.split(" ")[0]} bgColorValue={bgColorValue} />
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Marquee bgColor={fifthColor} />
        }
      </motion.div>
      <motion.div variants={pageVariants} transition={pageTransitionEaseOut} exit='down'>
        {
          footer && <Footer bgColor={fourthColor} textColor={fourthTextColor} bgColorValue={bgColorValue} />
        }
      </motion.div>
      <GoToTop />
      <Navigation bgColorValue={bgColorValue} />
    </div>
  )
}

export default GalleryList;
