import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://trabalho-teste-production.up.railway.app/api/equipment');
      setEquipment(response.data);
      setError('');
    } catch (err) {
      console.error('Erro ao buscar equipamentos:', err);
      setError('Falha ao carregar equipamentos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este equipamento?')) {
      try {
        await axios.delete(`https://trabalho-teste-production.up.railway.app/api/equipment/${id}`);
        fetchEquipment();
      } catch (err) {
        console.error('Erro ao excluir equipamento:', err);
        setError('Falha ao excluir equipamento. Tente novamente mais tarde.');
      }
    }
  };

  if (loading) {
    return <div className="container">Carregando...</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Equipamentos</h1>
        <Link to="/equipment/new" className="btn btn-primary">
          Adicionar Equipamento
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {equipment.length === 0 ? (
        <div className="card">
          <p>Nenhum equipamento encontrado.</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Número de Série</th>
                <th>Status</th>
                <th>Localização</th>
                <th>Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.status}</td>
                  <td>{item.location}</td>
                  <td>{item.User?.name || 'Não atribuído'}</td>
                  <td>
                    <Link to={`/equipment/${item.id}`} className="btn btn-primary" style={{ marginRight: '5px' }}>
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EquipmentList;