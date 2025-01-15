import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initFilePath = path.resolve(__dirname, 'init.sql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true,
};

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query('CREATE DATABASE IF NOT EXISTS szkolny_sklepik');
    console.log('Baza danych "szkolny_sklepik" została pomyślnie utworzona lub już istnieje.');
    await connection.end();

    const pool = mysql.createPool({ ...dbConfig, database: 'szkolny_sklepik' });

    if (!fs.existsSync(initFilePath)) {
      throw new Error(`Plik ${initFilePath} nie został znaleziony.`);
    }

    const sql = fs.readFileSync(initFilePath, 'utf8');
    await pool.query(sql);
    console.log('Struktura bazy danych została pomyślnie załadowana z pliku init.sql.');
    await pool.end();
  } catch (err) {
    console.error('Błąd podczas inicjalizacji bazy danych:', err.message);
  }
}

initializeDatabase();
