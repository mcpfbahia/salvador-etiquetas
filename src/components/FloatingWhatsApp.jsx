import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [fechadoManualmente, setFechadoManualmente] = useState(false);

    // Mostra o tooltip automaticamente logo após a página carregar (para atrair a atenção 1 vez)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!fechadoManualmente) {
                setShowTooltip(true);
            }
        }, 3000);

        // Esconde sozinho depois de um tempo se o usuário não interagir
        const hideTimer = setTimeout(() => {
            if (!isHovered && !fechadoManualmente) {
                setShowTooltip(false);
            }
        }, 10000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, [isHovered, fechadoManualmente]);

    const handleClose = (e) => {
        e.preventDefault(); // Pra não clicar no link principal por acidente ao fechar
        e.stopPropagation();
        setShowTooltip(false);
        setFechadoManualmente(true);
    };

    return (
        <div
            className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3"
            onMouseEnter={() => !fechadoManualmente && setShowTooltip(true)}
            onMouseLeave={() => !fechadoManualmente && setShowTooltip(false)}
        >
            {/* Bolha de Mensagem (Tooltip Inteligente) */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="relative bg-white border border-cyan-100 p-4 rounded-2xl shadow-xl shadow-slate-200/60 w-64 origin-bottom-right"
                    >
                        {/* Pontinha da bolha de fala virada para o botão */}
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-cyan-100 transform rotate-45"></div>

                        {/* Botão Fechar Discreto */}
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer p-1"
                        >
                            <X size={14} />
                        </button>

                        <div className="flex items-start gap-3 relative z-10">
                            <div className="mt-1 relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-slate-800 font-bold text-sm leading-tight mb-1">
                                    Dúvidas com a sua arte?
                                </span>
                                <span className="text-slate-500 text-xs font-medium">
                                    Fale com um designer agora 🎨
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* O Botão Principal (WhatsApp) */}
            <a
                href="https://wa.me/5571999999999?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20minhas%20etiquetas!"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/40 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 relative group"
            >
                {/* Efeito de pulso lento */}
                <div className="absolute inset-0 rounded-full bg-green-500/50 animate-ping opacity-75 group-hover:opacity-0" style={{ animationDuration: '3s' }}></div>

                {/* SVG Customizado do WhatsApp (fica mais profissional que o MessageCircle se for whatsapp) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10"
                >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
            </a>
        </div>
    );
}
