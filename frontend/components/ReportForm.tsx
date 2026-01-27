import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { api } from '../services/api';
import { TipoManifestacao, Channel } from '../types';

interface ReportFormProps {
    onBack: () => void;
    initialType?: TipoManifestacao;
    initialChannel?: Channel;
}

const ReportForm: React.FC<ReportFormProps> = ({ onBack, initialType, initialChannel }) => {
    // Form State
    const [anonymous, setAnonymous] = useState(false);
    const [formData, setFormData] = useState({
        tipo_manifestacao: initialType || TipoManifestacao.RECLAMACAO,
        assunto: '',
        conteudo_texto: '',
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        local_ocorrencia: '',
        data_ocorrencia: '',
    });

    // File/Media State
    const [file, setFile] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // Submission State
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState<any | null>(null);
    const [error, setError] = useState('');

    // --- Handlers ---

    // Video Preview State
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    // Cleanup video preview on unmount or file change
    React.useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [videoPreview]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // Create preview if video
            if (selectedFile.type.startsWith('video/')) {
                const url = URL.createObjectURL(selectedFile);
                setVideoPreview(url);
            } else {
                setVideoPreview(null);
            }
        }
    };

    // Audio Recording Logic
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioFile = new File([audioBlob], "gravacao_audio.webm", { type: 'audio/webm' });
                setFile(audioFile);
                setVideoPreview(null); // Clear video preview if audio recorded

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Não foi possível acessar o microfone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // Submit Logic
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        // Mandatory fields
        data.append('tipo_manifestacao', formData.tipo_manifestacao);
        data.append('assunto', formData.assunto || 'Geral');
        data.append('conteudo_texto', formData.conteudo_texto);
        data.append('is_anonimo', String(anonymous));

        // Conditional fields
        if (!anonymous) {
            if (formData.nome) data.append('nome', formData.nome);
            if (formData.email) data.append('email', formData.email);
            if (formData.telefone) data.append('telefone', formData.telefone);
            if (formData.cpf) data.append('cpf', formData.cpf);
        }

        // Optional fields
        if (formData.local_ocorrencia) data.append('local_ocorrencia', formData.local_ocorrencia);
        if (formData.data_ocorrencia) data.append('data_ocorrencia', formData.data_ocorrencia);

        // File
        if (file) {
            data.append('arquivo', file);
        }

        try {
            const response = await api.post('/nova-manifestacao', data);
            setSuccessData(response.data);
            window.scrollTo(0, 0);
        } catch (err) {
            setError('Ocorreu um erro ao enviar sua manifestação. Verifique os campos obrigatórios.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // --- Render Success ---
    if (successData) {
        return (
            <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 animate-fade-in-up">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center border border-gray-100">
                    <div className="size-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-5xl">check_circle</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Manifestação Enviada!</h2>
                    <p className="text-gray-500 mb-8">
                        Sua manifestação foi registrada com sucesso. Utilize o número de protocolo abaixo para acompanhar o andamento.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                        <span className="text-sm text-gray-500 uppercase font-bold tracking-wider">Número do Protocolo</span>
                        <div className="text-4xl font-mono font-bold text-primary mt-2 select-all">
                            {successData.protocolo}
                        </div>
                    </div>

                    <button onClick={onBack} className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary/20">
                        Voltar ao Início
                    </button>
                </div>
            </main>
        );
    }

    // --- Render Form ---
    return (
        <main className="flex-grow bg-[#f8f9fa] py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
            <div className="max-w-[1000px] mx-auto">

                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                    <button onClick={onBack} className="hover:text-primary transition-colors">Início</button>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span>Ouvidoria</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span className="font-medium text-gray-900">Novo Relato</span>
                </nav>

                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Nova Manifestação</h1>
                    <p className="text-gray-600">Preencha os dados abaixo para registrar sua reclamação, elogio ou sugestão ao Governo do Distrito Federal.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. Anonymous Toggle */}
                    <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 text-primary rounded-lg">
                                <span className="material-symbols-outlined text-2xl">visibility_off</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Enviar Anonimamente</h3>
                                <p className="text-sm text-gray-500 mt-1 max-w-md">
                                    Se ativado, seus dados pessoais não serão enviados para o departamento responsável.
                                    <span className="block mt-1 text-xs text-orange-600">Nota: Relatos anônimos não recebem atualizações por e-mail.</span>
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="sr-only peer" />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    {/* 2. Personal Information (Conditional) */}
                    {!anonymous && (
                        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                <span className="material-symbols-outlined text-primary">person</span>
                                <h3 className="text-lg font-bold text-gray-900">Informações Pessoais</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1 md:col-span-2">
                                    <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo <span className="text-red-500">*</span></label>
                                    <input required id="nome" type="text" name="nome" value={formData.nome} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" placeholder="Ex: Maria Silva" />
                                </div>
                                <div>
                                    <label htmlFor="cpf" className="block text-sm font-semibold text-gray-700 mb-2">CPF</label>
                                    <input id="cpf" type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" placeholder="000.000.000-00" />
                                </div>
                                <div>
                                    <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                                    <input id="telefone" type="tel" name="telefone" value={formData.telefone} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" placeholder="(61) 90000-0000" />
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">E-mail <span className="text-red-500">*</span></label>
                                    <input required id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" placeholder="nome@email.com" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Report Details */}
                    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                            <span className="material-symbols-outlined text-primary">description</span>
                            <h3 className="text-lg font-bold text-gray-900">Detalhes da Manifestação</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="tipo_manifestacao" className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Manifestação <span className="text-red-500">*</span></label>
                                <select id="tipo_manifestacao" name="tipo_manifestacao" value={formData.tipo_manifestacao} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                                    {Object.values(TipoManifestacao).map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="assunto" className="block text-sm font-semibold text-gray-700 mb-2">Assunto / Categoria <span className="text-red-500">*</span></label>
                                <select id="assunto" name="assunto" required value={formData.assunto} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                                    <option value="">Selecione...</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Educação">Educação</option>
                                    <option value="Transporte">Transporte / Trânsito</option>
                                    <option value="Segurança">Segurança Pública</option>
                                    <option value="Infraestrutura">Infraestrutura Urbana</option>
                                    <option value="Limpeza">Limpeza Urbana</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="conteudo_texto" className="block text-sm font-semibold text-gray-700 mb-2">Descrição do Ocorrido <span className="text-red-500">*</span></label>
                            <textarea
                                id="conteudo_texto"
                                name="conteudo_texto"
                                required
                                value={formData.conteudo_texto}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                placeholder="Descreva detalhadamente o que aconteceu, quem estava envolvido e como podemos ajudar..."
                            ></textarea>
                            <p className="text-right text-xs text-gray-400 mt-1">Mínimo de detalhes ajuda na investigação.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label htmlFor="local_ocorrencia" className="block text-sm font-semibold text-gray-700 mb-2">Local do Fato</label>
                                <input id="local_ocorrencia" type="text" name="local_ocorrencia" value={formData.local_ocorrencia} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" placeholder="Rua, Bairro ou Ponto de Referência" />
                            </div>
                            <div>
                                <label htmlFor="data_ocorrencia" className="block text-sm font-semibold text-gray-700 mb-2">Data do Ocorrido</label>
                                <input id="data_ocorrencia" type="date" name="data_ocorrencia" value={formData.data_ocorrencia} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary" />
                            </div>
                        </div>
                    </div>

                    {/* 4. Attachments (Multichannel) */}
                    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                            <span className="material-symbols-outlined text-primary">attach_file</span>
                            <h3 className="text-lg font-bold text-gray-900">Evidências e Anexos</h3>
                        </div>

                        {file ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">description</span>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Arquivo selecionado</p>
                                            <p className="text-xs text-gray-600">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => { setFile(null); setVideoPreview(null); }} aria-label="Remover arquivo" className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>

                                {videoPreview && (
                                    <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-200">
                                        <video src={videoPreview} controls className="w-full max-h-[400px] object-contain bg-black" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Audio Option */}
                                <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${isRecording ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}`}>
                                    {isRecording ? (
                                        <>
                                            <span className="animate-pulse size-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                                                <span className="material-symbols-outlined text-2xl">stop</span>
                                            </span>
                                            <button type="button" onClick={stopRecording} className="text-sm font-bold text-red-600">Parar Gravação</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="size-12 bg-blue-50 text-primary rounded-full flex items-center justify-center">
                                                <span className="material-symbols-outlined text-2xl">mic</span>
                                            </div>
                                            <button type="button" onClick={startRecording} className="text-sm font-medium text-gray-700">Gravar Áudio</button>
                                        </>
                                    )}
                                </div>

                                {/* Video Option (Native Camera) */}
                                <label className="border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all">
                                    <input type="file" accept="video/*" capture="environment" onChange={handleFileChange} className="hidden" />
                                    <div className="size-12 bg-blue-50 text-primary rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">videocam</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Gravar Vídeo</span>
                                </label>

                                {/* Image/File Option */}
                                <label className="border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all">
                                    <input type="file" accept="image/*,.pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                                    <div className="size-12 bg-blue-50 text-primary rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Foto ou Arquivo</span>
                                </label>
                            </div>
                        )}
                        <p className="text-xs text-gray-400 mt-3 text-center">Formatos aceitos: JPG, PNG, PDF, MP4, MP3, WebM. Max: 20MB.</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center gap-2">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    <div className="flex items-center gap-4 pt-4">
                        <button type="button" onClick={onBack} className="flex-1 py-4 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="flex-[2] py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </>
                            ) : (
                                "Enviar Manifestação"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
};

export default ReportForm;
