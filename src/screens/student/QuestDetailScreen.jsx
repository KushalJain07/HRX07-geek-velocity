import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'

const notes = [
    { label: 'Open Notes', url: 'https://example.com/notes1.pdf' },
    { label: 'Strategy Guide', url: 'https://example.com/notes2.pdf' }
]

const QuestDetailScreen = ({ videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4', onStartQuiz }) => {
    const [showFact, setShowFact] = useState(false)
    const [factText, setFactText] = useState('')
    const videoRef = useRef(null)
    const lastTime = useRef(0)

    // Removed funFacts array to fix reference error
    // Consider restoring it with actual content

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTime = () => {
            if (video.currentTime > video.duration / 2 && !showFact) {
                setFactText("Sample fact text") // Replace with actual fact logic
                setShowFact(true)
            }
        }

        const preventSeek = () => {
            if (video.currentTime > lastTime.current + 1.5) {
                video.currentTime = lastTime.current
            } else {
                lastTime.current = video.currentTime
            }
        }

        video.addEventListener('timeupdate', handleTime)
        video.addEventListener('seeking', preventSeek)

        return () => {
            video.removeEventListener('timeupdate', handleTime)
            video.removeEventListener('seeking', preventSeek)
        }
    }, [showFact])

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 flex justify-center items-center">
            <div className="w-full max-w-4xl space-y-8 p-6">
                {/* Header Section */}
                <motion.header
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Cosmic Knowledge Quest
                    </h1>
                    <p className="text-lg text-gray-400 font-medium">
                        Complete the video without skipping
                    </p>
                </motion.header>

                {/* Video Container */}
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/50 backdrop-blur-lg"
                >
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        controls
                        className="w-full h-auto aspect-video"
                    />
                </motion.div>

                {/* Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Resources Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
                    >
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
                            <span className="bg-purple-500/20 p-2 rounded-lg">📚</span>
                            Study Materials
                        </h2>
                        <div className="space-y-3">
                            {notes.map((note, i) => (
                                <a
                                    key={i}
                                    href={note.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 transition-all rounded-xl group"
                                >
                                    <span>{note.label}</span>
                                    <ExternalLink className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quiz Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-400">
                                <span className="bg-green-500/20 p-2 rounded-lg">🏆</span>
                                Final Challenge
                            </h2>
                            <p className="text-gray-400 mb-6">
                                Test your knowledge after completing the video
                            </p>
                        </div>
                        <motion.button
                            onClick={onStartQuiz}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl font-bold shadow-lg transition-all"
                        >
                            Start Quiz
                        </motion.button>
                    </motion.div>
                </div>

                {/* Fun Fact Modal */}
                <AnimatePresence>
                    {showFact && (
                        <motion.div
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowFact(false)}
                        >
                            <motion.div
                                onClick={e => e.stopPropagation()}
                                initial={{ scale: 0.8, y: 40 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.7, y: 40 }}
                                className="bg-slate-800/95 border border-purple-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl backdrop-blur-xl"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                                        <span className="text-purple-300">✨</span>
                                        Did You Know?
                                    </h3>
                                    <button
                                        onClick={() => setShowFact(false)}
                                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <X className="text-gray-400 w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-gray-200 leading-relaxed">
                                    {factText}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default QuestDetailScreen
