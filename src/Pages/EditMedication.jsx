import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Form.css';

function EditMedication({ medicamentos, onEditarMedicamento, onApagarMedicamento }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ nome: '', dosagem: '', horario: '', instrucoes: '' });

  useEffect(() => {
    const remedioParaEditar = medicamentos.find(m => m.id == id);
    if (remedioParaEditar) {
      setFormData(remedioParaEditar);
    }
  }, [medicamentos, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditarMedicamento(formData.id, formData);
    navigate('/');
  };

  const handleApagar = () => {
    const temCerteza = window.confirm("Tem a certeza que deseja apagar este medicamento? Esta ação não pode ser desfeita.");
    if (temCerteza) {
      onApagarMedicamento(formData.id);
      navigate('/');
    }
  };

  return (
    <div className="form-page">
      <header className="form-header">
        <button onClick={() => navigate('/')} className="back-button">&larr; Voltar</button>
        <h1>Editar Remédio</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Nome do Remédio</label>
          <input name="nome" value={formData.nome} onChange={handleChange} className="form-input" type="text" />
        </div>
        <div className="form-group">
          <label className="form-label">Dosagem</label>
          <input name="dosagem" value={formData.dosagem} onChange={handleChange} className="form-input" type="text" />
        </div>
        <div className="form-group">
          <label className="form-label">Horário</label>
          <input name="horario" value={formData.horario} onChange={handleChange} className="form-input" type="time" />
        </div>
        <div className="form-group">
          <label className="form-label">Instruções (opcional)</label>
          <textarea name="instrucoes" value={formData.instrucoes} onChange={handleChange} className="form-textarea"></textarea>
        </div>
        
        <button type="submit" className="form-button">Salvar Alterações</button>
        <button type="button" onClick={handleApagar} className="form-button form-button-delete">
          Apagar Remédio
        </button>
      </form>
    </div>
  );
}

export default EditMedication;