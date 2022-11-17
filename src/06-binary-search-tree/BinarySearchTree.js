import BinarySearchTreeNode from './BinarySearchTreeNode';

export default class BinarySearchTree {
  constructor() {
    this.root = new BinarySearchTreeNode(null);
  }

  /**
   * Find the node by its value.
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  find(value) {
    return this.root.find(value);
  }

  /**
   * Find the node with min value.
   * @return {BinarySearchTreeNode}
   */
  findMin() {
    return this.root.findMin();
  }

  /**
   * Find the node with max value.
   * @return {BinarySearchTreeNode}
   */
  findMax() {
    return this.root.findMax();
  }

  /**
   * Insert the new node in a tree.
   * @param {*} value
   * @param {*} [data] - node data (could be anything).
   * @return {BinarySearchTreeNode}
   */
  insert(value, data = null) {
    return this.root.insert(value, data);
  }

  /**
   * Check if tree contains the node with specific value.
   * @param {*} value
   * @return {boolean}
   */
  contains(value) {
    return this.root.contains(value);
  }

  /**
   * Remove the node from a tree by its value.
   * @param {*} value
   * @return {boolean}
   */
  remove(value) {
    return this.root.remove(value);
  }

  /**
   * Convert tree to string.
   * @return {string}
   */
  toString() {
    return this.root.toString();
  }
}
