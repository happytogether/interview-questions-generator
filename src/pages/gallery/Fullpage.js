import React, { useContext, useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

export default function Fullpage(props) {
  const data = props.data;
  return (
    <ReactFullpage
      //fullpage options
      scrollingSpeed = {1000} /* Options here */
      navigation
      onLeave={(origin, destination, direction) => {
        setTimeout(()=>{
          props.resetActiveList();
        }, 300)
      }}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            {data}
          </ReactFullpage.Wrapper>
        );
      }}
    />
  )
}
