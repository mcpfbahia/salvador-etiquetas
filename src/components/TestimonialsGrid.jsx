import React from 'react';
import { Star, User } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        text: "A melhor qualidade de vinil que já usamos nas nossas embalagens. Chegou super rápido aqui em Lauro de Freitas! Cores incrivelmente vivas.",
        author: "João",
        niche: "Hamburgueria Artesanal",
        rating: 5
    },
    {
        id: 2,
        text: "As etiquetas transparentes deram um ar super premium aos nossos potes de açaí. O adesivo não solta nem no freezer. Atendimento impecável.",
        author: "Maria",
        niche: "Açaí Delivery",
        rating: 5
    },
    {
        id: 3,
        text: "Lacres de segurança que realmente cumprem o que prometem. Recomendo de olhos fechados para qualquer restaurante.",
        author: "Carlos",
        niche: "Pizzaria Express",
        rating: 5
    }
];

export default function TestimonialsGrid() {
    return (
        <section className="bg-slate-50 py-20">
            <div className="max-w-[1280px] mx-auto px-6">
                {/* Cabeçalho */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                        Marcas que confiam na nossa qualidade
                    </h2>
                    <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
                        Veja o que nossos parceiros dizem sobre nossas etiquetas e rótulos.
                    </p>
                </div>

                {/* Grid de Depoimentos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 flex flex-col border border-white"
                        >
                            {/* Estrelas */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Texto */}
                            <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8 italic">
                                "{testimonial.text}"
                            </p>

                            {/* Cliente */}
                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                                    <User size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-900 font-bold leading-tight">
                                        {testimonial.author}
                                    </span>
                                    <span className="text-cyan-600 text-sm font-medium">
                                        {testimonial.niche}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
