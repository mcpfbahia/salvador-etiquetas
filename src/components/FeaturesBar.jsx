import React from 'react';
import { Truck, Palette, Package, MessageCircleHeart } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: "Entrega Expressa",
        description: "Produção ágil e envio rápido para todo Brasil."
    },
    {
        icon: Palette,
        title: "Arte Grátis",
        description: "Ajustes e criação básica sem custo adicional."
    },
    {
        icon: Package,
        title: "Pequenos Lotes",
        description: "Ideal para MEI e startups. Pedidos flexíveis."
    },
    {
        icon: MessageCircleHeart,
        title: "WhatsApp 24h",
        description: "Tire suas dúvidas em tempo real com especialistas."
    }
];

export default function FeaturesBar() {
    return (
        <section className="bg-white py-12 md:py-16 border-t border-slate-100">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="text-center group hover:-translate-y-1 transition-transform duration-300 cursor-default px-2"
                            >
                                <div className="bg-cyan-50 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-100 transition-colors duration-300">
                                    <Icon className="w-6 h-6 md:w-10 md:h-10 text-cyan-500" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-slate-800 font-bold text-base md:text-lg mb-1 md:mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-[11px] md:text-base leading-relaxed max-w-[240px] mx-auto line-clamp-2 md:line-clamp-none">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
