import React, { useState, useEffect } from 'react';
import './sorting.css'; 

const InsertionSort = ({ array, goBack }) => {
  const [elements, setElements] = useState([...array]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [key, setKey] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [sorting, setSorting] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [sortingSpeed, setSortingSpeed] = useState(500);

  const handleSpeedChange = (newSpeed) => {
    setSortingSpeed(newSpeed);
  };

  const handleStartSorting = () => {
    setSorting(true);
    setCurrentIndex(1);
    setKey(elements[1]);
    setCompareIndex(0);
  };

  const handleResetArray = () => {
    setElements([...array]);
    setSorting(false);
    setCurrentIndex(1);
    setKey(null);
    setCompareIndex(null);
    clearTimeout(timerId);
  };

  useEffect(() => {
    let sortingTimerId;

    const performSort = () => {
      if (sorting && currentIndex < elements.length) {
        let newElements = [...elements];

        if (compareIndex !== null && newElements[compareIndex] > key) {
          newElements[compareIndex + 1] = newElements[compareIndex];
          setElements(newElements);
          setCompareIndex(compareIndex - 1);
        } else {
          newElements[compareIndex + 1] = key;
          setElements(newElements);
          setCurrentIndex(currentIndex + 1);
          if (currentIndex + 1 < elements.length) {
            setKey(elements[currentIndex + 1]);
            setCompareIndex(currentIndex);
          } else {
            setSorting(false);
          }
        }
      }
    };

    if (sorting) {
      sortingTimerId = setTimeout(performSort, sortingSpeed);
      setTimerId(sortingTimerId);
    }

    return () => clearTimeout(sortingTimerId);
  }, [currentIndex, elements, key, compareIndex, sorting, sortingSpeed]);

  return (
    <>
    <div>
        <h2>INSERTION SORT</h2>
      </div>
      <header className="header">
        <div className="button-container">
          <button className="button" onClick={goBack}>
            Go Back
          </button>
          <button className="button" onClick={handleStartSorting} disabled={sorting}>
            Start Sorting
          </button>
          <button className="button" onClick={handleResetArray}>
            Reset Array
          </button>
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={1000 - sortingSpeed}
            onChange={(e) => handleSpeedChange(1000 - parseInt(e.target.value))}
          />
        </div>
      </header>
      <div className="container">
        <div className="visualization">
          <div className="bars">
            {elements.map((value, idx) => (
              <div className="bar-container" key={idx}>
                <div
                  className={`bar ${
                    idx === currentIndex ? 'highlight-red' :
                    idx === compareIndex ? 'highlight-green' :
                    idx < currentIndex ? 'highlight-blue' : ''
                  }`}
                  style={{ height: `${value * 20}px` }}
                >
                  <span className="bar-value-inside">{value}</span>
                </div>
                <span className="bar-index">{idx}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pseudocode">
        <pre>
          {`
            mark first element as sorted

            for each unsorted element X

              'extract' the element X

              for j = lastSortedIndex down to 0

                if current element j > X

                  move sorted element to the right by 1

                break loop and insert X here
          `}
        </pre>
      </div>
      </div>
    </>
  );
};

export default InsertionSort;
