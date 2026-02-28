import React, { useState } from 'react';
import {
    Trash2,
    ChevronRight,
    ArrowLeft,
    ShieldCheck,
    Truck,
    CreditCard,
    Edit3,
    CheckCircle2,
    MapPin,
    Smartphone
} from 'lucide-react';

export default function CartPage({ itens, onNavigateBack, onRemove, onUpdateQuantity }) {
    const [etapa, setEtapa] = useState(1);
    const [dadosEntrega, setDadosEntrega] = useState({
        nome: '',
        whatsapp: '',
        cep: '',
        cidade: '',
        endereco: ''
    });
    const [metodoPagamento, setMetodoPagamento] = useState('pix');
    const [erroValidacao, setErroValidacao] = useState(false);

    const subtotal = itens.reduce((acc, item) => acc + (item.config?.precoTotal || item.precoBase * item.quantidade), 0);
    const frete = etapa >= 2 ? 15.00 : 0;
    const descontoPix = metodoPagamento === 'pix' ? subtotal * 0.05 : 0;
    const total = subtotal + frete - descontoPix;

    const passos = [
        { id: 1, label: 'Carrinho' },
        { id: 2, label: 'Envio' },
        { id: 3, label: 'Pagamento' },
        { id: 4, label: 'Confirmar' }
    ];

    const validarEtapa = () => {
        if (etapa === 1) return true;
        if (etapa === 2) {
            const { nome, whatsapp, cep, cidade, endereco } = dadosEntrega;
            if (!nome || !whatsapp || !cep || !cidade || !endereco) {
                setErroValidacao(true);
                return false;
            }
        }
        setErroValidacao(false);
        return true;
    };

    const irParaEtapa = (n) => {
        if (n > etapa && !validarEtapa()) return;
        setEtapa(n);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (itens.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <Trash2 size={48} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Seu carrinho está vazio</h2>
                <p className="text-slate-500 mb-8 max-w-md">Parece que você ainda não adicionou nenhum adesivo personalizado ao seu carrinho.</p>
                <button
                    onClick={onNavigateBack}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                    <ArrowLeft size={18} />
                    Continuar Comprando
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
            {/* Stepper */}
            <div className="relative mb-8 md:mb-12 max-w-4xl mx-auto px-2">
                <div className="absolute top-4 md:top-5 left-8 right-8 h-0.5 bg-slate-100 z-0"></div>
                <div className="relative z-10 flex justify-between">
                    {passos.map((passo) => (
                        <div key={passo.id} className="flex flex-col items-center group">
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-xs md:text-sm mb-2 md:mb-3 transition-all duration-500 ${etapa >= passo.id
                                ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-200 scale-110'
                                : 'bg-white border-2 border-slate-100 text-slate-300'
                                }`}>
                                {passo.id}
                            </div>
                            <span className={`text-[9px] md:text-xs font-black uppercase tracking-widest transition-colors ${etapa >= passo.id ? 'text-slate-900' : 'text-slate-300'
                                }`}>
                                {passo.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:flex lg:gap-16 items-start">
                {/* Lado Esquerdo: Conteúdo Dinâmico */}
                <div className="lg:flex-grow">

                    {etapa === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="w-1.5 h-8 md:w-2 md:h-10 bg-cyan-500 rounded-full"></span>
                                Seu Carrinho
                            </h2>
                            <div className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
                                <div className="hidden md:grid grid-cols-[1fr,150px,150px] bg-slate-50 border-b border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest px-8 py-4">
                                    <div>Produto</div>
                                    <div className="text-center">Quantidade</div>
                                    <div className="text-right">Subtotal</div>
                                </div>

                                <div className="divide-y divide-slate-50">
                                    {itens.map((item) => (
                                        <div key={item.id} className="p-4 md:p-8 md:grid md:grid-cols-[1fr,150px,150px] md:items-center gap-6 md:gap-8 group">
                                            <div className="flex gap-4 md:gap-6">
                                                <div className="relative shrink-0">
                                                    <div className="w-20 h-20 md:w-32 md:h-32 bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 transition-transform group-hover:scale-105 duration-500">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <button className="absolute -bottom-1 -left-1 bg-white shadow-xl border border-slate-100 p-1.5 rounded-lg text-cyan-600 hover:text-cyan-700 transition-all">
                                                        <Edit3 size={12} />
                                                    </button>
                                                </div>

                                                <div className="flex-grow py-1 md:py-2">
                                                    <h3 className="text-base md:text-xl font-black text-slate-900 mb-1 md:mb-3">{item.name}</h3>
                                                    <div className="grid grid-cols-1 gap-0.5 md:gap-1">
                                                        <DetailRow label="Material" value={item.config?.material} />
                                                        <DetailRow label="Formato" value={item.config?.formato} />
                                                        <DetailRow label="Tamanho" value={item.config?.tamanho} />
                                                        <DetailRow label="Cor" value={item.config?.cor} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 md:mt-0 flex justify-between md:justify-center items-center">
                                                <span className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-widest">Qtd</span>
                                                <div className="relative">
                                                    <select
                                                        value={item.quantidade}
                                                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                                                        className="appearance-none bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-2 md:py-3 px-8 md:px-10 font-black text-slate-900 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 cursor-pointer text-xs md:text-sm"
                                                    >
                                                        {[25, 50, 100, 250, 500, 1000].map(val => (
                                                            <option key={val} value={val}>{val}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronRight size={12} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                                                </div>
                                            </div>

                                            <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-4 md:gap-6 border-t md:border-0 pt-3 md:pt-0">
                                                <div className="text-right flex md:block items-center gap-2">
                                                    <span className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                                                    <div className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">
                                                        R$ {(item.config?.precoTotal || item.precoBase * item.quantidade).toFixed(2).replace('.', ',')}
                                                    </div>
                                                </div>
                                                <button onClick={() => onRemove(item.id)} className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {etapa === 2 && (
                        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="w-1.5 h-8 md:w-2 md:h-10 bg-cyan-500 rounded-full"></span>
                                Dados de Entrega
                            </h2>
                            <div className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <FormInput
                                    label="Nome Completo"
                                    placeholder="Ex: João Silva"
                                    icon={<Edit3 size={18} />}
                                    value={dadosEntrega.nome}
                                    onChange={(val) => setDadosEntrega({ ...dadosEntrega, nome: val })}
                                    error={erroValidacao && !dadosEntrega.nome}
                                />
                                <FormInput
                                    label="WhatsApp"
                                    placeholder="(00) 00000-0000"
                                    icon={<Smartphone size={18} />}
                                    value={dadosEntrega.whatsapp}
                                    onChange={(val) => setDadosEntrega({ ...dadosEntrega, whatsapp: val })}
                                    error={erroValidacao && !dadosEntrega.whatsapp}
                                />
                                <FormInput
                                    label="CEP"
                                    placeholder="00000-000"
                                    icon={<MapPin size={18} />}
                                    value={dadosEntrega.cep}
                                    onChange={(val) => setDadosEntrega({ ...dadosEntrega, cep: val })}
                                    error={erroValidacao && !dadosEntrega.cep}
                                />
                                <FormInput
                                    label="Cidade / UF"
                                    placeholder="Sua cidade"
                                    value={dadosEntrega.cidade}
                                    onChange={(val) => setDadosEntrega({ ...dadosEntrega, cidade: val })}
                                    error={erroValidacao && !dadosEntrega.cidade}
                                />
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Endereço Completo"
                                        placeholder="Rua, número, bairro e complemento"
                                        value={dadosEntrega.endereco}
                                        onChange={(val) => setDadosEntrega({ ...dadosEntrega, endereco: val })}
                                        error={erroValidacao && !dadosEntrega.endereco}
                                    />
                                </div>
                            </div>
                            {erroValidacao && (
                                <p className="text-red-500 text-xs font-bold animate-pulse text-center">
                                    ⚠️ Por favor, preencha todos os campos obrigatórios para continuar.
                                </p>
                            )}
                        </div>
                    )}

                    {etapa === 3 && (
                        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="w-1.5 h-8 md:w-2 md:h-10 bg-cyan-500 rounded-full"></span>
                                Forma de Pagamento
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                <PaymentOption
                                    selected={metodoPagamento === 'pix'}
                                    onClick={() => setMetodoPagamento('pix')}
                                    title="Pagar com PIX"
                                    desc="Aprovação imediata e 5% de desconto real."
                                    badge="Recomendado"
                                    icon={<div className="bg-emerald-500 text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl"><CheckCircle2 size={24} /></div>}
                                />
                                <PaymentOption
                                    selected={metodoPagamento === 'cartao'}
                                    onClick={() => setMetodoPagamento('cartao')}
                                    title="Cartão de Crédito"
                                    desc="Disponível no próximo passo via Yampi."
                                    icon={<div className="bg-slate-100 text-slate-400 p-2.5 md:p-3 rounded-xl md:rounded-2xl"><CreditCard size={24} /></div>}
                                />
                            </div>
                        </div>
                    )}

                    {etapa === 4 && (
                        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="w-1.5 h-8 md:w-2 md:h-10 bg-cyan-500 rounded-full"></span>
                                Confirmar Pedido
                            </h2>
                            <div className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-white text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>
                                <ShieldCheck size={48} md:size={64} className="mx-auto mb-6 text-cyan-400" />
                                <h3 className="text-2xl md:text-3xl font-black mb-4">Revisão de Qualidade</h3>
                                <p className="text-slate-400 mb-8 md:mb-10 text-sm md:text-base max-w-sm mx-auto font-medium">Seus adesivos serão produzidos com o mais alto padrão de fidelidade de cores e corte preciso.</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-left">
                                    <SummaryCard label="Itens" val={itens.length} />
                                    <SummaryCard label="Método" val={metodoPagamento === 'pix' ? 'Pix' : 'Cartão'} />
                                    <SummaryCard label="Entrega" val="Padrão" />
                                    <SummaryCard label="Garantia" val="Total" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 md:mt-12">
                        <button
                            onClick={() => etapa > 1 ? irParaEtapa(etapa - 1) : onNavigateBack()}
                            className="flex items-center gap-2 text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft size={14} md:size={16} />
                            {etapa === 1 ? 'Continuar Comprando' : 'Voltar Etapa'}
                        </button>
                    </div>
                </div>

                {/* Resumo Sidebar */}
                <div className="mt-8 lg:mt-0 lg:w-[400px] shrink-0 sticky top-12">
                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm md:shadow-none">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 md:mb-10">Resumo Financeiro</h4>

                        <div className="space-y-4 md:space-y-5 mb-8 md:mb-10 text-sm md:text-base">
                            <div className="flex justify-between font-bold">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="text-slate-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span className="text-slate-500">Frete Nacional</span>
                                <span className={frete > 0 ? "text-slate-900" : "text-emerald-500"}>
                                    {frete > 0 ? `R$ ${frete.toFixed(2).replace('.', ',')}` : 'Grátis'}
                                </span>
                            </div>
                            {descontoPix > 0 && (
                                <div className="flex justify-between font-bold text-emerald-600 bg-emerald-50 p-2 md:p-3 rounded-xl text-xs md:text-base">
                                    <span>Desconto Pix (5%)</span>
                                    <span>- R$ {descontoPix.toFixed(2).replace('.', ',')}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-end mb-8 md:mb-10 border-t border-slate-200 pt-6 md:pt-8">
                            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none pb-1 md:pb-2">Investimento</span>
                            <span className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                                R$ {total.toFixed(2).replace('.', ',')}
                            </span>
                        </div>

                        <button
                            onClick={() => etapa < 4 ? irParaEtapa(etapa + 1) : window.location.href = 'https://checkout.salvadoretiquetas.com.br'}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 md:py-6 rounded-2xl font-black text-base md:text-lg shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 group"
                        >
                            <span>{etapa === 4 ? 'Confirmar e Pagar' : 'Próxima Etapa'}</span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <ShieldCheck size={14} />
                                <span className="text-[9px] font-black uppercase tracking-tight">Seguro</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <Truck size={14} />
                                <span className="text-[9px] font-black uppercase tracking-tight">Rápido</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helpers
function DetailRow({ label, value }) {
    if (!value) return null;
    return (
        <div className="flex gap-2 text-[10px] md:text-[11px] font-medium items-baseline">
            <span className="text-slate-400 font-bold uppercase tracking-tighter">{label}:</span>
            <span className="text-slate-600 line-clamp-1">{value}</span>
        </div>
    );
}

function FormInput({ label, placeholder, icon, value, onChange, error }) {
    return (
        <div className="space-y-2 md:space-y-3">
            <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full bg-slate-50 border rounded-xl md:rounded-2xl py-3 md:py-4 pl-5 md:pl-6 pr-12 font-bold text-slate-900 outline-none focus:ring-4 transition-all text-sm md:text-base ${error ? 'border-red-500 focus:ring-red-500/10' : 'border-slate-100 focus:ring-cyan-500/5'
                        }`}
                />
                {icon && <div className={`absolute right-5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-slate-300'}`}>{icon}</div>}
            </div>
        </div>
    );
}

function PaymentOption({ title, desc, icon, badge, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-5 md:p-8 rounded-2xl md:rounded-3xl border-2 transition-all cursor-pointer ${selected ? 'border-slate-900 bg-white shadow-2xl' : 'border-slate-50 bg-slate-50 opacity-60 hover:opacity-100 hover:border-slate-200'
                }`}>
            <div className="flex items-center gap-4 md:gap-6">
                {icon}
                <div className="text-left">
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="font-black text-base md:text-lg text-slate-900">{title}</span>
                        {badge && <span className="bg-emerald-500 text-white text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded-full">{badge}</span>}
                    </div>
                    <div className="text-slate-500 text-[10px] md:text-xs font-bold mt-0.5 md:mt-1">{desc}</div>
                </div>
            </div>
            {selected && <div className="w-5 h-5 md:w-6 md:h-6 bg-slate-900 rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div></div>}
        </button>
    );
}

function SummaryCard({ label, val }) {
    return (
        <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10">
            <div className="text-[8px] md:text-[9px] font-black text-cyan-400 uppercase mb-0.5 md:mb-1 tracking-widest">{label}</div>
            <div className="font-black text-xs md:text-sm">{val}</div>
        </div>
    );
}
