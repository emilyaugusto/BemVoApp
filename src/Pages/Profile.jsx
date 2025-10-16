import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Shield } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Profile.css';
import './Form.css';

function Profile({ user, currentProfile, onProfileChange, medicamentos }) {
  const navigate = useNavigate();
  const userInitial = user.fullName ? user.fullName[0].toUpperCase() : '?';

  const totalMeds = medicamentos.length;
  const takenMeds = medicamentos.filter(m => m.tomado).length;
  const pendingMeds = totalMeds - takenMeds;
  const percentage = totalMeds > 0 ? Math.round((takenMeds / totalMeds) * 100) : 0;

  const chartData = [
    { name: 'Tomados', value: takenMeds },
    { name: 'Pendentes', value: pendingMeds },
  ];
  const COLORS = ['#0D9488', '#E5E7EB'];

  const handleLogout = () => {
    if (window.confirm("Tem a certeza que deseja sair?")) {
      navigate('/welcome');
    }
  };

  return (
    <div className="profile-page">
      <h1>Meu Perfil</h1>
      
<div className="profile-card">
        <div className="profile-card-header">
          <div className="avatar">
            {userInitial}
          </div>
          <div className="user-details">
            <h2>{user.fullName}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="profile-card-body">
          <div className="info-row">
            <Mail size={20} />
            <p>{user.email}</p>
          </div>
          <div className="info-row">
            <Shield size={20} />
            <p>{user.role}</p>
          </div>
        </div>
      </div>

      <div className="progress-chart-container">
        <h3>Progresso de Hoje</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                paddingAngle={takenMeds > 0 && pendingMeds > 0 ? 2 : 0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-percentage">{`${percentage}%`}</div>
        </div>
      </div>

      
      
      <div className="form-group">
        <label className="form-label">Tipo de Perfil</label>
        <select 
          value={currentProfile} 
          onChange={(e) => onProfileChange(e.target.value)}
          className="form-input"
        >
          <option value="patient">Paciente</option>
          <option value="caregiver">Familiar/Cuidador</option>
        </select>
      </div>

      <div className="info-box">
        <h3>ℹ️ Sobre o BemVo</h3>
        <p>
          O BemVo foi criado para ajudar você a gerenciar seus medicamentos de forma simples e segura.
        </p>
      </div>

      <button onClick={handleLogout} className="logout-button">Sair</button>
    </div>
  );
}

export default Profile;