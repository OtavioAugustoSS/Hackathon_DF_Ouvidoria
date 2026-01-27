import React from 'react';

interface TransparencyPageProps {
    onBack: () => void;
    onGoToReports: () => void;
    onGoToOpenData: () => void;
    onGoToServiceCharter: () => void;
}

const TransparencyPage: React.FC<TransparencyPageProps> = ({
    onBack,
    onGoToReports,
    onGoToOpenData,
    onGoToServiceCharter
}) => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <section className="bg-white border-b border-gray-200 pt-12 pb-16">
                <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-primary font-bold mb-6 hover:underline"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar para o Início
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Painel de Transparência</h1>
                    <p className="text-gray-600 text-lg max-w-3xl">
                        Acompanhe em tempo real os dados de participação social do Distrito Federal. Acesse relatórios, estatísticas e o histórico de atendimentos da Ouvidoria.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px]">bar_chart</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Relatórios Anuais</h3>
                        <p className="text-gray-500 text-sm">Acesse o balanço completo das atividades e resultados da Ouvidoria em cada exercício.</p>
                        <button
                            onClick={onGoToReports}
                            className="mt-auto text-primary font-bold text-sm flex items-center gap-1 hover:underline"
                        >
                            Ver relatórios <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="size-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px]">description</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Dados Abertos</h3>
                        <p className="text-gray-500 text-sm">Baixe as bases de dados brutas em formatos abertos para análise e cruzamento de informações.</p>
                        <button
                            onClick={onGoToOpenData}
                            className="mt-auto text-primary font-bold text-sm flex items-center gap-1 hover:underline"
                        >
                            Explorar dados <span className="material-symbols-outlined text-[16px]">download</span>
                        </button>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="size-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px]">fact_check</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Carta de Serviços</h3>
                        <p className="text-gray-500 text-sm">Conheça os padrões de qualidade e os compromissos de atendimento assumidos pelo GDF.</p>
                        <button
                            onClick={onGoToServiceCharter}
                            className="mt-auto text-primary font-bold text-sm flex items-center gap-1 hover:underline"
                        >
                            Acessar carta <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Real-time stats preview */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Destaques do Mês</h2>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-center">
                        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
                            <div className="p-10">
                                <p className="text-gray-500 text-sm font-medium mb-1">Manifestações total</p>
                                <h4 className="text-3xl font-black text-gray-900">42.518</h4>
                            </div>
                            <div className="p-10">
                                <p className="text-gray-500 text-sm font-medium mb-1">Respondidas</p>
                                <h4 className="text-3xl font-black text-green-600">96.4%</h4>
                            </div>
                            <div className="p-10">
                                <p className="text-gray-500 text-sm font-medium mb-1">Elogios</p>
                                <h4 className="text-3xl font-black text-blue-600">3.842</h4>
                            </div>
                            <div className="p-10">
                                <p className="text-gray-500 text-sm font-medium mb-1">Sugestões acatadas</p>
                                <h4 className="text-3xl font-black text-orange-600">18%</h4>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TransparencyPage;
