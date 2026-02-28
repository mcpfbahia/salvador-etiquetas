import React from 'react';
import { ChevronRight, Star } from 'lucide-react';

const RELATED_PRODUCTS = [
    {
        id: 101,
        name: "Lacre de Segurança Picotado",
        subtitle: "Essencial para Delivery & Alimentos",
        price: "35,00",
        badge: "Mais Vendido",
        image: "/mockups/lacre-delivery.png"
    },
    {
        id: 102,
        name: "Cartão de Agradecimento",
        subtitle: "Papel Couchê 300g Premium",
        price: "28,00",
        badge: "Novo",
        image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=800"
    },
    {
        id: 103,
        name: "Adesivo Transparente",
        subtitle: "Ideal para Copos e Frascos",
        price: "42,00",
        badge: "Resistente",
        image: "/mockups/transparente.png"
    },
    {
        id: 104,
        name: "Fita Adesiva Personalizada",
        subtitle: "Segurança no Fechamento de Caixas",
        price: "55,00",
        badge: "Destaque",
        image: "/mockups/fita-personalizada.png"
    }
];

export default function RelatedProducts() {
    return (
        <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-200">
            <div className="max-w-[1280px] mx-auto px-6">

                {/* Cabeçalho da Seção */}
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                        Complete sua embalagem
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">
                        Produtos selecionados para alavancar seu negócio.
                    </p>
                </div>

                {/* Grid de Produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {RELATED_PRODUCTS.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer"
                        >
                            {/* Imagem e Badge */}
                            <div className="relative aspect-square bg-slate-100 overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    crossOrigin="anonymous"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-cyan-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    {pkg.badge}
                                </div>
                            </div>

                            {/* Conteúdo */}
                            <div className="p-5">
                                <h3 className="font-bold text-slate-800 truncate mb-1">
                                    {pkg.name}
                                </h3>
                                <p className="text-sm text-slate-500 mb-5 font-medium">
                                    {pkg.subtitle}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">A partir de</span>
                                        <span className="text-lg font-black text-slate-900">R$ {pkg.price}</span>
                                    </div>
                                    <button className="bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-1">
                                        Ver <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
