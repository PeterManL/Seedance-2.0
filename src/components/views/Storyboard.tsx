import React from 'react';
import { Camera, Clock, Quote, User, Map, Box } from 'lucide-react';
import { mockProject, mockMaterials } from '../../data/mock';

export function Storyboard() {
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
             <div className="w-full bg-black/50 p-3 border-b border-white/5 flex justify-between items-center">
               <span className="font-bold text-white text-sm">镜头 {index + 1}</span>
               <div className="flex items-center text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">
                 <Clock className="w-3 h-3 mr-1" />
                 {shot.shot_duration}s
               </div>
             </div>
             
             {/* Thumbnail Preview Area (using bound scene as bg if available) */}
             <div className="w-full aspect-video bg-black relative border-b border-white/5 flex items-center justify-center overflow-hidden">
                {shot.bound_materials.scene ? (
                  <img src={getMaterialThumb(shot.bound_materials.scene)!} alt="Scene" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />
                ) : null}
                
                {shot.bound_materials.role ? (
                  <img src={getMaterialThumb(shot.bound_materials.role)!} alt="Role" className="relative h-[80%] object-contain drop-shadow-2xl" />
                ) : (
                  <Camera className="w-8 h-8 text-slate-700" />
                )}
                
                {/* Frame generation status overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-2 pt-6">
                   <div className="text-[10px] text-slate-400 font-mono flex items-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 shadow-[0_0_8px_rgba(249,115,22,1)]"></div>
                     基于基准图生成动态帧...
                   </div>
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
                
                <div className="text-xs text-slate-500 border-t border-white/5 pt-3 line-clamp-2" title={shot.prompt_base}>
                  <span className="font-bold text-slate-400 inline-block mb-1">融合提示词 (Prompt):</span>
                  <br />
                  <span className="font-mono text-[10px]">{shot.prompt_base}</span>
                </div>
             </div>
          </div>
        ))}
         
        {/* Add new shot button */}
        <button className="min-w-[120px] h-[550px] rounded-xl border-2 border-dashed border-white/10 text-slate-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition flex flex-col items-center justify-center">
          <div className="text-3xl mb-2">+</div>
          <span className="text-sm font-bold">添加分镜</span>
        </button>
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
