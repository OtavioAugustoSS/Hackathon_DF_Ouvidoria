import React from 'react';

interface ReportsPageProps {
    onBack: () => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onBack }) => {
    const reports = [
        { year: '2024', status: 'Consolidando', date: 'Atualizado em: 15/01/2024', items: 3 },
        { year: '2023', status: 'Finalizado', date: 'Publicado em: 10/01/2024', items: 12 },
        { year: '2022', status: 'Arquivado', date: 'Publicado em: 15/01/2023', items: 12 },
        { year: '2021', status: 'Arquivado', date: 'Publicado em: 12/01/2022', items: 12 },
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
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Relatórios Anuais</h1>
                    <p className="text-gray-600 text-lg max-w-3xl">
                        Acesse os balanços consolidados das atividades da Ouvidoria-Geral do Distrito Federal.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-4xl mx-auto px-4 md:px-8 mt-12">
                <div className="space-y-4">
                    {reports.map((report, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="size-16 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center font-black">
                                    <span className="text-xs uppercase opacity-60">Ano</span>
                                    <span className="text-xl">{report.year}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Relatório Executivo {report.year}</h3>
                                    <div className="flex gap-4 mt-1">
                                        <span className="text-sm text-gray-500">{report.date}</span>
                                        <span className="text-sm text-gray-500">• {report.items} documentos</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${report.status === 'Finalizado' ? 'bg-green-100 text-green-700' :
                                        report.status === 'Consolidando' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {report.status}
                                </span>
                                <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined">download</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
