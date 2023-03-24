import * as SQLite from 'expo-sqlite';

import {DataType} from './utils';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);',
        );
      },
      reject,
      () => resolve(true),
    );
  });
}

export async function getMenuItems() {
  return new Promise<DataType[]>(resolve => {
    db.transaction(tx => {
      tx.executeSql('select * from menuitems', [], (_, {rows}) => {
        resolve(rows._array);
      });
    });
  });
}

// const handleSQLParams = (menuItems: DataType[]) => {
//   let txParams: (number | string)[] = [];
//   let queryValues: string[] = [];

//   menuItems.forEach(({id, title, price, category}) => {
//     queryValues.push('(?, ?, ?, ?)');
//     txParams.push(id, title, price, (category as {title: string}).title);
//   });

//   return {txParams, queryValues};
// };

// export function saveMenuItems(menuItems: DataType[]) {
//   const {txParams, queryValues} = handleSQLParams(menuItems);

//   return new Promise((resolve, reject) => {
//     if (txParams.length && queryValues.length) {
//       const sqlQuery = `insert into menuitems (uuid, title, price,category) values ${queryValues.join(
//         ',',
//       )}`;

//       db.transaction(tx => {
//         tx.executeSql(
//           sqlQuery,
//           txParams,
//           (_, {rows}) => {
//             resolve(rows._array);
//           },
//           (_, e) => {
//             reject(e);
//             return false;
//           },
//         );
//       }, reject);
//     } else {
//       reject(false);
//     }
//   });
// }

export async function filterByQueryAndCategories(
  query: string = '',
  activeCategories: string[],
) {
  let categoryQuery: string[] = [];

  activeCategories.forEach(_ => {
    categoryQuery.push('?');
  });

  const sqlQuery = `select * from menuitems WHERE title LIKE ?${
    categoryQuery.length ? ` AND category IN (${categoryQuery.join(',')})` : ``
  }`;

  const params = [
    `%${query}%`,
    ...(activeCategories.length ? activeCategories : []),
  ];

  return new Promise<DataType[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(sqlQuery, params, (_, {rows}) => {
        resolve(rows._array);
      });
    }, reject);
  });
}
