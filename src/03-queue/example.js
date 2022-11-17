// First, we need to import our Queue class.
import { Queue } from './Queue';

// Then we need to instantiate a queue.
const messageQueue = new Queue();

// Queue now is empty and there is no messages to process.
messageQueue.isEmpty(); // => true
messageQueue.toString(); // => ''

// Let's add new message to the queue.
messageQueue.enqueue('message_1');
messageQueue.isEmpty(); // => false
messageQueue.toString(); // => 'message_1'
messageQueue.peek(); // => 'message_1'

// Let's add one more message.
messageQueue.enqueue('message_2');
messageQueue.isEmpty(); // => false
messageQueue.toString(); // => 'message_1,message_2'
messageQueue.peek(); // => 'message_2'

// Now let's process this messages.
messageQueue.dequeue(); // => 'message_1'
messageQueue.dequeue(); // => 'message_2'

messageQueue.isEmpty(); // => true
