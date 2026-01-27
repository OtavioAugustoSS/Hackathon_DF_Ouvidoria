import React from 'react';
import { Channel } from '../types';

interface ChannelSelectionProps {
    onBack: () => void;
    onSelectChannel: (channel: Channel) => void;
}

const ChannelSelection: React.FC<ChannelSelectionProps> = ({ onBack, onSelectChannel }) => {
    return (
        <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
            <div className="w-full max-w-[960px] flex flex-col gap-6">
                
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-2">
                        <li>
                            <button onClick={onBack} className="text-[#5e6d8d] dark:text-gray-400 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[18px]">home</span>
                                Início
                            </button>
                        </li>
                        <li className="text-[#5e6d8d] dark:text-gray-500">
                            <span className="material-symbols-outlined text-sm pt-1">chevron_right</span>
                        </li>
                        <li>
                            <span aria-current="page" className="text-[#101318] dark:text-white text-sm font-medium">Registrar Manifestação</span>
                        </li>
                    </ol>
                </nav>

                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-4 pt-4 pb-8">
                    <h1 className="text-[#101318] dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                        Como deseja relatar?
                    </h1>
                    <p className="text-[#5e6d8d] dark:text-gray-300 text-lg max-w-2xl font-normal leading-relaxed">
                        Escolha a forma mais conveniente para enviar sua manifestação. Todos os canais são seguros e seus dados são protegidos.
                    </p>
                </div>

                {/* Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Texto */}
                    <button onClick={() => onSelectChannel('TEXT')} className="group relative flex flex-col items-center p-8 bg-white dark:bg-[#1a202c] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left w-full h-full">
                        <div className="mb-6 p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[40px]">description</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#101318] dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Texto</h3>
                        <p className="text-sm text-[#5e6d8d] dark:text-gray-400 text-center leading-relaxed">
                            Descreva a situação detalhadamente por escrito através de formulário.
                        </p>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl pointer-events-none transition-colors"></div>
                    </button>

                    {/* Card 2: Áudio */}
                    <button onClick={() => onSelectChannel('AUDIO')} className="group relative flex flex-col items-center p-8 bg-white dark:bg-[#1a202c] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left w-full h-full">
                        <div className="mb-6 p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[40px]">mic</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#101318] dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Gravar Áudio</h3>
                        <p className="text-sm text-[#5e6d8d] dark:text-gray-400 text-center leading-relaxed">
                            Grave um relato de voz rápido explicando o ocorrido.
                        </p>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl pointer-events-none transition-colors"></div>
                    </button>

                    {/* Card 3: Vídeo */}
                    <button onClick={() => onSelectChannel('VIDEO')} className="group relative flex flex-col items-center p-8 bg-white dark:bg-[#1a202c] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left w-full h-full">
                        <div className="mb-6 p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[40px]">videocam</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#101318] dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Gravar Vídeo</h3>
                        <p className="text-sm text-[#5e6d8d] dark:text-gray-400 text-center leading-relaxed">
                            Mostre e explique a situação em tempo real usando sua câmera.
                        </p>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl pointer-events-none transition-colors"></div>
                    </button>

                    {/* Card 4: Upload */}
                    <button onClick={() => onSelectChannel('UPLOAD')} className="group relative flex flex-col items-center p-8 bg-white dark:bg-[#1a202c] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left w-full h-full">
                        <div className="mb-6 p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-[40px]">add_photo_alternate</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#101318] dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Upload Imagem</h3>
                        <p className="text-sm text-[#5e6d8d] dark:text-gray-400 text-center leading-relaxed">
                            Envie fotos ou documentos que você já possui na galeria.
                        </p>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl pointer-events-none transition-colors"></div>
                    </button>
                </div>

                {/* Additional Help/Info Box */}
                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary dark:text-blue-400 mt-1">info</span>
                    <div>
                        <h4 className="text-base font-bold text-[#101318] dark:text-white mb-1">Precisa de acessibilidade?</h4>
                        <p className="text-sm text-[#5e6d8d] dark:text-gray-300">
                            Você pode alternar para o modo de alto contraste ou aumentar o tamanho da fonte nas configurações do seu navegador ou no menu de acessibilidade no rodapé. Se estiver em perigo imediato, ligue para o 190.
                        </p>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="flex justify-start pt-8">
                    <button onClick={onBack} className="flex items-center gap-2 text-[#5e6d8d] dark:text-gray-400 hover:text-[#101318] dark:hover:text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Voltar
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ChannelSelection;
