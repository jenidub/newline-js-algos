// Import MinHeap class.
import { MinHeap } from './MinHeap';

// Create min-heap instance.
const minHeap = new MinHeap();

minHeap.isEmpty(); // => true

// Add new element to min-heap.
minHeap.add(5);
minHeap.isEmpty(); // => false
minHeap.peek(); // => 3
minHeap.toString(); // => '5'

// Add more elements.
minHeap.add(3);
// Peek operation will always return the minimum element of the heap.
minHeap.peek(); // => 3
minHeap.toString(); // => '3,5'

minHeap.add(10);
minHeap.peek(); // => 3
minHeap.toString(); // => '3,5,10'

// Extract the minimum value out of a heap.
minHeap.poll(); // => 3
minHeap.peek(); // => 5
minHeap.toString(); // => '5,10'

// Remove element from a heap.
minHeap.remove(10);
minHeap.peek(); // => 5
minHeap.toString(); // => '5'
