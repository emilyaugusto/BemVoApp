import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Check, Edit } from 'lucide-react';
import './MedicationCard.css';

const isDue = (medication, now) => {
  if (medication.tomado || !medication.horario) {
    return false;
  }

  const [hours, minutes] = medication.horario.split(':').map(Number);
  
  const medTime = new Date();
  medTime.setHours(hours, minutes, 0, 0);

  const umaHoraAtras = new Date(now.getTime() - 60 * 60 * 1000); 
  const trintaMinutosFrente = new Date(now.getTime() + 30 * 60 * 1000);

  return medTime >= umaHoraAtras && medTime <= trintaMinutosFrente;
};


function MedicationCard({ medication, onMarcarComoTomado, profileType, currentTime }) {
  const navigate = useNavigate();

  const due = isDue(medication, currentTime);
  
  const cardClasses = `card ${medication.tomado ? 'taken' : ''} ${due ? 'due' : ''}`;

  return (
    <div className={cardClasses}>
      <div className="card-main">
        <div className="icon-container">
          {medication.tomado ? <Check size={20} /> : <Clock size={20} />}
        </div>
        <div className="card-info">
          <h2>{medication.nome}</h2>
          <p>{medication.dosagem}</p>
          <p className="time-info">
            <Clock size={14} style={{ color: '#9ca3af' }} />
            <span>{medication.horario}</span>
          </p>
        </div>
        <button className="edit-button" onClick={() => navigate(`/edit/${medication.id}`)}>
          <Edit size={18} />
        </button>
      </div>
      
      {medication.instrucoes && <p style={{ color: '#4b5563', fontSize: '14px', margin: '0 0 0 52px' }}>{medication.instrucoes}</p>}
      
      <div className="action-area">
        {medication.tomado ? (
          <p className="taken-message">✓ Tomado com sucesso</p>
        ) : (
          profileType === 'patient' && (
            <button className="take-button" onClick={() => onMarcarComoTomado(medication.id)}>
              Tomar
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default MedicationCard;