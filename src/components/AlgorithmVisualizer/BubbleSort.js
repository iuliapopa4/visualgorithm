import React, { useState, useEffect } from 'react';
import './sorting.css'; 

const BubbleSort = ({ array, goBack }) => {
  const [elements, setElements] = useState([...array]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sorting, setSorting] = useState(false);
  const [compareIndices, setCompareIndices] = useState([]);
  const [timerId, setTimerId] = useState(null);
  const [sortingSpeed, setSortingSpeed] = useState(1000);
  const [isSorted, setIsSorted] = useState(false); 

  const handleSpeedChange = (newSpeed) => {
    setSortingSpeed(newSpeed);
  };

  const handleStartSorting = () => {
    setSorting(true);
    setCurrentIndex(0);
    setIsSorted(false); 
  };

  const handleResetArray = () => {
    setElements([...array]);
    setSorting(false);
    setCurrentIndex(0);
    setCompareIndices([]);
    clearTimeout(timerId); 
    setIsSorted(false); 
  };


useEffect(() => {
    let sortingTimerId = null;
  
    const performSort = () => {
      if (sorting && currentIndex < elements.length - 1) {
        sortingTimerId = setTimeout(() => {
          let tempElements = [...elements];
          let i = currentIndex;
  
          if (tempElements[i] > tempElements[i + 1]) {
            let temp = tempElements[i];
            tempElements[i] = tempElements[i + 1];
            tempElements[i + 1] = temp;
            setElements(tempElements);
            setCompareIndices([i, i + 1]);
          } else {
            setCompareIndices([i, i + 1]);
          }
  
          setCurrentIndex(i + 1);
        }, sortingSpeed);
  
        setTimerId(sortingTimerId);
      } else {
        if (!sorting) return;
  
        let isSorted = true;
        for (let i = 0; i < elements.length - 1; i++) {
          if (elements[i] > elements[i + 1]) {
            isSorted = false;
            break;
          }
        }
  
        if (isSorted) {
          setSorting(false);
          setIsSorted(true); 
        } else {
          setCurrentIndex(0);
        }
      }
      
    };
    performSort();
    return () => clearTimeout(sortingTimerId);
  }, [currentIndex, elements, sorting, sortingSpeed]);

  return (
    <>
      <div>
        <h2>BUBBLE SORT</h2>
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
                  className={`bar ${compareIndices.includes(idx) ? 'highlight-blue' : ''}${isSorted ? 'sorted' : ''}`}
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
            do
              swapped = false
  
              for i = 1 to indexOfLastUnsortedElement-1
  
                if leftElement > rightElement
  
                  swap(leftElement, rightElement)
  
                  swapped = true; ++swapCounter
  
            while swapped
            `}
          </pre>
        </div>
      </div>
    </>
  );
            };  
export default BubbleSort;