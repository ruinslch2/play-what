import React, { useState, useEffect } from 'react';
import './App.css';
import Canvas from "./components/Canvas";
import websocketService from "./Service/Websocket";

function App() {
    // useEffect(() => {
    //     websocketService.init();
    // }, []);

  return (
    <div className='h-screen w-screen relative flex flex-col justify-center items-center backdrop-blur-[15px] z-10'>
      {/*<img src="https://picsum.photos/250/250" />*/}
      {/*<div className="bg-transparent rounded-full w-20 h-20">*/}
      {/*</div>*/}
        <Canvas />
    </div>
  );
}

export default App;
