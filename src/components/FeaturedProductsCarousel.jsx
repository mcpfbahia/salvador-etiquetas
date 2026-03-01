import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FEATURED_PRODUCTS = [
    {
        id: 101,
        name: "Adesivo Redondo Vinil",
        description: "Resistente à água e radiação UV. Perfeito para personalização.",
        basePrice: 45.00,
        badge: "Vinil Premium",
        image: "/etiqueta1.jpeg"
    },
    {
        id: 102,
        name: "Lacre de Segurança Picotado",
        description: "Ideal para delivery e embalagens invioláveis. Destrói ao abrir.",
        basePrice: 38.00,
        badge: "Picotado",
        image: "/mockups/lacre-delivery.png"
    },
    {
        id: 103,
        name: "Rótulo BOPP Metalizado",
        description: "Brilho metálico para destacar sua marca premium.",
        basePrice: 52.00,
        badge: "BOPP Meta",
        image: "/mockups/transparente.png"
    },
    {
        id: 104,
        name: "Adesivo Kraft Quadrado",
        description: "Estilo ecológico e artesanal. Cola de alta aderência.",
        basePrice: 32.00,
        badge: "Papel Eco",
        image: "https://images.unsplash.com/photo-1516962080544-eac69584346b?q=80&w=800"
    },
    {
        id: 105,
        name: "Selo de Garantia Holográfico",
        description: "Proteção contra falsificação com brilho prismático.",
        basePrice: 65.00,
        badge: "Holográfico",
        image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=800"
    },
    {
        id: 106,
        name: "Adesivo Transparente Fosco",
        description: "Efeito 'no-label'. Ideal para vidros e cosméticos.",
        basePrice: 48.00,
        badge: "Transparente",
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800"
    }
];

export default function FeaturedProductsCarousel({ onCustomize }) {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollContainerRef;
        if (current) {
            const scrollAmount = 350;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-white py-16">
            <div className="max-w-[1280px] mx-auto px-6">
                {/* Cabeçalho do Carrossel */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                        Etiquetas Destaques
                    </h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-cyan-500 hover:bg-cyan-50 hover:border-cyan-200 hover:scale-105 transition-all shadow-sm cursor-pointer"
                            aria-label="Anterior"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-cyan-500 hover:bg-cyan-50 hover:border-cyan-200 hover:scale-105 transition-all shadow-sm cursor-pointer"
                            aria-label="Próximo"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Container do Carrossel */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                >
                    {FEATURED_PRODUCTS.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl border border-slate-100 shadow-sm snap-start group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Imagem do Produto */}
                            <div className="relative aspect-square bg-slate-50 overflow-hidden">
                                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-cyan-50 text-cyan-600 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm border border-cyan-100/50">
                                    {product.badge}
                                </span>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    crossOrigin="anonymous"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                            </div>

                            {/* Conteúdo do Card */}
                            <div className="p-6">
                                <h3
                                    onClick={() => onCustomize(product)}
                                    className="text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-cyan-600 transition-colors cursor-pointer"
                                >
                                    {product.name}
                                </h3>
                                <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2 min-h-[40px]">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">A partir de</span>
                                        <span className="text-xl font-black text-slate-900">
                                            R$ {product.basePrice.toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => onCustomize(product)}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 shadow-md shadow-orange-500/20 active:scale-95"
                                    >
                                        Personalizar
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
