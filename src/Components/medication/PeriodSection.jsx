import React from 'react';
import MedicationCard from './MedicationCard';

function PeriodSection({ title, medications, onMarcarComoTomado, profileType, currentTime }) {

  if (medications.length === 0) {
    return null;
  }
  const pendingCount = medications.filter(m => !m.tomado).length;

  return (
    <section style={{ marginBottom: '30px' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{title}</h2>
        <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '14px' }}>
          {pendingCount} pendente{pendingCount !== 1 ? 's' : ''}
        </span>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {medications.map((remedio) => (
          <MedicationCard
            key={remedio.id}
            medication={remedio}
            onMarcarComoTomado={onMarcarComoTomado}
            profileType={profileType} 
            currentTime={currentTime}
          />
        ))}
      </div>
    </section>
  );
}

export default PeriodSection;