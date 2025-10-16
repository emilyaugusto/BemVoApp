import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Layout from './Layout';
import Home from './Pages/Home';
import AddMedication from './Pages/AddMedication';
import EditMedication from './Pages/EditMedication';
import Profile from './Pages/Profile';
import Welcome from './Pages/Welcome';


// DOCS: Alterámos os dados deste objeto para refletir o nome e email corretos.
const mockUser = {
  fullName: "Ana Julia",
  email: "anajulia@gmail.com",
  role: "Admin",
};

const listaInicial = [ /* ... */ ];

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [medicamentos, setMedicamentos] = useState(() => {
    try {
      const dadosGuardados = localStorage.getItem('bemvo_medicamentos');
      return dadosGuardados ? JSON.parse(dadosGuardados) : listaInicial;
    } catch (error) {
      console.error("Erro ao ler os medicamentos do localStorage:", error);
      return listaInicial;
    }
  });

  const [profileType, setProfileType] = useState(() => localStorage.getItem('bemvo_profile_type') || null);

  useEffect(() => { localStorage.setItem('bemvo_medicamentos', JSON.stringify(medicamentos)); }, [medicamentos]);

  useEffect(() => {
    if (profileType) {
      localStorage.setItem('bemvo_profile_type', profileType);
    } else {
      if (location.pathname !== '/welcome') {
        navigate('/welcome');
      }
    }
  }, [profileType, navigate, location.pathname]);

  

  const marcarComoTomado = (remedioId) => setMedicamentos(medicamentos.map(remedio => remedio.id === remedioId ? { ...remedio, tomado: true } : remedio));
  const adicionarMedicamento = (novoRemedio) => setMedicamentos([...medicamentos, { ...novoRemedio, id: Date.now(), tomado: false }]);
  const editarMedicamento = (id, dadosAtualizados) => setMedicamentos(medicamentos.map(remedio => remedio.id === id ? { ...remedio, ...dadosAtualizados } : remedio));
  const apagarMedicamento = (id) => setMedicamentos(medicamentos.filter(remedio => remedio.id !== id));
  const handleProfileChange = (newProfile) => setProfileType(newProfile);

  if (!profileType && location.pathname !== '/welcome') {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home medicamentos={medicamentos} onMarcarComoTomado={marcarComoTomado} profileType={profileType} />} />
        <Route path="add" element={<AddMedication onAdicionarMedicamento={adicionarMedicamento} />} />
        <Route path="edit/:id" element={<EditMedication medicamentos={medicamentos} onEditarMedicamento={editarMedicamento} onApagarMedicamento={apagarMedicamento} />} />
        {/* DOCS: O componente Profile receberá o objeto 'mockUser' atualizado. */}
        <Route path="profile" element={<Profile user={mockUser} currentProfile={profileType} onProfileChange={handleProfileChange} medicamentos={medicamentos}/>} />
      </Route>
      <Route path="/welcome" element={<Welcome onProfileChange={handleProfileChange} />} />
      <Route path="*" element={<Navigate to={profileType ? "/" : "/welcome"} />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;