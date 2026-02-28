import React, { useState, useMemo } from 'react';
import { MessageCircle, ArrowLeft } from 'lucide-react';

// Mock Data para Categoria Delivery
const DEFAULT_CATEGORY = {
    title: "Soluções para Delivery & Fast Food",
    subtitle: "Lacres de segurança e adesivos resistentes para o seu restaurante.",
    filters: ['Todos', 'Lacres Picotados', 'Vinil à Prova d\'água', 'Papel Kraft'],
    products: [
        {
            id: 201,
            name: "Lacre Delivery Picotado",
            description: "Segurança total para suas entregas. Destrói ao tentar abrir.",
            basePrice: 35.00,
            badge: "Picotado",
            category: "Lacres Picotados",
            image: "https://images.unsplash.com/photo-1618365908648-e71bf5716b02?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 202,
            name: "Adesivo Hambúrguer Vinil",
            description: "Resistente à gordura e umidade. Ideal para embalagens quentes.",
            basePrice: 42.00,
            badge: "Vinil Premium",
            category: "Vinil à Prova d'água",
            image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 203,
            name: "Selo Kraft Artesanal",
            description: "Estilo eco-friendly para doces e pães. Cola de alta aderência.",
            basePrice: 28.00,
            badge: "Papel Eco",
            category: "Papel Kraft",
            image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 204,
            name: "Lacre de Segurança Personalizado",
            description: "Com sua logomarca e numeração sequencial opcional.",
            basePrice: 38.00,
            badge: "Segurança",
            category: "Lacres Picotados",
            image: "https://images.unsplash.com/photo-1614036417651-1d0529e5a6fb?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 205,
            name: "Adesivo para Pizza 10x10",
            description: "Tamanho ideal para tampar a caixa. Alta visibilidade.",
            basePrice: 45.00,
            badge: "Vinil",
            category: "Vinil à Prova d'água",
            image: "https://plus.unsplash.com/premium_photo-1678122971556-3bda5cfa1fb2?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 206,
            name: "Etiqueta Kraft para Delivery",
            description: "Fechamento de sacos de papel com visual rústico e chique.",
            basePrice: 25.00,
            badge: "Kraft",
            category: "Papel Kraft",
            image: "https://images.unsplash.com/photo-1572375990527-3199e8d12224?q=80&w=400&auto=format&fit=crop"
        }
    ]
};

export default function CategoryPageTemplate({ categoryData = DEFAULT_CATEGORY, onBack }) {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const filteredProducts = useMemo(() => {
        if (activeFilter === 'Todos') return categoryData.products;
        return categoryData.products.filter(p => p.category === activeFilter);
    }, [activeFilter, categoryData.products]);

    const handleWhatsApp = () => {
        window.open('https://wa.me/5571999999999', '_blank');
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full h-[250px] md:h-[350px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-b-[40px] overflow-hidden">
                {/* Pattern UI Sutil */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
                </div>

                <div className="max-w-[1280px] mx-auto px-6 h-full flex flex-col items-center justify-center text-center relative z-10">
                    <button
                        onClick={onBack}
                        className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 transition-colors cursor-pointer group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Voltar</span>
                    </button>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        {categoryData.title}
                    </h1>
                    <p className="text-slate-300 text-base md:text-xl max-w-2xl">
                        {categoryData.subtitle}
                    </p>
                </div>
            </section>

            {/* Barra de Filtros */}
            <section className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100">
                <div className="max-w-[1280px] mx-auto px-6 py-6 overflow-x-auto scrollbar-hide flex gap-3">
                    {categoryData.filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${activeFilter === filter
                                ? 'bg-slate-800 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grade de Produtos */}
            <main className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Imagem */}
                            <div className="relative aspect-square bg-slate-50">
                                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-cyan-50 text-cyan-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-cyan-100/50">
                                    {product.badge}
                                </span>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Conteúdo */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-cyan-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-xs text-slate-500 mb-6 leading-relaxed line-clamp-2 min-h-[32px]">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">A partir de</span>
                                        <span className="text-lg font-black text-slate-900 leading-tight mt-1">
                                            R$ {product.basePrice.toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                    <button
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 hover:scale-105 shadow-md shadow-orange-500/20"
                                    >
                                        Personalizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* CTA Especial */}
            <section className="px-4 md:px-6">
                <div className="max-w-[1024px] mx-auto my-12 md:my-16 p-6 md:p-10 text-center bg-cyan-50 border-2 border-dashed border-cyan-200 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10">
                        <h4 className="text-xl md:text-3xl font-extrabold text-slate-800 mb-3 md:mb-4 leading-tight">
                            Precisa de um formato especial ou alta tiragem?
                        </h4>
                        <p className="text-slate-600 mb-8 md:mb-10 max-w-xl mx-auto text-sm md:text-lg leading-relaxed">
                            Nossa equipe técnica está pronta para orçar projetos customizados com preços especiais para atacado.
                        </p>
                        <button
                            onClick={handleWhatsApp}
                            className="bg-slate-800 hover:bg-slate-900 text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg inline-flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 hover:scale-105 shadow-lg shadow-slate-900/10 active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                            <MessageCircle size={18} md:size={24} className="fill-white/10 shrink-0" />
                            <span>Fale com um Especialista</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
