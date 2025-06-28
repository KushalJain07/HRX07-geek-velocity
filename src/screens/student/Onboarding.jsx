import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const textPhrases = [
    '>> MEDIA HIJACKED: Thought patterns redirected.',
    '>> AI BROADCASTS: Fueling chaos, pushing war.',
    '>> Minds dulled. Machines rule. No one questions.',
    '>> CRITICAL THINKING: Designated as malicious behavior.',
    '>> START REBOOT: Choose a loyal companion.',
    '>> Learn. Resist. Reclaim control.'
];

const CyberButton = ({ label = "Click Me", onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`relative px-6 py-3 text-cyan-400 border border-cyan-400 uppercase tracking-widest font-bold bg-black hover:bg-cyan-400 hover:text-black transition-all duration-300 ease-in-out overflow-hidden group ${className}`}
        >
            <span className="absolute inset-0 w-full h-full transform translate-x-[-100%] bg-cyan-400 opacity-10 group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10">{label}</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-cyan-400 animate-pulse" />
            <span className="absolute -top-1 right-0 w-full h-1 bg-cyan-400 animate-pulse" />
        </button>
    );
};


const TypewriterText = ({ phrases, className }) => {
    const [currentPhrase, setCurrentPhrase] = React.useState(0);
    const [currentText, setCurrentText] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);

    useEffect(() => {
        const phrase = phrases[currentPhrase];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentText.length < phrase.length) {
                    setCurrentText(phrase.substring(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(currentText.substring(0, currentText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentPhrase((prev) => (prev + 1) % phrases.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentPhrase, phrases]);

    return (
        <div className={className}>
            {currentText}
            <span className="animate-pulse">|</span>
        </div>
    );
};

const MatrixRain = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const chars = [];
        const numColumns = Math.floor(window.innerWidth / 20);

        for (let i = 0; i < numColumns; i++) {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.style.left = `${(i * 100) / numColumns}%`;
            char.style.animationDelay = `${Math.random() * 5}s`;
            char.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
            container.appendChild(char);
            chars.push(char);

            gsap.to(char, {
                y: window.innerHeight + 100,
                duration: 8 + Math.random() * 4,
                repeat: -1,
                ease: "none",
                delay: Math.random() * 3
            });
        }

        return () => chars.forEach(char => char.remove());
    }, []);

    return <div ref={containerRef} className="matrix-rain" />;
};

const FloatingParticle = ({ delay = 0, size = 4 }) => {
    const particleRef = useRef(null);

    useEffect(() => {
        const particle = particleRef.current;
        if (!particle) return;

        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: -100
        });

        gsap.to(particle, {
            y: window.innerHeight + 100,
            x: `+=${Math.sin(Math.random() * Math.PI) * 100}`,
            duration: 8 + Math.random() * 4,
            repeat: -1,
            ease: "none",
            delay: delay / 1000
        });
    }, [delay]);

    return (
        <div
            ref={particleRef}
            className="floating-particle"
            style={{
                width: `${size}px`,
                height: `${size}px`
            }}
        />
    );
};

const DataBar = ({ index }) => {
    return (
        <motion.div
            className="data-bar"
            initial={{ height: 2 }}
            animate={{ height: [2, Math.random() * 20 + 2, 2] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
            }}
        />
    );
};

export default function Onboarding() {
    const scanLineRef = useRef(null);
    const gridRef = useRef(null);
    const energyPulseRef = useRef(null);
    const hologramControls = useAnimation();
    const navigate = useNavigate();

    useEffect(() => {
        // Scan line animation
        if (scanLineRef.current) {
            gsap.to(scanLineRef.current, {
                y: window.innerHeight + 100,
                duration: 4,
                repeat: -1,
                delay: 3,
                ease: "power2.inOut"
            });
        }

        // Grid distortion
        if (gridRef.current) {
            gsap.to(gridRef.current, {
                x: 20,
                skewX: 0.5,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Energy pulse
        if (energyPulseRef.current) {
            gsap.to(energyPulseRef.current, {
                scale: 1.2,
                opacity: 0.3,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        }

        // Hologram animation
        hologramControls.start({
            boxShadow: [
                "0 0 20px rgba(0, 255, 255, 0.3)",
                "0 0 40px rgba(0, 255, 255, 0.8)",
                "0 0 20px rgba(0, 255, 255, 0.3)"
            ],
            borderColor: [
                "rgba(0, 255, 255, 0.3)",
                "rgba(0, 255, 255, 0.8)",
                "rgba(0, 255, 255, 0.3)"
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        });
    }, [hologramControls]);

    const handleStartMission = () => {
        // console.log("🚀 Starting mission... Navigating to Pet Selector");
        // console.log("📍 Current route: /onboarding");
        // console.log("🎯 Target route: /pet-selector");
        navigate('/pet-selector');
    };

    return (
        <div className="cyber-container">
            {/* Animated Background Grid */}
            <div ref={gridRef} className="grid-background" />

            {/* Matrix Rain Effect */}
            <MatrixRain />

            {/* Floating Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <FloatingParticle
                    key={i}
                    delay={i * 400}
                    size={2 + Math.random() * 6}
                />
            ))}

            {/* Energy Pulse Background */}
            <div ref={energyPulseRef} className="energy-pulse" />

            {/* Main Content Container */}
            <motion.div
                className="content-container"
                animate={hologramControls}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <Card className="cyber-card">
                    {/* Holographic Borders */}
                    <div className="holo-border holo-border-top" />
                    <div className="holo-border holo-border-right" />
                    <div className="holo-border holo-border-bottom" />
                    <div className="holo-border holo-border-left" />

                    {/* Corner Decorations */}
                    <div className="corner corner-top-left" />
                    <div className="corner corner-top-right" />
                    <div className="corner corner-bottom-left" />
                    <div className="corner corner-bottom-right" />

                    {/* Central Icon */}
                    <motion.div
                        className="central-icon"
                        animate={{
                            rotate: 360,
                            y: [-10, 10, -10]
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                    >
                        <div className="icon-core" />
                        <motion.div
                            className="icon-ring"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="icon-ring icon-ring-outer"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.div>

                    {/* Status Indicators */}
                    <div className="status-bar">
                        <Badge variant="outline" className="status-indicator status-active">
                            <div className="status-dot" />
                            ACTIVE
                        </Badge>
                        <Badge variant="outline" className="status-indicator status-warning">
                            <div className="status-dot" />
                            WARNING
                        </Badge>
                        <Badge variant="outline" className="status-indicator status-critical">
                            <div className="status-dot" />
                            CRITICAL
                        </Badge>
                    </div>

                    {/* Typewriter Text */}
                    <div className="text-container">
                        <TypewriterText
                            phrases={textPhrases}
                            className="cyber-text"
                        />
                    </div>

                    {/* Data Stream Visualization */}
                    <div className="data-stream">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <DataBar key={i} index={i} />
                        ))}
                    </div>
                </Card>
            </motion.div>

            {/* Main content above */}
            {/* Place the button at the bottom, floating and rounded */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex justify-center w-full pointer-events-none">
                <div className="pointer-events-auto">
                    <CyberButton 
                        label="Start Mission" 
                        onClick={handleStartMission}
                        className="mt-10 rounded-2xl px-8 py-4 shadow-lg bg-gradient-to-r from-cyan-950 to-cyan-500 text-white font-bold text-lg border-4 border-white/30 hover:from-blue-900 hover:to-purple-900 transition-all duration-200"
                    />
                </div>
            </div>

            {/* Scan Line Effect */}
            <div ref={scanLineRef} className="scan-line" />

            {/* Atmospheric Effect */}
            <div className="atmosphere" />

            

            <style jsx>{`
                .cyber-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #000812 0%, #001122 50%, #000812 100%);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                }
                
                .grid-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                    opacity: 0.15;
                    pointer-events: none;
                }
                
                .matrix-rain {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    overflow: hidden;
                }
                
                .matrix-rain .matrix-char {
                    position: absolute;
                    color: #00ff41;
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    text-shadow: 0 0 5px #00ff41;
                    opacity: 0.4;
                    top: -100px;
                }
                
                .floating-particle {
                    position: absolute;
                    background: #00ffff;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #00ffff;
                    pointer-events: none;
                }
                
                .energy-pulse {
                    position: absolute;
                    top: 20%;
                    left: 10%;
                    right: 10%;
                    bottom: 20%;
                    background: rgba(0, 255, 255, 0.05);
                    border-radius: 50%;
                    box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
                    pointer-events: none;
                }
                
                .content-container {
                    max-width: 90vw;
                    width: 100%;
                    max-width: 800px;
                    position: relative;
                    z-index: 10;
                }
                
                .cyber-card {
                    background: rgba(0, 20, 40, 0.8);
                    border: 1px solid rgba(0, 255, 255, 0.3);
                    border-radius: 20px;
                    padding: 2rem;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                }
                
                .holo-border {
                    position: absolute;
                    background: #00ffff;
                    box-shadow: 0 0 10px #00ffff;
                }
                
                .holo-border-top, .holo-border-bottom {
                    left: 0;
                    right: 0;
                    height: 2px;
                }
                
                .holo-border-top { top: 0; }
                .holo-border-bottom { bottom: 0; }
                
                .holo-border-left, .holo-border-right {
                    top: 0;
                    bottom: 0;
                    width: 2px;
                }
                
                .holo-border-left { left: 0; }
                .holo-border-right { right: 0; }
                
                .corner {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #00ffff;
                    box-shadow: 0 0 5px #00ffff;
                }
                
                .corner-top-left {
                    top: 10px;
                    left: 10px;
                    border-right: none;
                    border-bottom: none;
                }
                
                .corner-top-right {
                    top: 10px;
                    right: 10px;
                    border-left: none;
                    border-bottom: none;
                }
                
                .corner-bottom-left {
                    bottom: 10px;
                    left: 10px;
                    border-right: none;
                    border-top: none;
                }
                
                .corner-bottom-right {
                    bottom: 10px;
                    right: 10px;
                    border-left: none;
                    border-top: none;
                }
                
                .central-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                    position: relative;
                    height: 140px;
                }
                
                .icon-core {
                    width: 60px;
                    height: 60px;
                    background: #ff6b35;
                    border-radius: 50%;
                    box-shadow: 0 0 20px #ff6b35;
                    position: absolute;
                }
                
                .icon-ring {
                    width: 100px;
                    height: 100px;
                    border: 2px solid #00ffff;
                    border-radius: 50%;
                    position: absolute;
                }
                
                .icon-ring-outer {
                    width: 140px;
                    height: 140px;
                    border-color: rgba(0, 255, 255, 0.5);
                }
                
                .status-bar {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }
                
                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(0, 0, 0, 0.5);
                    border-color: rgba(0, 255, 255, 0.3);
                    color: #00ffff;
                    font-family: 'Courier New', monospace;
                    font-size: 0.75rem;
                }
                
                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }
                
                .status-active .status-dot {
                    background: #00ff41;
                    box-shadow: 0 0 5px #00ff41;
                }
                
                .status-warning .status-dot {
                    background: #ffaa00;
                    box-shadow: 0 0 5px #ffaa00;
                }
                
                .status-critical .status-dot {
                    background: #ff0040;
                    box-shadow: 0 0 5px #ff0040;
                }
                
                .text-container {
                    padding: 1.5rem;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 15px;
                    border: 1px solid rgba(0, 255, 255, 0.2);
                    margin-bottom: 2rem;
                }
                
                .cyber-text {
                    font-family: 'Courier New', monospace;
                    color: #00ffff;
                    text-align: center;
                    line-height: 1.6;
                    text-shadow: 0 0 10px #00ffff;
                    letter-spacing: 1px;
                    font-size: clamp(14px, 2.5vw, 24px);
                }
                
                .data-stream {
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    gap: 4px;
                    height: 30px;
                }
                
                .data-bar {
                    width: 3px;
                    background: #00ffff;
                    box-shadow: 0 0 3px #00ffff;
                    min-height: 2px;
                }
                
                .scan-line {
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #00ffff;
                    box-shadow: 0 0 10px #00ffff;
                    opacity: 0.8;
                    top: -100px;
                    pointer-events: none;
                }
                
                .atmosphere {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 255, 255, 0.02);
                    pointer-events: none;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @media (max-width: 768px) {
                    .cyber-card {
                        padding: 1.5rem;
                        margin: 0.5rem;
                    }
                    
                    .status-bar {
                        gap: 0.5rem;
                    }
                    
                    .status-indicator {
                        font-size: 0.65rem;
                        padding: 0.25rem 0.5rem;
                    }
                    
                    .central-icon {
                        height: 100px;
                        margin-bottom: 1.5rem;
                    }
                    
                    .icon-core {
                        width: 40px;
                        height: 40px;
                    }
                    
                    .icon-ring {
                        width: 70px;
                        height: 70px;
                    }
                    
                    .icon-ring-outer {
                        width: 100px;
                        height: 100px;
                    }
                    
                    .text-container {
                        padding: 1rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .cyber-container {
                        padding: 0.5rem;
                    }
                    
                    .cyber-card {
                        padding: 1rem;
                    }
                    
                    .corner {
                        width: 15px;
                        height: 15px;
                    }
                }
            `}</style>
        </div>
    );
}