import React, { useState } from 'react';
import { Camera, Clock, Quote, User, Map, Box, Edit3, Image as ImageIcon, Sparkles, GripVertical, ImagePlus } from 'lucide-react';
import { mockProject, mockMaterials } from '../../data/mock';

export function Storyboard() {
  const [editingShotId, setEditingShotId] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<Record<string, string>>({});
  const getMaterialThumb = (id?: string) => {
    if (!id) return null;
    const mat = mockMaterials.find(m => m.material_id === id);
    return mat ? mat.thumbnail_url : null;
  };
  
  const getMaterialName = (id?: string) => {
    if (!id) return '未绑定';
    const mat = mockMaterials.find(m => m.material_id === id);
    return mat ? mat.material_name : '未绑定';
  };

  return (
    <div className="flex flex-col h-full bg-[#050506] text-slate-300">
      <div className="p-6 border-b border-white/5">
        <h1 className="text-2xl font-bold text-white mb-2">视频分镜编排</h1>
        <p className="text-sm text-slate-500">所有分镜画面将严格遵循素材库绑定的【基准特征】生成，保证全片一致性。</p>
      </div>

      <div className="flex-1 overflow-x-auto p-6 flex space-x-6">
        {mockProject.storyboard.map((shot, index) => (
          <div key={shot.shot_id} className="min-w-[320px] w-80 bg-[#121214] border border-white/5 rounded-xl overflow-hidden flex flex-col items-center shadow-2xl">
             <div className="w-full bg-black/50 p-3 border-b border-white/5 flex justify-between items-center cursor-move group/drag">
               <div className="flex items-center">
                 <GripVertical className="w-4 h-4 text-slate-600 mr-1.5 group-hover/drag:text-orange-500 transition-colors" />
                 <span className="font-bold text-white text-sm group-hover/drag:text-orange-100 transition-colors">镜头 {index + 1}</span>
               </div>
               <div className="flex items-center text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">
                 <Clock className="w-3 h-3 mr-1" />
                 {shot.shot_duration}s
               </div>
             </div>
             
             {/* Thumbnail Preview Area (using bound scene as bg if available) */}
             <div className="w-full aspect-video bg-black relative border-b border-white/5 flex items-center justify-center overflow-hidden group">
                {shot.bound_materials.scene ? (
                  <img src={getMaterialThumb(shot.bound_materials.scene)!} alt="Scene" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />
                ) : null}
                
                {shot.bound_materials.role ? (
                  <img src={getMaterialThumb(shot.bound_materials.role)!} alt="Role" className="relative h-[80%] object-contain drop-shadow-2xl" />
                ) : (
                  <div className="w-[80%] h-[70%] border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-white/[0.02] group-hover:border-orange-500/40 group-hover:bg-orange-500/10 transition-all cursor-pointer relative overflow-hidden group/role">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover/role:opacity-100 transition-opacity"></div>
                    <User className="w-8 h-8 text-slate-600 group-hover/role:text-orange-400 group-hover/role:-translate-y-1 transition-all mb-2" />
                    <span className="text-[10px] font-bold text-slate-500 group-hover/role:text-orange-400 tracking-wider">拖入角色资产</span>
                  </div>
                )}
                
                {/* Frame generation status overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-2 pt-6">
                   <div className="text-[10px] text-slate-400 font-mono flex items-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 shadow-[0_0_8px_rgba(249,115,22,1)]"></div>
                     基于基准图生成动态帧...
                   </div>
                </div>

                {/* Hover Quick Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 backdrop-blur-sm">
                   <button className="w-10 h-10 rounded-full bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transform hover:scale-105 transition-all">
                     <Sparkles className="w-5 h-5" />
                   </button>
                   <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center shadow-lg transform hover:scale-105 transition-all">
                     <ImageIcon className="w-5 h-5" />
                   </button>
                </div>
             </div>
             
             <div className="w-full p-4 flex-1 flex flex-col space-y-4">
                <div className="space-y-1">
                   <div className="text-xs font-bold text-slate-400 flex items-center"><Quote className="w-3 h-3 mr-1"/>台词字幕</div>
                   <div className="text-sm text-slate-300 bg-black p-2 rounded border border-white/5">
                     {shot.caption_text || <span className="text-slate-600 italic">无台词</span>}
                   </div>
                </div>
                
                <div className="space-y-2 flex-1">
                   {/* Bindings */}
                   <div className="flex items-center justify-between text-xs p-1.5 bg-black rounded border border-white/5">
                     <span className="flex items-center text-slate-400"><User className="w-3 h-3 mr-1"/>角色</span>
                     <span className={shot.bound_materials.role ? "text-orange-400 font-bold" : "text-slate-600"}>
                       {getMaterialName(shot.bound_materials.role)}
                     </span>
                   </div>
                   <div className="flex items-center justify-between text-xs p-1.5 bg-black rounded border border-white/5">
                     <span className="flex items-center text-slate-400"><Map className="w-3 h-3 mr-1"/>场景</span>
                     <span className={shot.bound_materials.scene ? "text-orange-400 font-bold" : "text-slate-600"}>
                       {getMaterialName(shot.bound_materials.scene)}
                     </span>
                   </div>
                   <div className="flex items-center justify-between text-xs p-1.5 bg-black rounded border border-white/5">
                     <span className="flex items-center text-slate-400"><Box className="w-3 h-3 mr-1"/>道具</span>
                     <span className={shot.bound_materials.prop ? "text-orange-400 font-bold" : "text-slate-600"}>
                       {getMaterialName(shot.bound_materials.prop)}
                     </span>
                   </div>
                </div>
                
                <div className="text-xs text-slate-500 border-t border-white/5 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-400">融合提示词 (Prompt):</span>
                    <button 
                      onClick={() => {
                        if (editingShotId === shot.shot_id) {
                          setEditingShotId(null);
                        } else {
                          setEditingShotId(shot.shot_id);
                          setPrompts(prev => ({ ...prev, [shot.shot_id]: prev[shot.shot_id] || shot.prompt_base }));
                        }
                      }}
                      className="p-1 hover:bg-white/10 rounded text-slate-400 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {editingShotId === shot.shot_id ? (
                    <textarea 
                      className="w-full h-20 bg-black border border-orange-500/50 rounded p-2 text-white font-mono text-[10px] resize-none focus:outline-none focus:ring-1 focus:ring-orange-500"
                      value={prompts[shot.shot_id] || ''}
                      onChange={(e) => setPrompts(prev => ({ ...prev, [shot.shot_id]: e.target.value }))}
                      onBlur={() => setEditingShotId(null)}
                      autoFocus
                    />
                  ) : (
                    <div className="font-mono text-[10px] line-clamp-3 leading-relaxed cursor-text" onClick={() => {
                      setEditingShotId(shot.shot_id);
                      setPrompts(prev => ({ ...prev, [shot.shot_id]: prev[shot.shot_id] || shot.prompt_base }));
                    }}>
                      {prompts[shot.shot_id] || shot.prompt_base}
                    </div>
                  )}
                </div>
             </div>
          </div>
        ))}
         
        {/* Add new shot / Dropzone */}
        <div className="min-w-[320px] h-[550px] rounded-xl border border-white/5 bg-[#0A0A0C]/40 hover:bg-[#121214]/80 hover:border-orange-500/30 transition-all flex flex-col items-center justify-center cursor-pointer group shadow-inner relative overflow-hidden">
          {/* Subtle animated scanning background on hover */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay group-hover:opacity-30 transition-opacity duration-700"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-y-full group-hover:translate-y-0 ease-out"></div>
          
          <div className="w-20 h-20 rounded-2xl bg-[#121214] border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative z-10 
            group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] group-hover:border-orange-500/40 group-hover:rotate-3 transition-all duration-300">
            <div className="absolute inset-0 border border-dashed border-slate-600 rounded-2xl group-hover:animate-[spin_10s_linear_infinite] group-hover:border-orange-500/30"></div>
            <ImagePlus className="w-8 h-8 text-slate-500 group-hover:text-orange-400 transition-colors" />
          </div>
          
          <span className="text-lg font-bold tracking-widest text-slate-400 mb-3 group-hover:text-white transition-colors relative z-10">创建新分镜</span>
          
          <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-500 relative z-10">
            <span className="px-2.5 py-1 bg-white/5 rounded border border-white/10 group-hover:text-slate-300 transition-colors">点击新增</span>
            <span>/</span>
            <span className="px-2.5 py-1 bg-white/5 text-slate-500 rounded border border-white/10 group-hover:bg-orange-500/10 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-colors flex items-center">
              拖拽素材至此
            </span>
          </div>
        </div>
      </div>
      
      {/* Timeline bottom bar mockup */}
      <div className="h-24 bg-[#0A0A0C] border-t border-white/5 p-2 flex items-center">
        <div className="w-20 flex-shrink-0 text-xs font-bold text-slate-500 flex flex-col justify-around h-full border-r border-white/5 pr-2 text-right">
          <div>时长标尺</div>
          <div>综合轨道</div>
        </div>
        <div className="flex-1 h-full px-4 flex items-center overflow-hidden gap-1">
          {mockProject.storyboard.map((shot, idx) => (
            <div key={`tm-${shot.shot_id}`} style={{flex: shot.shot_duration}} className="h-10 bg-orange-500/10 border border-orange-500/30 rounded flex items-center justify-center text-xs text-orange-400 font-bold whitespace-nowrap overflow-hidden px-1">
              S{idx + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
