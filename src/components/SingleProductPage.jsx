import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    ShieldCheck,
    Truck,
    RotateCcw,
    CreditCard,
    CheckCircle2,
    UploadCloud,
    X,
    ChevronLeft,
    ChevronRight,
    MessageCircle,
    Info,
    Flame,
    HandCoins,
    Timer
} from 'lucide-react';
import ShippingCalculator from './ShippingCalculator';
import RelatedProducts from './RelatedProducts';

export default function SingleProductPage({ produto, onVoltar, onAdicionar }) {
    // ESTADOS DA CALCULADORA
    const [material, setMaterial] = useState('Vinil Brilho');
    const [tamanho, setTamanho] = useState('5x5cm');
    const [formato, setFormato] = useState('Quadrado');
    const [cor, setCor] = useState('Colorido');
    const [quantidade, setQuantidade] = useState(100);
    const [imagemAtiva, setImagemAtiva] = useState(produto.image);
    const [isStickyVisible, setIsStickyVisible] = useState(false);
    const [arrastando, setArrastando] = useState(false);
    const [arquivo, setArquivo] = useState(null);
    const fileInputRef = useRef(null);

    // DADOS DE CONFIGURAÇÃO
    const MATERIAIS = [
        { id: 'brilho', name: 'Vinil Brilho', desc: 'Acabamento clássico com reflexo.', icon: '✨' },
        { id: 'fosco', name: 'Vinil Fosco', desc: 'Elegante, sem reflexos de luz.', icon: '🌑' },
        { id: 'transp', name: 'Transparente', desc: 'Ideal para vidros e potes.', icon: '🫙' }
    ];

    const TAMANHOS = ['3x3cm', '4x4cm', '5x5cm', '6x6cm', 'Personalizado'];

    const CORES = [
        { id: 'Colorido', label: 'Colorido', icon: '🎨', desc: 'Impressão CMYK vibrante.' },
        { id: 'Preto e Branco', label: 'Preto e Branco', icon: '⚫', desc: 'Preço reduzido (-25%).' }
    ];

    const FORMATOS = [
        {
            id: 'Quadrado',
            label: 'Quadrado',
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                    <rect x="6" y="6" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
            )
        },
        {
            id: 'Redondo',
            label: 'Redondo',
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
            )
        },
        {
            id: 'Retangular',
            label: 'Retangular',
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                    <rect x="4" y="10" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
            )
        }
    ];

    const QUANTIDADES = [
        { val: 25, desconto: 1.00, promo: '' },
        { val: 50, desconto: 0.64, promo: '' },
        { val: 100, desconto: 0.40, promo: '' },
        { val: 250, desconto: 0.18, promo: '' },
        { val: 500, desconto: 0.09, promo: '15% OFF' },
        { val: 1000, desconto: 0.08, promo: 'MELHOR CUSTO' }
    ];

    const GALERIA = [
        produto.image,
        "/mockups/vinil-premium.png",
        "/mockups/transparente.png",
        "/mockups/lacre-delivery.png"
    ];

    // LÓGICA DE PREÇO (SIMULADA)
    const precoBase = 0.45; // Preço por cm² aproximadamente
    const fatorTamanho = useMemo(() => {
        if (tamanho === '3x3cm') return 0.6;
        if (tamanho === '4x4cm') return 0.8;
        if (tamanho === '5x5cm') return 1.0;
        if (tamanho === '6x6cm') return 1.3;
        return 1.5;
    }, [tamanho]);

    const fatorCor = useMemo(() => {
        return cor === 'Preto e Branco' ? 0.75 : 1.0;
    }, [cor]);

    const fatorQuantidade = useMemo(() => {
        const q = QUANTIDADES.find(q => q.val === quantidade);
        return q ? q.desconto : 1.0;
    }, [quantidade]);

    const precoTotal = useMemo(() => {
        return (precoBase * fatorTamanho * quantidade * fatorQuantidade * fatorCor);
    }, [fatorTamanho, quantidade, fatorQuantidade, fatorCor]);

    const precoUnitario = precoTotal / quantidade;

    // MONITORAR SCROLL PARA CTA FIXO
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) setIsStickyVisible(true);
            else setIsStickyVisible(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // HANDLERS
    const handleAdd = () => {
        onAdicionar({
            ...produto,
            config: { material, formato, cor, tamanho, quantidade, precoTotal, arquivo }
        }, quantidade);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Navegação Topo */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <button
                    onClick={onVoltar}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Voltar para {produto.category}</span>
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-4 md:flex md:gap-12 lg:gap-16 py-4 pb-24">

                {/* LADO ESQUERDO: GALERIA STICKY */}
                <div className="md:w-1/2 lg:w-[55%]">
                    <div className="md:sticky md:top-24 space-y-6">
                        <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden group cursor-zoom-in border border-slate-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={imagemAtiva}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    src={imagemAtiva}
                                    alt={produto.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4">
                            {GALERIA.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setImagemAtiva(img)}
                                    className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${imagemAtiva === img ? 'border-cyan-500 ring-4 ring-cyan-500/10 shadow-lg' : 'border-slate-100 hover:border-slate-300'
                                        }`}
                                >
                                    <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* LADO DIREITO: CONFIGURADOR */}
                <div className="md:w-1/2 lg:w-[45%] mt-10 md:mt-0">
                    {/* Header do Produto */}
                    <div className="mb-10">
                        <span className="bg-cyan-100 text-cyan-700 font-black px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-widest border border-cyan-200/50">
                            Alta Performance
                        </span>
                        <h1 className="text-xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mt-4 md:mt-6 tracking-tight">
                            {produto.name}
                        </h1>

                        <div className="flex items-center gap-3 mt-4 md:mt-6">
                            <div className="flex text-yellow-500 scale-90 md:scale-100">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <span className="text-slate-500 font-medium text-xs md:text-sm">(128 avaliações)</span>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-orange-600 font-bold text-[10px] md:text-sm bg-orange-50 w-full md:w-max px-3 md:px-4 py-2 rounded-xl border border-orange-100 break-words line-clamp-1 md:line-clamp-none">
                            <Flame size={14} className="shrink-0" />
                            <span>14 pessoas vendo agora</span>
                        </div>
                    </div>

                    {/* Lógica da Calculadora */}
                    <div className="space-y-10">
                        {/* 1. Escolha o Material */}
                        <div>
                            <h3 className="text-slate-900 font-black text-base md:text-lg mb-4 flex justify-between items-center">
                                1. Escolha o Material
                                <span className="text-[10px] md:text-xs text-slate-400 font-normal underline cursor-help">Detalhes</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {MATERIAIS.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMaterial(m.name)}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all relative group cursor-pointer ${material === m.name
                                            ? 'border-slate-900 bg-white shadow-md'
                                            : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{m.icon}</div>
                                        <div className="font-bold text-sm text-slate-900">{m.name}</div>
                                        <div className="text-[10px] text-slate-500 mt-1 leading-tight">{m.desc}</div>
                                        {material === m.name && (
                                            <div className="absolute top-3 right-3 text-slate-900 animate-in zoom-in-0 duration-300">
                                                <CheckCircle2 size={18} fill="currentColor" className="text-white fill-slate-900" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Escolha o Tamanho */}
                        <div>
                            <h3 className="text-slate-900 font-bold text-lg mb-4">2. Escolha o Tamanho</h3>
                            <div className="flex flex-wrap gap-2">
                                {TAMANHOS.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTamanho(t)}
                                        className={`px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${tamanho === t
                                            ? 'bg-slate-900 text-white shadow-lg'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Escolha o Formato */}
                        <div>
                            <h3 className="text-slate-900 font-bold text-lg mb-4">3. Escolha o Formato</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {FORMATOS.map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setFormato(f.id)}
                                        className={`flex flex-col items-center gap-2 py-5 px-3 rounded-2xl border-2 transition-all cursor-pointer relative ${formato === f.id
                                            ? 'border-slate-900 bg-white shadow-md text-slate-900'
                                            : 'border-slate-100 bg-slate-50/50 hover:border-slate-300 text-slate-400'
                                            }`}
                                    >
                                        {f.icon}
                                        <span className={`text-xs font-bold tracking-wide ${formato === f.id ? 'text-slate-900' : 'text-slate-500'
                                            }`}>{f.label}</span>
                                        {formato === f.id && (
                                            <div className="absolute top-2 right-2 text-slate-900">
                                                <CheckCircle2 size={15} fill="currentColor" className="text-white fill-slate-900" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 4. Escolha a Cor da Impressão */}
                        <div>
                            <h3 className="text-slate-900 font-bold text-lg mb-4">4. Escolha a Cor da Impressão</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {CORES.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setCor(c.id)}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all relative group cursor-pointer ${cor === c.id
                                            ? 'border-slate-900 bg-white shadow-md'
                                            : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">{c.icon}</div>
                                            <div>
                                                <div className="font-bold text-sm text-slate-900">{c.label}</div>
                                                <div className="text-[10px] text-slate-500 leading-tight">{c.desc}</div>
                                            </div>
                                        </div>
                                        {cor === c.id && (
                                            <div className="absolute top-3 right-3 text-slate-900">
                                                <CheckCircle2 size={18} fill="currentColor" className="text-white fill-slate-900" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 5. Escolha a Quantidade */}
                        <div>
                            <h3 className="text-slate-900 font-bold text-lg mb-4">5. Escolha a Quantidade</h3>
                            <div className="space-y-3">
                                {/* Cabeçalho da Tabela - Desktop Only */}
                                <div className="hidden md:grid grid-cols-[40px_1fr_120px_120px] gap-4 px-5 pb-2">
                                    <div /> {/* Espaço reservado para alinhar com o radio button abaixo */}
                                    <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Quantidade</div>
                                    <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Unitário</div>
                                    <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total</div>
                                </div>

                                {/* Linhas da Tabela */}
                                <div className="space-y-2 md:space-y-3">
                                    {QUANTIDADES.map((q) => {
                                        const isSelected = quantidade === q.val;
                                        const unitario = (precoBase * fatorTamanho * q.desconto * fatorCor);
                                        const total = unitario * q.val;

                                        return (
                                            <button
                                                key={q.val}
                                                onClick={() => setQuantidade(q.val)}
                                                className={`w-full p-4 md:p-5 rounded-2xl border-2 transition-all cursor-pointer relative 
                                                    ${isSelected
                                                        ? 'border-slate-900 bg-white shadow-xl shadow-slate-200/50 z-10'
                                                        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                                                    }
                                                    /* Mobile: Flex | Desktop: Grid */
                                                    flex flex-row justify-between items-center
                                                    md:grid md:grid-cols-[40px_1fr_120px_120px] md:gap-4
                                                `}
                                            >
                                                {/* Coluna 1: Radio + Quantidade (Mobile) ou Radio (Desktop) */}
                                                <div className="flex items-center gap-3 md:gap-0">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-slate-900' : 'border-slate-300'}`}>
                                                        {isSelected && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
                                                    </div>

                                                    {/* Texto de Quantidade visível no mobile ao lado do radio */}
                                                    <div className="flex flex-col text-left md:hidden ml-1">
                                                        <span className={`text-base font-bold leading-none ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                                                            {q.val} un
                                                        </span>
                                                        {q.promo && (
                                                            <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-tight mt-1">
                                                                {q.promo}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Coluna 2: Quantidade (Desktop Only) */}
                                                <div className="hidden md:flex flex-col text-left truncate">
                                                    <span className={`text-base font-bold truncate ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                                                        {q.val} un
                                                    </span>
                                                    {q.promo && (
                                                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight">
                                                            {q.promo}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Coluna 3: Unitário (Desktop Only / Mobile as small label) */}
                                                <div className="hidden md:block text-sm font-medium text-center text-slate-500">
                                                    R$ {unitario.toFixed(2).replace('.', ',')}
                                                </div>

                                                {/* Coluna 4: Total (Desktop Right / Mobile as Stacked prices) */}
                                                <div className="text-right flex flex-col items-end">
                                                    <span className={`text-lg md:text-base font-black ${isSelected ? 'text-slate-900' : 'text-slate-900'}`}>
                                                        R$ {total.toFixed(2).replace('.', ',')}
                                                    </span>
                                                    {/* Preço Unitário no Mobile (Logo abaixo ou acima do total como solicitado) */}
                                                    <span className="md:hidden text-[10px] text-slate-500 font-medium">
                                                        R$ {unitario.toFixed(2).replace('.', ',')} /un
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Preço e Dropzone */}
                        <div className="bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 space-y-6 md:space-y-8 border border-slate-100">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                                <div>
                                    <span className="text-slate-400 font-bold text-[10px] md:text-sm uppercase tracking-widest block mb-1 md:mb-2">Investimento Total</span>
                                    <motion.div
                                        key={precoTotal}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                        className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter"
                                    >
                                        R$ {precoTotal.toFixed(2).replace('.', ',')}
                                    </motion.div>
                                    <div className="text-emerald-600 font-bold text-[11px] md:text-sm mt-1.5 md:mt-2 flex items-center gap-1">
                                        <CheckCircle2 size={14} md:size={16} />
                                        Sai a R$ {precoUnitario.toFixed(2).replace('.', ',')} / un
                                    </div>
                                </div>
                                <div className="text-left md:text-right border-t md:border-t-0 border-slate-200 pt-3 md:pt-0">
                                    <div className="text-[10px] md:text-xs text-slate-500 font-medium mb-0.5 md:mb-1">Ou em até 12x de</div>
                                    <div className="text-slate-900 font-black text-xl md:text-2xl tracking-tight">R$ {(precoTotal / 12).toFixed(2).replace('.', ',')}</div>
                                </div>
                            </div>

                            {/* Dropzone */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".pdf,.ai,.png,.jpg,.jpeg"
                                onChange={(e) => setArquivo(e.target.files[0])}
                            />
                            <div
                                onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
                                onDragLeave={() => setArrastando(false)}
                                onDrop={(e) => { e.preventDefault(); setArrastando(false); setArquivo(e.dataTransfer.files[0]); }}
                                onClick={() => fileInputRef.current.click()}
                                className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[160px] ${arrastando ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 bg-white hover:border-slate-400'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${arquivo ? 'bg-emerald-500 text-white' : (arrastando ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200')}`}>
                                    {arquivo ? <ShieldCheck size={24} /> : <UploadCloud size={24} />}
                                </div>
                                <div className={`font-bold text-sm mb-1 ${arquivo ? 'text-emerald-600' : 'text-slate-800'}`}>
                                    {arquivo ? 'Imagem carregada com sucesso!' : 'Clique ou arraste sua arte aqui'}
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                                    {arquivo ? arquivo.name : 'PDF, AI, PNG ou JPG de alta resolução (Máx 5MB)'}
                                </p>
                                {arquivo && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setArquivo(null); }}
                                        className="mt-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 underline cursor-pointer"
                                    >
                                        Remover Arquivo
                                    </button>
                                )}
                            </div>

                            {/* Botão de Compra */}
                            <button
                                onClick={handleAdd}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 md:py-5 rounded-2xl font-black text-base md:text-xl shadow-2xl shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer group whitespace-nowrap"
                            >
                                <span>Finalizar Compra Segura</span>
                                <ShieldCheck size={20} md:size={22} className="opacity-80 group-hover:rotate-12 transition-transform shrink-0" />
                            </button>

                            {/* Trust Signals */}
                            <div className="grid grid-cols-3 gap-2 pt-4">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Truck size={20} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Frete Rápido</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2 border-x border-slate-100">
                                    <RotateCcw size={20} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Troca Garantida</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <CreditCard size={20} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Yampi Seguro</span>
                                </div>
                            </div>

                            {/* Garantia e Promoção */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-start gap-3">
                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-900">
                                        <HandCoins size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 leading-tight">Garantia de preço mais baixo.</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Se encontrar um preço mais baixo, igualamos o preço.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-900">
                                        <Timer size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 leading-tight">Promoção válida</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">de 01/02/2026 às 00:00 a 28/02/2026 às 23:59</p>
                                    </div>
                                </div>
                            </div>

                            {/* Calculadora de Frete */}
                            <ShippingCalculator />
                        </div>
                    </div>
                </div>
            </main>

            {/* STICKY BOTTOM MOBILE CTA */}
            <AnimatePresence>
                {isStickyVisible && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 w-full z-50 p-4 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] block md:hidden"
                    >
                        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Total</span>
                                <span className="text-xl font-black text-slate-900">R$ {precoTotal.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3.5 rounded-xl font-black text-sm flex-1 shadow-lg shadow-orange-500/25 active:scale-95"
                            >
                                COMPRAR AGORA 🔒
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Produtos Relacionados (Cross-sell) */}
            <RelatedProducts />

            {/* Descrição Técnica Adicional */}
            <section className="bg-slate-50 py-20 mt-12">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-xl md:text-3xl font-black text-slate-900 mb-8 md:mb-10 flex items-center gap-3 leading-tight md:leading-normal">
                        <Info size={24} md:size={32} className="text-cyan-500 shrink-0" />
                        Qualidade Industrial Salvador Etiquetas
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h4 className="font-bold text-xl text-slate-800">Por que nosso vinil é diferente?</h4>
                            <p className="text-slate-600 leading-relaxed">
                                Utilizamos substratos de alta gramatura que não rasgam e possuem memória elástica, garantindo que o adesivo não descole em superfícies curvas ou irregulares. Nossa cola é de base solvente, o que significa que é resistente à água, álcool e variação de temperatura (Freezer e Micro-ondas).
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-bold text-xl text-slate-800">Processo de Produção</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1"><CheckCircle2 size={18} className="text-emerald-500" /></div>
                                    <span className="text-slate-600"><b>Pré-impressão:</b> Verificamos sua arte para evitar cortes de informações importantes.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1"><CheckCircle2 size={18} className="text-emerald-500" /></div>
                                    <span className="text-slate-600"><b>Recorte Digital:</b> Precisão milimétrica em qualquer formato (Redondo, Especial ou Quadrado).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1"><CheckCircle2 size={18} className="text-emerald-500" /></div>
                                    <span className="text-slate-600"><b>Logística:</b> Embalamos seu pedido com proteção máxima para chegar impecável.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
