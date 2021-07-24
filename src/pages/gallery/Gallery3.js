import React, { useContext, useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "../../components/Reward/MemphisSets";
import './Gallery.scss';
import ReactPageScroller from 'react-page-scroller';

function Gallery() {
  useEffect(()=>{
    document.body.classList.add('gallery-page');
  },[]);

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
    getItems('/questions/1.json')
  },[])

  const setArray = [DonutSet(), IceCreamSet(), TwitchSet(), DefaultSet(), FruitSet(), FruitSet2(), BallonSet()];
  const set = setArray[Math.floor(Math.random()*setArray.length)];
  const randomIndex = Math.floor(Math.random()*set.length) +2;

  function groupJson() {
    let groupSize = 3;
    let rows = [];
    return rows = items.map(function(item, index) {
        // map content to html elements
        return (
          <div className={`list flex-1 items-center flex justify-between flex-nowrap px-10`}>
            <span className="border-b border-solid border-gray-dark"><span className="text-2xl">0{index+1}. </span>{item.title}</span>
            <span>Answers from Github: <br/>
            A closure is the combination of a function and the lexical environment within which that function was declared. i.e, It is an inner function that has access to the outer or enclosing function’s variables. The closure has three scope chains

            i. Own scope where variables defined between its curly brackets
            ii. Outer function’s variables
            iii. Global variables
            Let's take an example of closure concept,
            </span>
          </div>
        )
    }).reduce(function(r, element, index) {
        // create element groups with size 3, result looks like:
        // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
        index % groupSize === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
    }, []).map(function(rowContent) {
        // surround every group with 'row'
        return <div className="flex flex-col align-stretch h-screen">{rowContent}</div>;
    });
  }
  const [animating, setAnimating] = useState(false);

  function handleBeforePageChange() {
    console.log('before', animating);
    //setAnimating(true);
  }

  function handlePageChange() {
    console.log('finished', animating);
    //setAnimating(false);
  }
  return (
    <div className="gallery">
      <Logo color="#000" />
      <div className={`${animating?'animating': ''} question-set text-black`}>
        {
            jsonLoaded && <ReactPageScroller pageOnChange={handlePageChange} onBeforePageScroll={handleBeforePageChange}>
            {groupJson()}
          </ReactPageScroller>
        }
      </div>
  </div>
  );
}

export default Gallery;
