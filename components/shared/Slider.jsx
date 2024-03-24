'use client';

import React, { useState } from 'react';
import './Slider.css';

const Slider = ({ min, max, step, onChange }) => {
  const [value, setValue] = useState(min);

  const formatSliderValueToDate = (value) => {
    const startDate = new Date(); // Assuming today's date as the start date
    const daysToAdd = value; // Use slider value as days to add
    const selectedDate = new Date(startDate);
    selectedDate.setDate(startDate.getDate() + daysToAdd);
    return selectedDate.toDateString();
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onChange(formatSliderValueToDate(newValue));
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider"
      />
      <span className="slider-value">{formatSliderValueToDate(value)}</span>
    </div>
  );
};

export default Slider;