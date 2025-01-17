import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from './utils';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);',
        [],
        () => resolve(),
        (err) => reject(err)
      );
    });
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO menuitems (uuid, title, price, category) VALUES ?',
      [menuItems.map((item) => [item.uuid, item.title, item.price, item.category])],
      () => console.log('Menu items saved successfully'),
      (err) => console.error('Error saving menu items:', err)
    );
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM menuitems 
         WHERE title LIKE ? AND category IN (${activeCategories.map(() => '?').join(',')})`,
        [`%${query}%`, ...activeCategories],
        (_, { rows }) => resolve(rows._array),
        (err) => reject(err)
      );
    });
  });
}

