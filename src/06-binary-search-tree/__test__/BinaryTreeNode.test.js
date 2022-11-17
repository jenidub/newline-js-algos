import { BinaryTreeNode } from '../BinaryTreeNode';

describe('BinaryTreeNode', () => {
  it('should create default node', () => {
    const node = new BinaryTreeNode();

    expect(node.value).toBeNull();
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  it('should create node', () => {
    const node1 = new BinaryTreeNode(1);
    const node2 = new BinaryTreeNode(2);
    const node3 = new BinaryTreeNode(3);

    node1.left = node2;
    node1.right = node3;

    expect(node1.value).toBe(1);
    expect(node1.left).toBe(node2);
    expect(node1.right).toBe(node3);

    expect(node2.value).toBe(2);
    expect(node2.left).toBeNull();
    expect(node2.right).toBeNull();

    expect(node3.value).toBe(3);
    expect(node3.left).toBeNull();
    expect(node3.right).toBeNull();
  });

  it('should make it possible to assign nodes via setter methods', () => {
    const node1 = new BinaryTreeNode(1);
    const node2 = new BinaryTreeNode(2);
    const node3 = new BinaryTreeNode(3);

    node1.setLeft(node2);
    node1.setRight(node3);

    expect(node1.value).toBe(1);
    expect(node1.left).toBe(node2);
    expect(node1.right).toBe(node3);

    expect(node2.value).toBe(2);
    expect(node2.left).toBeNull();
    expect(node2.right).toBeNull();

    expect(node3.value).toBe(3);
    expect(node3.left).toBeNull();
    expect(node3.right).toBeNull();
  });
});
