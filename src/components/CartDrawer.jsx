import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Truck, ShoppingCart } from 'lucide-react';

export default function CartDrawer({ aberto, onClose, itens, setItensCarrinho }) {
    const subtotal = itens.reduce((acc, item) => acc + (item.precoBase * item.quantidade), 0);
    const descontoPix = subtotal * 0.05; // 5% de desconto
    const frete = subtotal > 0 ? 15.90 : 0; // Exemplo de valor fixo ou grátis dependendo de regras
    const total = subtotal - descontoPix + frete;

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
                                            <div className="flex gap-2 text-[11px] text-[var(--color-body)] font-medium bg-[var(--color-surface)] py-0.5 px-2 w-max rounded-md mb-2">
                                                {item.quantidade} unid. • {item.size}
                                            </div>
                                            <p className="font-bold text-[var(--color-primary)] text-sm">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoBase * item.quantidade)}
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
                                        <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Frete Padrão</span>
                                        <span className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(frete)}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-3 py-2 rounded-lg font-semibold mt-1">
                                        <span>Desconto via PIX (5%)</span>
                                        <span>- {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(descontoPix)}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-heading)] font-bold text-xl mt-2">
                                        <span>Total Final</span>
                                        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
                                    </div>
                                </div>

                                <button className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300">
                                    Fechar Pedido com PIX
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
