import React, { useState, useEffect, useRef } from 'react';
import './sorting.css'; 

const QuickSort = ({ array, goBack }) => {
  const [elements, setElements] = useState([...array]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState(new Set());
  const [sortingSpeed, setSortingSpeed] = useState(1000);
  const [resetArray, setResetArray] = useState([...array]);
  const [resetRequested, setResetRequested] = useState(false);
  const sortingSpeedRef = useRef(sortingSpeed);
  const isResettingRef = useRef(false);

  const swap = async (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setElements([...arr]);
    await new Promise((resolve) => setTimeout(resolve, sortingSpeedRef.current));
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    setPivotIndex(high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (!resetRequested) {
        setActiveIndices([i, j]);
        if (arr[j] < pivot) {
          i++;
          await swap(arr, i, j);
        }
      } else {
        isResettingRef.current = true;
        break;
      }
    }

    if (!resetRequested && !isResettingRef.current) {
      await swap(arr, i + 1, high);
      setPivotIndex(null);
      setActiveIndices([]);
      setSortedIndices((prev) => new Set([...prev, i + 1]));
    }
    return i + 1;
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      if (!resetRequested && !isResettingRef.current) {
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
      }
    } else if (low === high && !resetRequested && !isResettingRef.current) {
      setSortedIndices((prev) => new Set([...prev, low]));
    }
  };

  useEffect(() => {
    setResetArray([...array]);
    setElements([...array]);
    setIsSorting(false);
    setActiveIndices([]);
    setPivotIndex(null);
    setSortedIndices(new Set());
    setResetRequested(false);
    isResettingRef.current = false;
  }, [array]);

  const handleSpeedChange = (newSpeed) => {
    setSortingSpeed(newSpeed);
    sortingSpeedRef.current = newSpeed;
  };

  const handleStartSorting = async () => {
    setIsSorting(true);
    setResetRequested(false);
    isResettingRef.current = false;
    await quickSort([...elements], 0, elements.length - 1);
    setIsSorting(false);
  };

  const handleResetArray = () => {
    if (isSorting) {
      setResetRequested(true);
    } else {
      setElements([...resetArray]);
      setActiveIndices([]);
      setPivotIndex(null);
      setSortedIndices(new Set());
      setResetRequested(false);
      isResettingRef.current = false;
    }
  };


  return (
    <>
    <div>
        <h2>QUICK SORT</h2>
      </div>
      <header className="header">
        <div className="button-container">
          <button className="button" onClick={goBack}>Go Back</button>
          <button className="button" onClick={handleStartSorting} disabled={isSorting}>Start Sorting</button>
          <button className="button" onClick={handleResetArray}>Reset Array</button>
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
                    pivotIndex === idx ? 'highlight-red' :
                    activeIndices.includes(idx) ? 'highlight-green' :
                    sortedIndices.has(idx) ? 'highlight-blue' : ''
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
            for each (unsorted) partition

              set first element as pivot

              storeIndex = pivotIndex+1

              for i = pivotIndex+1 to rightmostIndex

                if ((a[i] < a[pivot]) or (equal but 50% lucky))

                  swap(i, storeIndex); ++storeIndex

              swap(pivot, storeIndex-1)
          `}
        </pre>
      </div>
      </div>
    </>
  );
};

export default QuickSort;
