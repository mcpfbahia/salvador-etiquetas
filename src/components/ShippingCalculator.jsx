import React, { useState } from 'react';
import { Truck, Loader2, CheckCircle2 } from 'lucide-react';

// Opções simuladas de frete (retorno fake da API dos Correios)
const OPCOES_FRETE = [
    {
        id: 'pac',
        nome: 'Correios PAC',
        preco: 'R$ 22,50',
        prazo: 'Chega em até 7 dias úteis',
        icon: '📦',
    },
    {
        id: 'sedex',
        nome: 'Correios Sedex',
        preco: 'R$ 45,90',
        prazo: 'Chega em até 2 dias úteis',
        icon: '⚡',
    },
    {
        id: 'retirada',
        nome: 'Retirar na Gráfica',
        preco: 'Grátis',
        prazo: '1 dia útil — Lauro de Freitas',
        icon: '🏪',
        gratis: true,
    },
];

export default function ShippingCalculator() {
    const [cep, setCep] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shippingOptions, setShippingOptions] = useState(null);
    const [erro, setErro] = useState('');

    // Máscara de CEP: 00000-000
    const handleCepChange = (e) => {
        let valor = e.target.value.replace(/\D/g, '').slice(0, 8);
        if (valor.length > 5) valor = valor.slice(0, 5) + '-' + valor.slice(5);
        setCep(valor);
        setErro('');
        setShippingOptions(null);
    };

    const calcular = () => {
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length < 8) {
            setErro('Digite um CEP válido com 8 dígitos.');
            return;
        }

        setIsLoading(true);
        setShippingOptions(null);

        // Simulação de chamada à API dos Correios (1.5s)
        setTimeout(() => {
            setIsLoading(false);
            setShippingOptions(OPCOES_FRETE);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') calcular();
    };

    return (
        <div className="bg-slate-50 rounded-2xl p-5 mt-6 border border-slate-100">
            {/* Cabeçalho */}
            <div className="flex items-center gap-2 mb-4">
                <Truck size={18} className="text-cyan-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-800">Simular Frete e Prazo</span>
            </div>

            {/* Formulário */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <div className="flex-1 flex flex-col gap-1">
                    <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        onKeyDown={handleKeyDown}
                        placeholder="00000-000"
                        maxLength={9}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                    <a
                        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-cyan-600 underline self-start mt-0.5 transition-colors"
                    >
                        Não sei meu CEP
                    </a>
                </div>

                <button
                    onClick={calcular}
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 disabled:opacity-70 text-white px-5 py-3 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center sm:justify-start gap-2 self-stretch sm:self-start"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={15} className="animate-spin" />
                            <span>Calculando...</span>
                        </>
                    ) : (
                        'Calcular Frete'
                    )}
                </button>
            </div>

            {/* Erro */}
            {erro && (
                <p className="text-red-500 text-xs font-medium mt-2">{erro}</p>
            )}

            {/* Resultado */}
            {shippingOptions && (
                <div className="mt-4 flex flex-col gap-2">
                    <div className="h-px bg-slate-200 mb-1" />
                    {shippingOptions.map((opcao) => (
                        <div
                            key={opcao.id}
                            className="flex items-center justify-between gap-4 bg-white rounded-xl px-4 py-3 border border-slate-100 hover:border-cyan-200 transition-colors"
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span className="text-base shrink-0">{opcao.icon}</span>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{opcao.nome}</p>
                                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{opcao.prazo}</p>
                                </div>
                            </div>
                            <div className="shrink-0 text-right">
                                <p className={`text-sm font-black ${opcao.gratis ? 'text-emerald-600' : 'text-slate-900'}`}>
                                    {opcao.preco}
                                </p>
                            </div>
                        </div>
                    ))}
                    <p className="text-[10px] text-slate-400 mt-1 text-center">
                        * Prazo conta a partir da aprovação do arquivo de arte.
                    </p>
                </div>
            )}
        </div>
    );
}
