import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function AddMedication({ onAdicionarMedicamento }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '', dosagem: '', horario: '', instrucoes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.horario) {
      alert('Por favor, preencha pelo menos o nome e o horário.');
      return;
    }
    onAdicionarMedicamento(formData);
    navigate('/');
  };

  return (
    <div className="form-page">
      <header className="form-header">
        <button onClick={() => navigate('/')} className="back-button">
          &larr; Voltar
        </button>
        <h1>Adicionar Remédio</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Nome do Remédio</label>
          <input name="nome" value={formData.nome} onChange={handleChange} className="form-input" type="text" placeholder="ex: Losartana" />
        </div>
        <div className="form-group">
          <label className="form-label">Dosagem</label>
          <input name="dosagem" value={formData.dosagem} onChange={handleChange} className="form-input" type="text" placeholder="ex: 50mg" />
        </div>
        <div className="form-group">
          <label className="form-label">Horário</label>
          <input name="horario" value={formData.horario} onChange={handleChange} className="form-input" type="time" />
        </div>
        <div className="form-group">
          <label className="form-label">Instruções (opcional)</label>
          <textarea name="instrucoes" value={formData.instrucoes} onChange={handleChange} className="form-textarea" placeholder="ex: Tomar em jejum"></textarea>
        </div>
        
        <button type="submit" className="form-button">Agendar remédio</button>
      </form>
    </div>
  );
}

export default AddMedication;