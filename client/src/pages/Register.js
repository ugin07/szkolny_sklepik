import React, { useState } from 'react';
import { register } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register = ({ theme }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    latinOnly: false,
  });

  const [passwordStrength, setPasswordStrength] = useState('Nieokreślone');
  const [canRegister, setCanRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      const criteria = checkPasswordCriteria(value);
      setPasswordCriteria(criteria);
      const strength = getPasswordStrength(criteria, value.length);
      setPasswordStrength(strength);
      setCanRegister(strength === 'Średnie' || strength === 'Silne');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canRegister) return;

    try {
      await register(formData);
      setSuccessMessage(true);
      resetForm();
      setTimeout(() => {
        setSuccessMessage(false);
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
    }
  };

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
    resetCriteria();
  };

  const resetCriteria = () => {
    setPasswordCriteria({
      length: false,
      uppercase: false,
      number: false,
      specialChar: false,
      latinOnly: false,
    });
    setPasswordStrength('Nieokreślone');
    setCanRegister(false);
  };

  const checkPasswordCriteria = (password) => ({
    length: password.length >= 9,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    latinOnly: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(password),
  });

  const getPasswordStrength = (criteria, passLength) => {
    const { length, uppercase, number, specialChar } = criteria;
    const passedCount = [length, uppercase, number, specialChar].filter(Boolean).length;
    if (passedCount === 4 && passLength > 15) return 'Silne';
    if (passedCount === 4) return 'Średnie';
    if (passedCount >= 1) return 'Słabe';
    return 'Nieokreślone';
  };

  const getCircleColor = (condition) => (condition ? 'bg-success' : 'bg-danger');

  return (
    <div
      className={`container mt-5 p-4 rounded shadow ${
        theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'
      }`}
      style={{ maxWidth: '500px' }}
    >
      <h2 className="text-center">Rejestracja</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        {['firstName', 'lastName', 'email'].map((field) => (
          <div className="mb-3" key={field}>
            <label htmlFor={field} className="form-label">
              {field === 'firstName' ? 'Imię' : field === 'lastName' ? 'Nazwisko' : 'E-mail'}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              className="form-control"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Hasło
          </label>
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
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Ukryj' : 'Pokaż'}
            </button>
          </div>

          <div className="mt-3">
            <div className="progress mb-3">
              <div
                className={`progress-bar ${
                  passwordStrength === 'Silne'
                    ? 'bg-success'
                    : passwordStrength === 'Średnie'
                    ? 'bg-warning'
                    : 'bg-danger'
                }`}
                role="progressbar"
                style={{
                  width: `${
                    Object.values(passwordCriteria)
                      .slice(0, 4)
                      .filter(Boolean).length * 25
                  }%`,
                }}
              ></div>
            </div>

            <strong>Siła hasła: {passwordStrength}</strong>
            <ul className="list-unstyled mt-2">
              {[
                'Minimum 9 znaków',
                'Minimum 1 wielka litera',
                'Minimum 1 cyfra',
                'Minimum 1 znak specjalny',
                'Tylko znaki łacińskie',
              ].map((text, index) => (
                <li key={index} className="d-flex align-items-center">
                  <span
                    className={`rounded-circle ${
                      getCircleColor(Object.values(passwordCriteria)[index])
                    }`}
                    style={{ width: '15px', height: '15px', marginRight: '10px' }}
                  ></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="submit"
          className={`btn w-100 mt-3 ${canRegister ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!canRegister}
        >
          Zarejestruj się
        </button>
      </form>

      {successMessage && (
        <div className="alert alert-success text-center mt-4">
          <strong>Sukces!</strong> Rejestracja zakończona. Przekierowanie na logowanie...
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger text-center mt-4">
          <strong>Błąd!</strong> Nie udało się zarejestrować. Spróbuj ponownie.
        </div>
      )}
    </div>
  );
};

export default Register;
