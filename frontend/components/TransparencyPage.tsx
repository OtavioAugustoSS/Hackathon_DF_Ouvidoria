import React from 'react';

interface TransparencyPageProps {
    onBack: () => void;
    onGoToReports: () => void;
    onGoToOpenData: () => void;
    onGoToServiceCharter: () => void;
    highContrast?: boolean;
}

const TransparencyPage: React.FC<TransparencyPageProps> = ({
    onBack,
    onGoToReports,
    onGoToOpenData,
    onGoToServiceCharter,
    highContrast = false
}) => {
    return (
        <div className={`min-h-screen pb-20 ${highContrast ? 'bg-black' : 'bg-gray-50'}`}>
            {/* Header Section */}
            <section className={`pt-12 pb-16 border-b ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'}`}>
                <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
                    <button
                        onClick={onBack}
                        className={`flex items-center gap-2 font-bold mb-6 hover:underline ${highContrast ? 'text-yellow-400 hover:text-white' : 'text-primary'}`}
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar para o Início
                    </button>
                    <h1 className={`text-4xl font-black tracking-tight mb-4 ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Painel de Transparência</h1>
                    <p className={`text-lg max-w-3xl ${highContrast ? 'text-white' : 'text-gray-600'}`}>
                        Acompanhe em tempo real os dados de participação social do Distrito Federal. Acesse relatórios, estatísticas e o histórico de atendimentos da Ouvidoria.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className={`p-8 rounded-2xl shadow-sm border flex flex-col gap-4 ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-100'}`}>
                        <div className={`size-12 rounded-xl flex items-center justify-center ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-blue-50 text-blue-600'}`}>
                            <span className="material-symbols-outlined text-[28px]">bar_chart</span>
                        </div>
                        <h3 className={`text-xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Relatórios Anuais</h3>
                        <p className={`text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>Acesse o balanço completo das atividades e resultados da Ouvidoria em cada exercício.</p>
                        <button
                            onClick={onGoToReports}
                            className={`mt-auto font-bold text-sm flex items-center gap-1 hover:underline ${highContrast ? 'text-yellow-400' : 'text-primary'}`}
                        >
                            Ver relatórios <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className={`p-8 rounded-2xl shadow-sm border flex flex-col gap-4 ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-100'}`}>
                        <div className={`size-12 rounded-xl flex items-center justify-center ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-green-50 text-green-600'}`}>
                            <span className="material-symbols-outlined text-[28px]">description</span>
                        </div>
                        <h3 className={`text-xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Dados Abertos</h3>
                        <p className={`text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>Baixe as bases de dados brutas em formatos abertos para análise e cruzamento de informações.</p>
                        <button
                            onClick={onGoToOpenData}
                            className={`mt-auto font-bold text-sm flex items-center gap-1 hover:underline ${highContrast ? 'text-yellow-400' : 'text-primary'}`}
                        >
                            Explorar dados <span className="material-symbols-outlined text-[16px]">download</span>
                        </button>
                    </div>

                    {/* Card 3 */}
                    <div className={`p-8 rounded-2xl shadow-sm border flex flex-col gap-4 ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-100'}`}>
                        <div className={`size-12 rounded-xl flex items-center justify-center ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-purple-50 text-purple-600'}`}>
                            <span className="material-symbols-outlined text-[28px]">fact_check</span>
                        </div>
                        <h3 className={`text-xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Carta de Serviços</h3>
                        <p className={`text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>Conheça os padrões de qualidade e os compromissos de atendimento assumidos pelo GDF.</p>
                        <button
                            onClick={onGoToServiceCharter}
                            className={`mt-auto font-bold text-sm flex items-center gap-1 hover:underline ${highContrast ? 'text-yellow-400' : 'text-primary'}`}
                        >
                            Acessar carta <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Real-time stats preview */}
                <section className="mt-16">
                    <h2 className={`text-2xl font-bold mb-8 ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Destaques do Mês</h2>
                    <div className={`rounded-2xl border shadow-sm overflow-hidden text-center ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-100'}`}>
                        <div className={`grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 ${highContrast ? 'divide-yellow-400/30' : 'divide-gray-100'}`}>
                            <div className="p-10">
                                <p className={`text-sm font-medium mb-1 ${highContrast ? 'text-white' : 'text-gray-500'}`}>Manifestações total</p>
                                <h4 className={`text-3xl font-black ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>42.518</h4>
                            </div>
                            <div className="p-10">
                                <p className={`text-sm font-medium mb-1 ${highContrast ? 'text-white' : 'text-gray-500'}`}>Respondidas</p>
                                <h4 className={`text-3xl font-black ${highContrast ? 'text-yellow-400' : 'text-green-600'}`}>96.4%</h4>
                            </div>
                            <div className="p-10">
                                <p className={`text-sm font-medium mb-1 ${highContrast ? 'text-white' : 'text-gray-500'}`}>Elogios</p>
                                <h4 className={`text-3xl font-black ${highContrast ? 'text-yellow-400' : 'text-blue-600'}`}>3.842</h4>
                            </div>
                            <div className="p-10">
                                <p className={`text-sm font-medium mb-1 ${highContrast ? 'text-white' : 'text-gray-500'}`}>Sugestões acatadas</p>
                                <h4 className={`text-3xl font-black ${highContrast ? 'text-yellow-400' : 'text-orange-600'}`}>18%</h4>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TransparencyPage;
