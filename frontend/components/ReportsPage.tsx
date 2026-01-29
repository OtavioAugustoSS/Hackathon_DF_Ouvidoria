import React, { useState } from 'react';
import { User, userStore, Manifestation } from '../services/userStore';

interface ReportsPageProps {
    onBack: () => void;
    authenticatedUser: User | null;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onBack, authenticatedUser }) => {
    const [selectedManifestation, setSelectedManifestation] = useState<Manifestation | null>(null);

    const reports = authenticatedUser
        ? userStore.getManifestationsByUser(authenticatedUser.cpf)
        : [];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <section className="bg-white border-b border-gray-200 pt-12 pb-16">
                <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-primary font-bold mb-6 hover:underline"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Minhas Manifestações</h1>
                    <p className="text-gray-600 text-lg max-w-3xl">
                        Acompanhe o andamento das solicitações que você registrou.
                    </p>
                </div>
            </section>

            <div className="layout-container max-w-4xl mx-auto px-4 md:px-8 mt-12">
                {reports.length > 0 ? (
                    <div className="space-y-4">
                        {reports.map((report, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-primary transition-all"
                                onClick={() => setSelectedManifestation(report)}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="size-16 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center font-black text-center px-1">
                                        <span className="text-[10px] uppercase opacity-60">Tipo</span>
                                        <span className="text-[10px] break-words">{report.type}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{report.subject}</h3>
                                        <div className="flex gap-4 mt-1">
                                            <span className="text-sm text-gray-500">{report.date}</span>
                                            <span className="text-sm text-gray-500 font-mono">• {report.protocol}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                                        {report.status}
                                    </span>
                                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                        <h3 className="text-xl font-bold text-gray-900">Nenhuma manifestação encontrada</h3>
                        <p className="text-gray-500 mt-2">Você ainda não registrou nenhuma manifestação identificada.</p>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedManifestation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                        {selectedManifestation.status}
                                    </span>
                                    <h2 className="text-3xl font-black text-gray-900">{selectedManifestation.subject}</h2>
                                    <p className="text-gray-500 font-mono mt-1">{selectedManifestation.protocol}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedManifestation(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-1">Tipo</p>
                                        <p className="font-bold text-gray-900">{selectedManifestation.type}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl">
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-1">Data</p>
                                        <p className="font-bold text-gray-900">{selectedManifestation.date}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs uppercase font-bold text-gray-400 mb-2">Relato</p>
                                    <div className="p-6 bg-gray-50 rounded-2xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {selectedManifestation.content}
                                    </div>
                                </div>

                                {selectedManifestation.local && (
                                    <div>
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-2">Local do Fato</p>
                                        <p className="text-gray-900">{selectedManifestation.local}</p>
                                    </div>
                                )}

                                {selectedManifestation.attachment && (
                                    <div>
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-3">Arquivo Anexo</p>
                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined">
                                                        {selectedManifestation.attachment.type.startsWith('video/') ? 'movie' :
                                                            selectedManifestation.attachment.type.startsWith('audio/') ? 'mic' :
                                                                selectedManifestation.attachment.type.startsWith('image/') ? 'image' : 'attach_file'}
                                                    </span>
                                                </div>
                                                <p className="text-gray-900 font-bold text-sm truncate max-w-[200px]">{selectedManifestation.attachment.name}</p>
                                            </div>
                                            <a
                                                href={selectedManifestation.attachment.url}
                                                download={selectedManifestation.attachment.name}
                                                className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-sm">download</span>
                                                BAIXAR
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {selectedManifestation.response && (
                                    <div className="animate-fade-in">
                                        <p className="text-xs uppercase font-bold text-green-600 mb-2">Resposta da Ouvidoria</p>
                                        <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedManifestation.response}</p>
                                            <div className="mt-4 pt-4 border-t border-green-100 flex justify-between items-center text-[10px] text-green-600 font-bold uppercase">
                                                <span>Respondido em: {selectedManifestation.responseTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setSelectedManifestation(null)}
                                className="w-full mt-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                            >
                                Fechar Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsPage;

