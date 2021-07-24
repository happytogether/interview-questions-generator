import { useState, useEffect } from 'react';
import MondrianArt from '../../components/MondrianArt';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import { motion } from "framer-motion"
import DelayLink from '../../ultils/DelayLink';
import Arrow from '../../components/shapes/Arrow';

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

  return (
    <div id="outer-container">
      <Logo backArrow backArrowColor="white" menuColor="white" color="#fff"/>
      <motion.div id="page-wrap" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
        <div >
          {
              jsonLoaded && <MondrianArt items={items}/>
          }
        </div>
        <Footer />
      </motion.div>
    </div>

  );
}

export default Credit;
