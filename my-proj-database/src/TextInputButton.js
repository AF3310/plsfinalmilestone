import React, { useState } from 'react';

const TextInputWithButton = ({ placeholder }) => {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = () => {
  
    console.log('Confirmed input:', inputValue);
 
    setInputValue('');
  };

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder} 
        className="border border-gray-300 rounded-md p-2 mr-2"
      />
      <button
        onClick={handleConfirm}
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:opacity-80"
      >
        Confirm
      </button>
    </div>
  );
};

export default TextInputWithButton;
