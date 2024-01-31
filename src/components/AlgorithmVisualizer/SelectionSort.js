import React, { useState, useEffect } from 'react';
import './sorting.css';

const SelectionSort = ({ array, goBack }) => {
  const [elements, setElements] = useState([...array]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sorting, setSorting] = useState(false);
  const [minIndex, setMinIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState(-1);
  const [timerId, setTimerId] = useState(null);
  const [sortingSpeed, setSortingSpeed] = useState(1000);

  const handleSpeedChange = (newSpeed) => {
    setSortingSpeed(newSpeed);
  };

  const handleStartSorting = () => {
    setSorting(true);
    setCurrentIndex(0);
    setMinIndex(null);
    setSortedIndex(-1);
    clearTimeout(timerId);
  };

  const handleResetArray = () => {
    setElements([...array]);
    setSorting(false);
    setCurrentIndex(0);
    setMinIndex(null);
    setSortedIndex(-1);
    clearTimeout(timerId);
  };

  useEffect(() => {
    let sortingTimerId;

    const performSort = () => {
      if (sorting && sortedIndex < elements.length - 1) {
        let newMinIndex = minIndex;
        if (newMinIndex === null || elements[currentIndex] < elements[newMinIndex]) {
          newMinIndex = currentIndex;
        }

        if (currentIndex === elements.length - 1) {
          let newElements = [...elements];
          let temp = newElements[sortedIndex + 1];
          newElements[sortedIndex + 1] = newElements[newMinIndex];
          newElements[newMinIndex] = temp;
          setElements(newElements);
          setSortedIndex(sortedIndex + 1);
          setMinIndex(null);
          setCurrentIndex(sortedIndex + 2);
        } else {
          setCurrentIndex(currentIndex + 1);
          setMinIndex(newMinIndex);
        }
      }
    };

    if (sorting) {
      sortingTimerId = setTimeout(performSort, sortingSpeed);
      setTimerId(sortingTimerId);
    }

    return () => clearTimeout(sortingTimerId);
  }, [currentIndex, elements, minIndex, sortedIndex, sorting, sortingSpeed]);

  return (
    <>
      <div>
        <h2>SELECTION SORT</h2>
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
            min="100"
            max="1000"
            step="100"
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
                    idx === minIndex ? 'highlight-red' : idx === currentIndex ? 'highlight-green' : idx <= sortedIndex ? 'highlight-blue' : ''
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
            repeat (numOfElements - 1) times

              set the first unsorted element as the minimum

              for each of the unsorted elements

                if element < currentMinimum

                  set element as new minimum

              swap minimum with first unsorted position
          `}
        </pre>
      </div>
      </div>
    </>
  );
};

export default SelectionSort;
