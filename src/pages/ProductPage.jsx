import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, ShieldCheck, Truck, Clock, MessageCircle, Info, Star, UploadCloud, FileImage, ShoppingBag, Minus, Plus } from 'lucide-react';

export default function ProductPage({ produto, onVoltar, onAdicionar, categorias, mockAllProducts }) {
    const [quantidade, setQuantidade] = useState(100);
    const [formato, setFormato] = useState('Redondo');
    const [imagemAtiva, setImagemAtiva] = useState(produto.image);

    // Imagens simuladas para a galeria (usando variações abstratas ou a original)
    const galeria = [
        produto.image,
        "https://images.unsplash.com/photo-1589828482434-2e21b776263b?auto=format&fit=crop&q=80&w=600&h=600",
        "https://images.unsplash.com/photo-1628149462522-834c89cf0028?auto=format&fit=crop&q=80&w=600&h=600",
    ];

    const precoTotal = produto.precoBase * quantidade;
    const precoPix = precoTotal * 0.95; // 5% de desconto no Pix
    const brinde = quantidade >= 250 ? Math.floor(quantidade * 0.1) : 0; // 10% de adesivos brinde

    // Produtos Similares
    const similares = mockAllProducts?.filter(p => p.category === produto.category && p.id !== produto.id).slice(0, 4) || [];

    useEffect(() => {
        // Scroll to top when opening product
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [produto]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pb-24"
        >
            {/* Navegação Topo */}
            <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-body)] font-medium">
                <button onClick={onVoltar} className="hover:text-[var(--color-heading)] flex items-center gap-1 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
                <span className="text-gray-300">/</span>
                <span className="cursor-pointer hover:text-[var(--color-heading)] transition-colors">{produto.category}</span>
                <span className="text-gray-300">/</span>
                <span className="text-[var(--color-heading)] truncate">{produto.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">

                {/* Lado Esquerdo - Galeria (Estilo Apple/Neo-SaaS) */}
                <div className="lg:col-span-6 lg:sticky lg:top-28">
                    <div className="bg-[var(--color-surface)] rounded-3xl p-4 md:p-8 shadow-[var(--shadow-glass)] flex items-center justify-center relative overflow-hidden group">
                        {brinde > 0 && (
                            <div className="absolute top-6 right-6 z-10 bg-gradient-to-br from-green-400 to-green-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-green-500/30 flex items-center gap-2 transform rotate-2">
                                <ShieldCheck className="w-4 h-4" /> + {brinde} Brindes Pix
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={imagemAtiva}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={imagemAtiva}
                                alt={produto.name}
                                className="w-full max-w-md aspect-square object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </AnimatePresence>
                    </div>

                    <div className="flex gap-4 mt-4 overflow-x-auto pb-2 hide-scrollbar justify-center lg:justify-start">
                        {galeria.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setImagemAtiva(img)}
                                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${imagemAtiva === img ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lado Direito - Informações do Produto e Checkout */}
                <div className="lg:col-span-6 flex flex-col pt-2 lg:pt-0">

                    <div className="flex items-center gap-2 mb-3 bg-yellow-100/50 w-max px-3 py-1 rounded-full border border-yellow-200">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-yellow-700">Muitos pedidos nas últimas 24h</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-heading)] leading-tight mb-4 tracking-tight">
                        {quantidade} x {produto.name}
                        {brinde > 0 && <span className="block text-xl md:text-2xl text-green-500 mt-2 font-bold">+ {brinde} Adesivos Extras Acima de 250und.</span>}
                    </h1>

                    <p className="text-lg text-[var(--color-body)] leading-relaxed mb-6">
                        Apresente o seu produto com a máxima perfeição. Nossos adesivos em {produto.category} são impressos em alta resolução, com recortes exatos e textura impecável para surpreender seu cliente final.
                    </p>

                    <div className="border border-[var(--color-surface)] bg-white shadow-sm rounded-2xl p-6 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-bl-[100px] -z-10 pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <p className="text-sm text-[var(--color-body)] font-medium mb-1 line-through opacity-70">
                                    De {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoTotal)}
                                </p>
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl md:text-5xl font-bold text-[var(--color-heading)] tracking-tighter">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoPix)}
                                    </span>
                                    <div className="bg-[#10B981]/15 text-[#10B981] font-bold text-sm px-2.5 py-1 rounded-lg border border-[#10B981]/20 pb-1.5 self-center">
                                        no Pix
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-[var(--color-body)] font-medium">
                            <Truck className="w-4 h-4 text-[var(--color-secondary)]" />
                            Tempo de produção: <b>2 dias úteis</b> após envio da arte.
                        </div>
                    </div>

                    {/* Opções de Customização */}
                    <div className="space-y-8 mb-8">
                        {/* Formato */}
                        <div>
                            <h3 className="text-sm font-bold text-[var(--color-heading)] uppercase tracking-wider mb-3 flex justify-between">
                                Corte <span className="text-[var(--color-primary)] opacity-80 cursor-pointer decoration-dotted underline">Guia de Cortes</span>
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {['Redondo', 'Quadrado', 'Especial'].map(fmt => (
                                    <label
                                        key={fmt}
                                        className={`cursor-pointer flex items-center justify-center p-3 rounded-xl border-2 font-semibold text-sm transition-all duration-300 ${formato === fmt ? 'border-[var(--color-heading)] text-[var(--color-heading)] bg-[var(--color-heading)]/5 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="formato"
                                            value={fmt}
                                            className="hidden"
                                            checked={formato === fmt}
                                            onChange={(e) => setFormato(e.target.value)}
                                        />
                                        {fmt}
                                        {formato === fmt && <Check className="w-4 h-4 ml-2" />}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Inputs Avançados */}
                        <div className="p-5 bg-[var(--color-background)] rounded-2xl border border-gray-100/80 space-y-4">
                            <h3 className="text-sm font-bold text-[var(--color-heading)] uppercase tracking-wider flex items-center gap-2">
                                <UploadCloud className="w-4 h-4" /> Arquivos e Links
                            </h3>

                            <div>
                                <label className="block text-xs font-semibold text-[var(--color-body)] mb-1">Seu Instagram ou WhatsApp (para alinharmos a arte)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400">@</span>
                                    </div>
                                    <input type="text" placeholder="Seu @ ou WhatsApp" className="w-full bg-white border border-gray-200 focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/10 rounded-xl py-2.5 pl-8 pr-4 text-sm outline-none transition-all shadow-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[var(--color-body)] mb-1">Link do Google Drive (Opcional)</label>
                                <input type="url" placeholder="Cole o link da sua logo ou arte original..." className="w-full bg-white border border-gray-200 focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/10 rounded-xl py-2.5 px-4 text-sm outline-none transition-all shadow-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Checkbox Importante */}
                    <label className="flex items-start gap-3 p-4 bg-orange-50/50 rounded-xl border border-orange-100 mb-8 cursor-pointer group">
                        <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-[var(--color-primary)] bg-white border-gray-300 rounded focus:ring-[var(--color-primary)]" />
                        <span className="text-sm text-orange-900/80 leading-relaxed font-medium">
                            Li e concordo com os <b>prazos de produção (2 dias úteis)</b>, tamanho inserido e declaro que enviarei uma arte em boa qualidade.
                        </span>
                    </label>

                    {/* Action Row */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

                        <div className="flex bg-[#F3F4F6] rounded-xl p-1.5 border border-gray-200 w-full sm:w-auto overflow-hidden">
                            <button
                                onClick={() => setQuantidade(Math.max(50, quantidade - 50))}
                                className="w-12 py-3 flex items-center justify-center text-gray-500 hover:bg-white hover:text-[var(--color-heading)] rounded-lg transition-colors hover:shadow-sm"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <input
                                type="number"
                                value={quantidade}
                                onChange={(e) => setQuantidade(parseInt(e.target.value) || 0)}
                                className="w-16 text-center font-bold text-[var(--color-heading)] bg-transparent outline-none"
                            />
                            <button
                                onClick={() => setQuantidade(quantidade + 50)}
                                className="w-12 py-3 flex items-center justify-center text-gray-500 hover:bg-white hover:text-[var(--color-heading)] rounded-lg transition-colors hover:shadow-sm"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={() => onAdicionar(produto, quantidade)}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            <ShoppingBag className="w-5 h-5" /> Adicionar ao Carrinho
                        </button>
                    </div>

                </div>
            </div>

            {/* Seções Informativas Longas / Descrição Detalhada */}
            <div className="max-w-4xl mx-auto border-t border-gray-200 pt-16 mt-16 pb-16">
                <div className="prose prose-lg max-w-none text-[var(--color-body)] font-medium">
                    <h2 className="text-3xl font-bold text-[var(--color-heading)] mb-6 tracking-tight flex items-center gap-2">
                        <Info className="w-7 h-7 text-[var(--color-secondary)]" /> Premium em Cada Milímetro.
                    </h2>
                    <p className="leading-relaxed mb-10">
                        Nossos adesivos são produzidos com tecnologia de impressão de última geração e recebem cortes a laser. Isso garante cores vivas que não desbotam facilmente e a facilidade do "Peel & Stick" (destaque rápido do pacote).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                            <h3 className="text-xl font-bold text-[var(--color-heading)] mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" /> Principais Benefícios
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> Somente uma arte por pacote.</li>
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> Brindes em % para compras acima de 250 unidades (pagando via Pix).</li>
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> Bônus exclusivo para atacadistas e revendedores corporativos.</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                            <h3 className="text-xl font-bold text-[var(--color-heading)] mb-4 flex items-center gap-2">
                                <FileImage className="w-5 h-5 text-[var(--color-primary)]" /> Especificações
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-[var(--color-secondary)] shrink-0" /> Material hiper resistente a água e arranhões e baixas temperaturas (Freezer).</li>
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-[var(--color-secondary)] shrink-0" /> Recortes práticos: Já vêm cortados em cartelas e prontos para uso.</li>
                                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-[var(--color-secondary)] shrink-0" /> Mande em JPG, PNG, ou PDF Vetorizado.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Produtos Similares */}
            {similares.length > 0 && (
                <div className="pt-10 border-t border-gray-100">
                    <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-8">Produtos Similares em {produto.category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Aqui nós reaproveitaríamos o Componente Card, mas como o App os importa, para simplificar vamos renderizar mini-cards */}
                        {similares.map(similar => (
                            <div
                                key={similar.id}
                                className="group cursor-pointer bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center text-center"
                            >
                                <div className="aspect-square w-full rounded-xl bg-gray-50 overflow-hidden mb-4 relative">
                                    <img src={similar.image} alt={similar.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    <span className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">{similar.size}</span>
                                </div>
                                <h4 className="font-bold text-[var(--color-heading)] line-clamp-1">{similar.name}</h4>
                                <p className="text-[var(--color-primary)] font-bold mt-2">A partir de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(similar.precoBase * 100)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </motion.div>
    );
}
