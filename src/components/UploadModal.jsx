import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, CheckCircle2 } from 'lucide-react';

export default function UploadModal({ aberto, onClose }) {
    const [arrastando, setArrastando] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setArrastando(true);
        } else if (e.type === "dragleave") {
            setArrastando(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastando(false);

        // Tratamento de interface Fake
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setTimeout(() => setEnviado(true), 1200); // delay leve simulação
        }
    };

    const encerrar = () => {
        setEnviado(false); // reseta ao fechar
        onClose();
    };

    return (
        <AnimatePresence>
            {aberto && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={encerrar}
                        className="absolute inset-0 bg-[var(--color-heading)]/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative bg-[var(--color-surface)] w-full max-w-xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] p-8 z-10 overflow-hidden"
                    >
                        <button
                            onClick={encerrar}
                            className="absolute top-4 right-4 p-2 text-[var(--color-body)] cursor-pointer hover:bg-[var(--color-background)] hover:text-[var(--color-heading)] rounded-full transition-colors z-20"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {!enviado ? (
                            <>
                                <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-2">Hora de criar a sua Mágica!</h2>
                                <p className="text-[var(--color-body)] mb-8">Arraste seu arquivo de design (<strong className="text-[var(--color-secondary)]">.PDF, .AI, .PNG</strong>) para receber uma cotação.</p>

                                <div
                                    className={`border-2 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer ${arrastando ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-[1.02]' : 'border-[var(--color-surface)]/80 bg-[var(--color-background)]/50'}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-5 transition-colors ${arrastando ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-secondary)]'}`}>
                                        <UploadCloud className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-bold text-[var(--color-heading)] text-lg mb-1">
                                        {arrastando ? 'Pode Soltar o Arquivo!' : 'Arraste e solte o seu arquivo'}
                                    </h3>
                                    <p className="text-sm text-[var(--color-body)] mb-6">ou, se preferir...</p>

                                    <button className="bg-white cursor-pointer border text-[var(--color-heading)] px-6 py-2.5 rounded-xl text-sm font-semibold hover:border-[var(--color-secondary)] transition-colors shadow-sm">
                                        Explorar Computador
                                    </button>
                                </div>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50/50 border border-green-100 rounded-2xl p-12 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-3">Arte Enviada com Sucesso!</h3>
                                <p className="text-[var(--color-body)] max-w-sm mb-8">Nossa inteligência está fazendo o pré-vôo do seu arquivo. Você receberá um preview perfeito em seu e-mail.</p>
                                <button
                                    onClick={encerrar}
                                    className="bg-[var(--color-heading)] cursor-pointer hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold transition-all w-full md:w-auto"
                                >
                                    Concluir e Voltar
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
