import React, { useState, useEffect } from 'react';
import './App.css';
import { Ladder } from './components/ladder';
import { FlipCard } from './components/jobPick/flipCard';
import { SelectCard } from './components/jobPick/SelectCard';

const player = 8;
const layer = 5;
const blockLength = 80;
const playerBallLength = 40;
const playerSize = new Array(8).fill(0);

const randomLadder = (width: number, height: number) => {
  const leftArray = [];
  for (let i = 0; i < height; i++) {
    let recordLeft = false;
    for (let j = 0; j < width; j++) {
      const left: boolean = Math.random() > 0.5 && j !== 0 && !recordLeft;
      left && leftArray.push([i, j]);
      recordLeft = left;
    }
  }
  return leftArray;
};


function App() {
  const [ladderProps, setLadderProps] = useState(randomLadder(player, layer));
  const [playerNth, setPlayerNth] = useState<number>(0);
  const [playerPos, setPlayPos] = useState({ x: 0, y: 0 });
  const [isArrived, setIsArrived] = useState<boolean>(false);

  const nextPlayer = () => {
    setPlayerNth(playerNth + 1);
    setPlayPos({ x: playerNth + 1, y: 0 });
    const playerDiv = document.getElementById('player');
    if (playerDiv) {
      playerDiv.style.left = `${(playerNth + 1) * blockLength + playerBallLength / 2}px`;
      playerDiv.style.top = `-${playerBallLength / 2}px`;

    }
  };

  const walk = (oldLeft: number, oldTop: number) => {
    const { x, y, isComplete } = move(oldLeft, oldTop);
    setPlayPos({ x, y });
    isComplete && setIsArrived(true);
  };

  const move = (x: number, y: number) => {

    if (y === layer) {
      return { x, y, isComplete: true };
    }
    const playerDiv = document.getElementById('player');
    if (playerDiv) {
      y = y + 1;
      const yPos = y * blockLength - playerBallLength / 2;
      playerDiv.style.top = `${yPos - blockLength / 2}px`;

      // turn around
      if (ladderProps.find(pos => pos[0] === (y - 1) && pos[1] === x)) {
        // turn left
        console.log('Left');
        x = x - 1;
        const xPos = x * blockLength + (blockLength - playerBallLength) / 2;
        setTimeout(() => {
          playerDiv.style.left = `${xPos}px`;
        }, 300);
      } else if (ladderProps.find(pos => pos[0] === (y - 1) && pos[1] === x + 1)) {
        // turn right
        console.log('Right');
        x = x + 1;
        const xPos = x * blockLength + (blockLength - playerBallLength) / 2;
        setTimeout(() => {
          playerDiv.style.left = `${xPos}px`;
        }, 300);
      }

      setTimeout(() => {
        playerDiv.style.top = `${yPos}px`;
      }, 600);
    }

    return { x, y: y, isComplete: y === layer };
  };

  const [isClick, setIsClick] = useState<boolean>(false);
  const handleClick = () => {
    setIsClick(true);
  };
  console.log('ladderProps: ', ladderProps);
  console.log('playerPos: ', playerPos)
  return (
    <div className='h-screen w-screen relative flex flex-col justify-center items-center'>
      <div className='w-[1024px] relative'>
        <div id='player'
             className='rounded-full bg-red-500 w-10 h-10 absolute left-[20px] top-[-20px] ease-out duration-300 z-10' />
        <Ladder playerPos={playerPos} connectRoad={ladderProps} size={player} layer={layer} />
        <div className='flex'>
          {playerSize.map((player, index) =>
            <div
              className={`w-20 mt-5 flex justify-center ${isArrived && index === playerPos.x ? 'visible' : 'invisible'} `}
              key={`button-${index}`}>
              <button onClick={handleClick} disabled={isClick}>Click</button>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => walk(playerPos.x, playerPos.y)}>GO
      </button>
      <button
        onClick={() => nextPlayer()}>Next Player
      </button>
      {isClick && <SelectCard />}
    </div>
  );
}

export default App;
