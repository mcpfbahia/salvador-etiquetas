import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

export default function Card({ produto, onAdicionar, onVisualizar }) {
    const [quantidade, setQuantidade] = useState(100);
    const controlesAnimacaoPreco = useAnimation();

    const precoTotal = produto.precoBase * quantidade;
    const melhorCusto = quantidade >= 500;

    useEffect(() => {
        controlesAnimacaoPreco.start({
            scale: [1, 1.15, 1],
            color: ['var(--color-heading)', 'var(--color-primary)', 'var(--color-heading)'],
            transition: { duration: 0.3, ease: 'easeOut' }
        });
    }, [precoTotal, controlesAnimacaoPreco]);

    return (
        <motion.div
            onClick={onVisualizar}
            whileHover={{ y: -6 }}
            className="group relative bg-[var(--color-surface)] cursor-pointer rounded-2xl shadow-[var(--shadow-glass)] hover:shadow-2xl border border-gray-100 p-4 transition-all duration-300 flex flex-col h-full overflow-hidden"
        >
            {melhorCusto && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 -right-10 bg-gradient-to-r from-[var(--color-secondary)] to-[#8B85FF] text-white text-[10px] uppercase tracking-wider font-bold py-1 px-10 shadow-lg transform rotate-45 z-10"
                >
                    Melhor Custo
                </motion.div>
            )}

            {/* Clique na imagem joga para a ProductPage */}
            <div
                className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-[var(--color-background)] cursor-pointer"
                onClick={onVisualizar}
            >
                <img
                    src={produto.image}
                    alt={produto.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-lg text-[var(--color-heading)] shadow-sm">
                    {produto.size}
                </div>

                {/* Overlay ao focar no card - "Ver Detalhes" */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <span className="bg-white/90 text-[var(--color-heading)] font-bold px-4 py-2 rounded-xl text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Ver Detalhes
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                {/* Clique no nome do produto joga para a ProductPage */}
                <h3
                    className="font-bold text-[var(--color-heading)] text-lg mb-1 leading-tight cursor-pointer hover:text-[var(--color-primary)] transition-colors"
                    onClick={onVisualizar}
                >
                    {produto.name}
                </h3>
                <p className="text-sm text-[var(--color-body)] mb-5 line-clamp-2">Recortes perfeitos, laminação emborrachada e ultra-aderência para projetos de alto nível.</p>

                <div className="mt-auto">
                    <div className="flex items-center justify-between bg-[var(--color-background)] rounded-xl p-1 mb-4 border border-gray-100">
                        <button
                            onClick={(e) => { e.stopPropagation(); setQuantidade(q => Math.max(50, q - 50)); }}
                            className="p-2 text-[var(--color-body)] hover:text-[var(--color-primary)] transition-colors cursor-pointer hover:bg-white rounded-lg hover:shadow-sm"
                            aria-label="Diminuir"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-[var(--color-heading)] text-sm">{quantidade} unid.</span>
                        <button
                            onClick={(e) => { e.stopPropagation(); setQuantidade(q => q + 50); }}
                            className="p-2 text-[var(--color-body)] hover:text-[var(--color-primary)] transition-colors cursor-pointer hover:bg-white rounded-lg hover:shadow-sm"
                            aria-label="Aumentar"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[11px] text-[var(--color-body)] uppercase tracking-wider mb-1 font-semibold">Valor</p>
                            <motion.div
                                animate={controlesAnimacaoPreco}
                                className="text-xl font-bold text-[var(--color-heading)]"
                            >
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoTotal)}
                            </motion.div>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); onAdicionar(produto, quantidade); }}
                            className="bg-[var(--color-heading)] hover:bg-[var(--color-primary)] cursor-pointer text-white p-3.5 rounded-xl transition-colors duration-300 shadow-md transform hover:scale-105"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
