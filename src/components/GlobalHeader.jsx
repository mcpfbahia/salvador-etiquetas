import React from 'react';
import {
    ShoppingBag,
    Search,
    UploadCloud,
    User,
    Menu,
    X,
    LifeBuoy,
    HelpCircle
} from 'lucide-react';

export default function GlobalHeader({
    cartCount = 0,
    onOpenCart,
    onOpenAuth,
    onOpenUpload,
    onOpenHelp,
    onNavigate,
    onMenuMobileOpen,
    onSearch
}) {
    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100 transition-all duration-300">
            {/* Linha Superior: Logo, Busca e Ações */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4">
                <div className="flex items-center justify-between gap-4 md:gap-8">

                    {/* Botão Menu Mobile & Logo */}
                    <div className="flex items-center gap-3 md:gap-0">
                        <button
                            onClick={onMenuMobileOpen}
                            className="p-2 -ml-2 text-slate-600 hover:text-teal-700 md:hidden cursor-pointer"
                        >
                            <Menu size={28} />
                        </button>

                        <a
                            href="/"
                            onClick={(e) => { e.preventDefault(); onNavigate('Todos'); }}
                            className="flex items-center gap-2 sm:gap-3 cursor-pointer group no-underline"
                        >
                            <img
                                src="/logo-salvador-etiquetas1.svg"
                                alt="Salvador Etiquetas"
                                className="w-10 h-10 sm:w-14 sm:h-14 object-contain group-hover:scale-110 transition-transform duration-300 shrink-0"
                            />
                            <h1 className="flex flex-col justify-center leading-none">
                                <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
                                    <span className="text-[1.1rem] sm:text-3xl font-black tracking-tight text-orange-600">Salvador</span>
                                    <span className="text-base sm:text-2xl font-medium tracking-wide text-teal-700">Etiquetas</span>
                                </div>
                                <span className="text-[8px] sm:text-[11px] font-semibold text-slate-500 tracking-[0.2em] sm:tracking-[0.2em] uppercase mt-1">Comunicação Visual</span>
                            </h1>
                        </a>
                    </div>

                    {/* Barra de Busca - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-2xl relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar adesivos e rótulos..."
                            className="w-full bg-slate-50 border border-transparent focus:border-transparent focus:ring-2 focus:ring-teal-600/20 focus:bg-white rounded-xl py-3 pl-12 pr-4 font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400"
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />
                    </div>

                    {/* Ações de Navegação - Desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={onOpenUpload}
                            className="border-2 border-teal-700 text-teal-700 hover:bg-teal-50 rounded-xl px-5 py-2.5 font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                        >
                            <UploadCloud size={18} />
                            <span>Enviar Arte</span>
                        </button>

                        {/* Botão de Ajuda/Suporte - Desktop */}
                        <button
                            onClick={onOpenHelp}
                            className="flex items-center gap-2 text-slate-700 font-bold hover:text-teal-700 transition-colors cursor-pointer group"
                        >
                            <LifeBuoy size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="hidden lg:block">Ajuda</span>
                        </button>

                        <button
                            onClick={onOpenAuth}
                            className="flex items-center gap-2 text-slate-700 font-bold hover:text-teal-700 transition-colors cursor-pointer group"
                        >
                            <User size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="hidden lg:block">Minha Conta</span>
                        </button>

                        <div className="flex items-center gap-2">

                            {/* Carrinho */}
                            <button
                                onClick={onOpenCart}
                                className="relative p-2 text-slate-700 hover:text-orange-600 transition-colors cursor-pointer group"
                            >
                                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Carrinho Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={onOpenCart}
                            className="relative p-2 text-slate-700 hover:text-orange-600 cursor-pointer"
                        >
                            <ShoppingBag size={28} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Barra de Busca - Mobile */}
                <div className="mt-3 md:hidden relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar adesivos e rótulos..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 font-medium text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-teal-600/10 text-sm"
                        onChange={(e) => onSearch && onSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Linha Inferior: Menu de Categorias (Desktop) */}
            <nav className="hidden md:flex justify-center items-center py-3 bg-white border-t border-slate-50 overflow-x-auto scrollbar-hide">
                <ul className="flex items-center gap-10 text-[11px] font-black text-slate-600 uppercase tracking-[0.15em]">
                    {[
                        { label: 'Adesivos de Vinil', filter: 'Vinil' },
                        { label: 'Adesivos Transparentes', filter: 'Transparente' },
                        { label: 'Papel Kraft', filter: 'Papel' },
                        { label: 'Rótulos e Embalagens', filter: 'Rotulos' },
                        { label: 'Central de Ajuda', action: onOpenHelp }
                    ].map((link) => (
                        <li key={link.label}>
                            <button
                                onClick={() => link.action ? link.action() : onNavigate(link.filter)}
                                className="hover:text-orange-600 transition-all relative group cursor-pointer"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
