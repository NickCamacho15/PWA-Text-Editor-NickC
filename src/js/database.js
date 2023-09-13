import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });

export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    await tx.store.add({ content });
    await tx.done;
    console.log('Content added to the database');
  } catch (error) {
    console.error('Could not add content to the database', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const allContent = await db.getAll('jate');
    console.log('All content retrieved from the database');
    return allContent;
  } catch (error) {
    console.error('Could not retrieve content from the database', error);
    return [];
  }
};

initdb();
