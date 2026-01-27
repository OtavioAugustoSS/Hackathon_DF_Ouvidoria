import React from 'react';

interface HelpPageProps {
    onBack: () => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
    const faqs = [
        { q: 'Como acompanho o status da minha manifestação?', a: 'Você pode acompanhar informando o número do protocolo recebido no ato do registro na barra de busca da tela inicial desta plataforma.' },
        { q: 'Qual o prazo de resposta para uma reclamação?', a: 'O prazo oficial para resposta é de até 20 dias, podendo ser prorrogado por mais 10 dias mediante justificativa.' },
        { q: 'Posso fazer uma denúncia anônima?', a: 'Sim, o sistema permite o anonimato. No entanto, o relato deve ser preciso e conter elementos mínimos de prova para viabilizar a apuração.' },
        { q: 'Esqueci minha senha de acesso, como recuperar?', a: 'Clique em "Entrar" e selecione "Esqueceu a senha?". Um link de recuperação será enviado para seu e-mail cadastrado.' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <section className="bg-white border-b border-gray-200 pt-12 pb-16">
                <div className="layout-container max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:underline mx-auto"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar para o Início
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Como podemos ajudar?</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Tire suas dúvidas sobre o funcionamento do Participa DF e conheça as melhores práticas para que sua voz seja ouvida.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-4xl mx-auto px-4 md:px-8 mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">Perguntas Frequentes</h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-3">
                                    <span className="text-primary material-symbols-outlined">help</span>
                                    {faq.q}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed pl-9">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HelpPage;
