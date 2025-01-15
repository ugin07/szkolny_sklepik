import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'szkolny_sklepik',
  multipleStatements: true,
});

export default db;
