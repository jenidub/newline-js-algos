import BinarySearchTreeNode from '../BinarySearchTreeNode';

describe('BinarySearchTreeNode', () => {
  it('should create node', () => {
    const node = new BinarySearchTreeNode();

    expect(node).toBeDefined();

    expect(node.value).toBeNull();
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();

    const leftNode = new BinarySearchTreeNode(1);
    const rightNode = new BinarySearchTreeNode(3);
    const rootNode = new BinarySearchTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    expect(rootNode.value).toBe(2);
    expect(rootNode.left.value).toBe(1);
    expect(rootNode.right.value).toBe(3);
  });

  it('should set parent', () => {
    const leftNode = new BinarySearchTreeNode(1);
    const rightNode = new BinarySearchTreeNode(3);
    const rootNode = new BinarySearchTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    expect(rootNode.parent).toBeNull();
    expect(rootNode.left.parent.value).toBe(2);
    expect(rootNode.right.parent.value).toBe(2);
    expect(rootNode.right.parent).toEqual(rootNode);
  });

  it('should traverse node', () => {
    const leftNode = new BinarySearchTreeNode(1);
    const rightNode = new BinarySearchTreeNode(3);
    const rootNode = new BinarySearchTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3]);

    expect(rootNode.toString()).toBe('1,2,3');
  });

  it('should remove child node', () => {
    const leftNode = new BinarySearchTreeNode(1);
    const rightNode = new BinarySearchTreeNode(3);
    const rootNode = new BinarySearchTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3]);

    expect(rootNode.removeChild(rootNode.left)).toBe(true);
    expect(rootNode.traverseInOrder()).toEqual([2, 3]);

    expect(rootNode.removeChild(rootNode.right)).toBe(true);
    expect(rootNode.traverseInOrder()).toEqual([2]);

    expect(rootNode.removeChild(rootNode.right)).toBe(false);
    expect(rootNode.traverseInOrder()).toEqual([2]);
  });

  it('should replace child node', () => {
    const leftNode = new BinarySearchTreeNode(1);
    const rightNode = new BinarySearchTreeNode(3);
    const rootNode = new BinarySearchTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3]);

    const replacementNode = new BinarySearchTreeNode(5);
    rightNode.setRight(replacementNode);

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3, 5]);

    expect(rootNode.replaceChild(rootNode.right, rootNode.right.right)).toBe(true);
    expect(rootNode.right.value).toBe(5);
    expect(rootNode.right.right).toBeNull();
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5]);

    expect(rootNode.replaceChild(rootNode.right, rootNode.right.right)).toBe(false);
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5]);

    expect(rootNode.replaceChild(rootNode.right, replacementNode)).toBe(true);
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5]);

    expect(rootNode.replaceChild(rootNode.left, replacementNode)).toBe(true);
    expect(rootNode.traverseInOrder()).toEqual([5, 2, 5]);

    expect(rootNode.replaceChild(
      new BinarySearchTreeNode(),
      new BinarySearchTreeNode(),
    )).toBe(false);
  });

  it('should set null for left and right node', () => {
    const root = new BinarySearchTreeNode(2);
    const left = new BinarySearchTreeNode(1);
    const right = new BinarySearchTreeNode(3);

    root.setLeft(left);
    root.setRight(right);

    expect(root.left.value).toBe(1);
    expect(root.right.value).toBe(3);

    root.setLeft(null);
    root.setRight(null);

    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it('should be possible to set node values', () => {
    const node = new BinarySearchTreeNode('initial_value');

    expect(node.value).toBe('initial_value');

    node.setValue('new_value');

    expect(node.value).toBe('new_value');
  });

  it('should be possible to copy node', () => {
    const root = new BinarySearchTreeNode('root');
    const left = new BinarySearchTreeNode('left');
    const right = new BinarySearchTreeNode('right');

    root
      .setLeft(left)
      .setRight(right);

    expect(root.toString()).toBe('left,root,right');

    const newRoot = new BinarySearchTreeNode('new_root');
    const newLeft = new BinarySearchTreeNode('new_left');
    const newRight = new BinarySearchTreeNode('new_right');

    newRoot
      .setLeft(newLeft)
      .setRight(newRight);

    expect(newRoot.toString()).toBe('new_left,new_root,new_right');

    BinarySearchTreeNode.copyNode(root, newRoot);

    expect(root.toString()).toBe('left,root,right');
    expect(newRoot.toString()).toBe('left,root,right');
  });

  it('should create binary search tree', () => {
    const bstNode = new BinarySearchTreeNode(2);

    expect(bstNode.value).toBe(2);
    expect(bstNode.left).toBeNull();
    expect(bstNode.right).toBeNull();
  });

  it('should insert in itself if it is empty', () => {
    const bstNode = new BinarySearchTreeNode();
    bstNode.insert(1);

    expect(bstNode.value).toBe(1);
    expect(bstNode.left).toBeNull();
    expect(bstNode.right).toBeNull();
  });

  it('should insert nodes in correct order', () => {
    const bstNode = new BinarySearchTreeNode(2);
    const insertedNode1 = bstNode.insert(1);

    expect(insertedNode1.value).toBe(1);
    expect(bstNode.toString()).toBe('1,2');
    expect(bstNode.contains(1)).toBe(true);
    expect(bstNode.contains(3)).toBe(false);

    const insertedNode2 = bstNode.insert(3);

    expect(insertedNode2.value).toBe(3);
    expect(bstNode.toString()).toBe('1,2,3');
    expect(bstNode.contains(3)).toBe(true);
    expect(bstNode.contains(4)).toBe(false);

    bstNode.insert(7);

    expect(bstNode.toString()).toBe('1,2,3,7');
    expect(bstNode.contains(7)).toBe(true);
    expect(bstNode.contains(8)).toBe(false);

    bstNode.insert(4);

    expect(bstNode.toString()).toBe('1,2,3,4,7');
    expect(bstNode.contains(4)).toBe(true);
    expect(bstNode.contains(8)).toBe(false);

    bstNode.insert(6);

    expect(bstNode.toString()).toBe('1,2,3,4,6,7');
    expect(bstNode.contains(6)).toBe(true);
    expect(bstNode.contains(8)).toBe(false);
  });

  it('should not insert duplicates', () => {
    const bstNode = new BinarySearchTreeNode(2);
    bstNode.insert(1);

    expect(bstNode.toString()).toBe('1,2');
    expect(bstNode.contains(1)).toBe(true);
    expect(bstNode.contains(3)).toBe(false);

    bstNode.insert(1);

    expect(bstNode.toString()).toBe('1,2');
    expect(bstNode.contains(1)).toBe(true);
    expect(bstNode.contains(3)).toBe(false);
  });

  it('should find min node', () => {
    const node = new BinarySearchTreeNode(10);

    node.insert(20);
    node.insert(30);
    node.insert(5);
    node.insert(40);
    node.insert(1);

    expect(node.findMin()).not.toBeNull();
    expect(node.findMin().value).toBe(1);
  });

  it('should find node', () => {
    const node = new BinarySearchTreeNode(10);

    node.insert(20);
    node.insert(30);
    node.insert(5);
    node.insert(40);
    node.insert(1);

    expect(node.find(6)).toBeNull();
    expect(node.find(5)).not.toBeNull();
    expect(node.find(5).value).toBe(5);
  });

  it('should remove leaf nodes', () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);

    expect(bstRootNode.toString()).toBe('5,10,20');

    const removed1 = bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe('10,20');
    expect(removed1).toBe(true);

    const removed2 = bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe('10');
    expect(removed2).toBe(true);
  });

  it('should remove nodes with one child', () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);
    bstRootNode.insert(30);

    expect(bstRootNode.toString()).toBe('5,10,20,30');

    bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe('5,10,30');

    bstRootNode.insert(1);
    expect(bstRootNode.toString()).toBe('1,5,10,30');

    bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe('1,10,30');
  });

  it('should remove nodes with two children', () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);
    bstRootNode.insert(30);
    bstRootNode.insert(15);
    bstRootNode.insert(25);

    expect(bstRootNode.toString()).toBe('5,10,15,20,25,30');
    expect(bstRootNode.find(20).left.value).toBe(15);
    expect(bstRootNode.find(20).right.value).toBe(30);

    bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe('5,10,15,25,30');

    bstRootNode.remove(15);
    expect(bstRootNode.toString()).toBe('5,10,25,30');

    bstRootNode.remove(10);
    expect(bstRootNode.toString()).toBe('5,25,30');
    expect(bstRootNode.value).toBe(25);

    bstRootNode.remove(25);
    expect(bstRootNode.toString()).toBe('5,30');

    bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe('30');
  });

  it('should remove node with no parent', () => {
    const bstRootNode = new BinarySearchTreeNode();
    expect(bstRootNode.toString()).toBe('');

    bstRootNode.insert(1);
    bstRootNode.insert(2);
    expect(bstRootNode.toString()).toBe('1,2');

    bstRootNode.remove(1);
    expect(bstRootNode.toString()).toBe('2');

    bstRootNode.remove(2);
    expect(bstRootNode.toString()).toBe('');
  });

  it('should throw error when trying to remove not existing node', () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);

    function removeNotExistingElementFromTree() {
      bstRootNode.remove(30);
    }

    expect(removeNotExistingElementFromTree).toThrow();
  });

  it('should abandon removed node', () => {
    const rootNode = new BinarySearchTreeNode('foo');
    rootNode.insert('bar');
    const childNode = rootNode.find('bar');
    rootNode.remove('bar');

    expect(childNode.parent).toBeNull();
  });
});
