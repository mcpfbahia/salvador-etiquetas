import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    MessageCircle,
    Mail,
    Send,
    ShieldCheck,
    Clock,
    Palette,
    Truck,
    HelpCircle
} from 'lucide-react';

const FAQ_DATA = [
    {
        question: 'Qual o prazo de produção?',
        answer: 'Nosso prazo padrão é de 3 a 5 dias úteis após a aprovação da arte. Para pedidos urgentes, entre em contato com nossa equipe via WhatsApp para verificar disponibilidade de encaixe.'
    },
    {
        question: 'Vocês criam a arte?',
        answer: 'Sim! Temos uma equipe de designers prontos para criar ou ajustar sua arte. Você também pode enviar seu arquivo pronto para conferência técnica gratuita antes da impressão.'
    },
    {
        question: 'Qual a diferença entre Vinil e BOPP?',
        answer: 'O Vinil é mais flexível e resistente a rasgos, ideal para superfícies curvas. O BOPP é um filme rígido, excelente para rótulos de alta performance e resistência a umidade extrema.'
    },
    {
        question: 'Como funciona o envio para outras cidades?',
        answer: 'Enviamos para todo o Brasil via Transportadoras parceiras ou Correios (Sedex/PAC). O frete é calculado automaticamente no checkout com base no peso e CEP de destino.'
    }
];

const FaqItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 mb-4 overflow-hidden transition-all duration-300 hover:border-cyan-200 hover:shadow-md">
            <button
                onClick={onClick}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
            >
                <span className={`font-bold transition-colors duration-200 ${isOpen ? 'text-cyan-600' : 'text-slate-700'}`}>
                    {item.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ${isOpen ? 'text-cyan-500' : 'text-slate-400'}`}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="px-5 pb-5 pt-1">
                            <div className="h-px bg-slate-100 mb-4" />
                            <p className="text-sm text-slate-500 leading-relaxed italic">
                                "{item.answer}"
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function HelpCenterPage({ onBack }) {
    const [openIndex, setOpenIndex] = useState(0); // Abre o primeiro por padrão
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        assunto: 'Dúvida',
        mensagem: ''
    });

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Mensagem enviada:', formData);
        alert('🎉 Mensagem enviada com sucesso! Nossa equipe responderá em breve.');
        setFormData({ nome: '', email: '', assunto: 'Dúvida', mensagem: '' });
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 md:py-24 px-4 font-sans">
            {/* Cabeçalho */}
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mb-6"
                >
                    <div className="bg-cyan-100 p-3 rounded-2xl text-cyan-600">
                        <HelpCircle size={32} />
                    </div>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
                >
                    Como podemos ajudar?
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
                >
                    Encontre respostas rápidas nas nossas perguntas frequentes ou fale diretamente com um especialista da Salvador Etiquetas.
                </motion.p>
            </div>

            {/* Grid Principal */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                {/* Lado Esquerdo - FAQ */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-8 bg-cyan-500 rounded-full" />
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wider">Perguntas Frequentes</h2>
                    </div>

                    <div className="space-y-2">
                        {FAQ_DATA.map((item, index) => (
                            <FaqItem
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onClick={() => toggleFaq(index)}
                            />
                        ))}
                    </div>

                    {/* Dica Adicional */}
                    <div className="mt-8 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                        <div className="bg-amber-50 p-3 rounded-xl text-amber-500">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">Horário de Atendimento</h4>
                            <p className="text-sm text-slate-500">Segunda à Sexta, das 08:00 às 18:00.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Lado Direito - Contato */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-8 bg-orange-500 rounded-full" />
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wider">Fale Conosco</h2>
                    </div>

                    {/* Cards Rápidos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <a
                            href="https://wa.me/5571999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-50 border border-green-100 p-6 rounded-3xl hover:shadow-lg hover:shadow-green-500/10 transition-all group flex flex-col items-center text-center cursor-pointer"
                        >
                            <div className="bg-green-500 text-white p-3 rounded-2xl mb-4 shadow-md group-hover:scale-110 transition-transform">
                                <MessageCircle size={24} />
                            </div>
                            <span className="text-green-800 font-black text-sm uppercase tracking-wide">Atendimento Rápido</span>
                            <span className="text-green-600 font-bold text-xs mt-1">Chamar no Zap</span>
                        </a>

                        <div className="bg-cyan-50 border border-cyan-100 p-6 rounded-3xl hover:shadow-lg hover:shadow-cyan-500/10 transition-all group flex flex-col items-center text-center cursor-pointer">
                            <div className="bg-cyan-500 text-white p-3 rounded-2xl mb-4 shadow-md group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <span className="text-cyan-800 font-black text-sm uppercase tracking-wide">Suporte Técnico</span>
                            <span className="text-cyan-600 font-bold text-xs mt-1">Enviar E-mail</span>
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-2xl shadow-slate-200/50">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Mande uma mensagem</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-2">Nome</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.nome}
                                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                        placeholder="Seu nome"
                                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:bg-white transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-2">E-mail</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="seu@email.com"
                                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:bg-white transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Assunto</label>
                                <select
                                    value={formData.assunto}
                                    onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                                >
                                    <option value="Dúvida">Apenas uma dúvida</option>
                                    <option value="Orçamento">Solicitar Orçamento</option>
                                    <option value="Problema no Pedido">Problema com Pedido</option>
                                    <option value="Elogio/Sugestão">Elogio ou Sugestão</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Sua Mensagem</label>
                                <textarea
                                    rows="4"
                                    required
                                    value={formData.mensagem}
                                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                                    placeholder="Como podemos ajudar você hoje?"
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:bg-white transition-all outline-none resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-5 rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer mt-4"
                            >
                                <span>Enviar Mensagem</span>
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Rodapé Interno da Página */}
            <div className="max-w-7xl mx-auto mt-20 md:mt-32 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="bg-white p-3 rounded-full shadow-sm text-cyan-500"><ShieldCheck size={24} /></div>
                    <span className="text-sm font-bold text-slate-700">Garantia Total</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="bg-white p-3 rounded-full shadow-sm text-cyan-500"><Palette size={24} /></div>
                    <span className="text-sm font-bold text-slate-700">Criação de Arte</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="bg-white p-3 rounded-full shadow-sm text-cyan-500"><Truck size={24} /></div>
                    <span className="text-sm font-bold text-slate-700">Envio Seguro</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="bg-white p-3 rounded-full shadow-sm text-orange-500 cursor-pointer hover:underline" onClick={onBack}>
                        <ChevronDown size={24} className="rotate-90" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Voltar à Loja</span>
                </div>
            </div>
        </div>
    );
}
