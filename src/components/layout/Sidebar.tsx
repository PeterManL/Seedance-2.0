import React from 'react';
import { PlaySquare, Image as ImageIcon, FileText, LayoutDashboard, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
    { id: 'script', label: '脚本解析', icon: FileText },
    { id: 'material', label: '素材资产 (核心)', icon: ImageIcon },
    { id: 'storyboard', label: '视频分镜', icon: PlaySquare },
    { id: 'settings', label: '项目设置', icon: Settings },
  ];

  return (
    <aside className="w-56 flex-none border-r border-white/5 bg-[#0A0A0C] p-4 flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <span className="text-xl font-semibold tracking-tight text-white">Seedance <span className="text-orange-500">2.0</span></span>
      </div>
      
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">
          视频创作工作流
        </p>
        
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                    isActive 
                      ? 'bg-orange-500/10 text-orange-400 font-medium' 
                      : 'hover:bg-white/5 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="mt-auto border-t border-white/5 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-sm font-medium text-white">
            U
          </div>
          <div>
            <div className="text-xs font-medium text-white">当前用户</div>
            <div className="text-[10px] text-slate-500">基础版方案</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
