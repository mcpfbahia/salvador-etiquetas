import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ onCustomize }) {
    return (
        <section className="relative rounded-[24px] bg-gradient-to-br from-[#1A1A2E] to-[#2A2A4A] overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Pattern de fundo para profundidade suave */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="relative z-10 max-w-xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
                >
                    Seque a concorrência com qualidade <span className="text-[var(--color-primary)]">Premium</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-white/80 mb-8 max-w-md"
                >
                    Sua marca merece materiais de alta durabilidade, texturas impecáveis e cor radiante. Chega na sua porta em tempo recorde.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <button
                        onClick={onCustomize}
                        className="bg-[var(--color-primary)] hover:bg-[#E55015] text-white px-8 py-4 rounded-xl font-bold text-lg cursor-pointer hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,95,31,0.3)] transition-all duration-300"
                    >
                        Personalizar Agora
                    </button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative z-10 w-full max-w-md hidden md:block"
            >
                <div className="aspect-square rounded-full bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 blur-3xl absolute inset-0 -z-10 animate-pulse"></div>
                <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600&h=600"
                    alt="Amostra de Adesivos Premium"
                    className="rounded-[20px] shadow-2xl rotate-3 hover:translate-y-[-10px] hover:rotate-6 transition-transform duration-500"
                />
            </motion.div>
        </section>
    );
}
