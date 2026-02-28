import React, { useState } from 'react';
import { CloudUpload, CheckCircle2, Check } from 'lucide-react';

const SIZES = [
    { label: "3x3cm", multiplier: 1 },
    { label: "4x4cm", multiplier: 1.5 },
    { label: "5x5cm", multiplier: 2.2 }
];

const QUANTITIES = [100, 250, 500, 1000];

export default function ProductCard({ produto, onAdicionar, onVisualizar }) {
    const [selectedSize, setSelectedSize] = useState(SIZES[0]);
    const [selectedQuantity, setSelectedQuantity] = useState(QUANTITIES[0]);
    const [uploaded, setUploaded] = useState(false);

    // Lógica da Calculadora
    // Simulando que o produto tem um precoBase por unidade (ex: 0.50).
    const precoUnitarioBase = produto.precoBase || 0.50;

    // Valor total estimado sem desconto
    const precoOriginal = (precoUnitarioBase * selectedSize.multiplier) * selectedQuantity;

    // PIX tem 10% de desconto
    const precoPix = precoOriginal * 0.90;

    const handleAddToCart = () => {
        onAdicionar({
            ...produto,
            size: selectedSize.label,
            totalPreco: precoPix
        }, selectedQuantity);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-slate-100 p-5 transition-all duration-300 flex flex-col h-full overflow-hidden group">

            {/* Header da Imagem */}
            <div
                onClick={onVisualizar}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 mb-6 cursor-pointer"
            >
                {/* Imagem de mockup vinda do mock do produto com fallback */}
                <img
                    src={produto.image || "https://images.unsplash.com/photo-1623916298696-0373e97022d2?q=80&w=800&auto=format&fit=crop"}
                    alt={produto.name}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[10px] font-bold px-3 py-1 rounded-full text-slate-800 shadow-sm uppercase tracking-wider">
                    Premium
                </div>
            </div>

            {/* Corpo do Card */}
            <div className="flex flex-col flex-grow">

                {/* Título e Subtítulo */}
                <div className="mb-5">
                    <h3
                        onClick={onVisualizar}
                        className="font-bold text-slate-800 text-xl mb-1 leading-tight cursor-pointer hover:text-cyan-600 transition-colors"
                    >
                        {produto.name}
                    </h3>
                    <p className="text-sm text-[#334155]">À prova d'água, ideal para potes e copos.</p>
                </div>

                {/* Seletor de Tamanho (Pills) */}
                <div className="mb-5">
                    <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Tamanho</p>
                    <div className="flex gap-2">
                        {SIZES.map((size) => (
                            <button
                                key={size.label}
                                onClick={() => setSelectedSize(size)}
                                className={`flex-1 py-2 text-sm font-semibold rounded-full border transition-colors duration-200 cursor-pointer ${selectedSize.label === size.label
                                    ? 'bg-cyan-500 text-white border-cyan-500'
                                    : 'bg-slate-50 text-[#334155] border-slate-200 hover:border-cyan-500'
                                    }`}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Seletor de Quantidade (Chips) */}
                <div className="mb-6">
                    <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Tiragem</p>
                    <div className="flex flex-wrap gap-2">
                        {QUANTITIES.map((qty) => (
                            <button
                                key={qty}
                                onClick={() => setSelectedQuantity(qty)}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-lg border transition-colors duration-200 cursor-pointer ${selectedQuantity === qty
                                    ? 'bg-[#1A2B4C]/10 text-slate-800 border-[#1A2B4C]'
                                    : 'bg-white text-[#334155] border-slate-200 hover:border-cyan-500/50'
                                    }`}
                            >
                                {qty} un
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Fricção Zero */}
                <div
                    onClick={() => setUploaded(!uploaded)}
                    className={`mb-6 rounded-xl border-2 border-dashed p-4 flex flex-col items-center justify-center text-center transition-colors duration-300 cursor-pointer ${uploaded
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-300 hover:border-cyan-500 bg-slate-50'
                        }`}
                >
                    {uploaded ? (
                        <>
                            <CheckCircle2 size={24} className="text-emerald-500 mb-2" />
                            <span className="text-sm font-bold text-emerald-700">Arte Anexada com Sucesso!</span>
                            <span className="text-xs text-emerald-600/70 mt-1">Clique para alterar</span>
                        </>
                    ) : (
                        <>
                            <CloudUpload size={24} className="text-slate-400 mb-2 group-hover:text-cyan-500 transition-colors" />
                            <span className="text-sm font-semibold text-slate-800">Arraste sua arte aqui</span>
                            <span className="text-xs text-[#334155] mt-1">ou clique para enviar</span>
                        </>
                    )}
                </div>

                {/* Spacer para empurrar o Checkout para a base no flex-grow */}
                <div className="mt-auto"></div>

                {/* Preços e CTA */}
                <div className="border-t border-slate-100 pt-5 mt-2">
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-400 font-medium">De: <span className="line-through">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoOriginal)}</span></span>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">-10% OFF</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm font-bold text-slate-800">Por:</span>
                            <span className="text-2xl font-black text-emerald-600 tracking-tight">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoPix)}
                            </span>
                            <span className="text-xs text-emerald-600/80 font-semibold ml-1">via PIX</span>
                        </div>
                    </div>

                    <button
                        onClick={onVisualizar}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-orange-500/30 cursor-pointer"
                    >
                        Personalizar agora
                    </button>
                </div>

            </div>
        </div>
    );
}
