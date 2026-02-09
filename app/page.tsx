"use client";
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Languages, Mail, MapPin, Sparkles, ExternalLink, MessageCircle, Copy, Check, Terminal } from 'lucide-react';
import { content } from '../data';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const [copied, setCopied] = useState(false);
  const [showWeChat, setShowWeChat] = useState(false);
  
  // 【新增状态】用于控制头像是否处于放大查看状态
  const [isZoomed, setIsZoomed] = useState(false);

  // 【变量修正】强制转换为 any 类型，解决 data.ts 字段更新导致的 TypeScript 红色波浪线报错
  const t = content[lang] as any;

  // --- 呼吸感背景光影逻辑 ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 生成随鼠标移动的紫色径向渐变背景
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(650px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.12), transparent 80%)`
  );

  // --- 邮件一键复制功能 ---
  const copyEmail = () => {
    navigator.clipboard.writeText("Yue.Zheng@southampton.ac.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 根据语言动态更新浏览器标签页标题
  useEffect(() => {
    document.title = lang === 'cn' ? "郑悦 | 多模态 AI 博士生" : "Yue Zheng | PhD in Multimodal AI";
  }, [lang]);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
      {/* 动态背景层 */}
      <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background }} />
      
      {/* 语言切换导航栏 */}
      <nav className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setLang(lang === 'en' ? 'cn' : 'en')}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:border-purple-500/50 transition-all shadow-xl"
        >
          <Languages size={18} className="text-purple-400" />
          <span className="text-sm font-bold">{lang === 'en' ? '中文' : 'EN'}</span>
        </button>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        
        {/* --- 顶部个人信息区 --- */}
        <section className="mb-24 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          {/* 头像组件：点击触发放大欣赏 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 cursor-zoom-in"
            onClick={() => setIsZoomed(true)} 
          >
            <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-full h-full rounded-full border-2 border-purple-500/30 overflow-hidden shadow-2xl">
              <img src="/avatar.jpg" alt="Zheng Yue" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-purple-500/20">
              <Sparkles size={14} /> {t.title}
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">{t.name}</h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              {t.about} <span className="text-white font-medium">{t.research}</span>
            </p>
          </div>
        </section>

        {/* --- 成果与经历网格区 (Bento Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. 论文成果列表 */}
          <div className="md:col-span-8 grid grid-cols-1 gap-6">
            {t.pubList.map((pub: any, i: number) => (
              <motion.a 
                key={i}
                href={pub.link}
                target="_blank"
                whileHover={{ y: -5, x: 5 }}
                className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-sm uppercase tracking-widest text-purple-400 font-bold">Research</h2>
                  <ExternalLink size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{pub.title}</h3>
                <p className="text-gray-500 font-mono italic text-sm">{pub.detail}</p>
              </motion.a>
            ))}
          </div>

          {/* 2. 教育背景卡片 */}
          <div className="md:col-span-4 bg-purple-600/90 p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between text-white border border-white/10 shadow-2xl">
            <h2 className="text-sm uppercase tracking-widest font-bold mb-8 opacity-80">Education</h2>
            <div className="space-y-6">
              {t.eduList.map((edu: any, i: number) => (
                <div key={i} className="border-l-2 border-white/30 pl-4">
                  <div className="font-bold text-lg leading-tight">{edu.degree}</div>
                  <div className="text-sm opacity-80 mt-1">{edu.school}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 核心项目展示 (如：上海地铁项目) */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.projectList.map((proj: any, i: number) => (
              <motion.a 
                key={i}
                href={proj.link}
                target="_blank"
                whileHover={{ scale: 1.02 }}
                className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 text-blue-400 mb-4 uppercase text-xs font-bold tracking-widest">
                    <Terminal size={14} /> Project
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-300 transition-colors">{proj.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-mono">{proj.detail}</p>
                </div>
                <div className="mt-6 flex justify-end">
                   <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* 4. 职场/实习经历模块 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-12 bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative group"
          >
            <h2 className="text-sm uppercase tracking-widest text-orange-400 font-bold mb-8">{t.experience}</h2>
            {t.experienceList.map((exp: any, i: number) => (
              <div key={i} className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.company}</h3>
                  <p className="text-purple-400 font-medium mb-4">{exp.role}</p>
                  <ul className="space-y-3">
                    {/* 修正：恢复被注释的实习经历细节渲染 */}
                    {exp.details && exp.details.map((detail: string, index: number) => (
                      <li key={index} className="text-gray-400 text-sm flex gap-3 leading-relaxed">
                        <span className="text-purple-500 mt-1">•</span> {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-gray-500 font-mono text-xs md:text-sm whitespace-nowrap bg-white/5 px-4 py-2 rounded-full h-fit">
                  {exp.date}
                </div>
              </div>
            ))}
          </motion.div>

          {/* 5. 社交联系卡片 (WeChat) */}
          <motion.div 
            onClick={() => setShowWeChat(!showWeChat)}
            whileHover={{ scale: 1.05 }}
            className="md:col-span-4 bg-gradient-to-br from-zinc-800 to-black border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer relative"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-5xl mb-4">✨</motion.div>
            <p className="text-sm font-bold text-gray-400 tracking-widest">{lang === 'en' ? 'CONNECT' : '联系我'}</p>
            {showWeChat && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-purple-600 flex flex-col items-center justify-center p-4 rounded-[2.5rem] z-20">
                <MessageCircle size={40} className="mb-2" />
                <p className="text-sm font-bold">WeChat ID: Annie524</p>
                <p className="text-[10px] mt-6 opacity-60">Click to Close</p>
              </motion.div>
            )}
          </motion.div>

          {/* 6. 联系信息卡片 (Email) */}
          <div className="md:col-span-8 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-purple-400" />
                <span className="text-sm">{t.location}</span>
              </div>
              <a href="mailto:Yue.Zheng@southampton.ac.uk" className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors">
                <Mail size={20} className="text-purple-400" />
                <span className="text-sm border-b border-white/20 pb-1 italic font-bold">Yue.Zheng@southampton.ac.uk</span>
              </a>
            </div>
            <button onClick={copyEmail} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all flex items-center gap-2 border border-white/5">
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              <span className="text-xs font-bold uppercase">{copied ? 'COPIED' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- 全屏大图弹窗逻辑 (Lightbox) --- */}
      {isZoomed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setIsZoomed(false)} // 点击背景任何地方即可关闭
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-[90vw] max-h-[85vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img 
              src="/avatar.jpg" 
              alt="Zheng Yue Full Size" 
              className="w-full h-full object-contain" 
            />
            {/* 提示关闭文字 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white/60">
              Click anywhere to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}