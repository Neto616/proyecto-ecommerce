import React from 'react';
import '../css/login.css';

const Login = () => {
  return (
    <div className="clean-login">
      <div className="clean-header">
        <h1>MIEMPRESA</h1>
      </div>

      <div className="clean-login-card">
        <h2>Inicia sesión</h2>
        
        <form className="clean-form">
          <div className="clean-input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="correo"
              placeholder="tucorreo@ejemplo.com"
              autoComplete="username"
            />
          </div>

          <div className="clean-input-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="contrasena"
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
            />
            <a href="#" className="clean-password-help">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="clean-login-btn">Iniciar sesión</button>
        </form>

        <div className="clean-divider">
          <span>¿No tienes cuenta?</span>
        </div>

        <a href="#" className="clean-register-link">Crear cuenta</a>

        <div className="clean-social-login">
          <button type="button" className="clean-social-btn apple">
            Continuar con Apple
          </button>
          <button type="button" className="clean-social-btn facebook">
            Continuar con Facebook
          </button>
        </div>
      </div>

      <footer className="clean-footer">
        <p>© Términos y condiciones / Aviso de Privacidad © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Login;