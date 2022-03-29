import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// ---Logic for a method that GETs all the content from the database
export const getDb = async (content) => {

  console.log('GET from the database');

  const notesDb = await openDB('jate', 1);

  const tx = notesDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('Data saved to the database', result);
  return result;
}

// ---Logic to a method that accepts some content and adds it to the database (POST)
export const putDb = async (id, content) => {

  console.log('Post to the database');

  const notesDb = await openDB('jate', 1);

  const tx = notesDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({id: id, content: content});

  const result = await request;

  console.log('🚀 - data saved to the database', result);

};

initdb();
