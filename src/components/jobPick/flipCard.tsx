import React, { useState } from 'react';

interface Props {
  disabled: boolean,
  isSelected: boolean,
  selectCard: () => void
}

export const FlipCard: React.FC<Props> = ({disabled, isSelected, selectCard}) => {

    return (
      <div className='flex flex-col'>
        <div className={`relative rounded-lg w-40 h-40 shadow-xl duration-1000 ${isSelected ? 'transform-style-3d' : ''}`}>
          <div
            className='back-visibility-hidden w-full h-full bg-green-200 rounded-lg border border-gray-300 border-solid absolute'>front
          </div>
          <div
            className='back-visibility-hidden w-full h-full bg-cyan-200 rounded-lg border border-gray-300 border-solid absolute transform-rotateY-180'>back
          </div>
        </div>
        <button className='m-5' onClick={selectCard} disabled={disabled}>Select</button>
      </div>
    );
  }
;