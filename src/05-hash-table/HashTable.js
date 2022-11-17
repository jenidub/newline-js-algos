import LinkedList from '../02-linked-list/LinkedList';

// Buckets number directly affects the number of collisions.
// The bigger the bucket number the less collisions we'll get.
// For demonstration purposes we set the hash table size to a
// smaller number to show how collisions are handled.
const defaultBucketsNumber = 32;

export class HashTable {
  /**
   * @param {number} bucketsNumber - Number of buckets that will hold hash table data.
   */
  constructor(bucketsNumber = defaultBucketsNumber) {
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.buckets = Array(bucketsNumber).fill(null).map(() => new LinkedList());
  }

  /**
   * Converts key string to hash number.
   *
   * @param {string} key
   * @return {number}
   */
  hash(key) {
    let hashCode = 0;

    // Let's go through all key characters and add their code to hash
    for (let characterIndex = 0; characterIndex < key.length; characterIndex += 1) {
      hashCode += key.charCodeAt(characterIndex);
    }

    // Reduce hash number so it would fit buckets table size.
    return hashCode % this.buckets.length;
  }

  /**
   * ADD or UPDATE the value by its key.
   *
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    // Calculate bucket index.
    const keyHash = this.hash(key);
    // Fetch linked list for specific bucket index.
    const bucketLinkedList = this.buckets[keyHash];
    // Perform 'find by key' operation in linked list.
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    // Check the value with specified key is already exists in linked list.
    if (!node) {
      // Insert new linked list node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing linked list node.
      node.value.value = value;
    }
  }

  /**
   * GET the value by its key.s
   *
   * @param {string} key
   * @return {*}
   */
  get(key) {
    // Calculate bucket index.
    const keyHash = this.hash(key);
    // Fetch linked list for specific bucket index.
    const bucketLinkedList = this.buckets[keyHash];
    // Perform 'find by key' operation in linked list.
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    // Check the value with specified key is already exists in linked list.
    return node ? node.value.value : undefined;
  }

  /**
   * DELETE the value by its key.
   *
   * @param {string} key
   * @return {boolean}
   */
  delete(key) {
    // Calculate bucket index.
    const keyHash = this.hash(key);
    // Fetch linked list for specific bucket index.
    const bucketLinkedList = this.buckets[keyHash];
    // Perform 'find by key' operation in linked list.
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    // Delete node from linked list if it exists there.
    if (node) {
      bucketLinkedList.delete(node.value);

      return true;
    }

    return false;
  }
}
