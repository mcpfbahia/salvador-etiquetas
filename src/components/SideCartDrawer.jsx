import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ShieldCheck, Plus, Minus } from 'lucide-react';

export default function SideCartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onProceedToCheckout }) {
    const subtotal = items.reduce((acc, item) => acc + (item.config?.precoTotal || item.precoBase * item.quantidade), 0);

    const handleProceedToYampi = () => {
        // Payload preparation for Yampi
        const payload = items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantidade,
            price: item.config?.precoTotal || item.precoBase * item.quantidade,
            options: item.config,
            artworkUrl: item.config?.arquivo ? URL.createObjectURL(item.config.arquivo) : null
        }));

        console.log('🚀 Redirecionando para Yampi com Payload:', payload);

        // Comentário: Onde o redirecionamento oficial entrará:
        // window.location.href = `https://checkout.salvadoretiquetas.com.br/checkout?cart=${btoa(JSON.stringify(payload))}`;

        if (onProceedToCheckout) onProceedToCheckout(payload);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[60] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 p-2 rounded-xl text-slate-900">
                                    <ShoppingBag size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Seu Carrinho</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full p-2 transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body - Itens */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="bg-slate-50 p-6 rounded-full text-slate-200">
                                        <ShoppingBag size={48} />
                                    </div>
                                    <p className="text-slate-400 font-medium">Seu carrinho está vazio.</p>
                                    <button
                                        onClick={onClose}
                                        className="text-cyan-600 font-bold hover:underline cursor-pointer"
                                    >
                                        Continuar comprando
                                    </button>
                                </div>
                            ) : (
                                items.map((item, index) => (
                                    <div key={item.id + '-' + index} className="flex gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-bold text-slate-900 truncate pr-2">{item.name}</h3>
                                                <span className="text-sm font-black text-slate-900">
                                                    R$ {(item.config?.precoTotal || item.precoBase * item.quantidade).toFixed(2).replace('.', ',')}
                                                </span>
                                            </div>

                                            <p className="text-[10px] text-slate-500 mb-2 line-clamp-2">
                                                {item.config?.material && `Mat: ${item.config.material} | `}
                                                {item.config?.tamanho && `Tam: ${item.config.tamanho} | `}
                                                {item.config?.cor && `Cor: ${item.config.cor}`}
                                            </p>

                                            {item.config?.arquivo && (
                                                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-bold mb-3">
                                                    <ShieldCheck size={10} />
                                                    Arte Anexada ✅
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, Math.max(25, item.quantidade - 25))}
                                                        className="p-1 hover:text-cyan-600 transition-colors cursor-pointer"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-black text-slate-900">{item.quantidade}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantidade + 25)}
                                                        className="p-1 hover:text-cyan-600 transition-colors cursor-pointer"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => onRemove(item.id)}
                                                    className="p-2 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-white flex flex-col gap-4">
                                <div className="flex justify-between items-center text-xl font-extrabold text-slate-900 mb-2">
                                    <span>Subtotal</span>
                                    <span className="tracking-tighter">
                                        R$ {subtotal.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>

                                <p className="text-xs text-slate-500 text-center">
                                    Frete e prazo calculados na próxima etapa.
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleProceedToYampi}
                                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-3 cursor-pointer"
                                    >
                                        <span>Finalizar Compra Segura</span>
                                        <ShieldCheck size={20} className="opacity-80" />
                                    </button>

                                    <button
                                        onClick={onClose}
                                        className="w-full py-2 font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors text-sm text-center cursor-pointer"
                                    >
                                        Voltar e continuar comprando
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
