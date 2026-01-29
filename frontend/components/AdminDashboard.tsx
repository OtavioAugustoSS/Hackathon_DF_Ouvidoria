import React, { useState } from 'react';
import { User, userStore, Manifestation } from '../services/userStore';
import { ToastType } from './Toast';

interface AdminDashboardProps {
    onBack: () => void;
    authenticatedUser: User;
    showToast: (message: string, type: ToastType) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, authenticatedUser, showToast }) => {
    const [activeTab, setActiveTab] = useState<'manifestations' | 'attendants' | 'configs'>('manifestations');
    const [selectedManifestation, setSelectedManifestation] = useState<Manifestation | null>(null);

    // Attendant Management State
    const [attendantName, setAttendantName] = useState('');
    const [attendantUser, setAttendantUser] = useState('');
    const [attendantPass, setAttendantPass] = useState('');

    const [responseText, setResponseText] = useState('');
    const [isResponding, setIsResponding] = useState(false);

    const manifestations = userStore.getManifestations();
    const attendants = userStore.getUsers().filter(u => u.role === 'attendant');

    const handleCreateAttendant = (e: React.FormEvent) => {
        e.preventDefault();
        if (!attendantName || !attendantUser || !attendantPass) {
            showToast('Preencha todos os campos do atendente.', 'warning');
            return;
        }

        const success = userStore.addUser({
            username: attendantUser,
            cpf: '000.000.000-01', // Placeholder for attendants
            password: attendantPass,
            name: attendantName,
            role: 'attendant'
        });

        if (success) {
            showToast(`Atendente ${attendantName} criado com sucesso!`, 'success');
            setAttendantName('');
            setAttendantUser('');
            setAttendantPass('');
        }
    };

    const handleDeleteAttendant = (username: string) => {
        const success = userStore.removeUser(username);
        if (success) {
            showToast(`Atendente @${username} removido com sucesso.`, 'success');
            // Force re-render as we are using an in-memory store that we mutate
            setActiveTab('manifestations');
            setTimeout(() => setActiveTab('attendants'), 0);
        }
    };

    const handleUpdateStatus = (status: string) => {
        if (!selectedManifestation) return;
        const success = userStore.updateManifestation(selectedManifestation.protocol, { status });
        if (success) {
            showToast(`Status atualizado para: ${status}`, 'success');
            setSelectedManifestation({ ...selectedManifestation, status });
        }
    };

    const handleSendResponse = () => {
        if (!selectedManifestation || !responseText.trim()) {
            showToast('Por favor, digite uma resposta.', 'warning');
            return;
        }

        const success = userStore.updateManifestation(selectedManifestation.protocol, {
            response: responseText.trim(),
            responseTime: new Date().toLocaleString('pt-BR'),
            responderName: authenticatedUser.name || authenticatedUser.username,
            status: 'CONCLUÍDO'
        });

        if (success) {
            showToast('Resposta enviada com sucesso!', 'success');
            setSelectedManifestation({
                ...selectedManifestation,
                response: responseText.trim(),
                status: 'CONCLUÍDO'
            });
            setResponseText('');
            setIsResponding(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col pt-8">
                <div className="px-6 mb-10 flex items-center gap-3">
                    <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[24px]">shield_person</span>
                    </div>
                    <h2 className="font-black text-lg text-gray-900 tracking-tight">Gestão Participa</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('manifestations')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'manifestations' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                    >
                        <span className="material-symbols-outlined">description</span>
                        Manifestações
                    </button>
                    {authenticatedUser.role === 'admin' && (
                        <button
                            onClick={() => setActiveTab('attendants')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'attendants' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                        >
                            <span className="material-symbols-outlined">badge</span>
                            Atendentes
                        </button>
                    )}
                    <button
                        onClick={() => setActiveTab('configs')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'configs' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        Configurações
                    </button>
                </nav>

                <div className="p-6 border-t border-gray-100">
                    <button
                        onClick={onBack}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all font-bold text-sm"
                    >
                        <span className="material-symbols-outlined">output</span>
                        Voltar ao Site
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">
                            {activeTab === 'manifestations' && 'Todas as Manifestações'}
                            {activeTab === 'attendants' && 'Gestão de Atendentes'}
                            {activeTab === 'configs' && 'Configurações do Sistema'}
                        </h1>
                        <p className="text-gray-500 font-medium">Bem-vindo, {authenticatedUser.name}</p>
                    </div>
                </header>

                {activeTab === 'manifestations' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Protocolo</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Assunto</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Local</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Mídia</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Data</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {manifestations.length > 0 ? manifestations.map((m, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs font-bold text-gray-600">
                                            <div className="flex flex-col">
                                                <span>{m.protocol}</span>
                                                <span className="text-[10px] text-primary">{m.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{m.subject}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500 font-medium max-w-[150px] truncate">{m.local || 'Não informado'}</td>
                                        <td className="px-6 py-4 text-center">
                                            {m.attachment ? (
                                                <div className="flex items-center justify-center gap-1 text-primary">
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        {m.attachment.type.startsWith('image/') ? 'image' :
                                                            m.attachment.type.startsWith('video/') ? 'movie' :
                                                                m.attachment.type.startsWith('audio/') ? 'mic' : 'attach_file'}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase">SIM</span>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-gray-300 font-bold uppercase">Não</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{m.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedManifestation(m)}
                                                className="px-4 py-2 bg-gray-50 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-black transition-all"
                                            >
                                                EXAMINAR
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium font-bold text-sm uppercase tracking-widest">
                                            Nenhuma manifestação registrada no sistema.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'attendants' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <form onSubmit={handleCreateAttendant} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Novo Atendente</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Nome Completo</label>
                                        <input
                                            type="text"
                                            value={attendantName}
                                            onChange={(e) => setAttendantName(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm"
                                            placeholder="Ex: Pedro Santos"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Usuário</label>
                                        <input
                                            type="text"
                                            value={attendantUser}
                                            onChange={(e) => setAttendantUser(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm"
                                            placeholder="pedrosantos"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Senha</label>
                                        <input
                                            type="password"
                                            value={attendantPass}
                                            onChange={(e) => setAttendantPass(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all outline-none">
                                        Criar Atendente
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                    <h3 className="font-bold text-gray-900">Lista de Atendentes</h3>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {attendants.length > 0 ? attendants.map((a, idx) => (
                                        <div key={idx} className="px-6 py-4 flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">
                                                    {a.name?.[0] || 'A'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{a.name}</p>
                                                    <p className="text-xs text-gray-400">@{a.username}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteAttendant(a.username)}
                                                className="text-red-500 material-symbols-outlined hover:bg-red-50 p-2 rounded-lg transition-all"
                                                title="Remover Acesso"
                                            >
                                                delete
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="px-6 py-12 text-center text-gray-400 font-medium">
                                            Nenhum atendente cadastrado.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'configs' && (
                    <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-300 text-center">
                        <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">construction</span>
                        <h3 className="text-xl font-bold text-gray-900">Configurações Avançadas</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2 italic">Funcionalidade em desenvolvimento para a etapa final do Hackathon.</p>
                    </div>
                )}
            </main>

            {/* Manifestation Detail View (Admin) */}
            {selectedManifestation && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in">
                        <div className="p-10">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <div className="flex gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {selectedManifestation.type}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedManifestation.status === 'CONCLUÍDO' ? 'bg-green-100 text-green-700' :
                                            selectedManifestation.status === 'RECUSADO' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {selectedManifestation.status}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">{selectedManifestation.subject}</h2>
                                    <p className="text-gray-400 font-mono text-sm">Nº Protocolo: <span className="text-gray-900 font-bold">{selectedManifestation.protocol}</span></p>
                                </div>
                                <button
                                    onClick={() => setSelectedManifestation(null)}
                                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-gray-100">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cidadão</p>
                                    <p className="text-gray-900 font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-gray-300">person</span>
                                        {selectedManifestation.isAnonymous ? 'ANÔNIMO (Identidade Preservada)' : (selectedManifestation.ownerCpf || 'Visitante')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Data do Registro</p>
                                    <p className="text-gray-900 font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-gray-300">calendar_today</span>
                                        {selectedManifestation.date}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Relato da Manifestação</p>
                                    <div className="p-8 bg-gray-50 rounded-3xl text-gray-700 leading-relaxed text-lg whitespace-pre-wrap border border-gray-100">
                                        {selectedManifestation.content}
                                    </div>
                                </div>

                                {selectedManifestation.local && (
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Local do Fato</p>
                                        <p className="text-gray-900 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 font-bold text-sm">
                                            <span className="material-symbols-outlined text-primary">location_on</span>
                                            {selectedManifestation.local}
                                        </p>
                                    </div>
                                )}

                                {selectedManifestation.attachment && (
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 italic">Arquivo Anexo</p>
                                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="size-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-[32px]">
                                                        {selectedManifestation.attachment.type.startsWith('video/') ? 'movie' :
                                                            selectedManifestation.attachment.type.startsWith('audio/') ? 'mic' :
                                                                selectedManifestation.attachment.type.startsWith('image/') ? 'image' : 'attach_file'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-gray-900 font-black text-sm">{selectedManifestation.attachment.name}</p>
                                                    <p className="text-gray-400 text-xs uppercase font-bold">{selectedManifestation.attachment.type}</p>
                                                </div>
                                            </div>
                                            <a
                                                href={selectedManifestation.attachment.url}
                                                download={selectedManifestation.attachment.name}
                                                className="px-6 py-3 bg-primary text-white font-black rounded-xl text-xs flex items-center gap-2 hover:bg-primary-dark transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">download</span>
                                                BAIXAR ARQUIVO
                                            </a>
                                        </div>
                                        {selectedManifestation.attachment.type.startsWith('image/') && (
                                            <div className="mt-4 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                                                <img src={selectedManifestation.attachment.url} alt="Anexo" className="w-full h-auto" />
                                            </div>
                                        )}
                                        {selectedManifestation.attachment.type.startsWith('video/') && (
                                            <div className="mt-4 rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-black aspect-video">
                                                <video src={selectedManifestation.attachment.url} controls className="w-full h-full" />
                                            </div>
                                        )}
                                        {selectedManifestation.attachment.type.startsWith('audio/') && (
                                            <div className="mt-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                                {selectedManifestation.attachment.type.includes('webm') ? (
                                                    <video src={selectedManifestation.attachment.url} controls className="w-full h-12" />
                                                ) : (
                                                    <audio src={selectedManifestation.attachment.url} controls className="w-full" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedManifestation.response && (
                                    <div className="animate-fade-in">
                                        <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-4">Resposta da Ouvidoria</p>
                                        <div className="p-8 bg-green-50 rounded-3xl text-gray-700 leading-relaxed border border-green-100 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <span className="material-symbols-outlined text-[64px]">verified</span>
                                            </div>
                                            <p className="text-lg font-medium whitespace-pre-wrap mb-4">{selectedManifestation.response}</p>
                                            <div className="flex justify-between items-center pt-4 border-t border-green-100">
                                                <p className="text-xs font-bold text-green-700">Respondido por: {selectedManifestation.responderName}</p>
                                                <p className="text-[10px] text-green-600/60 font-mono">{selectedManifestation.responseTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isResponding && (
                                    <div className="space-y-4 animate-fade-in pt-6 border-t border-gray-100">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Escrever Resposta Final</p>
                                        <textarea
                                            value={responseText}
                                            onChange={(e) => setResponseText(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-3xl p-6 outline-none focus:border-primary transition-all text-gray-700 min-h-[150px]"
                                            placeholder="Digite aqui a resposta que o cidadão irá visualizar..."
                                        />
                                        <div className="flex gap-4">
                                            <button
                                                onClick={handleSendResponse}
                                                className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                                            >
                                                <span className="material-symbols-outlined">send</span>
                                                Publicar Resposta e Concluir
                                            </button>
                                            <button
                                                onClick={() => setIsResponding(false)}
                                                className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!isResponding && (
                                <div className="mt-12 flex flex-col gap-6">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleUpdateStatus('EM ANÁLISE')}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${selectedManifestation.status === 'EM ANÁLISE' ? 'bg-yellow-500 text-white border-yellow-600' : 'bg-white text-yellow-600 border-yellow-200 hover:bg-yellow-50'}`}
                                        >
                                            Em Análise
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus('EM ANDAMENTO')}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${selectedManifestation.status === 'EM ANDAMENTO' ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
                                        >
                                            Em Andamento
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus('RECUSADO')}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${selectedManifestation.status === 'RECUSADO' ? 'bg-red-500 text-white border-red-600' : 'bg-white text-red-600 border-red-200 hover:bg-red-50'}`}
                                        >
                                            Recusado
                                        </button>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setIsResponding(true)}
                                            className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">edit_note</span>
                                            Responder Cidadão
                                        </button>
                                        <button
                                            onClick={() => { setSelectedManifestation(null); setIsResponding(false); }}
                                            className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
