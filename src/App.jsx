import React, { useState } from 'react';
import { ShoppingBag, Search, Upload, ChevronRight, User, Menu, X } from 'lucide-react';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import UploadModal from './components/UploadModal';
import ProductPage from './pages/ProductPage';
import InfiniteMarquee from './components/InfiniteMarquee';
import ArtworkApprovalModal from './components/ArtworkApprovalModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

// Dados simulados da loja
const MOCK_PRODUCTS = [
    { id: 1, name: "Adesivo Vinil Premium", size: "5x5cm", precoBase: 1.50, category: "Vinil", image: "/adesivo-2.jpg" },
    { id: 2, name: "Adesivo Transparente", size: "4x4cm", precoBase: 2.00, category: "Transparente", image: "https://images.unsplash.com/photo-1572375990527-3199e8d12224?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 3, name: "Adesivo de Papel Kraft", size: "6x6cm", precoBase: 0.80, category: "Papel", image: "https://images.unsplash.com/photo-1618365908648-e71bf5716b02?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 4, name: "Adesivo Holográfico", size: "5x5cm", precoBase: 3.50, category: "Vinil", image: "https://images.unsplash.com/photo-1614036417651-1d0529e5a6fb?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 5, name: "Adesivo Holográfico Redondo", size: "4x4cm", precoBase: 3.40, category: "Vinil", image: "https://plus.unsplash.com/premium_photo-1678122971556-3bda5cfa1fb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: 6, name: "Selo de Papel Fosco", size: "3x3cm", precoBase: 0.50, category: "Papel", image: "https://images.unsplash.com/photo-1605814529061-ec0fd8f8c47f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
];

const CATEGORIAS = ["Todos", "Vinil", "Transparente", "Papel"];

export default function App() {
    const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
    const [itensCarrinho, setItensCarrinho] = useState([]);
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);
    const [uploadAberto, setUploadAberto] = useState(false);
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    const [artworkModalAberto, setArtworkModalAberto] = useState(false);
    const [produtoPendente, setProdutoPendente] = useState(null);

    // Estado para a Página do Produto
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    // Lógica de filtro reativo
    const produtosFiltrados = categoriaAtiva === "Todos"
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter(p => p.category === categoriaAtiva);

    // Intercepta e guarda produto antes de aceitar termos (Lead Generation)
    const iniciarAdicaoAoCarrinho = (produto, quantidade) => {
        setProdutoPendente({ produto, quantidade });
        setArtworkModalAberto(true);
    };

    const confirmarAdicaoAoCarrinho = (dadosContato) => {
        setArtworkModalAberto(false);
        // TODO: Enviar dadosContato (whatsapp, nome) para a API futuramente

        if (!produtoPendente) return;
        const { produto, quantidade } = produtoPendente;

        setItensCarrinho(prev => {
            const existe = prev.find(item => item.id === produto.id);
            if (existe) {
                return prev.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + quantidade } : item);
            }
            return [...prev, { ...produto, quantidade }];
        });

        setProdutoPendente(null);
        setCarrinhoAberto(true); // Abre o Drawer instantaneamente para melhor UX
    };

    const totalItensBadge = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);

    return (
        <div className="min-h-screen font-sans bg-[var(--color-background)]">
            {/* Header com estilo High-End (Glassmorphism e blur) */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--color-background)]/80 border-b border-[var(--color-surface)]/80 shadow-sm">
                <div className="max-w-[1280px] mx-auto px-6 py-4">
                    {/* Top Row: Logo & Utils */}
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                            onClick={() => setProdutoSelecionado(null)}
                        >
                            <img
                                src="/logo-salvador-etiquetas1.svg"
                                alt="Salvador Etiquetas"
                                className="w-10 h-10 sm:w-14 sm:h-14 object-contain group-hover:scale-110 transition-transform duration-300 shrink-0"
                            />
                            <h1 className="flex flex-col justify-center leading-none">
                                <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
                                    <span className="text-[1.1rem] sm:text-3xl font-black tracking-tight text-orange-600">Salvador</span>
                                    <span className="text-base sm:text-2xl font-medium tracking-wide text-cyan-700">Etiquetas</span>
                                </div>
                                <span className="text-[8px] sm:text-[11px] font-semibold text-slate-500 tracking-[0.2em] sm:tracking-[0.2em] uppercase mt-1">Comunicação Visual</span>
                            </h1>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-body)]/50 group-focus-within:text-[var(--color-secondary)] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Buscar adesivos..."
                                    className="pl-10 pr-4 py-2 rounded-xl bg-[var(--color-surface)]/80 border border-[var(--color-surface)] focus:bg-white focus:border-[var(--color-secondary)] transition-all outline-none w-64 shadow-sm"
                                />
                            </div>

                            <button
                                onClick={() => setUploadAberto(true)}
                                className="flex items-center gap-2 text-[var(--color-secondary)] font-medium px-4 py-2 rounded-xl border-2 border-[var(--color-secondary)]/20 hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5 transition-all cursor-pointer"
                            >
                                <Upload className="w-4 h-4" />
                                Enviar Arte
                            </button>

                            <button
                                className="flex items-center gap-2 p-2 text-[var(--color-heading)] hover:text-cyan-500 transition-colors cursor-pointer"
                            >
                                <User className="w-6 h-6" />
                                <span className="text-sm font-medium hidden lg:block">Entrar / Cadastrar</span>
                            </button>

                            <button
                                onClick={() => setCarrinhoAberto(true)}
                                className="relative p-2 text-[var(--color-heading)] hover:text-cyan-500 transition-colors cursor-pointer"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {totalItensBadge > 0 && (
                                    <span className="absolute top-0 right-0 w-5 h-5 bg-cyan-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-md">
                                        {totalItensBadge}
                                    </span>
                                )}
                            </button>
                        </div>
                        {/* Mobile Icons (Cart & Menu) */}
                        <div className="flex md:hidden items-center gap-3">
                            <button
                                onClick={() => setCarrinhoAberto(true)}
                                className="relative p-2 text-[var(--color-heading)] hover:text-cyan-500 transition-colors cursor-pointer"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {totalItensBadge > 0 && (
                                    <span className="absolute top-0 right-0 w-5 h-5 bg-cyan-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-md">
                                        {totalItensBadge}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setMenuMobileAberto(true)}
                                className="p-2 text-[var(--color-heading)] hover:text-cyan-500 transition-colors cursor-pointer"
                            >
                                <Menu className="w-7 h-7" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Row: Nav Menu */}
                    <nav className="hidden md:flex flex-wrap items-center gap-6 lg:gap-8 pt-4 mt-2">
                        <a href="#" className="text-[var(--color-body)] font-semibold hover:text-cyan-500 uppercase text-xs lg:text-sm tracking-wider transition-all duration-300 border-b-2 border-transparent hover:border-cyan-500 pb-1 hover:translate-x-0.5">INÍCIO</a>
                        <a href="#" className="text-[var(--color-body)] font-semibold hover:text-cyan-500 uppercase text-xs lg:text-sm tracking-wider transition-all duration-300 border-b-2 border-transparent hover:border-cyan-500 pb-1 hover:translate-x-0.5">ADESIVOS DE VINIL</a>
                        <a href="#" className="text-[var(--color-body)] font-semibold hover:text-cyan-500 uppercase text-xs lg:text-sm tracking-wider transition-all duration-300 border-b-2 border-transparent hover:border-cyan-500 pb-1 hover:translate-x-0.5">ADESIVOS TRANSPARENTES</a>
                        <a href="#" className="text-[var(--color-body)] font-semibold hover:text-cyan-500 uppercase text-xs lg:text-sm tracking-wider transition-all duration-300 border-b-2 border-transparent hover:border-cyan-500 pb-1 hover:translate-x-0.5">PAPEL KRAFT</a>
                        <a href="#" className="text-[var(--color-body)] font-semibold hover:text-cyan-500 uppercase text-xs lg:text-sm tracking-wider transition-all duration-300 border-b-2 border-transparent hover:border-cyan-500 pb-1 hover:translate-x-0.5">RÓTULOS E EMBALAGENS</a>
                        <a href="#" className="text-[var(--color-body)] font-semibold hover:text-cyan-500 uppercase text-xs lg:text-sm tracking-wider transition-all duration-300 border-b-2 border-transparent hover:border-cyan-500 pb-1 hover:translate-x-0.5">CONTATO</a>
                    </nav>
                </div>
            </header >

            {/* Main Content (Condicional Routing Manual) */}
            < main className="max-w-[1280px] mx-auto px-6 py-8" >

                {!produtoSelecionado ? (
                    // === HOME PAGE ===
                    <>
                        <HeroSection onCustomize={() => setUploadAberto(true)} />

                        <InfiniteMarquee />

                        <section className="mt-8 md:mt-16">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-gray-200 pb-6">
                                <h2 className="text-3xl font-bold text-[var(--color-heading)] tracking-tight">Modelos Populares</h2>

                                <div className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0">
                                    {CATEGORIAS.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategoriaAtiva(cat)}
                                            className={`px-3 py-1.5 md:px-6 md:py-2 text-xs md:text-base rounded-full whitespace-nowrap font-medium transition-all duration-300 cursor-pointer ${categoriaAtiva === cat
                                                ? 'bg-[var(--color-heading)] text-white shadow-md'
                                                : 'bg-white text-[var(--color-body)] hover:bg-gray-50 border border-gray-200 shadow-sm'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <ProductGrid
                                produtos={produtosFiltrados}
                                onAdicionar={iniciarAdicaoAoCarrinho}
                                onVisualizar={(p) => setProdutoSelecionado(p)}
                            />
                        </section>
                    </>
                ) : (
                    // === PRODUCT PAGE ===
                    <ProductPage
                        produto={produtoSelecionado}
                        onVoltar={() => setProdutoSelecionado(null)}
                        onAdicionar={iniciarAdicaoAoCarrinho}
                        categorias={CATEGORIAS}
                        mockAllProducts={MOCK_PRODUCTS}
                    />
                )
                }

            </main >

            <Footer />

            {/* Componentes Sobrepostos */}
            <CartDrawer
                aberto={carrinhoAberto}
                onClose={() => setCarrinhoAberto(false)}
                itens={itensCarrinho}
                setItensCarrinho={setItensCarrinho}
            />
            {/* Modal de Conversão Pré-Checkout */}
            <ArtworkApprovalModal
                isOpen={artworkModalAberto}
                onClose={() => {
                    setArtworkModalAberto(false);
                    setProdutoPendente(null);
                }}
                onConfirm={confirmarAdicaoAoCarrinho}
            />
            <FloatingWhatsApp />

            <UploadModal
                aberto={uploadAberto}
                onClose={() => setUploadAberto(false)}
            />

            {/* Mobile Nav Overlay */}
            {
                menuMobileAberto && (
                    <div className="fixed inset-0 z-50 flex">
                        <div
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setMenuMobileAberto(false)}
                        ></div>
                        <div className="relative w-72 bg-slate-50 h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-right">
                            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Menu className="w-5 h-5 text-cyan-500" /> Menu
                                </h2>
                                <button
                                    onClick={() => setMenuMobileAberto(false)}
                                    className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col p-6 gap-5 overflow-y-auto">
                                <a href="#" className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-cyan-500 transition-colors uppercase">Início</a>
                                <a href="#" className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-cyan-500 transition-colors uppercase">Adesivos de Vinil</a>
                                <a href="#" className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-cyan-500 transition-colors uppercase">Adesivos Transparentes</a>
                                <a href="#" className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-cyan-500 transition-colors uppercase">Papel Kraft</a>
                                <a href="#" className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-cyan-500 transition-colors uppercase">Rótulos e Embalagens</a>
                                <a href="#" className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-cyan-500 transition-colors uppercase">Contato</a>

                                <div className="mt-4 pt-4 flex flex-col gap-4">
                                    <button
                                        className="flex items-center gap-3 text-[#334155] font-medium hover:text-cyan-500 transition-colors"
                                        onClick={() => { setUploadAberto(true); setMenuMobileAberto(false); }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center"><Upload className="w-4 h-4" /></div>
                                        Enviar Arte
                                    </button>
                                    <button className="flex items-center gap-3 text-[#334155] font-medium hover:text-cyan-500 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center"><User className="w-4 h-4" /></div>
                                        Entrar / Cadastrar
                                    </button>
                                </div>
                            </nav>

                            <div className="mt-auto p-6 bg-white border-t border-slate-200">
                                <button
                                    onClick={() => { setCarrinhoAberto(true); setMenuMobileAberto(false); }}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all"
                                >
                                    <ShoppingBag className="w-5 h-5" /> Ver Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
