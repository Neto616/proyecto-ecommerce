import React, { useState } from 'react';
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('rubenalberto859@gmail.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para verificar el email
  };

  return (
    <div className="login-container">
      {/* Espacio para el logo */}
      <div className="logo-placeholder">
        <div className="logo-empty-space"></div>
      </div>

      <div className="login-content">
        <h2>Inicia sesión o crea una cuenta</h2>
        <p className="subtitle">para disfrutar de todos los beneficios</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="choncho-input"
            />
          </div>

          <button type="submit" className="continue-button">
            Continuar
          </button>
        </form>
      </div>

      {/* Footer con elementos a los extremos */}
      <footer className="login-footer">
        <div className="footer-content">
          <span className="copyright">© 2025 E-Commerce. Todos los derechos reservados.</span>
          <div className="legal-links">
            <a href="#">Términos y condiciones</a>
            <a href="#">Aviso de Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;