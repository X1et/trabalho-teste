import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { signed, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Sistema de Gestão de Equipamentos</Link>
      
      {signed ? (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/equipment" className="nav-link">Equipamentos</Link>
          </li>
          <li className="nav-item">
            <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none' }}>
              Sair
            </button>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Registrar</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;