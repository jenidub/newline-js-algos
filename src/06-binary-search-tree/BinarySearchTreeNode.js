export default class BinarySearchTreeNode {
  /**
   * @param {*} [value] - node value.
   * @param {*} [data] - node data (could be anything).
   */
  constructor(value = null, data = null) {
    this.left = null; // Pointer to the left child.
    this.right = null; // Pointer to the right child.
    this.parent = null; // Pointer to the parent node.
    this.value = value;
    this.data = data;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  setValue(value) {
    this.value = value;

    return this;
  }

  /**
   * @param {*} data
   * @return {BinarySearchTreeNode}
   */
  setData(data) {
    this.data = data;

    return this;
  }

  /**
   * @param {BinarySearchTreeNode} node
   * @return {BinarySearchTreeNode}
   */
  setLeft(node) {
    // Reset parent for left node since it is going to be detached.
    if (this.left) {
      this.left.parent = null;
    }

    // Attach new node to the left.
    this.left = node;

    // Make current node to be a parent for new left one.
    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  /**
   * @param {BinarySearchTreeNode} node
   * @return {BinarySearchTreeNode}
   */
  setRight(node) {
    // Reset parent for right node since it is going to be detached.
    if (this.right) {
      this.right.parent = null;
    }

    // Attach new node to the right.
    this.right = node;

    // Make current node to be a parent for new right one.
    if (node) {
      this.right.parent = this;
    }

    return this;
  }

  /**
   * @param {BinarySearchTreeNode} nodeToRemove
   * @return {boolean}
   */
  removeChild(nodeToRemove) {
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      return true;
    }

    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      return true;
    }

    return false;
  }

  /**
   * @param {BinarySearchTreeNode} nodeToReplace
   * @param {BinarySearchTreeNode} replacementNode
   * @return {boolean}
   */
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.left === nodeToReplace) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.right === nodeToReplace) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }

  /**
   * @param {BinarySearchTreeNode} sourceNode
   * @param {BinarySearchTreeNode} targetNode
   */
  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setData(sourceNode.data);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  /**
   * @param {*} value
   * @param {*} [data] - node data (could be anything).
   * @return {BinarySearchTreeNode}
   */
  insert(value, data) {
    if (this.value === null) {
      this.value = value;
      this.data = data;

      return this;
    }

    if (value < this.value) {
      // Insert to the left.
      if (this.left) {
        return this.left.insert(value, data);
      }

      const newNode = new BinarySearchTreeNode(value, data);
      this.setLeft(newNode);

      return newNode;
    }

    if (value > this.value) {
      // Insert to the right.
      if (this.right) {
        return this.right.insert(value, data);
      }

      const newNode = new BinarySearchTreeNode(value, data);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  find(value) {
    // Check the root.
    if (this.value === value) {
      return this;
    }

    if (value < this.value && this.left) {
      // Check left nodes.
      return this.left.find(value);
    }

    if (value > this.value && this.right) {
      // Check right nodes.
      return this.right.find(value);
    }

    return null;
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  contains(value) {
    return !!this.find(value);
  }

  /**
   * @return {BinarySearchTreeNode}
   */
  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }

  /**
   * @return {BinarySearchTreeNode}
   */
  findMax() {
    if (!this.right) {
      return this;
    }

    return this.right.findMax();
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error('Item not found in the tree');
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // Node is a leaf and thus has no children.
      if (parent) {
        // Node has a parent. Just remove the pointer to this node from the parent.
        parent.removeChild(nodeToRemove);
      } else {
        // Node has no parent. Just erase current node value.
        nodeToRemove.setValue(undefined);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // Node has two children.
      // Find the next biggest value (minimum value in the right branch)
      // and replace current value node with that next biggest value.
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (nextBiggerNode !== nodeToRemove.right) {
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        // In case if next right value is the next bigger one and it doesn't have left child
        // then just replace node that is going to be deleted with the right node.
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      // Node has only one child.
      // Make this child to be a direct child of current node's parent.
      /** @var BinarySearchTreeNode */
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinarySearchTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    // Clear the parent of removed node.
    nodeToRemove.parent = null;

    return true;
  }

  /**
   * @return {*[]}
   */
  traverseInOrder() {
    let traverse = [];

    // Add left node.
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    // Add root.
    traverse.push(this.value);

    // Add right node.
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.traverseInOrder().toString();
  }
}
