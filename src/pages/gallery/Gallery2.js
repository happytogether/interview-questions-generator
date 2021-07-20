import React, { useContext, useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import { DonutSet, IceCreamSet, TwitchSet, DefaultSet, FruitSet, FruitSet2, BallonSet } from "../../components/Reward/MemphisSets";
import './Gallery.scss';

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
  return (
    <div className="gallery">
      <Logo color="#fff" />
      <div className="box-bg flex flex-row flex-wrap items-center justify-center gap-10 p-20 pt-60">
        {
          set.map((item, index) => index === 1 &&<div className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
        }
        {
          items.map((item, index) => (
            <div>
              <div className={`question m-20 ${index%2 === 0 ? '-mt-48': ''}`}>
                <div className="w-full sm:mx-3">
                  <span className="p-5 text-xl bg-white">{item.title}</span>
                </div>
              </div>
              { (index%randomIndex === 0) && <div className="mx-1 w-6/12" dangerouslySetInnerHTML={ {__html: set[Math.floor(Math.random()*set.length)]} }></div>}
            </div>
          ))
        }
        {
          set.map((item, index) => index === 1 &&<div className="mx-1" dangerouslySetInnerHTML={ {__html: item} }></div>)
        }

      </div>
    <Footer />
  </div>
  );
}

export default Gallery;
