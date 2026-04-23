import React, { useState } from 'react';
import { Save, AlertTriangle, Monitor, HardDrive, Cpu, Network, Key, CheckCircle } from 'lucide-react';
import { mockProject } from '../../data/mock';

export function Settings() {
  const [consistency, setConsistency] = useState(mockProject.consistency_level);
  const [resolution, setResolution] = useState(mockProject.video_config.resolution);
  const [fps, setFps] = useState(mockProject.video_config.frame_rate);
  const [isSaving, setIsSaving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleCheckConnection = () => {
    setIsChecking(true);
    setTimeout(() => setIsChecking(false), 1000);
  };

  return (
    <div className="flex h-full bg-[#050506] text-slate-300 overflow-y-auto">
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">项目及全局设置</h1>
            <p className="text-sm text-slate-500">调整底层模型调用的API配置、一致性引擎与渲染参数。</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-sm font-bold text-white transition-colors shadow-lg shadow-orange-950/20"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? '保存中...' : '保存配置'}</span>
          </button>
        </div>

        <div className="space-y-10">

          {/* AI Models & API Config Section */}
          <section>
            <h2 className="text-lg font-bold text-white flex items-center mb-4">
              <Network className="w-5 h-5 mr-2 text-purple-500" /> AI 模型与 API 配置
            </h2>
            <div className="bg-[#121214] border border-white/5 rounded-xl p-6 space-y-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LLM Config */}
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-white flex items-center border-b border-white/5 pb-2">
                     文本及语义解析 (LLM)
                   </h3>
                   <div>
                     <label className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-widest">推荐模型</label>
                     <select className="w-full bg-[#050506] border border-white/10 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                       <option>Gemini 1.5 Pro (强推: 百万上下文, 智能分镜)</option>
                       <option>Gemini 1.5 Flash (快速草稿迭代)</option>
                       <option>Claude 3.5 Sonnet (备选)</option>
                       <option>自定义 OpenAI 兼容 API</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-widest">API Key</label>
                     <div className="flex gap-2">
                       <div className="relative flex-1">
                         <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                         <input 
                           type="password" 
                           placeholder="AI Studio 环境变量已自动注入" 
                           defaultValue="........................"
                           className="w-full bg-[#050506] border border-white/10 text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-purple-500" 
                         />
                       </div>
                       <button onClick={handleCheckConnection} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold transition-colors flex items-center text-white min-w-[80px] justify-center">
                         {isChecking ? <span className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span> : '测试'}
                       </button>
                     </div>
                   </div>
                </div>

                {/* Image Generation Config */}
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-white flex items-center border-b border-white/5 pb-2">
                     画面资产生成 (Diffusion/视觉)
                   </h3>
                   <div>
                     <label className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-widest">生图基座模型</label>
                     <select className="w-full bg-[#050506] border border-white/10 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                       <option>SDXL 1.0 + ControlNet (强推: 一致性最强方案)</option>
                       <option>Gemini Imagen 3.0 (单张极高画质直出)</option>
                       <option>Midjourney V6 API (高质感, 极难控制一致性)</option>
                       <option>Flux.1 [dev] (质感与一致性兼修)</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-widest">推理服务 Endpoint URL</label>
                     <div className="relative">
                       <Network className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                       <input 
                         type="text" 
                         placeholder="如: http://127.0.0.1:7860 (ComfyUI 本地服务)" 
                         defaultValue="https://api.seedance.studio/v1/generate"
                         className="w-full bg-[#050506] border border-white/10 text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-purple-500" 
                       />
                     </div>
                   </div>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-5">
                <h4 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" /> Seedance 2.0 官方推荐工作流架构
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  为达到极佳的 <strong>100% 角色与场景一致性</strong>，视频自动生成的 Pipeline 强烈推荐采用以下配置：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-white/5 rounded p-3">
                    <span className="text-xs text-purple-400 font-bold uppercase tracking-wider block mb-1">Step 1: 文本理解层</span>
                    <span className="text-sm text-slate-200 block"><strong>Gemini 1.5 Pro</strong></span>
                    <span className="text-xs text-slate-500">庞大百万上下文能力，轻松把控长篇小说或超长剧本连贯性，并智能吐出稳定的结构化分镜 Prompt。</span>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded p-3">
                    <span className="text-xs text-purple-400 font-bold uppercase tracking-wider block mb-1">Step 2: 视觉生图层</span>
                    <span className="text-sm text-slate-200 block"><strong>SDXL 1.0 / Flux.1</strong></span>
                    <span className="text-xs text-slate-500">部署本地/专有云 Node，通过挂载 <code>IP-Adapter FaceID</code> 及 <code>ControlNet Tile</code> 强制锁定全局基准资产。</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
          
          {/* Consistency Section */}
          <section>
            <h2 className="text-lg font-bold text-white flex items-center mb-4">
              <Cpu className="w-5 h-5 mr-2 text-orange-500" /> 一致性控制引擎
            </h2>
            <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${consistency === 'L1' ? 'bg-orange-500/10 border-orange-500' : 'border-white/10 hover:border-white/20'}`}
                  onClick={() => setConsistency('L1')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">L1 基础统一</span>
                    {consistency === 'L1' && <div className="w-2 h-2 rounded-full bg-orange-500"></div>}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">仅锁定核心人脸特征，允许服饰、发型、画风发生轻微偏移。生成速度最快。</p>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${consistency === 'L2' ? 'bg-orange-500/10 border-orange-500' : 'border-white/10 hover:border-white/20'}`}
                  onClick={() => setConsistency('L2')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">L2 完整统一</span>
                    {consistency === 'L2' && <div className="w-2 h-2 rounded-full bg-orange-500"></div>}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">锁定人脸、五官比例、服饰、体型。背景环境不严格锁定，适合日常动态镜头。</p>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${consistency === 'L3' ? 'bg-orange-500/10 border-orange-500' : 'border-white/10 hover:border-white/20'}`}
                  onClick={() => setConsistency('L3')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">L3 极致统一 (推荐)</span>
                    {consistency === 'L3' && <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)]"></div>}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">人物特征及场景空间结构、光影色调全部严格锁定。全片画风高度一致。消耗GPU资源较高。</p>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${consistency === 'L4' ? 'bg-orange-500/10 border-orange-500' : 'border-white/10 hover:border-white/20'}`}
                  onClick={() => setConsistency('L4')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">L4 自由模式</span>
                    {consistency === 'L4' && <div className="w-2 h-2 rounded-full bg-orange-500"></div>}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">解除严格特征继承绑定。适用于梦境、闪回、风格突变等特殊表现手法场景。</p>
                </div>

              </div>
              
              {consistency === 'L3' && (
                <div className="mt-4 p-3 bg-orange-500/5 border border-orange-500/20 rounded-lg flex items-start">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-200/70">
                    当前启用 L3 级别，系统将强制应用 ControlNet 与多层 IP-Adapter 注入。请确保素材库中所有的基准图均具有较高画质，以免基准瑕疵被无限放大。
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Render & Export Section */}
          <section>
            <h2 className="text-lg font-bold text-white flex items-center mb-4">
              <Monitor className="w-5 h-5 mr-2 text-blue-500" /> 渲染与导出配置
            </h2>
            <div className="bg-[#121214] border border-white/5 rounded-xl p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">目标分辨率</label>
                  <select 
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full bg-[#050506] border border-white/10 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="720P">720P (1280x720) - 快速预览</option>
                    <option value="1080P">1080P (1920x1080) - 标准高清</option>
                    <option value="2K">2K (2560x1440) - 高清画质</option>
                    <option value="4K">4K (3840x2160) - 极致影视级</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2">目标帧率 (FPS)</label>
                  <select 
                    value={fps}
                    onChange={(e) => setFps(Number(e.target.value))}
                    className="w-full bg-[#050506] border border-white/10 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  >
                    <option value={24}>24 FPS - 电影感</option>
                    <option value={30}>30 FPS - 标准网络视频</option>
                    <option value={60}>60 FPS - 丝滑流畅</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">默认镜头转场</label>
                <div className="flex gap-4">
                  {['叠化 (Fade)', '硬切 (Cut)', '闪屏 (Flash)', '缩放 (Zoom)'].map(type => (
                    <label key={type} className="flex items-center space-x-2 text-sm text-slate-400 cursor-pointer">
                      <input 
                        type="radio" 
                        name="transition" 
                        className="accent-orange-500"
                        defaultChecked={type === '叠化 (Fade)'}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Advanced Setting */}
          <section>
            <h2 className="text-lg font-bold text-white flex items-center mb-4">
              <HardDrive className="w-5 h-5 mr-2 text-emerald-500" /> 高级引擎配置
            </h2>
            <div className="bg-[#121214] border border-white/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">启用特征向量局部缓存加速</h4>
                  <p className="text-xs text-slate-500 mt-1">开启后生图速度提升约30%，消耗更多内存。</p>
                </div>
                <button className="w-12 h-6 bg-orange-500 rounded-full relative transition-colors shadow-[0_0_8px_rgba(249,115,22,0.4)]">
                  <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-all"></span>
                </button>
              </div>
              <div className="h-px w-full bg-white/5"></div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">保留废弃素材（回收站时长）</h4>
                  <p className="text-xs text-slate-500 mt-1">自动清理冗余素材的策略。</p>
                </div>
                <select className="bg-[#050506] border border-white/10 text-xs text-white rounded px-3 py-1.5 focus:outline-none focus:border-orange-500">
                  <option>7 天</option>
                  <option>15 天</option>
                  <option>30 天</option>
                </select>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
