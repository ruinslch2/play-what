import { useEffect, useState } from 'react';

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

const Player = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerStatus>({pos:{ x: 0, y: 0 }, status: STATUS_ANIMATION.STANDING});

  const walk = (direction: string) => {
    const {x, y} = playerInfo.pos;
    if (direction === 'Left') {
      if (x === 0) return;
      setPlayerInfo({pos: {x: x-1, y: y+1}, status: STATUS_ANIMATION.LEFT})
    } else if (direction === 'Right') {
      setPlayerInfo({pos: {x: x+1, y: y+1}, status: STATUS_ANIMATION.RIGHT})
    }
  }

  useEffect(() => {
    walk('Left')
  }, [])

  const {x, y} = playerInfo.pos;
  const {status} = playerInfo;
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className={`character ${status}`}>Player</div>
      <div>({x}, {y})</div>
    </div>
  )
}

export default Player;