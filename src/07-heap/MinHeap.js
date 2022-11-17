// Import dependencies.
import Comparator from '../utils/comparator/Comparator';

/**
 * MinHeap class.
 */
export class MinHeap {
  /**
   * @constructs MinHeap
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    // Array representation of the heap.
    this.heapContainer = [];

    // A map of heap elements for fast lookup.
    this.heapElements = new Map();

    // Allow class consumers to change the way the heap elements are compared with each other.
    // This is particularly useful when we want to save objects in a heap.
    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * @param {number} parentIndex
   * @return {number}
   */
  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1;
  }

  /**
   * @param {number} parentIndex
   * @return {number}
   */
  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2;
  }

  /**
   * @param {number} childIndex
   * @return {number}
   */
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * @param {number} childIndex
   * @return {boolean}
   */
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  /**
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param {number} parentIndex
   * @return {*}
   */
  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
   * @param {number} parentIndex
   * @return {*}
   */
  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
   * @param {number} childIndex
   * @return {*}
   */
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
   * @param {number} indexOne
   * @param {number} indexTwo
   */
  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  /**
   * @param {*} item
   * @param {Comparator} [comparator]
   * @return {Number[]}
   */
  find(item, comparator = this.compare) {
    const foundItemIndices = [];

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  /**
   * @param {*} item
   * @return {boolean}
   */
  has(item) {
    return !!this.heapElements.get(item);
  }

  /**
   * @param {number} [customStartIndex]
   */
  heapifyUp(customStartIndex) {
    // Take the last element (last in array or the bottom left in a tree)
    // in the heap container and lift it up until it is in the correct
    // order with respect to its parent element.
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex)
      && this.compare.greaterThan(this.parent(currentIndex), this.heapContainer[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * @param {number} [customStartIndex]
   */
  heapifyDown(customStartIndex = 0) {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap).
    // Do the same for next children after swap.
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex)
        && this.compare.lessThanOrEqual(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (this.compare.lessThanOrEqual(
        this.heapContainer[currentIndex],
        this.heapContainer[nextIndex],
      )) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * @return {*}
   */
  peek() {
    // Check if heap is not empty.
    if (this.heapContainer.length === 0) {
      // If heap is empty then there is nothing to peek.
      return null;
    }

    // Return the first element of heap array (the head).
    return this.heapContainer[0];
  }

  /**
   * @return {*}
   */
  poll() {
    if (this.heapContainer.length === 0) {
      // If heap is empty then there is nothing to poll.
      return null;
    }

    if (this.heapContainer.length === 1) {
      // If the heap consist of the one element then just extract it.
      return this.heapContainer.pop();
    }

    // Remember the value we want to return.
    const item = this.heapContainer[0];

    // Move the last element from the end to the head to preserve the "shape property".
    this.heapContainer[0] = this.heapContainer.pop();

    // Heapify the heap down in order to preserve the "heap-property".
    this.heapifyDown();

    return item;
  }

  /**
   * @param {*} item
   * @return {MinHeap}
   */
  add(item) {
    // Add new item to the end of the heap (shape property is preserved).
    this.heapContainer.push(item);

    // Add current item to the map of heap elements for fast access.
    this.heapElements.set(item, item);

    // Make sure that the heap-property is preserved by moving the
    // element up in case if it smaller than its parent.
    this.heapifyUp();

    return this;
  }

  /**
   * @param {*} item
   * @param {Comparator} [comparator]
   * @return {MinHeap}
   */
  remove(item, comparator = this.compare) {
    // Find number of items to remove.
    const numberOfItemsToRemove = this.find(item, comparator).length;

    // Remove current item from the map of heap elements.
    this.heapElements.delete(item);

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // We need to find item index to remove each time after removal since
      // indices are being changed after each heapify process.
      const indexToRemove = this.find(item, comparator).pop();

      // If we need to remove last child in the heap then just remove it.
      // There is no need to heapify the heap afterwards.
      if (indexToRemove === (this.heapContainer.length - 1)) {
        this.heapContainer.pop();
      } else {
        // Move last element in heap to the vacant (removed) position.
        this.heapContainer[indexToRemove] = this.heapContainer.pop();

        // Get parent.
        const parentItem = this.parent(indexToRemove);

        // If there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up.
        if (
          this.hasLeftChild(indexToRemove)
          && (
            !parentItem
            || parentItem <= this.heapContainer[indexToRemove]
          )
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.heapContainer.length;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.heapContainer.toString();
  }
}
