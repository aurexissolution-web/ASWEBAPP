import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, TrendingUp, ShoppingBag, MessageCircle } from 'lucide-react';

const AutomationPerf: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-[#020617]">
      {/* 
        PREMIUM ANIMATED BACKGROUND 
        Elegant gradient waves + subtle flow
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Base Gradient Flow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-slate-900 to-purple-900/10 bg-[length:400%_400%] animate-[gradient-flow_15s_ease_infinite]" />
        
        {/* SVG Waves Layer */}
        <div className="absolute inset-0 opacity-30">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
             <motion.path 
               d="M0,800 C320,800 480,400 720,400 C960,400 1120,600 1440,600 V800 H0 Z" 
               fill="url(#grad1)" 
               initial={{ y: 200, opacity: 0 }}
               animate={{ y: 0, opacity: 0.5 }}
               transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
             />
             <motion.path 
               d="M0,800 C400,800 600,300 900,300 C1200,300 1300,500 1440,500 V800 H0 Z" 
               fill="url(#grad2)"
               initial={{ y: 300, opacity: 0 }} 
               animate={{ y: 50, opacity: 0.3 }}
               transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }}
             />
              <motion.path 
               d="M0,800 C200,700 500,500 800,500 C1100,500 1300,700 1440,700 V800 H0 Z" 
               fill="url(#grad3)"
               initial={{ y: 400, opacity: 0 }} 
               animate={{ y: 100, opacity: 0.4 }}
               transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }}
             />
             <defs>
               <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.1 }} />
                 <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
               </linearGradient>
               <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
                 <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0 }} />
               </linearGradient>
               <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.05 }} />
                 <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0 }} />
               </linearGradient>
             </defs>
           </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-slate-900/20 backdrop-blur-md">
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Response Time 1.2s
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                  Built for AI <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-white">
                    Automation Excellence
                  </span>
                </h2>
                
                <div className="space-y-4">
                  {[
                    { text: "99.99% Chatbot Uptime", icon: MessageCircle, color: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    { text: "24hr Process Deploy", icon: Zap, color: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                    { text: "80% Workflow Speed Gain", icon: TrendingUp, color: "text-purple-300", bg: "bg-purple-500/10", border: "border-purple-500/20" }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group/item"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color} ${item.border} border`}>
                        <item.icon size={20} />
                      </div>
                      <span className="text-slate-200 font-semibold group-hover/item:text-white transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Charts Visual */}
              <div className="relative">
                {/* Clean Floating Card */}
                <div 
                   className="bg-[#0f172a]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group/chart"
                >
                  
                  {/* Subtle Grain Overlay */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />

                  {/* Chart Header */}
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                      <div className="text-sm text-white font-bold tracking-wide">PERFORMANCE</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">Live Monitoring</div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      OPTIMAL
                    </div>
                  </div>

                  {/* Animated Bars */}
                  <div className="flex justify-between gap-5 h-56 mb-6 relative z-10 px-2 items-end">
                    {[
                      { label: "Leads", height: "60%", from: "from-blue-500", to: "to-cyan-400", val: "+60%", delay: 0 },
                      { label: "Orders", height: "80%", from: "from-cyan-500", to: "to-teal-400", val: "+80%", delay: 0.15 },
                      { label: "AI Queries", height: "100%", from: "from-indigo-500", to: "to-purple-400", val: "3x", delay: 0.3 }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end gap-3 group/bar h-full">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + bar.delay }}
                          className="text-xs font-bold text-white bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md mb-1"
                        >
                          {bar.val}
                        </motion.div>
                        
                        <div className="relative w-full h-full flex items-end">
                           {/* Main Bar */}
                          <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: bar.height }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: bar.delay, type: "spring", bounce: 0 }}
                            className={`relative w-full rounded-t-lg bg-gradient-to-b ${bar.from} ${bar.to} shadow-lg shadow-${bar.from}/20 group-hover/bar:brightness-110 transition-all duration-300`}
                          >
                              {/* Top Highlight */}
                              <div className="absolute top-0 inset-x-0 h-[1px] bg-white/40" />
                          </motion.div>
                        </div>
                        
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{bar.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer */}
                  <div className="pt-5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 relative z-10">
                     <div className="flex items-center gap-2">
                       <ShoppingBag size={12} className="text-orange-400" />
                       <span className="text-slate-300">Shopee Optimized</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <MessageCircle size={12} className="text-green-400" />
                       <span className="text-slate-300">WhatsApp Ready</span>
                     </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationPerf;
