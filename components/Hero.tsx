
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronDown, Database, Cpu, Code, Server, Zap, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

// Constellation Data
const CONSTELLATIONS = [
    {
        name: "Scorpius",
        points: [
            {x: 0.65, y: 0.3}, {x: 0.62, y: 0.35}, {x: 0.58, y: 0.38}, // Head
            {x: 0.55, y: 0.45}, {x: 0.52, y: 0.52}, // Body
            {x: 0.52, y: 0.6}, {x: 0.55, y: 0.68}, {x: 0.6, y: 0.72}, {x: 0.68, y: 0.7}, {x: 0.72, y: 0.65} // Tail
        ]
    },
    {
        name: "Orion",
        points: [
            {x: 0.4, y: 0.3}, {x: 0.6, y: 0.28}, 
            {x: 0.48, y: 0.48}, {x: 0.5, y: 0.47}, {x: 0.52, y: 0.46}, 
            {x: 0.38, y: 0.65}, {x: 0.62, y: 0.62} 
        ]
    },
    {
        name: "Ursa Major",
        points: [
             {x: 0.3, y: 0.35}, {x: 0.35, y: 0.38}, {x: 0.4, y: 0.45}, 
             {x: 0.4, y: 0.55}, {x: 0.55, y: 0.58}, {x: 0.53, y: 0.48}, {x: 0.38, y: 0.45} 
        ]
    }
];

const LAYER_THEME: Record<string, { face: string; icon: string; badge: string; glow: string }> = {
    slate: {
        face: 'bg-slate-100/90 dark:bg-slate-900/90 border-slate-300 dark:border-slate-400/60',
        icon: 'text-slate-700 dark:text-slate-200',
        badge: 'text-slate-900 dark:text-white',
        glow: '0 35px 70px rgba(15,23,42,0.35)'
    },
    blue: {
        face: 'bg-blue-100/85 dark:bg-blue-950/40 border-blue-200 dark:border-blue-500/40',
        icon: 'text-blue-700 dark:text-blue-200',
        badge: 'text-blue-900 dark:text-blue-100',
        glow: '0 35px 70px rgba(37,99,235,0.35)'
    },
    purple: {
        face: 'bg-purple-100/85 dark:bg-purple-950/40 border-purple-200 dark:border-purple-500/40',
        icon: 'text-purple-700 dark:text-purple-200',
        badge: 'text-purple-900 dark:text-purple-100',
        glow: '0 35px 70px rgba(147,51,234,0.35)'
    },
    cyan: {
        face: 'bg-cyan-100/85 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-500/40',
        icon: 'text-cyan-700 dark:text-cyan-200',
        badge: 'text-cyan-900 dark:text-cyan-100',
        glow: '0 35px 70px rgba(8,145,178,0.35)'
    }
};
const DEFAULT_LAYER_THEME = {
    face: 'bg-slate-100/90 dark:bg-slate-900/90 border-slate-300 dark:border-slate-500/50',
    icon: 'text-slate-700 dark:text-slate-200',
    badge: 'text-slate-900 dark:text-white',
    glow: '0 35px 70px rgba(59,130,246,0.3)'
};

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { homepageSettings } = useData();
    const heroContent = useMemo(() => ({
        heroBadge: homepageSettings.heroBadge || 'Empowering Digital Transformation',
        heroTitle: homepageSettings.heroTitle || 'Future-Proof Your',
        heroHighlight: homepageSettings.heroHighlight || 'Digital Presence.',
        heroSubtitle: homepageSettings.heroSubtitle || '',
        heroDescription: homepageSettings.heroDescription || 'From AI-driven automation to scalable cloud infrastructure. We build the technology that powers the next generation of business.',
        aboutTitle: homepageSettings.aboutTitle || 'Why Aurexis Solution?',
        aboutText: homepageSettings.aboutText || "We don't just write code; we engineer competitive advantages. Our stack is modern, our process is transparent, and our results are measurable."
    }), [homepageSettings]);
    
    // 3D Interaction State
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const heroScrollProgress = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });
    const [isHoveringStack, setIsHoveringStack] = useState(false);

    // Map mouse to 3D rotation - Clean and responsive
    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [20, 40]); // Default tilt 30deg +/- 10
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]); 
    
    const scrollTextY = useTransform(heroScrollProgress, [0, 1], [0, 150]); 
    const opacity = useTransform(heroScrollProgress, [0, 0.6], [1, 0]); 

    // Custom Scroll Handler with Offset
    const handleScrollToServices = () => {
        const element = document.getElementById('services');
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    // Canvas Animation: Constellation Formation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let frameId = 0;
        let currentShapeIndex = 0;
        let state = 'DRIFT'; 
        let stateTimer = 0;
        const STATE_DURATIONS = { DRIFT: 400, FORMING: 250, HOLDING: 300, DISPERSING: 200 };

        class Particle {
            x: number; y: number; vx: number; vy: number;
            size: number; baseAlpha: number; pulseSpeed: number; pulseOffset: number;
            targetX: number | null = null; targetY: number | null = null; isArchitect: boolean = false; 

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.size = Math.random() * 2 + 1;
                this.baseAlpha = Math.random() * 0.5 + 0.2;
                this.pulseSpeed = 0.02 + Math.random() * 0.05;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }

            update(forceDrift: boolean) {
                if (this.isArchitect && this.targetX !== null && !forceDrift) {
                    this.x += (this.targetX - this.x) * 0.04;
                    this.y += (this.targetY - this.y) * 0.04;
                } else {
                    this.x += this.vx;
                    this.y += this.vy;
                    if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
                    if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
                }
            }

            draw(ctx: CanvasRenderingContext2D, isDarkMode: boolean, time: number) {
                const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset);
                let alpha = this.baseAlpha + pulse * 0.2;
                if (this.isArchitect && (state === 'FORMING' || state === 'HOLDING')) alpha = 0.8 + pulse * 0.2;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = isDarkMode ? `rgba(255, 255, 255, ${Math.max(0, alpha)})` : `rgba(30, 58, 138, ${Math.max(0, alpha + 0.1)})`;
                ctx.fill();
            }
        }

        const particles: Particle[] = Array.from({ length: Math.floor((width * height) / 10000) }, () => new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            const time = Date.now();
            const isDarkMode = document.documentElement.classList.contains('dark');
            stateTimer++;

            if (state === 'DRIFT' && stateTimer > STATE_DURATIONS.DRIFT) {
                state = 'FORMING'; stateTimer = 0;
                currentShapeIndex = (currentShapeIndex + 1) % CONSTELLATIONS.length;
                const shape = CONSTELLATIONS[currentShapeIndex];
                particles.forEach(p => p.isArchitect = false);
                shape.points.forEach((pt, i) => {
                    if (particles[i]) {
                        particles[i].isArchitect = true;
                        const scale = Math.min(width, height) * 0.8;
                        particles[i].targetX = pt.x * scale + (width - scale) / 2;
                        particles[i].targetY = pt.y * scale + (height - scale) / 2;
                    }
                });
            } else if (state === 'FORMING' && stateTimer > STATE_DURATIONS.FORMING) { state = 'HOLDING'; stateTimer = 0; }
            else if (state === 'HOLDING' && stateTimer > STATE_DURATIONS.HOLDING) { state = 'DISPERSING'; stateTimer = 0; }
            else if (state === 'DISPERSING' && stateTimer > STATE_DURATIONS.DISPERSING) { state = 'DRIFT'; stateTimer = 0; }

            // Draw Constellation Lines
            if (state === 'FORMING' || state === 'HOLDING') {
                const opacity = state === 'FORMING' ? (stateTimer / STATE_DURATIONS.FORMING) : 1;
                ctx.strokeStyle = isDarkMode ? `rgba(147, 197, 253, ${opacity * 0.4})` : `rgba(37, 99, 235, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let i = 0; i < CONSTELLATIONS[currentShapeIndex].points.length - 1; i++) {
                    const p1 = particles[i]; const p2 = particles[i+1];
                    if (p1?.isArchitect && p2?.isArchitect) { ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); }
                }
                ctx.stroke();
            }

            particles.forEach(p => {
                p.update(state === 'DISPERSING' || state === 'DRIFT');
                p.draw(ctx, isDarkMode, time);
            });
            frameId = requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
        return () => { cancelAnimationFrame(frameId); };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const node = containerRef.current;
        if (!node) return;

        const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
        const updateProgress = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const elementTop = node.offsetTop;
            const elementHeight = node.offsetHeight || 1;
            const progress = (scrollY - elementTop) / elementHeight;
            heroScrollProgress.set(clamp(progress));
        };

        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, [heroScrollProgress]);

    const stackRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);

    const handleStackMouseMove = (e: React.MouseEvent) => {
        if (!rectRef.current && e.currentTarget) {
            rectRef.current = e.currentTarget.getBoundingClientRect();
        }
        const rect = rectRef.current;
        if (!rect) return;
        
        // Use requestAnimationFrame to throttle updates if needed, 
        // but MotionValues are already optimized.
        // The key is avoiding getBoundingClientRect on every frame.
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleStackMouseEnter = (e: React.MouseEvent) => {
        setIsHoveringStack(true);
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleStackMouseLeave = () => {
        mouseX.set(0); 
        mouseY.set(0); 
        setIsHoveringStack(false);
        rectRef.current = null; // Reset rect to ensure freshness on next enter
    };

    // Clean Volumetric Layer
    const VolumetricLayer = ({ zIndex, baseZ, expandedZ, color, icon: Icon, title, isHovering, mouseX, mouseY }: any) => {
        // Parallax depth based on layer position
        const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-35 * (zIndex/10), 35 * (zIndex/10)]);
        const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-35 * (zIndex/10), 35 * (zIndex/10)]);
        const targetZ = isHovering ? expandedZ : baseZ;
        const theme = LAYER_THEME[color] ?? DEFAULT_LAYER_THEME;

        return (
            <motion.div
                style={{ zIndex, x: parallaxX, y: parallaxY, transformStyle: 'preserve-3d' }}
                className="absolute inset-0 w-52 h-52 pointer-events-none" 
            >
                <motion.div
                    animate={{ 
                        y: [0, -12, 0], // Gentle levitation
                        z: targetZ 
                    }}
                    transition={{ 
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: zIndex * 0.3 },
                        z: { type: "spring", stiffness: 100, damping: 20 } // Smooth magnetic expansion
                    }}
                    className="w-full h-full relative preserve-3d"
                >
                    <div
                        className={`absolute inset-0 rounded-[22px] flex items-center justify-center backdrop-blur-2xl transition-all duration-500 border-2 ${theme.face}`}
                        style={{ boxShadow: `${theme.glow}, 0 12px 35px rgba(2,6,23,0.18)` }}
                    >
                        <div className="absolute inset-0 rounded-[22px] bg-gradient-to-tr from-white/80 via-white/15 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent" />
                        <div className="absolute inset-0 rounded-[22px] border border-white/40 dark:border-white/5 opacity-40" />
                        <div className="flex flex-col items-center gap-4 relative z-10 transform translate-z-10">
                            <div className={`p-3.5 rounded-2xl bg-white/95 border border-white/50 shadow-xl dark:bg-white/5 dark:border-white/10 ${theme.icon}`}>
                                <Icon size={32} />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-[0.3em] px-3 py-1.5 rounded-full bg-white/80 border border-white/60 dark:border-white/10 dark:bg-white/10 shadow-md ${theme.badge}`}>
                                {title}
                            </span>
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-[22px] pointer-events-none" style={{ boxShadow: '0 0 35px rgba(59,130,246,0.15) inset' }} />
                </motion.div>
            </motion.div>
        );
    }

  return (
    <section ref={containerRef} className="relative w-full min-h-[100vh] flex items-center overflow-hidden" style={{ position: 'relative' }}>
        <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 via-slate-50/50 to-transparent dark:from-[#020617] dark:via-[#020617]/80 dark:to-transparent z-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.div style={{ y: scrollTextY }} className="lg:col-span-7 relative z-20">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 backdrop-blur-md mb-4">
                        <Zap size={14} className="text-blue-600 dark:text-blue-500 fill-blue-600 dark:fill-blue-500" />
                        <span className="text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide uppercase">{heroContent.heroBadge}</span>
                    </motion.div>
                    {heroContent.heroSubtitle && (
                        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-sm uppercase tracking-[0.4em] text-blue-500/80 mb-3">
                            {heroContent.heroSubtitle}
                        </motion.p>
                    )}
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 font-display">
                        {heroContent.heroTitle}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400">{heroContent.heroHighlight}</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-light max-w-xl">
                        {heroContent.heroDescription}
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">Start Transformation <ArrowRight size={20} /></button>
                        <button onClick={handleScrollToServices} className="px-8 py-4 bg-white/60 dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-2"><Layers size={18} /> View Services</button>
                    </div>
                </motion.div>

                {/* 3D Stack Interaction */}
                <div 
                    className="hidden lg:flex lg:col-span-5 items-center justify-center h-[600px] perspective-[1000px] relative z-30"
                    onMouseMove={handleStackMouseMove}
                    onMouseLeave={handleStackMouseLeave}
                    onMouseEnter={handleStackMouseEnter}
                >
                    {/* Expanded Hit Area for proximity detection */}
                    <div className="absolute inset-0 z-0 scale-125"></div> 
                    <motion.div style={{ rotateX, rotateY }} className="relative w-52 h-52 preserve-3d transition-transform duration-200 ease-out">
                        {/* 
                           Config:
                           baseZ: Distinct separation (~50px gaps) to prevent stuck look
                           expandedZ: Dynamic expansion (~110px gaps) on proximity
                        */}
                        <VolumetricLayer zIndex={10} baseZ={-80} expandedZ={-160} color="slate" icon={Server} title="Infrastructure" isHovering={isHoveringStack} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                        <VolumetricLayer zIndex={20} baseZ={-30} expandedZ={-50} color="blue" icon={Database} title="Data Core" isHovering={isHoveringStack} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                        <VolumetricLayer zIndex={30} baseZ={30} expandedZ={60} color="purple" icon={Cpu} title="AI Engine" isHovering={isHoveringStack} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                        <VolumetricLayer zIndex={40} baseZ={80} expandedZ={170} color="cyan" icon={Code} title="Interface" isHovering={isHoveringStack} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                    </motion.div>
                </div>
            </div>
        </div>
        <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-slate-400 dark:text-slate-500 flex flex-col items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} onClick={handleScrollToServices}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to Explore</span>
            <ChevronDown size={18} />
        </motion.div>
    </section>
  );
};

export default Hero;
