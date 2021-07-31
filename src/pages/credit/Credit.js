import { useState, useEffect, useMemo } from 'react';
import MondrianArt from '../../components/MondrianArt';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import Wave2 from '../../components/shapes/Wave2';
import { motion } from "framer-motion";
import { content, largeUpMotion} from '../../components/AnimationSet';
import DelayLink from '../../ultils/DelayLink';
import GetRandomFromArray from '../../ultils/GetRandomFromArray';
import Arrow from '../../components/shapes/Arrow';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import GoToTop from '../../ultils/GoToTop';

function Credit(props) {
  const primaryColor = props.location.state ? props.location.state.bgTextColor[0]: 'green';
  const secondaryColor = props.location.state ? props.location.state.bgTextColor[1]: 'purple';
  const primaryTextColor = props.location.state ? props.location.state.bgTextColor[2]: 'var(--gray-dark)';
  const secondaryTextColor = props.location.state ? props.location.state.bgTextColor[3]: 'white';
  const thirdColor = props.location.state ? props.location.state.bgTextColor[4]: '';
  const thirdTextColor = props.location.state ? props.location.state.bgTextColor[5]: '';
  const [items,setItems]=useState([]);
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const [footer, setFooter] = useState(false);

console.log(props.location.state);

  useEffect(() => {
    document.body.classList = "";
    document.body.classList.add(`${primaryColor?primaryColor:'yellow'}-primary-color`);
    document.body.classList.add(`${secondaryColor?secondaryColor:'blue'}-secondary-color`);
  },[])

  useEffect(() => {
    setFooter(true);
  }, [])

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
  const setArray = [DonutSet(), IceCreamSet(), TwitchSet(), DefaultSet(), FruitSet(), FruitSet2()];
  const set = GetRandomFromArray(setArray)[0];

  const bgTextColorArray = [['orange', 'var(--gray-dark)'], ['red', 'white'], ['green', 'var(--gray-dark)'], ['purple', 'white'], ['pink', 'var(--gray-dark)'], ['blue', 'white'], ['yellow', 'var(--gray-dark)']]; // first element - bg, 2nd - text color
  const bgColorValue = useMemo(
    () => GetRandomFromArray(bgTextColorArray),
    []
  );


  return (
    <motion.div variants={content}
    animate="animate"
    initial="initial" id="outer-container">
      <Logo backArrow primaryColor={primaryTextColor} secondaryColor={secondaryTextColor} primaryTextColor={primaryTextColor} secondaryTextColor={secondaryTextColor} thirdColor={thirdColor} thirdTextColor={thirdTextColor} />
      {
        <HamburgerMenu color={secondaryTextColor} primaryColor={bgColorValue[0][0]} secondaryColor={bgColorValue[1][0]} primaryTextColor={bgColorValue[0][1]} secondaryTextColor={bgColorValue[1][1]} thirdColor={bgColorValue[2][0]} thirdTextColor={bgColorValue[2][1]} />
      }
      <div id="page-wrap" className={`w-screen min-h-screen bg-primary-secondary py-10`}>
        <motion.div variants={largeUpMotion} className="flex flex-row justify-center items-center ">
          <div className="absolute right-40 top-40 sm:hidden">
            <Wave2 size="150px" />
          </div>
          <div className="xl:w-8/12 lg:w-11/12 lg:mt-20 lg:p-10 sm:p-5 w-6/12 h-5/6 bg-white p-20 default-window mt-20">
            <div className="lg:w-full flex flex-row lg:flex-col">
              <div className={`lg:w-full w-3/12 bg-cover bg-center bg-no-repeat bg-${secondaryColor}`} style={{"backgroundImage": `url(/img/gradeA/5.svg)`, "backgroundSize": "120px auto", "height": "300px"}}></div>
              <div className="lg:w-full w-9/12 flex flex-col justify-center items-center">
                <div className="lg:w-full w-9/12 text-base text-purple p-5 text-purple">
                  <p><span className="block mb-3">Thanks to:</span>There are many open source resources online. Sperical thanks to the following great projects and tutorials I found online.</p>
                  <div className="flex flex-row mt-10 w-9/12 lg:w-full">
                    {
                      set.map((item, index) =><div className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
                    }
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
      {
        footer && <Footer primaryColor={bgColorValue[0][0]} secondaryColor={bgColorValue[1][0]} primaryTextColor={bgColorValue[0][1]} secondaryTextColor={bgColorValue[1][1]} thirdColor={thirdColor} thirdTextColor={thirdTextColor} />
      }

      <GoToTop />
    </motion.div>

  );
}

export default Credit;
