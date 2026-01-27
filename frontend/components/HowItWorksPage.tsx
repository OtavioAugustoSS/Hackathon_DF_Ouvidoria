import React from 'react';

interface HowItWorksPageProps {
    onBack: () => void;
    onStartManifestation: () => void;
}

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBack, onStartManifestation }) => {
    const steps = [
        {
            number: '01',
            title: 'Identificação',
            desc: 'Escolha se deseja se indentificar ou fazer um relato anônimo. Identificar-se permite acompanhar o processo.',
            icon: 'person_search'
        },
        {
            number: '02',
            title: 'Tipo de Manifestação',
            desc: 'Selecione se é uma denúncia, reclamação, sugestão ou elogio para que possamos direcionar corretamente.',
            icon: 'category'
        },
        {
            number: '03',
            title: 'Relato e Anexos',
            desc: 'Descreva sua situação com detalhes. Você pode anexar fotos, áudios ou documentos como evidência.',
            icon: 'attachment'
        },
        {
            number: '04',
            title: 'Acompanhamento',
            desc: 'Receba um número de protocolo para consultar o andamento e a resposta final do órgão responsável.',
            icon: 'fact_check'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <section className="bg-white border-b border-gray-200 pt-12 pb-16 text-center">
                <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:underline mx-auto"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar para o Início
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Como funciona o Participa DF</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Entenda o passo a passo desde o registro da sua manifestação até a resposta final do governo.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-5xl mx-auto px-4 md:px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 size-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                {step.number}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                    <span className="material-symbols-outlined">{step.icon}</span>
                                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 bg-primary rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <span className="material-symbols-outlined text-[150px]">campaign</span>
                    </div>
                    <h2 className="text-3xl font-black mb-6 relative z-10">Pronto para começar?</h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto relative z-10">
                        Sua participação é o primeiro passo para melhorar os serviços públicos do Distrito Federal.
                    </p>
                    <button
                        onClick={onStartManifestation}
                        className="h-14 px-10 bg-white text-primary font-black rounded-xl shadow-xl hover:-translate-y-1 transition-all relative z-10"
                    >
                        Registrar Manifestação Agora
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;
