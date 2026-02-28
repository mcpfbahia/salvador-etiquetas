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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="text-center group hover:-translate-y-1 transition-transform duration-300 cursor-default"
                            >
                                <div className="bg-cyan-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-100 transition-colors duration-300">
                                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-cyan-500" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-slate-800 font-bold text-lg mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[240px] mx-auto">
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
