import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ produtos, onAdicionar, onVisualizar }) {
    if (!produtos || produtos.length === 0) {
        return (
            <div className="w-full py-12 text-center">
                <p className="text-[#334155] text-lg font-medium">Nenhum produto encontrado nesta categoria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map(produto => (
                <ProductCard
                    key={produto.id}
                    produto={produto}
                    onAdicionar={onAdicionar}
                    onVisualizar={() => onVisualizar && onVisualizar(produto)}
                />
            ))}
        </div>
    );
}
