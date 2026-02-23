import React from 'react';
import { Sparkles } from 'lucide-react';

const ITEMS = [
    'Adesivos em Vinil',
    'Etiquetas Transparentes',
    'Lacres de Segurança',
    'Recorte Especial',
    'Impressão Premium',
    'Alta Durabilidade',
    'Envio Rápido'
];

export default function InfiniteMarquee() {
    // Nós duplicamos a lista de itens 2 vezes para conseguirmos fazer a transição linear contínua (-50%)
    const displayItems = [...ITEMS, ...ITEMS];

    return (
        <div className="relative flex w-full overflow-hidden bg-slate-50 border-y border-slate-200 py-3 sm:py-4 select-none">
            {/* Efeito de Gradiente (Fade) Esquerdo */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent"></div>

            {/* Efeito de Gradiente (Fade) Direito */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent"></div>

            {/* Wrapper que recebe a animação Marquee - Pausa no hover */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {displayItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-center gap-4 px-4 sm:px-6">
                        <span className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wider whitespace-nowrap">
                            {item}
                        </span>
                        <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}
