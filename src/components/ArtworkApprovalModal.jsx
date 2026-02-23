import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, User, Smartphone } from 'lucide-react';

export default function ArtworkApprovalModal({ isOpen, onClose, onConfirm }) {
    const [nome, setNome] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const isFormValid = nome.trim() !== '' && whatsapp.trim() !== '';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Fundo (Overlay) Escuro com Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                    />

                    {/* Card do Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl shadow-slate-200/50 flex flex-col pt-8 pb-6 px-6 sm:px-8 z-10"
                    >
                        {/* Botão Fechar Discreto */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Cabeçalho do Modal com Ícone Palette (Cyan) */}
                        <div className="flex justify-center mb-5">
                            <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center">
                                <Palette className="w-7 h-7 text-cyan-500" />
                            </div>
                        </div>

                        {/* Textos da Cópia (Copywriting) */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 leading-tight">
                                Arte Recebida com Sucesso! 🎨
                            </h2>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                Para garantir que sua impressão fique perfeita, nossa equipe de design vai gerar uma prova virtual. Onde podemos te enviar para aprovação?
                            </p>
                        </div>

                        {/* Campos de Entrada (Inputs) */}
                        <div className="space-y-4 mb-6">
                            {/* Input 1: Seu Nome */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1 uppercase tracking-wide">
                                    Seu Nome
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <User className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Como devemos te chamar"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 pl-10 pr-4 outline-none transition-all focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder:text-slate-400 font-medium shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Input 2: WhatsApp */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1 uppercase tracking-wide">
                                    WhatsApp
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Smartphone className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="(00) 00000-0000"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 pl-10 pr-4 outline-none transition-all focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder:text-slate-400 font-medium shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Call to Action (CTA) */}
                        <div className="flex flex-col items-center gap-3 mt-auto">
                            <button
                                onClick={() => onConfirm({ nome, whatsapp })}
                                disabled={!isFormValid}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all duration-300 ${isFormValid
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] shadow-lg shadow-orange-500/30 cursor-pointer'
                                        : 'bg-gradient-to-r from-slate-300 to-slate-400 opacity-70 cursor-not-allowed'
                                    }`}
                            >
                                Ir para o Pagamento 🔒
                            </button>

                            <p className="text-[11px] font-medium text-slate-400 pt-1">
                                Fique tranquilo, não enviamos spam.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
