import * as SQLite from 'expo-sqlite';
import {Menu} from './Home';

import {DataType} from './utils';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'create table if not exists menuitems (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, price decimal(12, 2), description text, image text,category text);',
        );
      },
      reject,
      () => resolve(true),
    );
  });
}

export async function getMenuItems() {
  return new Promise<Menu[]>(resolve => {
    db.transaction(tx => {
      tx.executeSql('select * from menuitems', [], (_, {rows}) => {
        resolve(rows._array);
      });
    });
  });
}

const handleSQLParams = (menuItems: Menu[]) => {
  let txParams: (number | string)[] = [];
  let queryValues: string[] = [];

  menuItems.forEach(({name, price, description, image, category}) => {
    queryValues.push('(?, ?, ?, ?, ?)');
    txParams.push(name, price, description, image, category);
  });

  return {txParams, queryValues};
};

export function saveMenuItems(menuItems: Menu[]) {
  const {txParams, queryValues} = handleSQLParams(menuItems);

  return new Promise((resolve, reject) => {
    if (txParams.length && queryValues.length) {
      const sqlQuery = `insert into menuitems (name, price, description, image, category) values ${queryValues.join(
        ',',
      )}`;

      db.transaction(tx => {
        tx.executeSql(
          sqlQuery,
          txParams,
          (_, {rows}) => {
            resolve(rows._array);
          },
          (_, e) => {
            reject(e);
            return false;
          },
        );
      }, reject);
    } else {
      reject(false);
    }
  });
}

export async function filterByQueryAndCategories(
  query: string = '',
  activeCategories: string[],
) {
  let categoryQuery: string[] = [];

  activeCategories.forEach(_ => {
    categoryQuery.push('?');
  });

  const sqlQuery = `select * from menuitems WHERE name LIKE ?${
    categoryQuery.length ? ` AND category IN (${categoryQuery.join(',')})` : ``
  }`;

  const params = [
    `%${query}%`,
    ...(activeCategories.length ? activeCategories : []),
  ];

  return new Promise<Menu[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(sqlQuery, params, (_, {rows}) => {
        resolve(rows._array);
      });
    }, reject);
  });
}
