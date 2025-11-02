import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="card">
        <h3>Bem-vindo, {user?.name}!</h3>
        <p>Este é o sistema de gestão de equipamentos.</p>
        
        <div style={{ marginTop: '20px' }}>
          <Link to="/equipment" className="btn btn-primary" style={{ marginRight: '10px' }}>
            Gerenciar Equipamentos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;