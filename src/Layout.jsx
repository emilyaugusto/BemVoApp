import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './Components/navigation/BottomNav';

function Layout() {
  return (
    <>
      <main style={{ paddingBottom: '80px' }}>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}

export default Layout;