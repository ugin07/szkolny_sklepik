import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

const Login = ({ onLogin, theme }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(formData);
      onLogin(response);
      setSuccessMessage(`Witaj, ${response.firstName} ${response.lastName}!`);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Błąd logowania. Sprawdź e-mail i hasło.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  return (
    <div
      className={`container mt-5 p-4 rounded shadow ${
        theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'
      }`}
      style={{ maxWidth: '500px', transition: 'background-color 0.3s, color 0.3s' }}
    >
      <h2 className="text-center">Logowanie</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Hasło</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ukryj' : 'Pokaż'}
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger text-center mt-3">{error}</div>}
        {successMessage && (
          <div className="alert alert-success text-center mt-3">{successMessage}</div>
        )}

        <button
          type="submit"
          className={`btn w-100 ${isFormValid ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? 'Proszę czekać...' : 'Zaloguj się'}
        </button>
      </form>
      <div className="text-center mt-3">
        <span>Nie masz konta? </span>
        <a href="/register" className="text-primary">
          Zarejestruj się
        </a>
      </div>
    </div>
  );
};

export default Login;
