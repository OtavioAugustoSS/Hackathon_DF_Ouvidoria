import React from 'react';

interface AccessibilityPageProps {
    onBack: () => void;
}

const AccessibilityPage: React.FC<AccessibilityPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <section className="bg-white border-b border-gray-200 pt-12 pb-16">
                <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-primary font-bold mb-6 hover:underline"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar para o Início
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Acessibilidade</h1>
                    <p className="text-gray-600 text-lg max-w-3xl">
                        O Participa DF está comprometido em garantir a acessibilidade digital para todos os cidadãos, seguindo as diretrizes do e-MAG (Modelo de Acessibilidade em Governo Eletrônico).
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-[32px]">wb_sunny</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Alto Contraste</h3>
                        <p className="text-gray-600 mb-6 font-display">
                            Esta opção altera as cores do site para tons de preto, branco e amarelo, facilitando a leitura para pessoas com baixa visão ou daltonismo. Ative clicando no botão no topo da página.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="size-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-[32px]">sign_language</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">V-Libras</h3>
                        <p className="text-gray-600 mb-6">
                            Disponibilizamos o widget do V-Libras, que traduz conteúdos digitais (texto, áudio e vídeo) para a Língua Brasileira de Sinais, tornando o site acessível para pessoas surdas.
                        </p>
                        <div className="text-sm font-bold text-primary">Clique no ícone lateral azul para ativar.</div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="size-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-[32px]">keyboard</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Navegação via Teclado</h3>
                        <p className="text-gray-600 mb-6 font-display">
                            O site foi estruturado para permitir a navegação completa utilizando apenas a tecla Tab, Enter e as setas, garantindo o acesso para pessoas com deficiência motora.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="size-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-[32px]">text_increase</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Aumento de Fonte</h3>
                        <p className="text-gray-600 mb-6 font-display">
                            Você pode aumentar ou diminuir o tamanho dos textos de todo o site clicando nos botões <b>A+</b> e <b>A-</b> localizados na barra de acessibilidade no topo.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityPage;
