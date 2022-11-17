// Import HashTable class.
import { HashTable } from './HashTable';

// Create hash table instance.
const phoneBook = new HashTable();

// Add several contacts to the phone book.
phoneBook.set('John Smith', '+112342345678');
phoneBook.set('Bill Jones', '+111111111111');

// Now we may access each contact's phone in O(1) time.
phoneBook.get('John Smith'); // => '+112342345678'
phoneBook.get('Bill Jones'); // => ''+111111111111'

// Delete phone number.
phoneBook.delete('John Smith');
phoneBook.get('John Smith'); // => undefined
