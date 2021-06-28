import { useSpring, animated, config } from 'react-spring';
import { useState, useEffect, useRef, useContext } from 'react';
import {BrowserRouter as Router,Route} from'react-router-dom';
import { MouseContext } from "./context/mouse-context";
import useCookie from "./hooks/useCookie";
import HomeHead from './components/HomeHead';
import Questions from './components/Questions';
import Items from './components/Items';
import Footer from './components/Footer';
import DotRing from "./components/DotRing/DotRing";
import Arrow from "./components/shapes/Arrow";
import RandomBg from './RandomBg';
import getRandomDifferent from './getRandomDifferent';

function Home() {
  const [open, setOpen] = useState(false);
  const [cookie, updateCookie] = useCookie("level", "basic");
  const randomBg = RandomBg();
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const openQuestions = () => {
    return setOpen(true);
  }
  const closeQuestions = () => {
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
  const [category,setCategory]= useState("");
  function handleCategoryChange(newCategory) {
      setCategory(newCategory);
  }

  const [categoryIndex, setCategoryIndex] = useState("");

  function getCategoryIndex(newIndex) {
      setCategoryIndex(newIndex);
      checkIfQuestionsDone(categoryIndex);
  }

  function checkIfQuestionsDone(index) {

      console.log(index);
  }

  const xBg = RandomBg();

  // load correct json file here
 const [bg, setBg] = useState("dot-bg");
 const bgArr = ["honey-comb-bg", "pie-bg", "equilateral-triangles-bg","rect-bg", "triangle-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg"];

 function handleRandomBg(newBg) {
   setBg(getRandomDifferent(bgArr, bg));
 }
 const [answers, setAnswers] = useState([]);

  return (
    <div>
      {
        <DotRing />
      }
      <HomeHead getCategories={getItems} />
      <Items items={items} value={category} handleCategoryChange={handleCategoryChange}  getCategoryIndex={getCategoryIndex} openQuestions={openQuestions} lockBodyScrolling={lockBodyScrolling} handleRandomBg={handleRandomBg} open={open}/>
      <Footer />
      <div onClick={()=>handleRandomBg(xBg)} className={`static ${cursorType == "left" ? "red-main-color": ""} ${bg}`} open={open}>
        <span className="close" onClick={()=> {closeQuestions(); releaseBodyScrolling();}}>
          {open&&<Arrow size="100px" rotate="180deg"/>}
        </span>
        {
          setJsonLoaded && items.length > 0 ? open&&<Questions data={items} category={category} />: null
        }
      </div>
    </div>
  );
}

export default Home;
