import React, { useState, useEffect } from 'react';
import './sorting.css';

const MergeSort = ({ array, goBack }) => {
  const [elements, setElements] = useState([...array]);
  const [sorting, setSorting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortingSpeed, setSortingSpeed] = useState(1000);

  const handleSpeedChange = (newSpeed) => {
    setSortingSpeed(newSpeed);
  };

  const handleStartSorting = () => {
    setSorting(true);
    const stepsArray = [];
    mergeSort([...array], stepsArray);
    setSteps(stepsArray);
    setCurrentStep(0);
  };

  const handleResetArray = () => {
    setElements([...array]);
    setSorting(false);
    setSteps([]);
    setCurrentStep(0);
  };

  const merge = (left, right) => {
    let merged = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        merged.push(left[leftIndex]);
        leftIndex++;
      } else {
        merged.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return [...merged, ...left.slice(leftIndex), ...right.slice(rightIndex)];
  };

  const mergeSort = (arr, stepsArray) => {
    if (arr.length <= 1) {
      return arr;
    }

    const middleIndex = Math.floor(arr.length / 2);
    const left = arr.slice(0, middleIndex);
    const right = arr.slice(middleIndex);

    const sortedLeft = mergeSort(left, stepsArray);
    const sortedRight = mergeSort(right, stepsArray);

    const merged = merge(sortedLeft, sortedRight);
    stepsArray.push([...merged]);
    return merged;
  };

  useEffect(() => {
    if (sorting && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
        setElements(steps[currentStep + 1]);
      }, sortingSpeed);
      return () => clearTimeout(timer);
    }
    setSorting(false);
  }, [sorting, currentStep, steps, sortingSpeed]);

  return (
    <>
    <div>
        <h2>MERGE SORT</h2>
      </div>
      <header className="header">
        <div className="button-container">
          <button className="button" onClick={goBack}>Go Back</button>
          <button className="button" onClick={handleStartSorting} disabled={sorting}>Start Sorting</button>
          <button className="button" onClick={handleResetArray}>Reset Array</button>
          <input
            type="range"
            min="100"
            max="2000"
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
                <div className="bar" style={{ height: `${value * 20}px` }}>
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
            split each element into partitions of size 1

            recursively merge adjacent partitions

              for i = leftPartIdx to rightPartIdx

                if leftPartHeadValue <= rightPartHeadValue

                  copy leftPartHeadValue

                else: copy rightPartHeadValue; Increase InvIdx

            copy elements back to original array
          `}
        </pre>
      </div>
      </div>
    </>
  );
};

export default MergeSort;
