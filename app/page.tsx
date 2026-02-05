// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Languages, Mail, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { content } from '../data'; // 注意这里改成了 ../data

export default function Home() {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const t = content[lang];

  // --- 在这里插入郑悦博士的专属逻辑 ---
  useEffect(() => {
    if (lang === 'cn') {
      document.title = "郑悦 | 多模态 AI 博士生";
    } else {
      document.title = "Yue Zheng | PhD in Multimodal AI";
    }
  }, [lang]);
  // --------------------------------
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
        {/* Header Section */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-purple-500/20"
          >
            <Sparkles size={14} /> {t.title}
          </motion.div>
          
          <motion.h1 
            key={lang}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-10 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          >
            {t.name}
          </motion.h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
            {t.about} <span className="text-white font-medium">{t.research}</span>
          </p>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Publication Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
              <ExternalLink size={80} />
            </div>
            <h2 className="text-sm uppercase tracking-widest text-purple-400 font-bold mb-6">{t.publications}</h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{t.pubTitle}</h3>
            <p className="text-gray-500 font-mono">{t.pubDetail}</p>
          </motion.div>

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

          {/* Skills / Tech Stack */}
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

          {/* Info Card */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-purple-400" />
                <span className="text-sm">{t.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={20} className="text-purple-400" />
                <span className="text-sm">yz15u22@soton.ac.uk</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-black border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-5xl"
              >
                ✨
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}