import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Chrome, Mail, Lock, User, Phone } from 'lucide-react';

// ───────────────────────────────────────────────────────────────
// COMPONENTE: Input reutilizável com ícone e label
// ───────────────────────────────────────────────────────────────
function InputField({ label, type = 'text', placeholder, icon: Icon, rightElement }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                        <Icon size={17} />
                    </div>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white transition-all duration-200 ${Icon ? 'pl-10 pr-4' : 'px-4'} ${rightElement ? 'pr-12' : ''}`}
                />
                {rightElement && (
                    <div className="absolute right-3.5">{rightElement}</div>
                )}
            </div>
        </div>
    );
}

// ───────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL: AuthPage
// ───────────────────────────────────────────────────────────────
export default function AuthPage({ onClose }) {
    const [tab, setTab] = useState('login');        // 'login' | 'register'
    const [showPass, setShowPass] = useState(false);

    const isLogin = tab === 'login';

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans bg-white">

            {/* ── LADO ESQUERDO: Vitrine da Marca ── */}
            <div
                className="hidden md:flex flex-col justify-between p-12 relative overflow-hidden min-h-screen sticky top-0"
                style={{
                    backgroundImage: "url('/banner-brinde-pix.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm" />

                {/* Conteúdo sobre o overlay */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo-salvador-etiquetas1.svg"
                            alt="Salvador Etiquetas"
                            className="w-12 h-12 object-contain brightness-200"
                        />
                        <div className="leading-none">
                            <span className="text-2xl font-black text-orange-400">Salvador</span>
                            <span className="text-2xl font-semibold text-cyan-300 ml-1.5">Etiquetas</span>
                        </div>
                    </div>

                    {/* Headline central */}
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-1 rounded-full bg-cyan-500" />
                        <h2 className="text-4xl font-extrabold text-white leading-tight">
                            Gerencie suas artes e pedidos em um só lugar.
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                            Acesse seu histórico, repita pedidos com um clique e acompanhe o status da sua produção em tempo real.
                        </p>
                    </div>

                    {/* Depoimento / social proof */}
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
                        <div className="flex text-yellow-400 mb-2 text-lg">★★★★★</div>
                        <p className="text-white/90 text-sm font-medium leading-relaxed italic">
                            "Repito meu pedido de 500 lacres em menos de 2 minutos. Incrível!"
                        </p>
                        <p className="text-slate-400 text-xs mt-3 font-semibold">— Mariana P., Delivery & Co.</p>
                    </div>
                </div>
            </div>

            {/* ── LADO DIREITO: Formulário ── */}
            <div className="flex items-start md:items-center justify-center bg-white px-6 py-12 md:px-12 relative min-h-screen">
                {/* Botão fechar (Fixo para estar sempre disponível) */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="fixed md:absolute top-6 right-6 z-20 bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 rounded-full shadow-sm md:shadow-none text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                        ✕
                    </button>
                )}

                <div className="w-full max-w-md">
                    {/* Header mobile: logo pequeno */}
                    <div className="flex items-center gap-2 mb-8 md:hidden">
                        <img src="/logo-salvador-etiquetas1.svg" alt="Logo" className="w-9 h-9 object-contain" />
                        <span className="text-xl font-black text-orange-500">Salvador</span>
                        <span className="text-xl font-semibold text-cyan-600">Etiquetas</span>
                    </div>

                    {/* Saudação */}
                    <h1 className="text-3xl font-black text-slate-900 mb-1">
                        {isLogin ? 'Bem-vindo de volta! 👋' : 'Crie sua conta grátis'}
                    </h1>
                    <p className="text-slate-500 text-sm mb-8">
                        {isLogin
                            ? 'Acesse sua conta para gerenciar seus pedidos.'
                            : 'Cadastre-se e comece a personalizar suas etiquetas.'}
                    </p>

                    {/* Tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-full mb-8">
                        {['login', 'register'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${tab === t
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {t === 'login' ? 'Entrar' : 'Criar Conta'}
                            </button>
                        ))}
                    </div>

                    {/* Social Login */}
                    <button className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors mb-6 cursor-pointer shadow-sm">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continuar com Google
                    </button>

                    {/* Divisor */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400 font-medium">ou continue com email</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Campos do Formulário */}
                    <div className="flex flex-col gap-4">
                        <AnimatePresence initial={false}>
                            {!isLogin && (
                                <motion.div
                                    key="register-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden flex flex-col gap-4"
                                >
                                    <InputField
                                        label="Nome completo"
                                        placeholder="Ex: Maria Silva"
                                        icon={User}
                                    />
                                    <InputField
                                        label="WhatsApp"
                                        placeholder="(71) 9 9999-9999"
                                        icon={Phone}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <InputField
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            icon={Mail}
                        />

                        {/* Senha */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="text-sm font-semibold text-slate-700">Senha</label>
                                {isLogin && (
                                    <a href="#" className="text-cyan-600 text-xs font-semibold hover:underline">
                                        Esqueceu a senha?
                                    </a>
                                )}
                            </div>
                            <div className="relative flex items-center">
                                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                                    <Lock size={17} />
                                </div>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Mínimo 8 caracteres"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-12 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                                >
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Termos (só no cadastro) */}
                        <AnimatePresence initial={false}>
                            {!isLogin && (
                                <motion.div
                                    key="terms"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <label className="flex items-start gap-2.5 cursor-pointer">
                                        <input type="checkbox" className="mt-0.5 w-4 h-4 rounded text-cyan-500 border-slate-300 focus:ring-cyan-500 shrink-0" />
                                        <span className="text-xs text-slate-500 leading-relaxed">
                                            Aceito os{' '}
                                            <a href="#" className="text-cyan-600 font-semibold hover:underline">Termos de Uso</a>
                                            {' '}e a{' '}
                                            <a href="#" className="text-cyan-600 font-semibold hover:underline">Política de Privacidade</a>.
                                        </span>
                                    </label>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTA */}
                    <button className="w-full mt-6 py-3.5 rounded-xl font-bold text-white text-base bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                        {isLogin ? 'Entrar na minha conta' : 'Criar minha conta'}
                    </button>

                    {/* Alternador de modo */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        {isLogin ? 'Ainda não tem conta?' : 'Já tem uma conta?'}{' '}
                        <button
                            onClick={() => setTab(isLogin ? 'register' : 'login')}
                            className="text-cyan-600 font-bold hover:underline cursor-pointer"
                        >
                            {isLogin ? 'Criar agora' : 'Entrar'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
