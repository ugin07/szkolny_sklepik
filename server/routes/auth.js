import express from 'express'; 
import {
  getUserByEmail,
  registerUser,
  validateUserPassword,
  getUserCount,
} from '../db/queries/users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane.' });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Użytkownik z tym adresem e-mail już istnieje.' });
    }

    const userCount = await getUserCount();
    const roleName = userCount === 0 ? 'admin' : 'user';

    const userId = await registerUser(firstName, lastName, email, password, roleName);
    return res.status(201).json({
      message: 'Użytkownik zarejestrowany pomyślnie.',
      userId,
      role: roleName,
    });
  } catch (err) {
    console.error('Błąd przy rejestracji:', err.message);
    res.status(500).json({ error: 'Błąd serwera przy rejestracji.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail i hasło są wymagane.' });
  }

  try {
    const user = await validateUserPassword(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Nieprawidłowy email lub hasło.' });
    }

    return res.status(200).json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error('Błąd przy logowaniu:', err.message);
    res.status(500).json({ error: 'Błąd serwera przy logowaniu.' });
  }
});

export default router;
