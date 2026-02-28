import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Upload, ChevronRight, User, Menu, X, Heart, LifeBuoy } from 'lucide-react';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/SideCartDrawer';
import UploadModal from './components/UploadModal';
import ProductPage from './pages/ProductPage';
import InfiniteMarquee from './components/InfiniteMarquee';
import ArtworkApprovalModal from './components/ArtworkApprovalModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import FeaturesBar from './components/FeaturesBar';
import FeaturedProductsCarousel from './components/FeaturedProductsCarousel';
import SegmentBentoGrid from './components/SegmentBentoGrid';
import TestimonialsGrid from './components/TestimonialsGrid';
import CategoryPageTemplate from './components/CategoryPageTemplate';
import SingleProductPage from './components/SingleProductPage';
import AuthPage from './components/AuthPage';
import GlobalHeader from './components/GlobalHeader';
import HelpCenterPage from './components/HelpCenterPage';

// Dados simulados da loja
const MOCK_PRODUCTS = [
    { id: 1, name: "Adesivo Vinil Premium", size: "5x5cm", precoBase: 1.50, category: "Vinil", image: "/mockups/vinil-premium.png" },
    { id: 2, name: "Adesivo Transparente", size: "4x4cm", precoBase: 2.00, category: "Transparente", image: "/mockups/transparente.png" },
    { id: 3, name: "Adesivo de Papel Kraft", size: "6x6cm", precoBase: 0.80, category: "Papel", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800" },
    { id: 4, name: "Adesivo Holográfico", size: "5x5cm", precoBase: 3.50, category: "Vinil", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=800" },
    { id: 5, name: "Adesivo Holográfico Redondo", size: "4x4cm", precoBase: 3.40, category: "Vinil", image: "https://images.unsplash.com/photo-1618365908648-e71bf5716b02?q=80&w=800" },
    { id: 6, name: "Selo de Papel Fosco", size: "3x3cm", precoBase: 0.50, category: "Papel", image: "/mockups/lacre-delivery.png" },
];

const CATEGORIAS = ["Todos", "Vinil", "Transparente", "Papel"];

export default function App() {
    const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
    const [itensCarrinho, setItensCarrinho] = useState([]);
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);
    const [ajudaAberta, setAjudaAberta] = useState(false);
    const [uploadAberto, setUploadAberto] = useState(false);
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    const [artworkModalAberto, setArtworkModalAberto] = useState(false);
    const [produtoPendente, setProdutoPendente] = useState(null);

    // Estado para a Página do Produto
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [authAberto, setAuthAberto] = useState(false);

    // Resetar Scroll ao trocar de página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [produtoSelecionado, categoriaSelecionada, authAberto, ajudaAberta]);

    // Mapeamento de dados das categorias para a Bento Grid
    const CATEGORIES_DATA = {
        'Delivery & Fast Food': {
            title: "Soluções para Delivery & Fast Food",
            subtitle: "Lacres de segurança e adesivos resistentes para o seu restaurante.",
            filters: ['Todos', 'Lacres Picotados', 'Vinil à Prova d\'água', 'Papel Kraft'],
            products: [
                { id: 201, name: "Lacre Delivery Picotado", description: "Segurança total para suas entregas.", basePrice: 35.00, badge: "Picotado", category: "Lacres Picotados", image: "/mockups/lacre-delivery.png" },
                { id: 202, name: "Adesivo Hambúrguer Vinil", description: "Resistente à gordura e umidade.", basePrice: 42.00, badge: "Vinil Premium", category: "Vinil à Prova d'água", image: "/mockups/vinil-premium.png" },
                { id: 203, name: "Selo Kraft Artesanal", description: "Estilo eco-friendly para doces e pães.", basePrice: 28.00, badge: "Papel Eco", category: "Papel Kraft", image: "https://images.unsplash.com/photo-1516962080544-eac69584346b?q=80&w=800" }
            ]
        },
        'Cosméticos & Beleza': {
            title: "Cosméticos & Beleza",
            subtitle: "Rótulos à prova d'água para frascos e potes com acabamento premium.",
            filters: ['Todos', 'Vinil Transparente', 'BOPP Metalizado', 'Papel Couché'],
            products: [
                { id: 301, name: "Rótulo para Serum 30ml", description: "Resistente a óleos e álcool.", basePrice: 48.00, badge: "Transparente", category: "Vinil Transparente", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop" },
                { id: 302, name: "Selo para Pote de Creme", description: "Acabamento holográfico premium.", basePrice: 55.00, badge: "Metalizado", category: "BOPP Metalizado", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop" }
            ]
        },
        'Moda & Vestuário': {
            title: "Moda & Vestuário",
            subtitle: "Tags e etiquetas que agregam valor à sua coleção.",
            filters: ['Todos', 'Tags de Papel', 'Etiquetas Adesivas', 'Fitas Personalizadas'],
            products: [
                { id: 401, name: "Tag para Roupas Kraft", description: "Papel 300g com furo para cordão.", basePrice: 19.00, badge: "Tags", category: "Tags de Papel", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400" }
            ]
        },
        'Artesanato & Presentes': {
            title: "Artesanato & Presentes",
            subtitle: "Adesivos afetivos e selos decorativos para suas criações.",
            filters: ['Todos', 'Selo Feito à Mão', 'Tags Kraft', 'Vinil Decorativo'],
            products: [
                { id: 501, name: "Selo Gratidão", description: "Dê um toque especial às suas encomendas.", basePrice: 15.00, badge: "Afetivo", category: "Selo Feito à Mão", image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=800&auto=format&fit=crop" }
            ]
        }
    };

    const handleSelectCategory = (segment) => {
        const data = CATEGORIES_DATA[segment.title];
        if (data) {
            setCategoriaSelecionada(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNavigate = (categoria) => {
        setCategoriaAtiva(categoria);
        setCategoriaSelecionada(CATEGORIES_DATA[categoria] || null);
        setProdutoSelecionado(null);
        setMenuMobileAberto(false);
        setAuthAberto(false);
        setAjudaAberta(false);
    };

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
            const existeIndex = prev.findIndex(item => item.id === produto.id && JSON.stringify(item.config) === JSON.stringify(produto.config));
            if (existeIndex >= 0) {
                const novoCarrinho = [...prev];
                novoCarrinho[existeIndex].quantidade += quantidade;
                return novoCarrinho;
            }
            return [...prev, { ...produto, quantidade }];
        });

        setProdutoPendente(null);
        setCarrinhoAberto(true); // Abre o side cart lateral
    };

    const totalItensBadge = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);

    return (
        <div className="min-h-screen font-sans bg-[var(--color-background)]">
            <GlobalHeader
                cartCount={itensCarrinho.length}
                onOpenCart={() => setCarrinhoAberto(true)}
                onOpenAuth={() => setAuthAberto(true)}
                onOpenUpload={() => setUploadAberto(true)}
                onOpenHelp={() => setAjudaAberta(true)}
                onNavigate={handleNavigate}
                onMenuMobileOpen={() => setMenuMobileAberto(true)}
            />

            {/* Main Content (Condicional Routing Manual) */}
            <main className="max-w-[1280px] mx-auto px-6 py-8">

                {/* HELP CENTER em tela cheia */}
                {ajudaAberta ? (
                    <div className="fixed inset-0 z-[60] bg-white overflow-y-auto">
                        <HelpCenterPage onBack={() => setAjudaAberta(false)} />
                    </div>
                ) : authAberto ? (
                    <div className="fixed inset-0 z-[60] bg-white overflow-y-auto">
                        <AuthPage onClose={() => setAuthAberto(false)} />
                    </div>
                ) : !produtoSelecionado ? (
                    categoriaSelecionada ? (
                        // === CATEGORY PAGE ===
                        <CategoryPageTemplate
                            categoryData={categoriaSelecionada}
                            onBack={() => setCategoriaSelecionada(null)}
                        />
                    ) : (
                        // === HOME PAGE ===
                        <>
                            <HeroSection onCustomize={() => setUploadAberto(true)} />
                            <FeaturesBar />
                            <InfiniteMarquee />
                            <FeaturedProductsCarousel onCustomize={(product) => {
                                // Adapta os dados do carrossel para o formato do MOCK_PRODUCTS
                                setProdutoSelecionado({
                                    id: product.id,
                                    name: product.name,
                                    image: product.image,
                                    precoBase: (product.basePrice / 100),
                                    category: product.badge || 'Destaque',
                                    description: product.description,
                                });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }} />
                            <SegmentBentoGrid onSelectCategory={handleSelectCategory} />
                            <TestimonialsGrid />
                        </>
                    )

                ) : (
                    // === PRODUCT PAGE (HIGH PERFORMANCE) ===
                    <SingleProductPage
                        produto={produtoSelecionado}
                        onVoltar={() => setProdutoSelecionado(null)}
                        onAdicionar={iniciarAdicaoAoCarrinho}
                    />
                )}

            </main>

            <Footer />

            {/* Componentes Sobrepostos */}
            <CartDrawer
                isOpen={carrinhoAberto}
                onClose={() => setCarrinhoAberto(false)}
                items={itensCarrinho}
                onUpdateQuantity={(id, qtd) => setItensCarrinho(prev => prev.map(i => i.id === id ? { ...i, quantidade: qtd } : i))}
                onRemove={(id) => setItensCarrinho(prev => prev.filter(i => i.id !== id))}
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
                                    <Menu className="w-5 h-5 text-teal-600" /> Menu
                                </h2>
                                <button
                                    onClick={() => setMenuMobileAberto(false)}
                                    className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col p-6 gap-5 overflow-y-auto">
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("Todos"); }} className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-teal-700 transition-colors uppercase">Início</a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("Vinil"); }} className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-teal-700 transition-colors uppercase">Adesivos de Vinil</a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("Transparente"); }} className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-teal-700 transition-colors uppercase">Adesivos Transparentes</a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("Papel"); }} className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-teal-700 transition-colors uppercase">Papel Kraft</a>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setAjudaAberta(true); setMenuMobileAberto(false); }}
                                    className="font-semibold text-sm tracking-wider text-[#334155] border-b border-slate-200 pb-3 hover:text-teal-700 transition-colors uppercase flex items-center justify-between"
                                >
                                    Suporte & Contato
                                    <ChevronRight size={16} className="text-slate-300" />
                                </a>

                                <div className="mt-4 pt-4 flex flex-col gap-4">
                                    <button
                                        className="flex items-center gap-3 text-[#334155] font-medium hover:text-teal-700 transition-colors"
                                        onClick={() => { setAjudaAberta(true); setMenuMobileAberto(false); }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center"><LifeBuoy className="w-4 h-4 text-cyan-600" /></div>
                                        Central de Ajuda
                                    </button>
                                    <button
                                        className="flex items-center gap-3 text-[#334155] font-medium hover:text-teal-700 transition-colors"
                                        onClick={() => { setUploadAberto(true); setMenuMobileAberto(false); }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center"><Upload className="w-4 h-4" /></div>
                                        Enviar Arte
                                    </button>
                                    <button
                                        className="flex items-center gap-3 text-[#334155] font-medium hover:text-teal-700 transition-colors"
                                        onClick={() => { setAuthAberto(true); setMenuMobileAberto(false); }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center"><User className="w-4 h-4" /></div>
                                        Minha Conta
                                    </button>
                                </div>
                            </nav>

                            <div className="mt-auto p-6 bg-white border-t border-slate-200">
                                <button
                                    onClick={() => { setCarrinhoAberto(true); setMenuMobileAberto(false); }}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all"
                                >
                                    <ShoppingBag className="w-5 h-5" /> Ver Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
