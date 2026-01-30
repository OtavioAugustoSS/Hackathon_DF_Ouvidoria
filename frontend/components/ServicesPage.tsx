import React from 'react';

interface ServicesPageProps {
    onBack: () => void;
    highContrast?: boolean;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onBack, highContrast = false }) => {
    const serviceCategories = [
        { title: 'Educação', icon: 'school', color: 'blue', items: ['Matrículas', 'Bolsas de Estudo', 'Transporte Escolar'] },
        { title: 'Saúde', icon: 'medical_services', color: 'red', items: ['Agendamento de Consultas', 'Medicamentos', 'Vacinação'] },
        { title: 'Transporte', icon: 'directions_bus', color: 'orange', items: ['Passe Livre', 'Itinerários', 'Recarga de Cartão'] },
        { title: 'Segurança', icon: 'security', color: 'gray', items: ['Boletim de Ocorrência', 'Policiamento', 'Denúncia Anônima'] },
        { title: 'Habitação', icon: 'home', color: 'green', items: ['Programas Habitacionais', 'Escritura Pública', 'Regularização'] },
        { title: 'Trabalho', icon: 'work', color: 'indigo', items: ['Vagas de Emprego', 'Seguro Desemprego', 'Cursos Técnicos'] },
    ];

    return (
        <div className={`min-h-screen pb-20 ${highContrast ? 'bg-black' : 'bg-gray-50'}`}>
            {/* Header Section */}
            <section className={`${highContrast ? 'bg-black border-b-2 border-yellow-400 pt-12 pb-24' : 'bg-primary text-white pt-12 pb-24'}`}>
                <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
                    <button
                        onClick={onBack}
                        className={`flex items-center gap-2 font-bold mb-6 transition-colors ${highContrast ? 'text-yellow-400 hover:text-yellow-200' : 'text-white/80 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar para o Início
                    </button>
                    <h1 className={`text-4xl font-black tracking-tight mb-4 ${highContrast ? 'text-yellow-400' : 'text-white'}`}>Guia de Serviços Públicos</h1>
                    <p className={`text-lg max-w-3xl ${highContrast ? 'text-yellow-400' : 'text-blue-100'}`}>
                        Localize e descubra como acessar os principais serviços oferecidos pelo Governo do Distrito Federal em um único lugar.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8 -mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceCategories.map((cat, idx) => (
                        <div key={idx} className={`rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all ${highContrast ? 'bg-black border-yellow-400 shadow-none' : 'bg-white border-gray-100'}`}>
                            <div className="p-8">
                                <div className={`size-14 rounded-2xl flex items-center justify-center mb-6 ${highContrast ? 'text-yellow-400 border border-yellow-400' : 'text-white'}`} style={{ backgroundColor: highContrast ? '#000' : (cat.color === 'blue' ? '#2563eb' : cat.color === 'red' ? '#dc2626' : cat.color === 'orange' ? '#ea580c' : cat.color === 'green' ? '#16a34a' : cat.color === 'indigo' ? '#4f46e5' : '#374151') }}>
                                    <span className="material-symbols-outlined text-[32px]">{cat.icon}</span>
                                </div>
                                <h3 className={`text-xl font-bold mb-6 ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>{cat.title}</h3>
                                <ul className="space-y-4">
                                    {cat.items.map((item, i) => (
                                        <li key={i} className={`flex items-center justify-between cursor-pointer group ${highContrast ? 'text-yellow-400 hover:text-yellow-200' : 'text-gray-600 hover:text-primary'}`}>
                                            <span className="text-sm font-medium">{item}</span>
                                            <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`p-4 border-t text-center ${highContrast ? 'bg-black border-yellow-400' : 'bg-gray-50 border-gray-100'}`}>
                                <button className={`text-sm font-bold hover:underline ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>Ver todos de {cat.title}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
