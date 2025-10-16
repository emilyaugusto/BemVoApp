import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users } from 'lucide-react';
import './Welcome.css';
import logoImage from '../assets/logo.svg';

function Welcome({ onProfileChange }) {
  const navigate = useNavigate();

  const handleSelectProfile = (profile) => {
    onProfileChange(profile);
    navigate('/');
  };

  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <h1>Bem-vindo ao</h1>
        <img src={logoImage} alt="Logo BemVo" style={{ height: '42px' }} />
        <p style={{ marginTop: '20px', }}>Cuidado conectado, família tranquila.</p>
        <p style={{ marginTop: '38px', fontSize: '16px' }}>Para começar, quem é você?</p>
      </header>

      <div className="welcome-actions">
        <button 
          className="welcome-button primary"
          onClick={() => handleSelectProfile('patient')}
        >
          <User />
          Sou paciente
        </button>
        <button 
          className="welcome-button secondary"
          onClick={() => handleSelectProfile('caregiver')}
        >
          <Users />
          Sou familiar/cuidador
        </button>
      </div>
    </div>
  );
}

export default Welcome;