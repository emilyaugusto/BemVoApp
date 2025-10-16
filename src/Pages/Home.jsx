import React from 'react';
import { useNavigate } from 'react-router-dom';
import PeriodSection from '../Components/medication/PeriodSection';
import { Plus } from 'lucide-react';

const getPeriodFromTime = (time) => {
  if (typeof time !== 'string' || !time.includes(':')) return null;
  const hour = parseInt(time.split(':')[0], 10);
  if (isNaN(hour)) return null;

  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'night';
};

function Home({ medicamentos, onMarcarComoTomado, profileType }) {
  const navigate = useNavigate();

  const getMedicationsByPeriod = (period) => {
    if (!Array.isArray(medicamentos)) return [];
    return medicamentos
      .filter(med => getPeriodFromTime(med.horario) === period)
      .sort((a, b) => (a.tomado - b.tomado) || (a.horario || "").localeCompare(b.horario || ""));
  };

  const getSortedPeriods = () => {
    try {
      if (!Array.isArray(medicamentos) || medicamentos.length === 0) return ['morning', 'afternoon', 'night'];
      const now = new Date();
      const currentTimeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const pendingMeds = medicamentos.filter(med => !med.tomado && med.horario);
      if (pendingMeds.length === 0) return ['morning', 'afternoon', 'night'];
      const laterToday = pendingMeds.filter(med => med.horario >= currentTimeString).sort((a,b) => a.horario.localeCompare(b.horario));
      const tomorrow = pendingMeds.filter(med => med.horario < currentTimeString).sort((a,b) => a.horario.localeCompare(b.horario));
      const nextMed = laterToday[0] || tomorrow[0];
      if (!nextMed) return ['morning', 'afternoon', 'night'];
      const nextPeriod = getPeriodFromTime(nextMed.horario);
      if (!nextPeriod) return ['morning', 'afternoon', 'night'];
      const periodOrder = ['morning', 'afternoon', 'night'];
      const nextPeriodIndex = periodOrder.indexOf(nextPeriod);
      return periodOrder.slice(nextPeriodIndex).concat(periodOrder.slice(0, nextPeriodIndex));
    } catch (error) {
      console.error("ERRO na função getSortedPeriods:", error);
      return ['morning', 'afternoon', 'night'];
    }
  };
  
  const sortedPeriods = getSortedPeriods();
  const periodDetails = { morning: { title: "Manhã" }, afternoon: { title: "Tarde" }, night: { title: "Noite" } };
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const pageTitle = profileType === 'patient' ? 'Meus Remédios' : 'Remédios do Paciente';
  const fabStyle = {
    position: 'fixed', bottom: '90px', right: '30px', width: '60px', height: '60px',
    borderRadius: '50%', backgroundColor: '#10B981', color: 'white', border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1000
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{pageTitle}</h1>
        <p style={{ fontSize: '16px', color: '#666', margin: 0, textTransform: 'capitalize' }}>{dataFormatada}</p>
      </header>

      {profileType === 'caregiver' && (
        <div style={{backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '12px', padding: '16px', marginBottom: '20px'}}>
          <p style={{margin: 0, color: '#1E40AF', fontWeight: '500'}}>
            A visualizar como Cuidador. Num app real, aqui poderias selecionar qual paciente queres ver.
          </p>
        </div>
      )}
      
      {medicamentos && medicamentos.length > 0 ? (
        sortedPeriods.map(period => (
          <PeriodSection
            key={period}
            title={periodDetails[period].title}
            medications={getMedicationsByPeriod(period)}
            onMarcarComoTomado={onMarcarComoTomado}
            profileType={profileType}
          />
        ))
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">💊</div>
          <h3>Nenhum medicamento</h3>
          <p>Clique no botão '+' para adicionar o seu primeiro remédio.</p>
        </div>
      )}

      <button style={fabStyle} onClick={() => navigate('/add')}>
        <Plus size={32} />
      </button>
    </div>
  );
}

export default Home;