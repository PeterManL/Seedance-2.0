import React, { useState } from 'react';
import { Search, Filter, Lock, Unlock, Eye, MoreHorizontal, Layers, Fingerprint, Plus, Zap, Loader2 } from 'lucide-react';
import { Material, MaterialType } from '../../types';
import { mockMaterials } from '../../data/mock';

export function MaterialLibrary() {
  const [activeTab, setActiveTab] = useState<MaterialType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(mockMaterials[0]);
  
  // AI Generation Modal State
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowGenerateModal(false);
      // Mock generation success logic would go here
    }, 2500);
  };

  const filteredMaterials = mockMaterials.filter(mat => {
    if (activeTab !== 'all' && mat.material_type !== activeTab) return false;
    if (searchQuery && !mat.material_name.includes(searchQuery) && !mat.material_tag.some(t => t.includes(searchQuery))) return false;
    return true;
  });

  const tabs: { id: MaterialType | 'all'; label: string }[] = [
    { id: 'all', label: '全部资产' },
    { id: 'role', label: '角色 (Role)' },
    { id: 'scene', label: '场景 (Scene)' },
    { id: 'prop', label: '道具 (Prop)' },
    { id: 'style', label: '风格 (Style)' }
  ];

  return (
    <div className="flex h-full bg-[#050506] text-slate-300">
      {/* Main Library Area */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-white/5">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-2xl font-bold text-white mb-2">统一素材资产库</h1>
          <p className="text-sm text-slate-500">全局一致性的源头，所有素材可永久复用、二次编辑、版本管理。</p>
          
          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-1 bg-[#121214] p-1 rounded-lg border border-white/5">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all font-medium ${
                    activeTab === tab.id 
                      ? 'bg-orange-500 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="搜索素材名或标签..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#121214] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500/50 text-white placeholder-slate-600 w-64"
                />
              </div>
              <button 
                onClick={() => setShowGenerateModal(true)}
                className="flex items-center space-x-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold text-white transition-colors"
              >
                <Plus className="w-4 h-4 text-orange-500" />
                <span>生成新资产</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMaterials.map(mat => (
              <div 
                key={mat.material_id} 
                onClick={() => setSelectedMaterial(mat)}
                className={`group relative bg-[#121214] rounded-xl overflow-hidden border shadow-2xl flex flex-col transition-all cursor-pointer ${
                  selectedMaterial?.material_id === mat.material_id
                    ? 'border-orange-500/50 ring-1 ring-orange-500'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="relative aspect-square">
                  <img src={mat.thumbnail_url} alt={mat.material_name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Status badgets */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-black/60 backdrop-blur text-slate-300 border border-white/10 w-max">
                      {mat.material_type}
                    </span>
                    {mat.is_locked && (
                      <span className="w-max px-2 py-1 rounded bg-black/60 backdrop-blur text-[10px] font-bold text-orange-400 flex items-center border border-orange-500/30">
                        <Lock className="w-3 h-3 mr-1" /> LOCKED
                      </span>
                    )}
                  </div>
                  
                  {selectedMaterial?.material_id === mat.material_id && (
                     <div className="absolute top-3 right-3 px-2 py-1 bg-orange-500 rounded text-[10px] font-bold text-white">
                        ACTIVE
                     </div>
                  )}

                  <div className="absolute bottom-3 right-3">
                     <span className="text-[10px] text-white/60">
                      {mat.version}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-12">
                     <span className="text-white font-bold text-sm truncate block">
                      {mat.material_name}
                     </span>
                  </div>
                </div>
                
                <div className="p-4 flex-1">
                  <div className="text-xs text-slate-400 line-clamp-2 mb-3">{mat.description}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mat.material_tag.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[9px] text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Detail Panel */}
      <div className="w-72 flex-none border-l border-white/5 bg-[#0A0A0C] p-5 overflow-y-auto hidden lg:block">
        {selectedMaterial ? (
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Material Inspector</h3>
            
            <div className="rounded-lg overflow-hidden border border-white/5 bg-[#121214] aspect-square mb-6">
              <img src={selectedMaterial.base_image_url} alt="Base" className="w-full h-full object-contain" />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-bold text-white">{selectedMaterial.material_name}</div>
                  {selectedMaterial.is_locked ? (
                    <span className="flex items-center text-xs text-orange-400 font-bold px-2 py-1 bg-black/60 rounded border border-orange-500/30">
                      <Lock className="w-3 h-3 mr-1" /> LOCKED
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-slate-400 px-2 py-1 bg-white/5 rounded border border-white/10">
                      <Unlock className="w-3 h-3 mr-1" /> UNLOCKED
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                   <label className="text-[10px] uppercase text-slate-500 block mb-1">Material ID</label>
                   <p className="text-xs font-mono text-orange-400">{selectedMaterial.material_id}</p>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                   <label className="text-[10px] uppercase text-slate-500 block mb-2">Consistency Settings</label>
                   <div className="space-y-3">
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-400">Seed:</span>
                       <span className="font-mono text-white">{selectedMaterial.seed}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-400">IP Weight:</span>
                       <span className="text-white">{selectedMaterial.ip_adapter_weight}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-400">Level:</span>
                       <span className="text-orange-400 font-bold">{selectedMaterial.consistency_level}</span>
                     </div>
                   </div>
                </div>

                <div>
                   <label className="text-[10px] uppercase text-slate-500 block mb-2">Generation Logic</label>
                   <div className="text-[11px] bg-black p-3 rounded border border-white/5 text-slate-400 leading-relaxed space-y-2">
                     <div>
                       <span className="text-orange-500 font-bold">POSITIVE:</span> 
                       <span className="font-mono ml-1">{selectedMaterial.positive_prompt}</span>
                     </div>
                     <div className="border-t border-white/5 pt-2">
                       <span className="text-rose-500 font-bold">NEGATIVE:</span> 
                       <span className="font-mono ml-1">{selectedMaterial.negative_prompt}</span>
                     </div>
                   </div>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-4">
                 <h4 className="text-xs font-bold text-white mb-3">Version Control</h4>
                 <div className="flex items-center space-x-2">
                   <select className="bg-black border border-white/10 text-xs text-white rounded px-2 py-1.5 flex-1 focus:outline-none focus:border-orange-500">
                     <option value={selectedMaterial.version}>{selectedMaterial.version} (Active)</option>
                     {selectedMaterial.version !== 'V1.0' && <option value="V1.0">V1.0 (Base)</option>}
                   </select>
                   <button 
                     onClick={() => setShowGenerateModal(true)}
                     className="p-1.5 px-3 border border-white/10 rounded bg-white/5 hover:bg-white/10 text-xs text-white transition text-nowrap"
                   >
                    New
                   </button>
                 </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-col space-y-2">
                <button className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-bold transition shadow-lg shadow-orange-950/20">
                  {selectedMaterial.is_locked ? 'Unlock Characteristics' : 'Lock as Project Base'}
                </button>
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm transition font-medium">
                  Push to Active Shot
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm p-6 text-center">
            Select an asset to view inspector
          </div>
        )}
      </div>

      {/* Generation Modal (Overlay) */}
      {showGenerateModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#0A0A0C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#121214]">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-orange-500" /> 生成新资产基准
              </h2>
              <button 
                onClick={() => !isGenerating && setShowGenerateModal(false)}
                className="text-slate-500 hover:text-white transition-colors"
                disabled={isGenerating}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6 relative">
              {isGenerating && (
                <div className="absolute inset-0 z-10 bg-[#0A0A0C]/90 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                  <p className="text-white font-bold text-lg">AI 发电中...</p>
                  <p className="text-xs text-slate-400 mt-2">预计耗时 10-15 秒</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">资产类型</label>
                  <select className="w-full bg-[#121214] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500">
                    <option>角色 (Role)</option>
                    <option>场景 (Scene)</option>
                    <option>道具 (Prop)</option>
                  </select>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">特征参考 (可选)</label>
                   <select className="w-full bg-[#121214] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500">
                    <option>无 (纯文字生成)</option>
                    <option>沿用当前选择资产特征</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">生成咒语 (Positive Prompt)</label>
                <textarea 
                  className="w-full h-32 bg-[#121214] border border-white/10 text-white rounded-lg p-4 text-sm focus:outline-none focus:border-orange-500 resize-none font-mono"
                  placeholder="请输入描述，例如：a cyberpunk street, neon lights, raining, 8k resolution, highly detailed..."
                ></textarea>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/5 bg-[#121214] flex justify-end space-x-3">
              <button 
                onClick={() => setShowGenerateModal(false)}
                disabled={isGenerating}
                className="px-6 py-2 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                取消
              </button>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-orange-950/20 flex items-center"
              >
                {isGenerating ? '生成中...' : '开始生成'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
