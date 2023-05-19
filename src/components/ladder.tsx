import React from 'react';

interface Props {
  playerPos: {
    x: number,
    y: number,
  }
  size: number;
  layer: number;
  connectRoad: number[][];
}

export const Ladder: React.FC<Props> = ({playerPos, size, layer, connectRoad }) => {

    const makeLadder = (size: number, layer: number) => {
      const ladderDOM = [];
      for (let i = 0; i < layer; i++) {
        const thisLayer = [];
        for (let j = 0; j < size; j++) {
          const left = connectRoad.filter(road => road[0] === i && road[1] === j).length > 0;
          thisLayer.push(<Road key={`road-${i}-${j}`} left={left} />);
        }
        ladderDOM.push(<div key={`layer-${i}`} className='flex'>{thisLayer}</div>);
      }
      return <div className='flex flex-col relative'>{ladderDOM}</div>;
    };

    return (
      makeLadder(size, layer)
    );
  }
;

interface roadType {
  left: boolean,
}

const Road = ({ left }: roadType) => {
  const showBlock = false;
  return (
    <div className={`relative h-20 w-20 ${showBlock ? 'border-black border' : ''}`}>
      {/* top bottom line */}
      <div
        className={`w-full h-100 after:absolute after:border-blue-500 after:border after:left-[50%] after:h-[100%]`}></div>
      {/* left right line */}
      <div
        className={`w-full h-100 ${left ? 'before:absolute before:border before:border-blue-500 before:w-[100%] before:left-[-50%] before:top-[50%]' : ''}`} />
    </div>
  );
};
