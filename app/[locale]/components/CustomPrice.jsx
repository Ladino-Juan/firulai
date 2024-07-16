"use client"

import React from 'react'
import { useState } from 'react';

const Prices = ({ onCustomAmountChange }) => {
    
    const [customAmount, setCustomAmount] = useState(0);

    const handleInputChange = (event) => {
      const amount = Math.max(5000, event.target.value);
      setCustomAmount(amount);
      onCustomAmountChange(amount);
    };
  return (
    <input
    type="number"
    min="5000"
    value={customAmount}
    onChange={handleInputChange}
    className="border border-gray-300 p-2 rounded-lg mr-2"
    placeholder="Ingrese un monto mayor a 5000 COP"
  />
  )
}

export default Prices