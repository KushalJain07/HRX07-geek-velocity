import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { X, Lock, Star, Zap, Crown, Flame, ArrowLeft, Trophy, TrendingUp, CheckCircle } from 'lucide-react'
import GameHeader from '../Header'
import { useParams, useNavigate } from 'react-router-dom'
import { getQuestsForClass } from '../../pages/mockData'
import type { Quest } from '../../pages/mockData'
import QuestDetailScreen from './QuestDetailScreen.jsx'

// Add Difficulty type
export type Difficulty = 'Novice' | 'Adept' | 'Expert' | 'Master' | 'Legend' | 'Mythic';

// XP and Level System
interface ClassProgress {
    classId: string;
    level: number;
    currentXP: number;
    totalXP: number;
    completedQuests: number[];
}

const getLevelXP = (level: number): number => {
    return Math.floor(100 * Math.pow(1.5, level - 1));
};

const getClassProgress = (classId: string): ClassProgress => {
    const stored = localStorage.getItem(`class_progress_${classId}`);
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        classId,
        level: 1,
        currentXP: 0,
        totalXP: getLevelXP(1),
        completedQuests: []
    };
};

const saveClassProgress = (progress: ClassProgress) => {
    localStorage.setItem(`class_progress_${progress.classId}`, JSON.stringify(progress));
};

const addQuestXP = (classId: string, questId: number, xpReward: number): ClassProgress => {
    const progress = getClassProgress(classId);
    
    // Check if quest already completed
    if (progress.completedQuests.includes(questId)) {
        return progress;
    }
    
    let newXP = progress.currentXP + xpReward;
    let newLevel = progress.level;
    let newTotalXP = progress.totalXP;
    
    // Check for level up
    while (newXP >= newTotalXP) {
        newXP -= newTotalXP;
        newLevel++;
        newTotalXP = getLevelXP(newLevel);
    }
    
    const updatedProgress: ClassProgress = {
        ...progress,
        level: newLevel,
        currentXP: newXP,
        totalXP: newTotalXP,
        completedQuests: [...progress.completedQuests, questId]
    };
    
    saveClassProgress(updatedProgress);
    return updatedProgress;
};

// Mock backend data - replace with your actual API call
const useQuestsData = () => {
    const [quests, setQuests] = useState([
        {
            id: 1,
            title: 'Stellar Genesis',
            description: 'Witness the birth of stars in the cosmic nursery. Master the fundamental forces that create light in the darkness.',
            unlocked: true,
            x: 15,
            y: 20,
            constellation: 'Orion Nebula',
            difficulty: 'Novice' as const,
            rewards: ['Star Fragment', '100 XP'],
            estimatedTime: '15 min'
        },
        {
            id: 2,
            title: 'Quantum Drift',
            description: 'Navigate through quantum tunnels where reality bends. Learn to phase between dimensions.',
            unlocked: true,
            x: 40,
            y: 30,
            constellation: 'Andromeda',
            difficulty: 'Adept' as const,
            rewards: ['Quantum Core', '250 XP'],
            estimatedTime: '25 min'
        },
        {
            id: 3,
            title: 'Solar Forge',
            description: 'Harness the power of dying stars to forge new worlds. Control the very essence of creation.',
            unlocked: true,
            x: 70,
            y: 25,
            constellation: 'Phoenix',
            difficulty: 'Expert' as const,
            rewards: ['Solar Essence', '500 XP'],
            estimatedTime: '35 min'
        },
        {
            id: 4,
            title: 'Void Sentinel',
            description: 'Guard the boundaries between known space and the infinite void. Face the unknown.',
            unlocked: false,
            x: 25,
            y: 60,
            constellation: 'Draco',
            difficulty: 'Master' as const,
            rewards: ['Void Crystal', '750 XP'],
            estimatedTime: '45 min'
        },
        {
            id: 5,
            title: 'Cosmic Orchestra',
            description: 'Conduct the symphony of pulsars and quasars. Harmonize with the universe itself.',
            unlocked: false,
            x: 60,
            y: 70,
            constellation: 'Lyra',
            difficulty: 'Legend' as const,
            rewards: ['Scolar Stone', '1000 XP'],
            estimatedTime: '60 min'
        },
        {
            id: 6,
            title: 'Chrono Weaver',
            description: 'Master the threads of time itself. Rewrite the past to forge a new future.',
            unlocked: false,
            x: 80,
            y: 50,
            constellation: 'Chronos',
            difficulty: 'Mythic' as const,
            rewards: ['Time Shard', '1500 XP'],
            estimatedTime: '90 min'
        }
    ])

    // Simulate adding new quests from backend
    const addQuest = useCallback((newQuest: Quest) => {
        setQuests(prev => [...prev, { ...newQuest, id: prev.length + 1 }])
    }, [])

    return { quests, addQuest }
}

// Optimized star field with fewer elements
const StarField = React.memo(() => {
    const stars = useMemo(() =>
        Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.6 + 0.4
        })), []
    )

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                    }}
                />
            ))}
        </div>
    )
})

// Fix QuestOrb props
interface QuestOrbProps {
  quest: Quest;
  onClick: (quest: Quest) => void;
  index: number;
  isCompleted: boolean;
}

const QuestOrb = React.memo(({ quest, onClick, index, isCompleted }: QuestOrbProps) => {
    const orbRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)

    const difficultyConfig = useMemo(() => ({
        'Novice': {
            gradient: 'from-emerald-400 to-green-600',
            glow: 'emerald-400',
            icon: Star,
            ring: 'border-emerald-400/30'
        },
        'Adept': {
            gradient: 'from-cyan-400 to-blue-600',
            glow: 'cyan-400',
            icon: Zap,
            ring: 'border-cyan-400/30'
        },
        'Expert': {
            gradient: 'from-purple-400 to-indigo-600',
            glow: 'purple-400',
            icon: Crown,
            ring: 'border-purple-400/30'
        },
        'Master': {
            gradient: 'from-red-400 to-pink-600',
            glow: 'red-400',
            icon: Flame,
            ring: 'border-red-400/30'
        },
        'Legend': {
            gradient: 'from-yellow-400 to-orange-600',
            glow: 'yellow-400',
            icon: Crown,
            ring: 'border-yellow-400/30'
        },
        'Mythic': {
            gradient: 'from-pink-400 to-purple-600',
            glow: 'pink-400',
            icon: Crown,
            ring: 'border-pink-400/30'
        }
    }), [])

    const config = difficultyConfig[quest.difficulty]
    const IconComponent = config.icon

    useEffect(() => {
        if (!orbRef.current || !quest.unlocked) return

        const orb = orbRef.current
        const glow = glowRef.current

        // Orbital rotation
        const orbitalRing = orb.querySelector('.orbital-ring') as HTMLElement
        if (orbitalRing) {
            gsap.to(orbitalRing, {
                rotation: 360,
                duration: 8 + index * 2,
                repeat: -1,
                ease: "none"
            })
        }

        // Pulsing glow effect
        if (glow) {
            gsap.to(glow, {
                scale: 1.2,
                opacity: 0.8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            })
        }

        // Hover animation setup
        const handleMouseEnter = () => {
            gsap.to(orb, {
                scale: 1.1,
                duration: 0.3,
                ease: "back.out(1.7)"
            })
        }

        const handleMouseLeave = () => {
            gsap.to(orb, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            })
        }

        orb.addEventListener('mouseenter', handleMouseEnter)
        orb.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            orb.removeEventListener('mouseenter', handleMouseEnter)
            orb.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [quest.unlocked, index])

    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${quest.x}%`, top: `${quest.y}%` }}
        >
            <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1
                }}
                className="relative"
            >
                {/* Glow effect */}
                <div
                    ref={glowRef}
                    className={`absolute inset-0 w-16 h-16 rounded-full bg-${config.glow} opacity-30 blur-md`}
                />

                {/* Main orb */}
                <div
                    ref={orbRef}
                    className={`relative w-16 h-16 rounded-full cursor-pointer transition-all duration-200 ${quest.unlocked
                            ? `bg-gradient-to-br ${config.gradient} shadow-lg hover:shadow-xl`
                            : 'bg-gradient-to-br from-gray-700 to-gray-900 opacity-50 cursor-not-allowed'
                        }`}
                    onClick={() => quest.unlocked && onClick(quest)}
                >
                    {/* Orbital ring */}
                    <div className={`orbital-ring absolute inset-0 border-2 rounded-full ${config.ring}`} />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {quest.unlocked ? (
                            <IconComponent className="w-6 h-6 text-white" />
                        ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                        )}
                    </div>

                    {/* Quest number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-black/80 text-white text-xs font-bold rounded-full flex items-center justify-center border border-white/20">
                        {quest.id}
                    </div>
                </div>
                <div></div>

                {/* Quest info */}
                <motion.div
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                >
                    <div className="text-white text-sm font-semibold bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 whitespace-nowrap">
                        {quest.title}
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                        {quest.constellation}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
})

// Fix QuestModal difficultyColors typing
const QuestModal = ({ quest, onClose, isCompleted, onBeginQuest }: { quest: Quest | null; onClose: () => void; isCompleted: boolean; onBeginQuest: () => void }) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (quest && modalRef.current) {
            // GSAP modal entrance animation
            gsap.fromTo(modalRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
            )
        }
    }, [quest])

    if (!quest) return null

    const difficultyColors: Record<Difficulty, string> = {
        'Novice': 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10',
        'Adept': 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10',
        'Expert': 'text-purple-400 border-purple-400/50 bg-purple-400/10',
        'Master': 'text-red-400 border-red-400/50 bg-red-400/10',
        'Legend': 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10',
        'Mythic': 'text-pink-400 border-pink-400/50 bg-pink-400/10'
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <div
                    ref={modalRef}
                    className="bg-slate-900/95 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">{quest.title}</h2>
                        {isCompleted && (
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-green-400 text-sm font-semibold">Completed</span>
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Quest details */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className={`px-3 py-1 rounded-full border text-sm font-semibold ${difficultyColors[quest.difficulty]}`}>
                                {quest.difficulty}
                            </span>
                            <span className="text-purple-300 text-sm">{quest.constellation}</span>
                            <span className="text-gray-400 text-sm">⏱️ {quest.estimatedTime}</span>
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                            {quest.description}
                        </p>

                        {/* Rewards */}
                        <div className="bg-black/30 rounded-lg p-3">
                            <h4 className="text-sm font-semibold text-white mb-2">Quest Rewards:</h4>
                            <div className="flex flex-wrap gap-2">
                                {quest.rewards.map((reward: string, i: number) => (
                                    <span key={i} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/30">
                                        {reward}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <motion.button
                            className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg ${
                                isCompleted 
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                            }`}
                            whileHover={!isCompleted ? { scale: 1.02 } : {}}
                            whileTap={!isCompleted ? { scale: 0.98 } : {}}
                            onClick={() => { 
                                if (!isCompleted) {
                                    onBeginQuest();
                                    onClose();
                                }
                            }}
                            disabled={isCompleted}
                        >
                            {isCompleted ? 'Quest Completed' : 'Begin Quest'}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

// Main component
export default function OptimizedCosmicMap() {
    const { classId } = useParams<{ classId: string }>();
    const navigate = useNavigate();
    const [quests, setQuests] = useState<Quest[]>(() => getQuestsForClass(classId || '1'));
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
    const [scale, setScale] = useState(1)
    const containerRef = useRef(null)
    const [showQuestDetail, setShowQuestDetail] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [classProgress, setClassProgress] = useState<ClassProgress>(() => getClassProgress(classId || '1'));
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [previousLevel, setPreviousLevel] = useState(1);

    // Load class progress on mount
    useEffect(() => {
        const progress = getClassProgress(classId || '1');
        setClassProgress(progress);
        setPreviousLevel(progress.level);
    }, [classId]);

    const handleQuestComplete = (questId: number) => {
        const quest = quests.find(q => q.id === questId);
        if (!quest) return;
        
        // Extract XP from quest rewards (assuming format like "100 XP")
        const xpMatch = quest.rewards.find(reward => reward.includes('XP'));
        const xpReward = xpMatch ? parseInt(xpMatch.split(' ')[0]) : 50;
        
        const oldLevel = classProgress.level;
        const newProgress = addQuestXP(classId || '1', questId, xpReward);
        setClassProgress(newProgress);
        
        // Show level up animation if leveled up
        if (newProgress.level > oldLevel) {
            setPreviousLevel(oldLevel);
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 3000);
        }
    };

    // Optimized wheel handler
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY > 0 ? 0.9 : 1.1
        setScale(prev => Math.max(0.5, Math.min(2.5, prev * delta)))
    }, [])

    useEffect(() => {
        const container = containerRef.current as HTMLDivElement | null;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false })
            return () => container.removeEventListener('wheel', handleWheel)
        }
    }, [handleWheel])

    // Demo function to add new quest (simulate backend)
    const handleAddQuest = () => {
        const newQuest = {
            id: quests.length + 1,
            title: `Quest ${quests.length + 1}`,
            description: 'A new adventure awaits in the cosmic expanse.',
            unlocked: true,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            constellation: 'New Sector',
            difficulty: 'Novice' as Difficulty,
            rewards: ['Mystery Reward', '100 XP'],
            estimatedTime: '20 min'
        }
        setQuests(prev => [...prev, newQuest])
    }

    const handleStartQuiz = () => {
        setShowQuestDetail(false);
        setShowQuiz(true);
        console.log('Starting quiz for quest:', selectedQuest?.title);
    };

    const handleQuizComplete = (passed: boolean) => {
        if (passed && selectedQuest) {
            handleQuestComplete(selectedQuest.id);
        }
        setShowQuiz(false);
    };

    const handleBackToDashboard = () => {
        navigate('/student-dashboard');
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-purple-900 to-blue-950">
            {/* Background */}
            <StarField />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-950 to-slate-900" />

            {/* Class XP Display - Top Right */}
            <div className="fixed top-4 right-4 z-20">
                <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-300 font-semibold text-sm">Class Progress</span>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">Level {classProgress.level}</div>
                        <div className="text-sm text-gray-300 mb-2">
                            {classProgress.currentXP} / {classProgress.totalXP} XP
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(classProgress.currentXP / classProgress.totalXP) * 100}%` }}
                            />
                        </div>
                        <div className="text-xs text-gray-400">
                            {classProgress.completedQuests.length} / {quests.length} Quests
                        </div>
                    </div>
                </div>
            </div>

            {/* Map container */}
            <motion.div
                ref={containerRef}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                drag
                dragElastic={0.05}
                dragConstraints={{
                    left: -200,
                    right: 200,
                    top: -200,
                    bottom: 200
                }}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Quest orbs */}
                {quests.map((quest, index) => (
                    <QuestOrb
                        key={quest.id}
                        quest={quest}
                        onClick={setSelectedQuest}
                        index={index}
                        isCompleted={classProgress.completedQuests.includes(quest.id)}
                    />
                ))}
            </motion.div>

            {/* UI Controls */}
            <div className="fixed top-4 left-4 z-20 space-y-2">
                <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
                    <div className="text-sm text-purple-300 mb-2 font-semibold">Progress</div>
                    <div className="flex gap-1 mb-2">
                        {quests.map(quest => (
                            <div
                                key={quest.id}
                                className={`w-3 h-3 rounded-full ${
                                    classProgress.completedQuests.includes(quest.id) ? 'bg-green-400' :
                                    quest.unlocked ? 'bg-cyan-400' : 'bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                    <div className="text-xs text-gray-400">
                        {classProgress.completedQuests.length} / {quests.length} Completed
                    </div>
                </div>
            </div>

            {/* Zoom controls */}
            <div className="fixed bottom-6 left-6 z-20 flex flex-col gap-2">
                <motion.button
                    className="w-12 h-12 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg flex items-center justify-center text-white hover:bg-purple-900/40 transition-all duration-200"
                    onClick={() => setScale(prev => Math.min(2.5, prev * 1.2))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    +
                </motion.button>
                <motion.button
                    className="w-12 h-12 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg flex items-center justify-center text-white hover:bg-purple-900/40 transition-all duration-200"
                    onClick={() => setScale(prev => Math.max(0.5, prev * 0.8))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    -
                </motion.button>
            </div>

            {/* Instructions */}
            <div className="fixed bottom-6 right-6 z-20 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 max-w-xs">
                <div className="text-xs text-gray-300 space-y-1">
                    <div>🖱️ Drag to explore galaxy</div>
                    <div>🔍 Scroll to zoom in/out</div>
                    <div>🎯 Click orbs to view quests</div>
                </div>
            </div>

            <QuestModal
                quest={selectedQuest}
                onClose={() => setSelectedQuest(null)}
                isCompleted={selectedQuest ? classProgress.completedQuests.includes(selectedQuest.id) : false}
                onBeginQuest={() => setShowQuestDetail(true)}
            />

            {/* Render QuestDetailScreen as a modal or page */}
            {showQuestDetail && (
                <div className="fixed inset-0 z-50">
                    <QuestDetailScreen
                        onStartQuiz={handleStartQuiz}
                        videoUrl={'https://www.w3schools.com/html/mov_bbb.mp4'}
                    />
                    {/* Back button */}
                    <button
                        onClick={() => setShowQuestDetail(false)}
                        className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 text-white hover:bg-purple-900/40 transition-all duration-200"
                    >
                        ← Back to Map
                    </button>
                </div>
            )}

            {/* Quiz Modal */}
            {showQuiz && (
                <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-purple-500/30 shadow-2xl">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Quiz Time!</h2>
                            <p className="text-gray-300 mb-6">
                                Test your knowledge from the video you just watched.
                            </p>
                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        setShowQuiz(false);
                                        // Navigate to actual quiz component
                                        navigate(`/quiz/${selectedQuest?.id}`);
                                    }}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg"
                                >
                                    Start Quiz
                                </button>
                                <button
                                    onClick={() => setShowQuiz(false)}
                                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
                                >
                                    Review Video First
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Back to Dashboard Button */}
            <button
                onClick={handleBackToDashboard}
                className="fixed top-4 left-4 z-20 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 text-white hover:bg-purple-900/40 transition-all duration-200 flex items-center gap-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
            </button>
        </div>
    )
}