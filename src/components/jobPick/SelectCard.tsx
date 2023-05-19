import React, { useState } from 'react';
import { FlipCard } from './flipCard';

export const SelectCard: React.FC = () => {
  const [chosenCardIndex, setChoseCardIndex] = useState<number | null>(null);

  return (
    <div className='absolute inset-0 flex bg-gray-500 bg-opacity-50'>
      <div className='flex w-[100vw] space-x-20 h-100 justify-center items-center'>
        <FlipCard disabled={chosenCardIndex !== null} selectCard={() => setChoseCardIndex(0)}
                  isSelected={chosenCardIndex === 0} />
        <FlipCard disabled={chosenCardIndex !== null} selectCard={() => setChoseCardIndex(1)}
                  isSelected={chosenCardIndex === 1} />
        <FlipCard disabled={chosenCardIndex !== null} selectCard={() => setChoseCardIndex(2)}
                  isSelected={chosenCardIndex === 2} />
      </div>
    </div>
  );
};