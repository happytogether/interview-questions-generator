import { useSpring, animated, config } from 'react-spring';
import { useState, useEffect, useRef, useContext } from 'react';
import {BrowserRouter as Router,Route} from'react-router-dom';
import useCookie from "./ultil/UseCookie";
import HomeHead from './components/HomeHead';
import HorizontalList from './components/HorizontalList';
import Items from './components/Items';
import DotRing from "./components/DotRing/DotRing";
import Arrow from "./components/shapes/Arrow";
import RandomBg from './RandomBg';
import { MouseContext } from "./context/mouse-context";


function Home() {
  const [open, setOpen] = useState(false);
  const [cookie, updateCookie] = useCookie("level", "basic");
  const randomBg = RandomBg();
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const openHorizontalList = () => {
    return setOpen(true);
  }
  const closeHorizontalList = () => {
    return setOpen(false);
  }

  const releaseBodyScrolling = () => {
    document.body.classList.remove('list-open');
  }

  const lockBodyScrolling = () => {
    document.body.classList.add('list-open');
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
    getItems('basic.json')
  },[])

  // deal with level here
  const [level, setLevel] = useState("basic");
  function handleLevelChange(newLevel) {
      setLevel(newLevel);
  }

  // deal with category here
  const [category,setCategory]= useState("Technical Questions");
  function handleCategoryChange(newCategory) {
      setCategory(newCategory);
  }
  // load correct json file here
 const [bg, setBg] = useState("dot-bg");

 function handleRandomBg(newBg) {
   setBg(newBg);
 }

  return (
    <div>
      {
        <DotRing />
      }
      <HomeHead getCategories={getItems} />
      <Items items={items} value={category} handleCategoryChange={handleCategoryChange} openHorizontalList={openHorizontalList} lockBodyScrolling={lockBodyScrolling} handleRandomBg={handleRandomBg} open={open}/>
      <footer>
        <ul onMouseEnter={() => cursorChangeHandler("hovered")}
      onMouseLeave={() => cursorChangeHandler("")} className="relative" style={{"width": "200px", "margin": "0 auto", "top": "-80px"}}>
          <li className="my-2"><a href="#">See Interview Report</a></li>
          <li className="my-2"><a href="#">Github</a></li>
          <li className="my-2"><a href="#">About Me</a></li>
          <li className="my-2"><a href="#">Credit</a></li>
        </ul>
      </footer>
      <div className={`static`} open={open}>
        <span className="close" onClick={()=> {closeHorizontalList(); releaseBodyScrolling();}}>
          {open&&<Arrow size="100px" rotate="180deg"/>}
        </span>
        {
          setJsonLoaded && items.length > 0 ? open&&<HorizontalList data={items} category={category} />: null
        }
      </div>
    </div>
  );
}

export default Home;
