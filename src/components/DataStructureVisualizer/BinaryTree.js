import React, { useState, useEffect } from 'react';
import './BinaryTree.css';

const BinaryTree = ({ goBack }) => {
  const [root, setRoot] = useState(null);
  const [traversalResult, setTraversalResult] = useState('');
  const [highlightedNode, setHighlightedNode] = useState(null);

  function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  useEffect(() => {
    const array = [3, 9, 7, 6, 5, 10, 4, 2, 8, 1];
    const rootNode = createBST(array);
    setRoot(rootNode);
  }, []);

  const createBST = (array) => {
    if (array.length === 0) return null;

    const sortedArray = array.sort((a, b) => a - b);

    const createTree = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedArray[mid]);

      node.left = createTree(start, mid - 1);
      node.right = createTree(mid + 1, end);

      return node;
    };

    return createTree(0, sortedArray.length - 1);
  };

  const traversePreorder = async (node) => {
    if (node === null) return;

    setHighlightedNode(node);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTraversalResult((prev) => prev + node.value + ' ');
    await traversePreorder(node.left);
    await traversePreorder(node.right);
  };

  const traverseInorder = async (node) => {
    if (node === null) return;

    await traverseInorder(node.left);
    setHighlightedNode(node);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTraversalResult((prev) => prev + node.value + ' ');
    await traverseInorder(node.right);
  };

  const traversePostorder = async (node) => {
    if (node === null) return;

    await traversePostorder(node.left);
    await traversePostorder(node.right);
    setHighlightedNode(node);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTraversalResult((prev) => prev + node.value + ' ');
  };

  const traverseDFS = async (node) => {
    if (node === null) return;

    setHighlightedNode(node);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTraversalResult((prev) => prev + node.value + ' ');
    await traverseDFS(node.left);
    await traverseDFS(node.right);
  };

  const traverseBFS = async () => {
    const queue = [];
    if (root !== null) queue.push(root);

    while (queue.length > 0) {
      const node = queue.shift();
      setHighlightedNode(node);
      setTraversalResult((prev) => prev + node.value + ' ');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  };

  const handlePreorder = async () => {
    setTraversalResult('');
    setHighlightedNode(null);
    await traversePreorder(root);
  };

  const handleInorder = async () => {
    setTraversalResult('');
    setHighlightedNode(null);
    await traverseInorder(root);
  };

  const handlePostorder = async () => {
    setTraversalResult('');
    setHighlightedNode(null);
    await traversePostorder(root);
  };

  const handleDFS = async () => {
    setTraversalResult('');
    setHighlightedNode(null);
    await traverseDFS(root);
  };

  const handleBFS = async () => {
    setTraversalResult('');
    setHighlightedNode(null);
    await traverseBFS();
  };

  const treeToSvg = (node, x, y, level) => {
    if (node === null) return null;

    const circleRadius = 20;
    const circleGap = 40;
    const textOffset = 7;
    const lineOffset = 20;

    const cx = x;
    const cy = y;

    const svgNode = (
      <g key={node.value}>
        <circle cx={cx} cy={cy} r={circleRadius} fill={highlightedNode === node ? '#cc0000' : '#ffb732 '} />
        <text x={cx - textOffset} y={cy + textOffset} fill="white">{node.value}</text>
        {node.left && (
          <>
            <line x1={cx} y1={cy + circleRadius} x2={x - circleGap * level} y2={y + circleRadius + lineOffset} stroke="black" />
            {treeToSvg(node.left, x - circleGap * level, y + 60, level - 1)}
          </>
        )}
        {node.right && (
          <>
            <line x1={cx} y1={cy + circleRadius} x2={x + circleGap * level} y2={y + circleRadius + lineOffset} stroke="black" />
            {treeToSvg(node.right, x + circleGap * level, y + 60, level - 1)}
          </>
        )}
      </g>
    );

    return svgNode;
  };

  return (
    <div className="binarytree-container">
      <h2>BINARY TREE</h2>
      <div className="tree-visualization">
        <svg width="1000" height="500">
          {root !== null && treeToSvg(root, 500, 50, 3)}
        </svg>
      </div>
      <div className="traversal-results">
        <p>{traversalResult}</p>
      </div>
      <div>
        <button onClick={handlePreorder}>Preorder</button>
        <button onClick={handleInorder}>Inorder</button>
        <button onClick={handlePostorder}>Postorder</button>
        <button onClick={handleDFS}>DFS</button>
        <button onClick={handleBFS}>BFS</button>
      </div>
      <button onClick={goBack} style={{ marginTop: '30px' }}>Go Back</button>
    </div>
  );
};

export default BinaryTree;
