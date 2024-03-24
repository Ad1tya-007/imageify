'use client';

import Slider from '@/components/shared/Slider';
import React, { useState } from 'react';

const userDeadly = ( ) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
  };

  return (
    <div>
      <h1>Enter Your Age</h1>
      <Slider min={-9999999} max={9999999} step={0.1} onChange={handleSliderChange} />
      <p>Selected value: {sliderValue}</p>
    </div>
  );
};

export default userDeadly;
