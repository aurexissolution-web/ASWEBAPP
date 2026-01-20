import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, MessageCircle, TrendingUp, Globe, Database } from 'lucide-react';

// --- Components ---

const FloatingOrb = ({ icon: Icon, label, color, hoverColor, delay }: { icon: any, label: string, color: string, hoverColor: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay, 
        type: "spring", 
        stiffness: 100,
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }
      }}
      animate={{ y: [0, -5, 0] }}
      className={`group relative flex items-center gap-4 p-4 rounded-2xl bg-white/90 border border-slate-200 backdrop-blur-md transition-all duration-500 text-slate-900
        hover:bg-white hover:border-${hoverColor}/50 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:-translate-y-1 dark:bg-slate-900/40 dark:border-white/5 dark:text-white dark:hover:bg-slate-800/80
      `}
    >
      {/* Moving Shine Effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Orb Visual */}
      <div className={`relative w-12 h-12 flex-shrink-0`}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${color} blur-md opacity-40 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500`} 
        />
        <div className={`absolute inset-0 rounded-full bg-gradient-to-b ${color} opacity-30 border border-white/60 group-hover:border-${hoverColor}/50 transition-colors duration-500 dark:opacity-20 dark:border-white/20`} />
        <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] dark:text-white">
          <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Orbital Ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full border border-white/5 border-dashed group-hover:border-white/20 transition-colors duration-500"
        />
      </div>

      <div className="flex-1 relative z-10">
        <div className="text-lg font-bold text-slate-900 leading-none mb-1 group-hover:text-blue-500 transition-colors duration-300 dark:text-white dark:group-hover:text-cyan-300">{label}</div>
        <div className="text-[10px] text-slate-400 uppercase tracking-widest group-hover:text-slate-500 transition-colors dark:text-slate-400 dark:group-hover:text-slate-300">Performance Metric</div>
      </div>
    </motion.div>
  );
};

const ParticleBurst = ({ active, color }: { active: boolean, color: string }) => {
  if (!active) return null;
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 0, 
            x: (Math.random() - 0.5) * 60, 
            y: (Math.random() - 1) * 60 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute top-0 left-1/2 w-1 h-1 rounded-full ${color}`}
        />
      ))}
    </div>
  );
};

const ChartBar = ({ label, height, color, val, delay }: { label: string, height: string, color: string, val: string, delay: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="flex-1 flex flex-col items-center justify-end gap-3 group/bar h-full relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + delay }}
        className="text-xs font-bold text-white bg-slate-800/90 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md mb-1 z-20"
      >
        {val}
      </motion.div>
      
      <div className="relative w-full h-full flex items-end">
          <ParticleBurst active={hovered} color={color.replace('bg-', 'bg-')} />
          
          {/* Main Bar */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay, type: "spring", bounce: 0.2 }}
            className={`relative w-full rounded-t-lg bg-gradient-to-t ${color} shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover/bar:brightness-125 transition-all duration-300 z-10`}
          >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-white/80 shadow-[0_0_15px_white]" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[size:200%_200%] opacity-0 group-hover/bar:opacity-100 group-hover/bar:animate-[shimmer_1s_infinite]" />
          </motion.div>

          {/* Reflection */}
          <motion.div 
             initial={{ height: 0 }}
             whileInView={{ height }}
             transition={{ duration: 1.2, delay }}
             className={`absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t ${color} blur-xl opacity-20 group-hover/bar:opacity-40 transition-opacity`}
           />
      </div>
      
      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
};

const HoloPerf: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-20 perspective-1000 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 relative overflow-hidden flex justify-center items-center dark:bg-[#030716] dark:bg-none dark:text-white">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-200/60 rounded-full blur-[180px] dark:hidden" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay dark:hidden" />
         <div className="hidden dark:block absolute inset-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#0c1229] rounded-full blur-[220px]" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),transparent_60%)] opacity-30" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
         </div>
      </div>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="relative bg-white/95 text-slate-900 backdrop-blur-3xl rounded-[2rem] border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.15)] overflow-hidden group dark:bg-gradient-to-br dark:from-[#050b19]/95 dark:via-[#040a17]/80 dark:to-[#02060f]/90 dark:text-white dark:border-white/10 dark:shadow-[0_35px_100px_rgba(2,6,23,0.85)]">
          
          {/* Holographic Edge Glow */}
          <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-10 blur-sm group-hover:opacity-30 transition-opacity duration-500 dark:from-cyan-500 dark:via-purple-500 dark:to-blue-500" />
          
          <div className="relative z-10 p-8 md:p-12 grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT: Metrics & Orbs */}
            <div className="space-y-8" style={{ transform: "translateZ(50px)" }}>
               <div>
                 <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "auto" }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 overflow-hidden whitespace-nowrap dark:bg-cyan-950/50 dark:border-cyan-500/30 dark:text-cyan-400"
                 >
                    <Zap size={14} className="fill-current" />
                    <span className="animate-pulse">Live Monitoring Active</span>
                 </motion.div>
                 
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] mb-2 dark:text-white">
                   Holographic <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-gradient-x">
                     AI Dashboard
                   </span>
                 </h2>
                 <p className="text-slate-500 text-lg dark:text-slate-400">Real-time infrastructure visualization.</p>
               </div>

               <div className="space-y-4">
                 <FloatingOrb 
                    icon={MessageCircle} 
                    label="99.9% Chatbot Uptime" 
                    color="from-emerald-400 to-teal-600" 
                    hoverColor="emerald-500"
                    delay={0} 
                 />
                 <FloatingOrb 
                    icon={Zap} 
                    label="1.2s Response Time" 
                    color="from-amber-400 to-orange-600" 
                    hoverColor="amber-500"
                    delay={0.1} 
                 />
                 <FloatingOrb 
                    icon={TrendingUp} 
                    label="80% Workflow Gain" 
                    color="from-purple-400 to-pink-600" 
                    hoverColor="purple-500"
                    delay={0.2} 
                 />
               </div>
            </div>

            {/* RIGHT: Interactive Chart */}
            <div className="relative" style={{ transform: "translateZ(80px)" }}>
               <div className="absolute inset-0 bg-blue-200/60 blur-2xl -z-10 rounded-full dark:bg-blue-500/5" />
               
               <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-2xl relative overflow-hidden backdrop-blur-xl group/chart transform transition-transform hover:scale-[1.02] dark:bg-[#0f172a]/80 dark:border-white/10">
                  {/* Grid BG */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:30px_30px] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

                  <div className="flex justify-between items-center mb-10 relative z-10">
                    <div>
                       <div className="text-slate-900 font-bold tracking-widest text-sm dark:text-white">ANALYTICS</div>
                       <div className="text-[10px] text-slate-500">Global Node Status</div>
                    </div>
                    <Globe className="text-slate-400 animate-spin-slow dark:text-slate-600" size={24} />
                  </div>

                  <div className="flex justify-between gap-6 h-56 items-end relative z-10 px-4">
                     <ChartBar 
                        label="Traffic" 
                        height="60%" 
                        color="from-cyan-500 to-blue-500" 
                        val="+2.4M" 
                        delay={0.2} 
                     />
                     <ChartBar 
                        label="Conversion" 
                        height="85%" 
                        color="from-violet-500 to-purple-500" 
                        val="+18%" 
                        delay={0.3} 
                     />
                     <ChartBar 
                        label="Retention" 
                        height="45%" 
                        color="from-pink-500 to-rose-500" 
                        val="92%" 
                        delay={0.4} 
                     />
                  </div>
                  
                  {/* Bottom Info */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 dark:border-white/5 dark:text-slate-400">
                     <div className="flex items-center gap-2">
                        <Database size={14} className="text-blue-500 dark:text-blue-400" />
                        <span>Data synced</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-emerald-500 font-bold">System Normal</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HoloPerf;
