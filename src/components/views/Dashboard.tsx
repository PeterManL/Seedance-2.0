import React from 'react';
import { 
  FolderKanban, 
  Clock, 
  Image as ImageIcon, 
  Film, 
  Plus, 
  Play 
} from 'lucide-react';
import { mockProject } from '../../data/mock';

export function Dashboard() {
  const stats = [
    { label: '总资产数量', value: '47', icon: ImageIcon, color: 'text-orange-500' },
    { label: '分镜总数', value: '124', icon: Film, color: 'text-blue-500' },
    { label: '渲染时长', value: '12.5h', icon: Clock, color: 'text-emerald-500' },
    { label: '进行中项目', value: '3', icon: FolderKanban, color: 'text-purple-500' },
  ];

  const recentProjects = [
    { id: 1, name: '剑斩虚空 - 第一集', date: '2小时前', progress: 85, image: 'https://images.unsplash.com/photo-1542996966-2e31c00ae7eb?auto=format&fit=crop&q=80&w=200&h=120' },
    { id: 2, name: '赛博朋克大都会 T1', date: '昨天', progress: 40, image: 'https://images.unsplash.com/photo-1515643261325-1eabfb39840a?auto=format&fit=crop&q=80&w=200&h=120' },
    { id: 3, name: '品牌宣传片 - 极简科技', date: '3天前', progress: 100, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200&h=120' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#050506] text-slate-300 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">工作台概览</h1>
            <p className="text-sm text-slate-500">欢迎回来，今天准备创作什么令人惊叹的视频？</p>
          </div>
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 rounded-lg text-sm font-bold text-white transition-colors shadow-lg shadow-orange-950/20">
            <Plus className="w-5 h-5" />
            <span>新建项目</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-[#121214] border border-white/5 rounded-xl p-5 flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 bg-white/5 rounded-lg border border-white/5 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Projects */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">最近项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map(proj => (
              <div key={proj.id} className="group bg-[#121214] border border-white/5 hover:border-white/20 rounded-xl overflow-hidden cursor-pointer transition-all shadow-xl">
                <div className="h-32 bg-slate-800 relative overflow-hidden">
                  <img src={proj.image} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] text-white">
                    {proj.date}
                  </div>
                  {proj.progress === 100 && (
                    <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-2 py-1 rounded text-[10px] font-bold">
                      已完成
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-lg mb-1 group-hover:text-orange-400 transition-colors">{proj.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between items-center mb-1 text-[10px]">
                        <span className="text-slate-500">制作进度</span>
                        <span className="text-orange-400 font-mono">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: `${proj.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-orange-500 transition-colors">
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">快捷操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121214] border border-white/5 p-5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">导入文案脚本</h3>
              <p className="text-xs text-slate-500">支持txt, docx 或直接复制粘贴文案</p>
            </div>
            <div className="bg-[#121214] border border-white/5 p-5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">上传角色基准图</h3>
              <p className="text-xs text-slate-500">导入本地图片，系统将自动提取特征入库</p>
            </div>
            <div className="bg-[#121214] border border-white/5 p-5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">打开批量渲染队列</h3>
              <p className="text-xs text-slate-500">查看后台正在合成与生成的任务进度</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Add FileText icon import manually at top
import { FileText } from 'lucide-react';
