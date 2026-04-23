import React from 'react';
import { Upload, ChevronRight, Play } from 'lucide-react';

interface TopbarProps {
  projectName: string;
}

export function Topbar({ projectName }: TopbarProps) {
  return (
    <nav className="h-16 flex-none border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between px-6">
      <div className="flex items-center space-x-2 text-sm text-slate-400">
        <span>项目</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white font-medium">{projectName}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs transition-colors text-slate-300">
          <Upload className="w-3 h-3" />
          <span>本地素材导入</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-sm font-bold text-white transition-colors shadow-lg shadow-orange-950/20">
          <Play className="w-4 h-4" />
          <span>合成成片</span>
        </button>
      </div>
    </nav>
  );
}
