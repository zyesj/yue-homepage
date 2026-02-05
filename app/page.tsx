"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Languages, Mail, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { content } from '../data';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const t = content[lang];

  // 动态修改浏览器标签页标题
  useEffect(() => {
    if (lang === 'cn') {
      document.title = "郑悦 | 多模态 AI 博士生";
    } else {
      document.title = "Yue Zheng | PhD in Multimodal AI";
    }
  }, [lang]);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* 语言切换按钮 */}
      <nav className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setLang(lang === 'en' ? 'cn' : 'en')}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:border-purple-500/50 transition-all shadow-xl"
        >
          <Languages size={18} className="text-purple-400" />
          <span className="text-sm font-bold">{lang === 'en' ? '中文' : 'EN'}</span>
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header Section - 包含头像 */}
        <section className="mb-24 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
          >
            <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-xl"></div>
            <div className="relative w-full h-full rounded-full border-2 border-purple-500/30 overflow-hidden shadow-2xl bg-zinc-900">
              <img 
                src="/avatar.jpg" 
                alt="Zheng Yue" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-purple-500/20"
            >
              <Sparkles size={14} /> {t.title}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white"
            >
              {t.name}
            </motion.h1>

            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              {t.about} <span className="text-white font-medium">{t.research}</span>
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Publication Card - 改为可跳转链接 */}
          <motion.a 
            href={t.pubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group cursor-pointer block"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
              <ExternalLink size={80} />
            </div>
            <h2 className="text-sm uppercase tracking-widest text-purple-400 font-bold mb-6 flex items-center gap-2">
              {t.publications} <ExternalLink size={14} />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight group-hover:text-purple-300 transition-colors">
              {t.pubTitle}
            </h3>
            <p className="text-gray-500 font-mono italic">{t.pubDetail}</p>
          </motion.a>

          {/* Education Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-purple-600 p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between text-white"
          >
            <h2 className="text-sm uppercase tracking-widest font-bold mb-8 opacity-80">{t.education}</h2>
            <div className="space-y-6">
              {t.eduList.map((edu, i) => (
                <div key={i} className="border-l-2 border-white/30 pl-4">
                  <div className="font-bold text-lg leading-tight">{edu.degree}</div>
                  <div className="text-sm opacity-80 mt-1">{edu.school}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Project Card - 上海地铁项目链接 */}
          <motion.a 
            href={t.projectLink}
            target="_blank"
            whileHover={{ y: -5 }}
            className="md:col-span-7 bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative group cursor-pointer block"
          >
            <h2 className="text-sm uppercase tracking-widest text-blue-400 font-bold mb-6 flex items-center gap-2">
              FEATURED PROJECT <ExternalLink size={14} />
            </h2>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
              {t.projectTitle}
            </h3>
            <p className="text-gray-500 font-mono">{t.projectDetail}</p>
          </motion.a>

          {/* Skills Card */}
          <div className="md:col-span-5 bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem]">
            <h2 className="text-sm uppercase tracking-widest text-pink-400 font-bold mb-6">{t.skills}</h2>
            <div className="flex flex-wrap gap-2">
              {t.techSkills.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 hover:border-pink-500/50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="md:col-span-12 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-purple-400" />
                <span className="text-sm">{t.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={20} className="text-purple-400" />
                <span className="text-sm">yz15u22@soton.ac.uk</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-black p-4 rounded-2xl">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                 ✨
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}