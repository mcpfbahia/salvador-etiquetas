import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Snowflake, Scissors, CheckCircle } from 'lucide-react';

const slides = [
    {
        id: 1,
        layout: 'split',
        title: <>Adesivos em Vinil <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-yellow-400 to-cyan-500">Premium.</span></>,
        bullets: [
            { icon: Droplets, text: "À prova d'água e umidade." },
            { icon: Snowflake, text: "Seguros para geladeira e micro-ondas." },
            { icon: CheckCircle, text: "Recortados e prontos para destacar sua marca." },
        ],
        ctaText: "Ver Opções de Vinil",
        ctaPrimary: true,
        image: "/banner-premium.jpeg",
    },
    {
        id: 2,
        layout: 'centered',
        title: "Brindes Exclusivos via PIX.",
        subtitle: "Finalize sua compra com PIX e garanta até 100 etiquetas extras grátis para turbinar seu delivery.",
        ctaText: "Aproveitar Promoção",
        ctaPrimary: false,
        image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=1200&auto=format&fit=crop",
    }
];

export default function HeroSection({ onCustomize }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative w-full h-[600px] md:h-[500px] bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-200 group flex items-center justify-center">

            {/* Background slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {slides[currentSlide].layout === 'centered' && (
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    )}

                    <div className="absolute inset-0 flex flex-col md:flex-row h-full">
                        {slides[currentSlide].layout === 'split' ? (
                            <>
                                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-6 pt-10 pb-4 md:p-16 z-20">
                                    <div className="max-w-xl w-full">
                                        <motion.h1
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-800 leading-tight mb-6"
                                        >
                                            {slides[currentSlide].title}
                                        </motion.h1>

                                        <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
                                            {slides[currentSlide].bullets.map((bullet, idx) => {
                                                const Icon = bullet.icon;
                                                return (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                                                        className="flex items-center gap-3 text-slate-700"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                                                            <Icon size={16} className="text-cyan-500" />
                                                        </div>
                                                        <span className="text-sm md:text-base font-medium text-slate-700">{bullet.text}</span>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.6 }}
                                            className="hidden md:block" // Esconde no mobile para dar espaço
                                        >
                                            <button
                                                onClick={onCustomize}
                                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30"
                                            >
                                                {slides[currentSlide].ctaText}
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="w-full h-1/2 md:w-1/2 md:h-full relative flex items-center justify-center z-10 px-6 pb-12 md:pb-0">
                                    <motion.div
                                        animate={{ y: [-15, 10, -15] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative w-full max-w-[280px] md:max-w-sm aspect-[4/3] md:aspect-square"
                                    >
                                        <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] md:blur-[80px] rounded-full"></div>
                                        <motion.img
                                            initial={{ scale: 1 }}
                                            animate={{ scale: 1.05 }}
                                            transition={{ duration: 5, ease: "linear" }}
                                            src={slides[currentSlide].image}
                                            alt="Produto Premium"
                                            className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10 border border-slate-200"
                                        />
                                    </motion.div>

                                    {/* Botão para mobile na parte inferior da imagem dividida */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        className="absolute bottom-16 md:hidden z-30"
                                    >
                                        <button
                                            onClick={onCustomize}
                                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30"
                                        >
                                            {slides[currentSlide].ctaText}
                                        </button>
                                    </motion.div>

                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center px-6 py-12 md:p-16 z-20 relative overflow-hidden">
                                <div className="absolute inset-0 z-0">
                                    <motion.img
                                        initial={{ scale: 1 }}
                                        animate={{ scale: 1.05 }}
                                        transition={{ duration: 5, ease: "linear" }}
                                        src={slides[currentSlide].image}
                                        alt="Embalagens e Brindes"
                                        className="w-full h-full object-cover opacity-20"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/80 to-transparent"></div>
                                </div>

                                <div className="max-w-3xl w-full text-center relative z-10 flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="w-16 h-1 rounded-full bg-cyan-500 mb-6 md:mb-8"
                                    />
                                    <motion.h1
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-4 md:mb-6"
                                    >
                                        {slides[currentSlide].title}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="text-base md:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl"
                                    >
                                        {slides[currentSlide].subtitle}
                                    </motion.p>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        <button
                                            onClick={onCustomize}
                                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30"
                                        >
                                            {slides[currentSlide].ctaText}
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls - Glassmorphism */}
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-40 transition-opacity duration-300">
                <div className="flex gap-2 bg-slate-800/10 backdrop-blur-md border border-slate-200/50 px-4 py-2 rounded-full">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx
                                ? "bg-cyan-500 w-6 md:w-8"
                                : "bg-slate-300 hover:bg-slate-400 w-2"
                                }`}
                        />
                    ))}
                </div>
            </div>

        </section >
    );
}
