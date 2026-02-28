import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Truck, ShoppingCart } from 'lucide-react';

export default function CartDrawer({ aberto, onClose, itens, setItensCarrinho, onGoToCartPage }) {
    const subtotal = itens.reduce((acc, item) => acc + (item.config?.precoTotal || item.precoBase * item.quantidade), 0);
    const frete = 0;
    const total = subtotal + frete;

    const removerItem = (id) => {
        setItensCarrinho(prev => prev.filter(item => item.id !== id));
    };

    return (
        <AnimatePresence>
            {aberto && (
                <React.Fragment>
                    {/* Fundo Escuro Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[var(--color-heading)]/50 backdrop-blur-sm z-[70]"
                    />

                    {/* O Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-surface)] shadow-[0_0_60px_rgba(0,0,0,0.1)] z-[80] flex flex-col"
                    >
                        <div className="p-6 border-b border-[var(--color-background)] flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[var(--color-heading)] tracking-tight">Carrinho</h2>
                            <button onClick={onClose} className="p-2 hover:bg-[var(--color-background)] rounded-full transition-colors text-[var(--color-body)] cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                            {itens.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-[var(--color-body)]/50 space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-[var(--color-background)] flex justify-center items-center">
                                        <ShoppingCart className="w-8 h-8 opacity-50" />
                                    </div>
                                    <p className="font-medium">O carrinho está super vazio.</p>
                                </div>
                            ) : (
                                itens.map(item => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={item.id}
                                        className="flex gap-4 items-center bg-[var(--color-background)] p-3 rounded-2xl relative group"
                                    >
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[var(--color-heading)] text-sm pr-6 leading-tight mb-1">{item.name}</h4>
                                            <div className="flex flex-wrap gap-1 text-[10px] text-[var(--color-body)] font-medium mb-2">
                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded">{item.quantidade} un.</span>
                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded">{item.config?.tamanho || item.size}</span>
                                                {item.config?.formato && <span className="bg-slate-100 px-1.5 py-0.5 rounded">{item.config.formato}</span>}
                                                {item.config?.cor && <span className="bg-slate-100 px-1.5 py-0.5 rounded">{item.config.cor}</span>}
                                            </div>
                                            <p className="font-bold text-[var(--color-primary)] text-sm">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.config?.precoTotal || item.precoBase * item.quantidade)}
                                            </p>
                                        </div>
                                        {/* Botão sutil de apagar que aparece mais no hover no desktop */}
                                        <button
                                            onClick={() => removerItem(item.id)}
                                            className="absolute top-4 right-4 p-1.5 text-[var(--color-body)]/40 hover:text-red-500 hover:bg-red-50 rounded-md transition-all cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {itens.length > 0 && (
                            <div className="p-6 bg-[var(--color-surface)] border-t border-[var(--color-background)] mt-auto shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10">
                                <div className="flex flex-col gap-3 mb-6 text-sm">
                                    <div className="flex justify-between text-[var(--color-body)]">
                                        <span>Subtotal</span>
                                        <span className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-body)]">
                                        <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Frete</span>
                                        <span className="font-bold text-emerald-600">Calculado a seguir</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-heading)] font-bold text-xl mt-2 border-t border-slate-100 pt-3">
                                        <span>Total</span>
                                        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={onGoToCartPage}
                                    className="w-full cursor-pointer bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Finalizar Compra
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
}
