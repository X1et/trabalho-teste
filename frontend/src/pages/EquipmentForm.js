import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    serial_number: '',
    acquisition_date: '',
    status: 'available',
    location: '',
    responsible_id: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEquipment = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await axios.get(`https://trabalho-teste-production.up.railway.app/api/equipment/${id}`);
      
      // Formatar a data para o formato esperado pelo input date
      const equipment = response.data;
      if (equipment.acquisition_date) {
        equipment.acquisition_date = equipment.acquisition_date.split('T')[0];
      }
      
      setFormData(equipment);
    } catch (err) {
      console.error('Erro ao buscar equipamento:', err);
      setError('Falha ao carregar dados do equipamento');
    } finally {
      setLoading(false);
  }
}, [id]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://trabalho-teste-production.up.railway.app/api/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    }
  };

  fetchUsers();
  
  if (isEditing) {
    fetchEquipment();
  }
}, [isEditing, fetchEquipment]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      if (isEditing) {
        await axios.put(`https://trabalho-teste-production.up.railway.app/api/equipment/${id}`, formData);
      } else {
        await axios.post('https://trabalho-teste-production.up.railway.app/api/equipment', formData);
      }
      
      navigate('/equipment');
    } catch (err) {
      console.error('Erro ao salvar equipamento:', err);
      setError('Falha ao salvar equipamento. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="container">Carregando...</div>;
  }

  return (
    <div className="container">
      <h1>{isEditing ? 'Editar Equipamento' : 'Novo Equipamento'}</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="serial_number">Número de Série</label>
            <input
              type="text"
              id="serial_number"
              name="serial_number"
              className="form-control"
              value={formData.serial_number}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="acquisition_date">Data de Aquisição</label>
            <input
              type="date"
              id="acquisition_date"
              name="acquisition_date"
              className="form-control"
              value={formData.acquisition_date}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="available">Disponível</option>
              <option value="in_use">Em Uso</option>
              <option value="maintenance">Em Manutenção</option>
              <option value="retired">Desativado</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Localização</label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="responsible_id">Responsável</label>
            <select
              id="responsible_id"
              name="responsible_id"
              className="form-control"
              value={formData.responsible_id || ''}
              onChange={handleChange}
            >
              <option value="">Selecione um responsável</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate('/equipment')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EquipmentForm;