import React, { useState } from 'react';
import { Wand2, AlignLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { mockProject } from '../../data/mock';

export function ScriptEditor() {
  const [script, setScript] = useState(mockProject.script_origin);
  const [isParsing, setIsParsing] = useState(false);
  const [parsed, setParsed] = useState(false);

  const handleParse = () => {
    if (!script.trim()) return;
    setIsParsing(true);
    setParsed(false);
    
    // Simulate AI parsing delay
    setTimeout(() => {
      setIsParsing(false);
      setParsed(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setParsed(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-[#050506] text-slate-300">
      <div className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">脚本与分镜解析</h1>
            <p className="text-sm text-slate-500">输入视频文本脚本，AI将自动提取角色、场景、道具并拆解为标准分镜序列。</p>
          </div>
          
          {parsed && (
            <div className="flex items-center text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              <span className="text-sm font-bold">解析成功！分镜更新至时间轴</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col bg-[#121214] rounded-xl border border-white/5 overflow-hidden shadow-2xl relative">
          {/* Overlay loader */}
          {isParsing && (
            <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
              <p className="text-white font-bold">AI 正在深度拆解分镜...</p>
              <p className="text-xs text-slate-400 mt-2">检索匹配素材库特征中</p>
            </div>
          )}

          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-black/20">
             <div className="flex items-center text-sm font-medium text-slate-300">
               <AlignLeft className="w-4 h-4 mr-2 text-slate-500" />
               原始文案输入
             </div>
             <button 
               onClick={handleParse}
               disabled={isParsing || !script.trim()}
               className="flex items-center space-x-2 px-4 py-1.5 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none rounded-lg text-sm text-white font-bold transition-colors shadow-lg shadow-orange-950/20"
             >
              <Wand2 className="w-4 h-4" />
              <span>智能拆解分镜</span>
             </button>
          </div>
          <textarea
            className="flex-1 w-full p-6 bg-transparent resize-none text-white text-base leading-relaxed focus:outline-none"
            placeholder="在此输入您的视频故事文案，例如：'在一个漆黑的夜晚，主角拔出了发光的宝剑，走向城堡...'"
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
        </div>
        
        <div className="mt-6 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="text-sm font-bold text-orange-400 mb-2">💡 解析提示</h4>
          <ul className="text-sm text-slate-400 space-y-1 list-disc pl-5">
            <li>尽可能详细地描述人物的特征（白衣、长发）以方便生成精确的角色基准。</li>
            <li>标点符号（句号、换行）将作为默认的镜头切割参考。</li>
            <li>解析后，系统将自动比对「统一素材资产库」，如果库中已有匹配角色/场景，将自动绑定复用。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
