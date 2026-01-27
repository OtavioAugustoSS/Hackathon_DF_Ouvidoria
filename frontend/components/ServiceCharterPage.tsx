import React from 'react';

interface ServiceCharterPageProps {
    onBack: () => void;
}

const ServiceCharterPage: React.FC<ServiceCharterPageProps> = ({ onBack }) => {
    const standards = [
        { label: 'Tempo Médio de Atendimento Presencial', value: '15 minutos', icon: 'schedule' },
        { label: 'Tempo de Resposta em Canais Digitais', value: 'Até 48 horas', icon: 'speed' },
        { label: 'Índice Mínimo de Resolutividade', value: '85%', icon: 'task_alt' },
        { label: 'Disponibilidade do Sistema', value: '99.8%', icon: 'cloud_done' },
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
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Carta de Serviços</h1>
                    <p className="text-gray-600 text-lg max-w-3xl">
                        Conheça nossos padrões de qualidade e o compromisso do Governo do Distrito Federal com a excelência no atendimento.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {standards.map((std, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <div className="size-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4 mx-auto">
                                <span className="material-symbols-outlined">{std.icon}</span>
                            </div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{std.label}</p>
                            <h4 className="text-2xl font-black text-gray-900">{std.value}</h4>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossos Compromissos</h2>
                    <div className="grid md:grid-cols-2 gap-12 text-left">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2 underline decoration-primary underline-offset-4">Transparência</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Garantir que todas as informações públicas sejam acessíveis, compreensíveis e atualizadas tempestivamente em todos os nossos canais.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2 underline decoration-primary underline-offset-4">Respeito</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Tratar cada cidadão com urbanidade, imparcialidade e ética, garantindo a proteção de seus dados e o sigilo de sua identidade quando solicitado.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2 underline decoration-primary underline-offset-4">Eficiência</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Otimizar processos para reduzir prazos de resposta e aumentar a efetividade das resoluções apresentadas.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2 underline decoration-primary underline-offset-4">Inovação</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Utilizar tecnologias modernas para facilitar o acesso do cidadão aos serviços públicos e canais de participação.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCharterPage;
