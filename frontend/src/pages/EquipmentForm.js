import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    serialNumber: '',
    acquisitionDate: '',
    status: 'disponível',
    location: '',
    responsibleUserId: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
      }
    };

    fetchUsers();

    if (isEditing) {
      fetchEquipment();
    }
  }, [id, isEditing]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/equipment/${id}`);
      
      // Formatar a data para o formato esperado pelo input date
      const equipment = response.data;
      if (equipment.acquisitionDate) {
        equipment.acquisitionDate = equipment.acquisitionDate.split('T')[0];
      }
      
      setFormData(equipment);
    } catch (err) {
      console.error('Erro ao buscar equipamento:', err);
      setError('Falha ao carregar dados do equipamento');
    } finally {
      setLoading(false);
    }
  };

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
        await axios.put(`http://localhost:5000/api/equipment/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/equipment', formData);
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
            <label htmlFor="serialNumber">Número de Série</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              className="form-control"
              value={formData.serialNumber}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="acquisitionDate">Data de Aquisição</label>
            <input
              type="date"
              id="acquisitionDate"
              name="acquisitionDate"
              className="form-control"
              value={formData.acquisitionDate}
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
              <option value="disponível">Disponível</option>
              <option value="em uso">Em Uso</option>
              <option value="em manutenção">Em Manutenção</option>
              <option value="desativado">Desativado</option>
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
            <label htmlFor="responsibleUserId">Responsável</label>
            <select
              id="responsibleUserId"
              name="responsibleUserId"
              className="form-control"
              value={formData.responsibleUserId || ''}
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