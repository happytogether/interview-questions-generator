import { useState, useEffect, useContext } from 'react';
import { MouseContext } from "./context/mouse-context";
import HomeHead from './components/HomeHead';
import Items from './components/Items';
import Footer from './components/Footer';
import DotRing from "./components/DotRing/DotRing";
import Arrow from "./components/shapes/Arrow";
import RandomBg from './RandomBg';
import getRandomDifferent from './getRandomDifferent';
import { motion } from "framer-motion";
import { InitialTransition } from './components/InitialTransition';
import { HomeStore, StepperStore } from "./Store";
import { fetchDataAction, stepDoneAction } from "./Actions";

function Home() {
  const { state, dispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch} = useContext(StepperStore);

  useEffect(() => {
    state.data.length === 0 && fetchDataAction(dispatch);
  },[state]);

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
  },[])

  const [open, setOpen] = useState(false);
  const randomBg = RandomBg();
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

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

  // deal with category here
  const [category,setCategory]= useState("");
  const [answers, setAnswers] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState();
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState();

  function handleCategoryChange(newCategory, index) {
      setCategory(newCategory);
      setAnswers(JSON.parse(localStorage.getItem('category'+index)));
      setCategoryIndex(index);
      setCategoryQuestions(items[index].questions);
      setCategoryTitle(items[index].cat);
  }

  const xBg = RandomBg();

  const [bg, setBg] = useState("dot-bg");
  const bgArr = ["honey-comb-bg", "pie-bg", "equilateral-triangles-bg","rect-bg", "triangle-bg", "wave-bg", "line-bg", "box-bg", "skew-dot-bg", "cross-bg", "line-h-bg","paper-bg", "diagonal-bg"];

  function handleRandomBg(newBg) {
    setBg(getRandomDifferent(bgArr, bg));
  }

  useEffect(()=> {
    document.body.classList.remove('new-interview');
  }, []);

  return (

    <motion.div>
      {
        <DotRing />
      }
      <HomeHead />
      <Items items={state.data} lockBodyScrolling={lockBodyScrolling} handleRandomBg={handleRandomBg} open={open}/>
      <Footer />
      <div onClick={()=>handleRandomBg(xBg)} className={`static ${cursorType == "left" ? "red-main-color": ""} ${bg}`} open={open}>
        <span className="close" onClick={()=> {releaseBodyScrolling();}}>
          {open&&<Arrow size="100px" rotate="180deg"/>}
        </span>
      </div>
    </motion.div>
  );
}

export default Home;
