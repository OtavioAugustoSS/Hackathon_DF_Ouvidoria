import React from 'react';

interface OpenDataPageProps {
    onBack: () => void;
}

const OpenDataPage: React.FC<OpenDataPageProps> = ({ onBack }) => {
    const datasets = [
        { title: 'Manifestações por Assunto', format: 'CSV, JSON', size: '2.4 MB', updated: 'Há 2 dias' },
        { title: 'Tempo Médio de Resposta por Órgão', format: 'XLSX, CSV', size: '1.1 MB', updated: 'Há 1 semana' },
        { title: 'Série Histórica (2015-2023)', format: 'ZIP (CSV)', size: '45.8 MB', updated: 'Jan 2024' },
        { title: 'Índice de Satisfação do Cidadão', format: 'JSON, CSV', size: '840 KB', updated: 'Há 3 dias' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <section className="bg-white border-b border-gray-200 pt-12 pb-16">
                <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-primary font-bold mb-6 hover:underline"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar para Transparência
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Dados Abertos</h1>
                    <p className="text-gray-600 text-lg max-w-3xl">
                        Acesse e baixe as bases de dados brutas da Ouvidoria para realizar suas próprias análises e cruzamentos.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-4xl mx-auto px-4 md:px-8 mt-12">
                <div className="grid grid-cols-1 gap-6">
                    {datasets.map((data, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex gap-4">
                                <div className="size-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-[28px]">database</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{data.format}</span>
                                        <span className="text-xs text-gray-400">{data.size}</span>
                                        <span className="text-xs text-gray-400">Atualizado: {data.updated}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="h-12 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                Baixar Dataset
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OpenDataPage;
