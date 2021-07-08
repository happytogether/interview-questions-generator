import { useState, useEffect } from 'react';
import MondrianArt from './components/MondrianArt';
import Footer from './components/Footer';
import Logo from './components/Logo';
import Arrow from './components/shapes/Arrow';
import useSound from 'use-sound';
import clickSfx from './components/click.mp3';
import { useHistory } from 'react-router-dom';
import { motion } from "framer-motion"

function Credit() {
  const [playClick] = useSound(clickSfx);
  const history = useHistory();
  function handleHistoryGoBack() {
      playClick();
      setTimeout(()=> {
        history.goBack();
      }, 300)
  }
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
    <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
      <div>
        <header style={{"height": "100px", "background": "#000"}}>
          <Logo size="100px" color="#fff"/>
          <span onClick={()=>handleHistoryGoBack()} className="close absolute right-14 z-30">
            <Arrow size="100px" rotate="180deg"/>
          </span>
        </header>
        {
            jsonLoaded && <MondrianArt items={items}/>
        }

      </div>
      <Footer />
    </motion.div>

  );
}

export default Credit;
