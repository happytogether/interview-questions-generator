import { useState, useEffect, useContext, useMemo } from 'react';
import { MouseContext } from "./context/mouse-context";
import HomeHead from './components/HomeHead';
import Items from './components/Items';
import Footer from './components/Footer';
import DotRing from "./components/DotRing/DotRing";
import Arrow from "./components/shapes/Arrow";
import Logo from "./components/Logo";
import RandomBg from './RandomBg';
import getRandomDifferent from './getRandomDifferent';
import { motion } from "framer-motion";
import { InitialTransition } from './components/InitialTransition';
import { HomeStore, StepperStore } from "./Store";
import { fetchDataAction, stepDoneAction } from "./Actions";
import { downMotion } from './components/AnimationSet';
import GetRandomFromArray from './ultils/GetRandomFromArray';
import { ColorSet } from './components/ColorSet';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';

function Home() {
  const { state, dispatch } = useContext(HomeStore);
  const { stepperState, stepperDispatch} = useContext(StepperStore);
  const bgColorValue = useMemo(
    () => GetRandomFromArray(ColorSet),
    []
  );
  useEffect(() => {
    state.data.length === 0 && fetchDataAction(dispatch);
  },[state]);

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList = "";
  },[])

  useEffect(() => {
    //stepDoneAction(0, stepperDispatch);
    document.body.classList.add(`${bgColorValue[0][0]}-primary-color`);
    document.body.classList.add(`${bgColorValue[1][0]}-secondary-color`);
  },[])



  const [open, setOpen] = useState(false);
  const randomBg = RandomBg();
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const releaseBodyScrolling = () => {
    document.body.classList.remove('list-open');
    document.body.classList.remove('gallery-page');

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

  const pageVariants = {
  initial: {
    x: "-100vw"
  },
  leftInitial: {
    x: '-100vw'
  },
  rightInitial: {
    x: '100vw'
  },
  in: {
    x: 0
  },
  leftOut: {
    x: "0"
  },
  rightOut: {
    x: "0"
  },
  down: {
    y: 300
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1.2
};

  return (
    <motion.div>
      {
        <DotRing />
      }
      <motion.div initial='leftInitial' exit='leftOut' variants={pageVariants} transition={pageTransition} className={`panel left bg-${bgColorValue[0][0]} w-3/5 h-full absolute z-9999`}></motion.div>
      <motion.div initial='rightInitial' exit='rightOut' variants={pageVariants} transition={pageTransition} className={`panel right bg-${bgColorValue[1][0]} w-2/5 right-0 h-full absolute z-9999`}></motion.div>

      <div id="outer-container">
        <Logo logoTextColor='var(--blue)' arrowHamburgerColor='var(--blue)' primaryColor={bgColorValue[0][0]} secondaryColor={bgColorValue[1][0]} primaryTextColor={bgColorValue[0][1]} secondaryTextColor={bgColorValue[1][1]} thirdColor={bgColorValue[2][0]} thirdTextColor={bgColorValue[2][1]} />
        {
          <HamburgerMenu color='blue' bgColor={bgColorValue[2][0]} bgTextColor={bgColorValue[2][1]} primaryColor={bgColorValue[0][0]} secondaryColor={bgColorValue[1][0]} primaryTextColor={bgColorValue[0][1]} secondaryTextColor={bgColorValue[1][1]} thirdColor={bgColorValue[2][0]} thirdTextColor={bgColorValue[2][1]} />
        }
        <motion.div variants={pageVariants} transition={pageTransition} exit='down' id="page-wrap">
          <HomeHead primaryColor={bgColorValue[0][0]} secondaryColor={bgColorValue[1][0]} primaryTextColor={bgColorValue[0][1]} secondaryTextColor={bgColorValue[1][1]} thirdColor={bgColorValue[2][0]} thirdTextColor={bgColorValue[2][1]} />
          <Items items={state.data} lockBodyScrolling={lockBodyScrolling} handleRandomBg={handleRandomBg} open={open}/>
          <Footer primaryColor={bgColorValue[0][0]} secondaryColor={bgColorValue[1][0]} primaryTextColor={bgColorValue[0][1]} secondaryTextColor={bgColorValue[1][1]} thirdColor={bgColorValue[2][0]} thirdTextColor={bgColorValue[2][1]} />
          {
            /*
              <div onClick={()=>handleRandomBg(xBg)} className={`static ${cursorType == "left" ? "red-main-color": ""} ${bg}`} open={open}>
                <span className="close" onClick={()=> {releaseBodyScrolling();}}>
                  {open&&<Arrow size="100px" rotate="180deg"/>}
                </span>
              </div>
            */
          }
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
