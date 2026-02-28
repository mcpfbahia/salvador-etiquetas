import React from 'react';
import { Instagram, Facebook, MessageCircle, Mail, MapPin, ShieldCheck, CreditCard, Truck } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-50 text-slate-600 pt-16 pb-8 border-t border-slate-200 mt-12">
            <div className="max-w-[1280px] mx-auto px-6">

                {/* Grid Superior */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Coluna 1: Sobre */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 mb-2">
                            <img src="/logo-salvador-etiquetas1.svg" alt="Logo" className="w-10 h-10 object-contain" />
                            <div className="flex flex-col justify-center leading-none">
                                <div className="flex items-baseline gap-1.5 leading-none">
                                    <span className="text-xl md:text-2xl font-black tracking-tight text-orange-600">Salvador</span>
                                    <span className="text-lg md:text-xl font-medium tracking-wide text-cyan-700">Etiquetas</span>
                                </div>
                                <span className="text-[9px] md:text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase mt-1">Comunicação Visual</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-500">
                            Especialistas em destacar a sua marca. Etiquetas premium em vinil, à prova d'água e com recorte perfeito para o seu negócio.
                        </p>
                    </div>

                    {/* Coluna 2: Navegação */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-slate-800 font-bold text-lg mb-2">Navegação</h3>
                        <nav className="flex flex-col gap-3">
                            <a href="#" className="flex items-center text-sm hover:text-cyan-500 transition-all duration-300 hover:translate-x-1 w-fit">Produtos</a>
                            <a href="#" className="flex items-center text-sm hover:text-cyan-500 transition-all duration-300 hover:translate-x-1 w-fit">Promoção PIX</a>
                            <a href="#" className="flex items-center text-sm hover:text-cyan-500 transition-all duration-300 hover:translate-x-1 w-fit">Prazos de Produção</a>
                            <a href="#" className="flex items-center text-sm hover:text-cyan-500 transition-all duration-300 hover:translate-x-1 w-fit">Rastrear Pedido</a>
                        </nav>
                    </div>

                    {/* Coluna 3: Suporte */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-slate-800 font-bold text-lg mb-2">Suporte</h3>
                        <nav className="flex flex-col gap-3">
                            <a href="#" className="flex items-center text-sm hover:text-cyan-500 transition-all duration-300 hover:translate-x-1 w-fit">Central de Ajuda (FAQ)</a>
                            <a href="#" className="flex items-center text-sm hover:text-cyan-500 transition-all duration-300 hover:translate-x-1 w-fit">Trocas e Devoluções</a>
                            <a href="#" className="flex items-center text-sm hover:text-cyan-500 transition-all duration-300 hover:translate-x-1 w-fit">Política de Privacidade</a>
                            <a href="#" className="flex items-center text-sm hover:text-cyan-500 transition-all duration-300 hover:translate-x-1 w-fit">Termos de Serviço</a>
                        </nav>
                    </div>

                    {/* Coluna 4: Contato */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-slate-800 font-bold text-lg mb-2">Fale Conosco</h3>

                        <div className="flex flex-col gap-3">
                            <a href="#" className="flex items-center gap-3 text-sm hover:text-cyan-500 transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                    <MessageCircle size={16} />
                                </div>
                                (71) 99999-9999
                            </a>

                            <a href="#" className="flex items-center gap-3 text-sm hover:text-cyan-500 transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                    <Mail size={16} />
                                </div>
                                contato@salvadoretiquetas.com.br
                            </a>

                            <p className="flex items-start gap-3 text-sm text-gray-400 mt-2">
                                <MapPin size={18} className="shrink-0 mt-0.5" />
                                <span>Atendendo toda a região de Salvador e Lauro de Freitas - BA, com envios para todo o Brasil.</span>
                            </p>
                        </div>

                        {/* Redes Sociais */}
                        <div className="flex items-center gap-4 mt-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                {/* SVG Customizado TIKTOK pois lucide costuma não ter em todas versões */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-gray-500 text-center md:text-left">
                        &copy; 2026 Salvador Etiquetas. Todos os direitos reservados.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-gray-500">
                        {/* Formas de pagamento / Seguranca / Envio */}
                        <div className="flex items-center gap-1 flex-row text-orange-500 hover:text-orange-600 transition-colors cursor-default mr-4">
                            <Truck size={20} />
                            <span className="text-xs font-bold tracking-wide">ENVIAMOS PARA TODO O BRASIL</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-gray-300 transition-colors cursor-default" title="Pagamento via Pix">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            <span className="text-xs font-semibold">PIX</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-gray-300 transition-colors cursor-default" title="Cartões de Crédito">
                            <CreditCard size={20} />
                            <span className="text-xs font-semibold">CARTÕES</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-gray-300 transition-colors cursor-default" title="Site Seguro">
                            <ShieldCheck size={20} className="text-emerald-500" />
                            <span className="text-xs font-semibold">SITE SEGURO</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
