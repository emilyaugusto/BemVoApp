import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';

function BottomNav() {
  const navBarStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70px',
    backgroundColor: 'white',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
    zIndex: 9999,
  };

  const navContentStyle = {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const linkStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#6b7280',
    fontSize: '12px',
    gap: '4px',
  };

  return (
    <nav style={navBarStyle}>
      <div style={navContentStyle}>
        <Link to="/" style={linkStyle}>
          <Home size={24} />
          Início
        </Link>
        <Link to="/profile" style={linkStyle}>
          <User size={24} />
          Perfil
        </Link>
      </div>
    </nav>
  );
}

export default BottomNav;