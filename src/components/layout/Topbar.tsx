import React, { useState, useEffect } from 'react';
import { Upload, ChevronRight, Play, Settings, Download, Loader2, Terminal, CheckCircle2 } from 'lucide-react';

interface TopbarProps {
  projectName: string;
}

export function Topbar({ projectName }: TopbarProps) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const mockLogs = [
    "[System] Allocating GPU resources...",
    "[Engine] Loading Consistency L3 config...",
    "[Model] Waking up SDXL & ControlNet nodes...",
    "[Shot 1] Injecting FaceID embeddings for [Role: Cyber_Girl]...",
    "[Shot 1] Rendering frame (1/84)...",
    "[Shot 1] Temporal smoothing applied.",
    "[Shot 2] Scene boundary detected, pre-filling latent space...",
    "[Shot 2] Rendering frame (42/120)...",
    "[Audio] Aligning spatial audio & caption tracks...",
    "[Engine] Stitching timeline clips (MP4 encode)...",
    "[System] Successfully finalized. Artifact saved to Storage."
  ];

  const handleExport = () => {
    setShowExportModal(true);
    setProgress(0);
    setLogs(["[System] Initializing Render Pipeline..."]);
    setIsDone(false);

    let currentLogIndex = 0;
    let p = 0;

    const interval = setInterval(() => {
      p += Math.random() * 4 + 1; // 1 to 5 percent jump
      if (p >= 100) p = 100;
      
      setProgress(p);

      if (Math.random() > 0.5 && currentLogIndex < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[currentLogIndex]]);
        currentLogIndex++;
      }

      if (p === 100) {
        clearInterval(interval);
        setLogs(prev => [...prev, mockLogs[mockLogs.length - 1]]);
        setIsDone(true);
      }
    }, 400);
  };

  return (
    <nav className="h-16 flex-none border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 z-40 relative">
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
        <button 
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 rounded-lg text-sm font-bold text-white transition-all shadow-lg shadow-orange-950/20 border border-orange-500/50"
        >
          <Play className="w-4 h-4 fill-white flex-shrink-0" />
          <span>合成完整成片</span>
        </button>
      </div>

      {/* Export Render Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl bg-[#0A0A0C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative">
            
            {/* Top Glow */}
            <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${isDone ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${progress}%` }}></div>
            <div className={`absolute top-0 left-0 right-0 h-32 blur-3xl opacity-20 pointer-events-none transition-colors duration-300 ${isDone ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>

            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-[#121214] z-10">
              <h2 className="text-xl font-bold text-white flex items-center">
                {isDone ? (
                  <><CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500" /> 渲染完成</>
                ) : (
                  <><Loader2 className="w-5 h-5 mr-3 text-orange-500 animate-spin" /> VRender 核心引擎合成中...</>
                )}
              </h2>
              {isDone && (
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            
            <div className="p-8 space-y-6 z-10">
              {/* Progress Bar Area */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">总体进度 (GLOBAL PROGRESS)</span>
                  <span className={`text-4xl font-mono font-bold tracking-tighter ${isDone ? 'text-emerald-400' : 'text-orange-400'}`}>
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-[#121214] border border-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${isDone ? 'bg-emerald-500' : 'bg-orange-500'} relative`}
                    style={{ width: `${progress}%` }}
                  >
                    {!isDone && <div className="absolute inset-0 bg-white/20 w-full h-full animate-[scrolling_2s_linear_infinite]" style={{ backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.4) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.4) 100%)', backgroundSize: '1rem 1rem' }}></div>}
                  </div>
                </div>
              </div>

              {/* Console Logs */}
              <div className="bg-[#050506] border border-white/10 rounded-lg p-4 h-48 overflow-y-auto font-mono text-[11px] leading-relaxed relative">
                <div className="absolute top-2 right-3 text-slate-600 flex items-center">
                  <Terminal className="w-3 h-3 mr-1" /> CONSOLE
                </div>
                <div className="space-y-1.5 pt-4">
                  {logs.map((log, i) => (
                    <div key={i} className={`${log.includes('Error') ? 'text-rose-500' : log.includes('Success') ? 'text-emerald-400' : 'text-slate-400'} flex items-start break-all`}>
                      <span className="mr-2 opacity-50 shrink-0">{'>'}</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  {!isDone && (
                    <div className="text-orange-500 animate-pulse flex items-center">
                      <span className="mr-2 opacity-50">{'>'}</span>
                      <span>_</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isDone && (
              <div className="px-6 py-4 border-t border-white/5 bg-[#121214] flex justify-end space-x-3 z-10">
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-sm font-bold transition-colors"
                >
                  关闭控制台
                </button>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-emerald-950/20 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" /> 导出并下载 MP4
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animation styles for progress bar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrolling {
          0% { background-position: 1rem 0; }
          100% { background-position: 0 0; }
        }
      `}} />
    </nav>
  );
}
