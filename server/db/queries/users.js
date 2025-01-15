import db from '../db.js';
import bcrypt from 'bcrypt';

export const getUserByEmail = async (email) => {
  try {
    const query = `
      SELECT u.*, r.role_name AS role
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.email = ?
    `;
    const [rows] = await db.query(query, [email]);
    return rows[0] || null;
  } catch (error) {
    console.error('Błąd podczas pobierania użytkownika po email:', error.message);
    throw new Error('Nie udało się pobrać informacji o użytkowniku.');
  }
};

export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  roleName = 'user'
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [roleResult] = await db.query(
      'SELECT id FROM roles WHERE role_name = ?',
      [roleName]
    );
    const roleId = roleResult[0]?.id || 1;

    const [result] = await db.query(
      'INSERT INTO users (first_name, last_name, email, password, role_id) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, roleId]
    );

    return result.insertId;
  } catch (error) {
    console.error('Błąd podczas rejestracji użytkownika:', error.message);
    throw new Error('Nie udało się zarejestrować użytkownika.');
  }
};

export const validateUserPassword = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    return passwordMatches ? user : null;
  } catch (error) {
    console.error('Błąd podczas weryfikacji hasła użytkownika:', error.message);
    throw new Error('Nie udało się zweryfikować hasła.');
  }
};

export const getUserCount = async () => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM users');
    return rows[0].count;
  } catch (error) {
    console.error('Błąd podczas pobierania liczby użytkowników:', error.message);
    throw new Error('Nie udało się pobrać liczby użytkowników.');
  }
};
