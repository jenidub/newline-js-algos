import LinkedList from '../02-linked-list/LinkedList';

export class Queue {
  constructor() {
    // We're going to implement Queue based on LinkedList.
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    // The queue is empty in case if its linked list don't have tail.
    return !this.linkedList.head;
  }

  /**
   * @return {*}
   */
  peek() {
    if (!this.linkedList.head) {
      // If linked list is empty then there is nothing to peek.
      return null;
    }

    // Just read the value from the end of linked list without deleting it.
    return this.linkedList.head.value;
  }

  /**
   * @param {*} value
   */
  enqueue(value) {
    // Enqueueing means to stand in the line. Therefore let's just add
    // new value at the beginning of the linked list. It will need to wait
    // until all previous nodes will be processed.
    this.linkedList.append(value);
  }

  /**
   * @return {*}
   */
  dequeue() {
    // Let's try to delete the first node from linked list (the head).
    // If there is no head in linked list (it is empty) just return null.
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * @param [callback]
   * @return {string}
   */
  toString(callback) {
    // Return string representation of the queue's linked list.
    return this.linkedList.toString(callback);
  }
}
