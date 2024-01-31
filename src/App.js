import React, { useState } from 'react';
import BubbleSort from './components/AlgorithmVisualizer/BubbleSort';
import SelectionSort from './components/AlgorithmVisualizer/SelectionSort';
import InsertionSort from './components/AlgorithmVisualizer/InsertionSort';
import MergeSort from './components/AlgorithmVisualizer/MergeSort';
import QuickSort from './components/AlgorithmVisualizer/QuickSort';
import Stack from './components/DataStructureVisualizer/Stack';
import Queue from './components/DataStructureVisualizer/Queue';
import LinkedList from './components/DataStructureVisualizer/LinkedList';
import BinaryTree from './components/DataStructureVisualizer/BinaryTree';
import "./App.css" 

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const array = [3, 9, 7, 6, 5, 10, 4, 2, 8, 1];

  const renderAlgorithm = () => {
    switch (selectedAlgorithm) {
      case 'bubbleSort':
        return <BubbleSort array={array} goBack={() => setSelectedAlgorithm(null)} />;
      case 'selectionSort':
        return <SelectionSort array={array} goBack={() => setSelectedAlgorithm(null)} />;
      case 'insertionSort':
        return <InsertionSort array={array} goBack={() => setSelectedAlgorithm(null)} />
      case 'mergeSort':
        return <MergeSort array={array} goBack={() => setSelectedAlgorithm(null)} />
      case 'quickSort':
        return <QuickSort array={array} goBack={() => setSelectedAlgorithm(null)} />
      case 'stack':
        return <Stack goBack={() => setSelectedAlgorithm(null)} />;
      case 'queue':
      return <Queue goBack={() => setSelectedAlgorithm(null)} />;
      case 'linkedList':
      return <LinkedList goBack={() => setSelectedAlgorithm(null)} />;
      case 'binaryTree':
      return <BinaryTree goBack={() => setSelectedAlgorithm(null)} />;

      default:
        return (
          <div>
            <div>
            <h2 className='centered'>SORTING</h2>
            <button onClick={() => setSelectedAlgorithm('bubbleSort')}>Bubble Sort</button>
            <button onClick={() => setSelectedAlgorithm('selectionSort')}>Selection Sort</button>
            <button onClick={() => setSelectedAlgorithm('insertionSort')}>Insertion Sort</button>
            <button onClick={() => setSelectedAlgorithm('mergeSort')}>Merge Sort</button>
            <button onClick={() => setSelectedAlgorithm('quickSort')}>Quick Sort</button>
            </div>
            <div>
              <h2 className='centered'>DATA STRUCTURES</h2>
              <button onClick={() => setSelectedAlgorithm('stack')}>Stack</button>
              <button onClick={() => setSelectedAlgorithm('queue')}>Queue</button>
              <button onClick={() => setSelectedAlgorithm('linkedList')}>Linked List</button>
              <button onClick={() => setSelectedAlgorithm('binaryTree')}>Binary Tree</button>

            </div>
          </div>

        );
    }
  };

  return (
    <div className="App">
      <header>
        <h1>VisuAlgorithm</h1>
      </header>
      <main>
        {renderAlgorithm()}
      </main>
    </div>
  );
}

export default App;
