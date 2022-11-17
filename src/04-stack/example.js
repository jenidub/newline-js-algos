// Import the Stack class.
import { Stack } from './Stack';

// Create stack instance.
const stack = new Stack();

// Create an array we want to reverse.
const arrayToReverse = ['a', 'b', 'c'];

stack.isEmpty(); // => true
stack.toString(); // => ''
stack.toArray(); // => []

// Let's add items to stack.
stack.push(arrayToReverse[0]);
stack.isEmpty(); // => false
stack.toString(); // => 'a'
stack.toArray(); // => ['a']

// Add more items to stack.
stack.push(arrayToReverse[1]);
stack.push(arrayToReverse[2]);
stack.toString(); // => 'c,b,a'
stack.toArray(); // ['c', 'b', 'a']

// Check what next.
stack.peek(); // => 'c'

// Pop from stack.
stack.pop(); // => 'c'
stack.pop(); // => 'b'
stack.pop(); // => 'a'

stack.isEmpty(); // => true
