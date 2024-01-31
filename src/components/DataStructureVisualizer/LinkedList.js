import React, { useState } from 'react';
import './LinkedList.css';

const LinkedList = ({ goBack }) => {
  const [head, setHead] = useState(null);
  const [insertValue, setInsertValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [removeValue, setRemoveValue] = useState('');
  const [searchedIndex, setSearchedIndex] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showRemoveInput, setShowRemoveInput] = useState(false);
  const [showInsertInput, setShowInsertInput] = useState(false);

  function Node(value) {
    this.value = value;
    this.next = null;
  }

  const handleInsert = async () => {
    if (insertValue !== '') {
      const newNode = new Node(insertValue);
      if (!head) {
        setHead(newNode);
      } else {
        let current = head;
        while (current.next !== null) {
          current = current.next;
        }
        current.next = newNode;
      }
      setInsertValue('');

      setNotification({ show: true, message: `Value '${insertValue}' inserted into the linked list` });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setNotification({ show: false, message: '' });
    } else {
      alert('Please enter a value to insert');
    }
  };

  const handleSearch = async () => {
    if (searchValue.trim() !== '') {
      let valueToSearch = searchValue.trim();
      let current = head;
      let index = 0;

      setSearchedIndex(null);
      setSearchInProgress(true);

      while (current !== null) {
        if (current.value === valueToSearch) {
          setSearchedIndex(index);
          setNotification({ show: true, message: `Value '${valueToSearch}' found at index ${index}` });
          setSearchInProgress(false);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setNotification({ show: false, message: '' });
          setSearchedIndex(null);
          break;
        }
        index++;
        setSearchedIndex(index);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSearchedIndex(null);
        current = current.next;
      }

      if (current === null) {
        setSearchInProgress(false);
        setNotification({ show: true, message: `Value '${valueToSearch}' not found in the linked list` });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setNotification({ show: false, message: '' });
      }
    } else {
      alert('Please enter a value to search');
    }
  };

  const handleRemove = async () => {
    if (removeValue.trim() !== '') {
      let valueToRemove = removeValue.trim();
      let current = head;
      let previous = null;

      while (current !== null) {
        if (current.value === valueToRemove) {
          if (previous === null) {
            setHead(current.next);
          } else {
            previous.next = current.next;
          }

          setNotification({ show: true, message: `Value '${valueToRemove}' removed from the linked list` });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setNotification({ show: false, message: '' });
          setSearchedIndex(null);
          break;
        }

        previous = current;
        current = current.next;
      }

      if (current === null) {
        setNotification({ show: true, message: `Value '${valueToRemove}' not found in the linked list` });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setNotification({ show: false, message: '' });
      }
    } else {
      alert('Please enter a value to remove');
    }
  };

  const handleToggleSearch = () => {
    setShowSearchInput(!showSearchInput);
    setShowRemoveInput(false);
    setShowInsertInput(false);
  };

  const handleToggleRemove = () => {
    setShowRemoveInput(!showRemoveInput);
    setShowSearchInput(false);
    setShowInsertInput(false);
  };

  const handleToggleInsert = () => {
    setShowInsertInput(!showInsertInput);
    setShowSearchInput(false);
    setShowRemoveInput(false);
  };

  const handleEnterKey = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (action === 'insert') {
        handleInsert();
      } else if (action === 'search' && !searchInProgress) {
        handleSearch();
      } else if (action === 'remove') {
        handleRemove();
      }
    }
  };

  const renderNodes = () => {
    let current = head;
    let index = 0;
    const nodes = [];

    while (current !== null) {
      nodes.push(
        <div
          key={current.value}
          className={`linkedlist-item`}
        >
          <div className={`arrow`}>→</div>
          <div className={`node ${searchedIndex !== null && index === searchedIndex ? 'searched' : ''}`}>{`${current.value}`}</div>
        </div>
      );

      index++;
      current = current.next;
    }

    return nodes;
  };

  return (
    <div className="linkedlist-container">
      <h2>LINKED LIST</h2>
      <div className="linkedlist-content">
        <div className="linkedlist-operations">
          {showInsertInput && (
            <input
              type="text"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              placeholder="Enter value to insert"
              className="input-field"
              onKeyPress={(e) => handleEnterKey(e, 'insert')}
            />
          )}
          {showSearchInput && (
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter value to search"
              className="input-field"
              onKeyPress={(e) => handleEnterKey(e, 'search')}
            />
          )}
          {showRemoveInput && (
            <input
              type="text"
              value={removeValue}
              onChange={(e) => setRemoveValue(e.target.value)}
              placeholder="Enter value to remove"
              className="input-field"
              onKeyPress={(e) => handleEnterKey(e, 'remove')}
            />
          )}
          <button onClick={handleToggleInsert}>Insert</button>
          <button onClick={handleToggleSearch}>Search</button>
          <button onClick={handleToggleRemove}>Remove</button>
        </div>
      </div>
      <div className="linkedlist-elements">
        {head !== null && renderNodes()}
      </div>
      <div className={`notification ${notification.show ? 'show' : ''}`}>
        {notification.message}
      </div>
      <button onClick={goBack} style={{ marginTop: '30px' }}>Go Back</button>
    </div>
  );
};

export default LinkedList;
