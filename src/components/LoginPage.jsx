import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin, loading, error }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = async (event) => {
    event.preventDefault();
    onLogin(login.trim(), password, role);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Вход в личный кабинет</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Логин
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин"
              required
            />
          </label>

          <label>
            Пароль
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </label>

          <label>
            Роль
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Студент</option>
              <option value="teacher">Преподаватель</option>
            </select>
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Выполняется вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
