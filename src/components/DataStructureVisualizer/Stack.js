import React, { useState } from 'react';
import './StackQueue.css';

const Stack = ({ goBack }) => {
    const [stack, setStack] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    const handlePush = () => {
      if (inputValue !== '') {
        setStack([...stack, inputValue]);
        setInputValue('');
      }
    };
  
    const handlePop = () => {
      if (stack.length > 0) {
        const poppedStack = [...stack];
        poppedStack.pop();
        setStack(poppedStack);
      }
    };
  
    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        handlePush();
      }
    };
  
    return (
      <div className="stack-container">
        <h2>STACK</h2>
        <div className="stack-content">
          <div className="stack-elements">
            {stack.map((item, index) => (
              <div key={index} className="stack-item">
                {item}
              </div>
            ))}
          </div>
          <div className="stack-operations">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleEnterPress} 
              placeholder="Enter value"
              className="input-field"
            />
            <div>
              <button onClick={handlePush}>Push</button>
              <button onClick={handlePop}>Pop</button>
            </div>
          </div>
        </div>
        <button onClick={goBack}>Go Back</button>
      </div>
    );
  };
  
  export default Stack;