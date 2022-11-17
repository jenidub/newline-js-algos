// Import dependencies
import BinarySearchTree from './BinarySearchTree';

// Create binary search tree instance.
const bstCollection = new BinarySearchTree();

// Add shopping items to our binary search tree collection.
// We will use items price as a keys.
bstCollection.insert(1220, { title: 'Phone' });
bstCollection.insert(3455, { title: 'TV' });
bstCollection.insert(8200, { title: 'Notebook' });
bstCollection.insert(120, { title: 'Remote Control' });

// Let's find the cheapest and most expensive items so far.
const minItem = bstCollection.findMin().data; // -> { title: 'Remote Control' }
const maxItem = bstCollection.findMax().data; // -> { title: 'Notebook' }

// Let's fins the item with the price 8200.
const item = bstCollection.find(3455).data; // -> { title: 'TV' }

// Remove the item from collection by price.
bstCollection.remove(120);
// Check what is the cheapest item at the moment.
const newMinItem = bstCollection.findMin().data; // -> { title: 'Phone' }

// Now we may use the data we've just fetched anyhow.
// eslint-disable-next-line no-console
console.log(minItem, maxItem, item, newMinItem);
