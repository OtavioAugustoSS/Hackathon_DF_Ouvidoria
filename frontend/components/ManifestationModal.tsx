import React, { useState, ChangeEvent, FormEvent } from 'react';
import { api } from '../services/api';
import { TipoManifestacao, ManifestacaoResponse } from '../types';

interface ManifestationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialType?: TipoManifestacao;
}

const ManifestationModal: React.FC<ManifestationModalProps> = ({ isOpen, onClose, initialType }) => {
    const [tipo, setTipo] = useState<string>(initialType || TipoManifestacao.DENUNCIA);
    const [texto, setTexto] = useState<string>('');
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [anonimo, setAnonimo] = useState<boolean>(false);
    
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState<ManifestacaoResponse | null>(null);
    const [error, setError] = useState<string>('');

    if (!isOpen) return null;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setArquivo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('tipo_manifestacao', tipo);
        formData.append('conteudo_texto', texto);
        formData.append('is_anonimo', String(anonimo));
        if (arquivo) {
            formData.append('arquivo', arquivo);
        }

        try {
            const response = await api.post<ManifestacaoResponse>('/nova-manifestacao', formData);
            setSuccessData(response.data);
        } catch (err) {
            setError('Erro ao enviar manifestação. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSuccessData(null);
        setTexto('');
        setArquivo(null);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
                
                {/* Header */}
                <div className="bg-primary px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined">edit_document</span>
                        Nova Manifestação
                    </h3>
                    <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {successData ? (
                    <div className="p-8 text-center">
                        <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl">check_circle</span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">Manifestação Registrada!</h4>
                        <p className="text-gray-600 mb-6">
                            Seu protocolo é: <br/>
                            <span className="text-3xl font-mono font-bold text-primary block mt-2">{successData.protocolo}</span>
                        </p>
                        <button onClick={handleClose} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors">
                            Fechar
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        
                        {/* Type Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Manifestação</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {Object.values(TipoManifestacao).map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setTipo(t)}
                                        className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                                            tipo === t 
                                            ? 'bg-primary/10 border-primary text-primary' 
                                            : 'border-gray-200 text-gray-600 hover:border-primary/50'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Content */}
                        <div>
                            <label htmlFor="conteudo" className="block text-sm font-bold text-gray-700 mb-2">
                                Relato da Manifestação
                            </label>
                            <textarea
                                id="conteudo"
                                rows={5}
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                required
                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-gray-700"
                                placeholder="Descreva com detalhes o ocorrido, informando local, data e envolvidos..."
                            ></textarea>
                        </div>

                        {/* File Upload & Anonymous Toggle */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Anexar Mídia (Opcional)</label>
                                <input 
                                    type="file" 
                                    onChange={handleFileChange}
                                    accept="image/*,video/*,audio/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                            </div>
                            
                            <div className="flex items-center">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div className="relative inline-flex items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={anonimo} 
                                            onChange={(e) => setAnonimo(e.target.checked)} 
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Desejo anonimato</span>
                                </label>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-end pt-2">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="flex items-center justify-center w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processando com IZA AI...
                                    </>
                                ) : (
                                    <>
                                        Enviar Manifestação
                                        <span className="material-symbols-outlined ml-2">send</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ManifestationModal;
