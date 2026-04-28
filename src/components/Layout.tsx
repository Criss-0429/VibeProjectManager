import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout: React.FC<{ children: React.ReactNode, currentView: string, onChangeView: (v: string) => void }> = ({ children, currentView, onChangeView }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-color)]">
      <Sidebar currentView={currentView} onChangeView={onChangeView} />
      <main className="flex-1 h-full overflow-y-auto bg-[var(--bg-color)] relative">
        {children}
      </main>
    </div>
  );
};
