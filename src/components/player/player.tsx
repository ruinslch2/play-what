import React, { useCallback, useEffect, useState } from 'react';

const STATUS_ANIMATION = {
  STANDING: "",
  LEFT: "animate-leftWalk",
  RIGHT: "animate-rightWalk"
}

interface PlayerStatus {
  pos: {
    x: number
    y: number,
  },
  status: string
}

interface Ladder{
  ladderProps: number[][]
}

const blockLength = 80;
const playerBallLength = 40;

const Player = ({ladderProps}: Ladder) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerStatus>({pos:{ x: 0, y: 0 }, status: STATUS_ANIMATION.STANDING});

  const walk = (direction: string) => {
    const {x, y} = playerInfo.pos;

    if (direction === 'Left') {
      if (x === 0) return;
      setPlayerInfo({pos: {x: x-1, y: y+1}, status: STATUS_ANIMATION.LEFT})
    } else if (direction === 'Right') {
      setPlayerInfo({pos: {x: x+1, y: y+1}, status: STATUS_ANIMATION.RIGHT})
    } else if (direction === 'Straight') {
      setPlayerInfo({pos: {x: x, y: y+1}, status: STATUS_ANIMATION.STANDING})
    }
  }
  const move = useCallback(() => {
    const playerDiv = document.getElementById('player');
    if (playerDiv) {
      const yPos = playerInfo.pos.y * blockLength - playerBallLength / 2;
      playerDiv.style.top = `${yPos - blockLength / 2}px`;
      console.log('----')
      console.log('props: ', ladderProps);
      console.log('player info: ', playerInfo);
      console.log('----')
      // turn around
      if (ladderProps.find(pos => pos[0] === (playerInfo.pos.y) && pos[1] === playerInfo.pos.x)) {
        // turn left
        console.log('Left');
        walk('Left')
        const xPos = playerInfo.pos.x * blockLength + (blockLength - playerBallLength) / 2;
        setTimeout(() => {
          playerDiv.style.left = `${xPos}px`;
        }, 300);
      } else if (ladderProps.find(pos => pos[0] === (playerInfo.pos.y) && pos[1] === (playerInfo.pos.x+1))) {
        // turn right
        console.log('Right');
        walk('Right')
        const xPos = x * blockLength + (blockLength - playerBallLength) / 2;
        setTimeout(() => {
          playerDiv.style.left = `${xPos}px`;
        }, 300);
      } else {
        walk('Straight')
      }

      setTimeout(() => {
        playerDiv.style.top = `${yPos}px`;
      }, 600);
    }
  }, [playerInfo.pos]);

  const {x, y} = playerInfo.pos;
  const {status} = playerInfo;
  return (
    <div id="player" className='absolute flex flex-col justify-center items-center left-[20px] top-[-40px] duration-1000 z-10'>
      <div className={`character ${status}`}>Player</div>
      <div>({x}, {y})</div>
      <button onClick={move}>Move</button>
    </div>
  )
}

export default Player;