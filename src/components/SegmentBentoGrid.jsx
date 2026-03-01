import React from 'react';
import { ArrowRight } from 'lucide-react';

const segments = [
    {
        id: 1,
        title: 'Delivery & Fast Food',
        description: 'Lacres de segurança e adsivos para embalagens quentes.',
        image: '/categoria-fast-food.jpg',
        className: 'md:col-span-2 md:row-span-2'
    },
    {
        id: 2,
        title: 'Cosméticos & Beleza',
        description: 'Rótulos à prova d\'água para frascos e potes.',
        image: '/categoria-cosmeticos.jpg',
        className: 'md:col-span-2 md:row-span-1'
    },
    {
        id: 3,
        title: 'Moda & Vestuário',
        description: 'Tags em papel e etiquetas de composição.',
        image: '/categoria-moda-vestuario.jpg',
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        id: 4,
        title: 'Artesanato & Presentes',
        description: 'Adesivos afetivos e selos decorativos.',
        image: '/categoria-artesanato-presentes.jpg',
        className: 'md:col-span-1 md:row-span-1'
    }
];

export default function SegmentBentoGrid({ onSelectCategory }) {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="max-w-[1280px] mx-auto px-6">
                {/* Cabeçalho */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                        Soluções para o seu Negócio
                    </h2>
                    <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
                        Etiquetas pensadas para a realidade do seu produto.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                    {segments.map((segment) => (
                        <button
                            key={segment.id}
                            onClick={() => onSelectCategory && onSelectCategory(segment)}
                            className={`group relative overflow-hidden rounded-3xl h-full text-left cursor-pointer transition-all duration-300 active:scale-95 ${segment.className}`}
                        >
                            {/* Imagem de Fundo com Zoom */}
                            <div className="absolute inset-0 bg-slate-800">
                                <img
                                    src={segment.image}
                                    alt={segment.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 md:opacity-100"
                                />
                            </div>

                            {/* Overlay Degradê */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent"></div>

                            {/* Conteúdo */}
                            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                <h3 className="text-white font-bold text-2xl md:text-3xl mb-2">
                                    {segment.title}
                                </h3>
                                <p className="text-slate-200 text-sm md:text-base opacity-90 mb-4 line-clamp-2">
                                    {segment.description}
                                </p>
                                <div className="text-cyan-400 font-medium flex items-center gap-2">
                                    Ver soluções
                                    <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
