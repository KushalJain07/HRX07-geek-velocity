'use client'

import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'

export default function EnterCodeScreen() {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-red-500 px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <h1 className="text-white text-3xl font-bold text-center mb-8">
                Start your own epic Journey
            </h1>

            <div className="flex items-center gap-2 mb-4">
                {[...Array(3)].map((_, i) => (
                    <Input
                        key={`left-${i}`}
                        type="text"
                        maxLength={1}
                        className="w-12 h-14 text-center text-white text-xl font-semibold backdrop-blur-md bg-white/10 rounded-md border-none focus-visible:ring-1 focus-visible:ring-white"
                    />
                ))}

                <span className="text-white text-2xl font-semibold px-2">-</span>

                {[...Array(3)].map((_, i) => (
                    <Input
                        key={`right-${i}`}
                        type="text"
                        maxLength={1}
                        className="w-12 h-14 text-center text-white text-xl font-semibold backdrop-blur-md bg-white/10 rounded-md border-none focus-visible:ring-1 focus-visible:ring-white"
                    />
                ))}
            </div>

            <p className="text-white text-base text-center">
                Enter the classroom code given by your teacher
            </p>
        </motion.div>
    )
}