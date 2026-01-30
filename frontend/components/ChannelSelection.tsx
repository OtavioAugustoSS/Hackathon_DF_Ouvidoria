import React from 'react';
import { Channel } from '../types';

interface ChannelSelectionProps {
    onBack: () => void;
    onSelectChannel: (channel: Channel) => void;
    highContrast?: boolean;
}

const ChannelSelection: React.FC<ChannelSelectionProps> = ({ onBack, onSelectChannel, highContrast = false }) => {
    return (
        <main className={`flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up ${highContrast ? 'bg-black' : ''}`}>
            <div className="w-full max-w-[960px] flex flex-col gap-6">

                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-2">
                        <li>
                            <button onClick={onBack} className={`${highContrast ? 'text-yellow-400 hover:text-yellow-200' : 'text-[#5e6d8d] dark:text-gray-400 hover:text-primary'} text-sm font-medium transition-colors flex items-center gap-1`}>
                                <span className="material-symbols-outlined text-[18px]">home</span>
                                Início
                            </button>
                        </li>
                        <li className={`${highContrast ? 'text-yellow-400' : 'text-[#5e6d8d] dark:text-gray-500'}`}>
                            <span className="material-symbols-outlined text-sm pt-1">chevron_right</span>
                        </li>
                        <li>
                            <span aria-current="page" className={`${highContrast ? 'text-yellow-400' : 'text-[#101318] dark:text-white'} text-sm font-medium`}>Registrar Manifestação</span>
                        </li>
                    </ol>
                </nav>

                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-4 pt-4 pb-8">
                    <h1 className={`${highContrast ? 'text-yellow-400' : 'text-[#101318] dark:text-white'} text-3xl md:text-4xl font-bold leading-tight tracking-tight`}>
                        Como deseja relatar?
                    </h1>
                    <p className={`${highContrast ? 'text-yellow-400' : 'text-[#5e6d8d] dark:text-gray-300'} text-lg max-w-2xl font-normal leading-relaxed`}>
                        Escolha a forma mais conveniente para enviar sua manifestação. Todos os canais são seguros e seus dados são protegidos.
                    </p>
                </div>

                {/* Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Texto */}
                    <button onClick={() => onSelectChannel('TEXT')} className={`group relative flex flex-col items-center p-8 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center w-full h-full ${highContrast ? 'bg-black border-yellow-400 hover:bg-gray-900' : 'bg-white dark:bg-[#1a202c] border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                        <div className={`mb-6 p-4 rounded-full transition-colors duration-300 ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white'}`}>
                            <span className="material-symbols-outlined text-[40px]">description</span>
                        </div>
                        <div className="min-h-[3.5rem] flex items-center justify-center mb-2">
                            <h3 className={`text-xl font-bold transition-colors ${highContrast ? 'text-yellow-400 group-hover:text-yellow-200' : 'text-[#101318] dark:text-white group-hover:text-primary dark:group-hover:text-blue-400'}`}>Texto</h3>
                        </div>
                        <p className={`text-sm text-center leading-relaxed ${highContrast ? 'text-yellow-400' : 'text-[#5e6d8d] dark:text-gray-400'}`}>
                            Descreva a situação detalhadamente por escrito através de formulário.
                        </p>
                        <div className={`absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none transition-colors ${highContrast ? 'group-hover:border-yellow-400' : 'group-hover:border-primary/10'}`}></div>
                    </button>

                    {/* Card 2: Áudio */}
                    <button onClick={() => onSelectChannel('AUDIO')} className={`group relative flex flex-col items-center p-8 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center w-full h-full ${highContrast ? 'bg-black border-yellow-400 hover:bg-gray-900' : 'bg-white dark:bg-[#1a202c] border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                        <div className={`mb-6 p-4 rounded-full transition-colors duration-300 ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white'}`}>
                            <span className="material-symbols-outlined text-[40px]">mic</span>
                        </div>
                        <div className="min-h-[3.5rem] flex items-center justify-center mb-2">
                            <h3 className={`text-xl font-bold transition-colors ${highContrast ? 'text-yellow-400 group-hover:text-yellow-200' : 'text-[#101318] dark:text-white group-hover:text-primary dark:group-hover:text-blue-400'}`}>Relato em Áudio</h3>
                        </div>
                        <p className={`text-sm text-center leading-relaxed ${highContrast ? 'text-yellow-400' : 'text-[#5e6d8d] dark:text-gray-400'}`}>
                            Grave um áudio ou envie um arquivo de voz existente.
                        </p>
                        <div className={`absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none transition-colors ${highContrast ? 'group-hover:border-yellow-400' : 'group-hover:border-primary/10'}`}></div>
                    </button>

                    {/* Card 3: Vídeo */}
                    <button onClick={() => onSelectChannel('VIDEO')} className={`group relative flex flex-col items-center p-8 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center w-full h-full ${highContrast ? 'bg-black border-yellow-400 hover:bg-gray-900' : 'bg-white dark:bg-[#1a202c] border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                        <div className={`mb-6 p-4 rounded-full transition-colors duration-300 ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white'}`}>
                            <span className="material-symbols-outlined text-[40px]">videocam</span>
                        </div>
                        <div className="min-h-[3.5rem] flex items-center justify-center mb-2">
                            <h3 className={`text-xl font-bold transition-colors ${highContrast ? 'text-yellow-400 group-hover:text-yellow-200' : 'text-[#101318] dark:text-white group-hover:text-primary dark:group-hover:text-blue-400'}`}>Relato em Vídeo</h3>
                        </div>
                        <p className={`text-sm text-center leading-relaxed ${highContrast ? 'text-yellow-400' : 'text-[#5e6d8d] dark:text-gray-400'}`}>
                            Grave um vídeo ou envie um arquivo de vídeo existente.
                        </p>
                        <div className={`absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none transition-colors ${highContrast ? 'group-hover:border-yellow-400' : 'group-hover:border-primary/10'}`}></div>
                    </button>

                    {/* Card 4: Upload */}
                    <button onClick={() => onSelectChannel('UPLOAD')} className={`group relative flex flex-col items-center p-8 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center w-full h-full ${highContrast ? 'bg-black border-yellow-400 hover:bg-gray-900' : 'bg-white dark:bg-[#1a202c] border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                        <div className={`mb-6 p-4 rounded-full transition-colors duration-300 ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white'}`}>
                            <span className="material-symbols-outlined text-[40px]">add_photo_alternate</span>
                        </div>
                        <div className="min-h-[3.5rem] flex items-center justify-center mb-2">
                            <h3 className={`text-xl font-bold transition-colors ${highContrast ? 'text-yellow-400 group-hover:text-yellow-200' : 'text-[#101318] dark:text-white group-hover:text-primary dark:group-hover:text-blue-400'}`}>Upload Imagem</h3>
                        </div>
                        <p className={`text-sm text-center leading-relaxed ${highContrast ? 'text-yellow-400' : 'text-[#5e6d8d] dark:text-gray-400'}`}>
                            Envie fotos ou documentos que você já possui na galeria.
                        </p>
                        <div className={`absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none transition-colors ${highContrast ? 'group-hover:border-yellow-400' : 'group-hover:border-primary/10'}`}></div>
                    </button>
                </div>

                {/* Additional Help/Info Box */}
                <div className={`mt-8 p-6 rounded-xl border flex items-start gap-4 ${highContrast ? 'bg-black border-yellow-400' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30'}`}>
                    <span className={`material-symbols-outlined mt-1 ${highContrast ? 'text-yellow-400' : 'text-primary dark:text-blue-400'}`}>info</span>
                    <div>
                        <h4 className={`text-base font-bold mb-1 ${highContrast ? 'text-yellow-400' : 'text-[#101318] dark:text-white'}`}>Precisa de acessibilidade?</h4>
                        <p className={`text-sm ${highContrast ? 'text-yellow-400' : 'text-[#5e6d8d] dark:text-gray-300'}`}>
                            Você pode alternar para o modo de alto contraste ou aumentar o tamanho da fonte nas configurações do seu navegador ou no menu de acessibilidade no rodapé. Se estiver em perigo imediato, ligue para o 190.
                        </p>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="flex justify-start pt-8">
                    <button onClick={onBack} className={`flex items-center gap-2 font-medium text-sm px-4 py-2 rounded-lg transition-colors ${highContrast ? 'text-yellow-400 hover:text-white hover:bg-gray-900' : 'text-[#5e6d8d] dark:text-gray-400 hover:text-[#101318] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Voltar
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ChannelSelection;
