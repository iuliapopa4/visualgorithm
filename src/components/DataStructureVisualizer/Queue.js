import React, { useState } from 'react';
import './StackQueue.css';

const Queue = ({ goBack }) => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleEnqueue = () => {
    if (inputValue !== '') {
      setQueue([...queue, inputValue]);
      setInputValue('');
    }
  };

  const handleDequeue = () => {
    if (queue.length > 0) {
      const dequeuedQueue = [...queue];
      dequeuedQueue.shift();
      setQueue(dequeuedQueue);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleEnqueue();
    }
  };

  return (
    <div className="queue-container">
      <h2>QUEUE</h2>
      <div className="queue-content">
        <div className="queue-elements">
          {queue.map((item, index) => (
            <div key={index} className="queue-item">
              {item}
            </div>
          ))}
        </div>
        <div className="queue-operations">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleEnterPress}
            placeholder="Enter value"
            className="input-field"
          />
          <div>
            <button onClick={handleEnqueue}>Enqueue</button>
            <button onClick={handleDequeue}>Dequeue</button>
          </div>
        </div>
      </div>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default Queue;
