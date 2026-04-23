import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './components/views/Dashboard';
import { MaterialLibrary } from './components/views/MaterialLibrary';
import { ScriptEditor } from './components/views/ScriptEditor';
import { Storyboard } from './components/views/Storyboard';
import { Settings } from './components/views/Settings';
import { mockProject } from './data/mock';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'script':
        return <ScriptEditor />;
      case 'material':
        return <MaterialLibrary />;
      case 'storyboard':
        return <Storyboard />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-500 bg-[#050506]">
            {currentView} 视图建设中...
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050506] font-sans text-slate-300">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar projectName={mockProject.project_name} />
        <main className="flex-1 overflow-hidden relative">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
