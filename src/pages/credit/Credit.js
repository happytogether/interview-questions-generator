import { useState, useEffect } from 'react';
import MondrianArt from '../../components/MondrianArt';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import Wave2 from '../../components/shapes/Wave2';
import { motion } from "framer-motion"
import DelayLink from '../../ultils/DelayLink';
import Arrow from '../../components/shapes/Arrow';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2 } from "../../components/Reward/MemphisSets";
import GoToTop from '../../ultils/GoToTop';

function Credit() {
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
    getItems('/credit/credit.json')
  },[])
  const setArray = [DonutSet(), IceCreamSet(), TwitchSet(), DefaultSet(), FruitSet(), FruitSet2()];
  const set = setArray[Math.floor(Math.random()*setArray.length)];

  return (
    <div id="outer-container">
      <Logo backArrow backArrowColor="white" menuColor="white" color="var(--gray-dark)"/>
      <div id="page-wrap" className="relative bg-gray-purple flex flex-row justify-center items-center">
        <div className="absolute right-40 top-40 sm:hidden">
          <Wave2 size="150px" />
        </div>
        <div className="xl:w-8/12 lg:w-11/12 lg:mt-20 lg:p-10 sm:p-5 w-6/12 h-5/6 bg-white p-20 default-window mt-20">
          <div className="lg:w-full flex flex-row lg:flex-col">
            <div className="lg:w-full w-3/12 bg-cover bg-center bg-no-repeat" style={{"backgroundImage": `url(/img/gradeA/5.svg)`, "backgroundColor": "var(--yellow)", "backgroundSize": "120px auto", "height": "300px"}}></div>
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
      </div>
      <Footer bgColor="purple" textColor="white" />
      <GoToTop />
    </div>

  );
}

export default Credit;
