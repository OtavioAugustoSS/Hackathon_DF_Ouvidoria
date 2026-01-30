import React, { useState } from 'react';
import { User, userStore, Manifestation } from '../services/userStore';
import { settingsStore, AppSettings } from '../services/settingsStore';
import { ToastType } from './Toast';

interface AdminDashboardProps {
    onBack: () => void;
    authenticatedUser: User;
    showToast: (message: string, type: ToastType) => void;
    highContrast?: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, authenticatedUser, showToast, highContrast = false }) => {
    const [activeTab, setActiveTab] = useState<'manifestations' | 'attendants' | 'citizens' | 'configs'>('manifestations');
    const [selectedManifestation, setSelectedManifestation] = useState<Manifestation | null>(null);
    const [selectedCitizen, setSelectedCitizen] = useState<User | null>(null);

    // Attendant Management State
    const [attendantName, setAttendantName] = useState('');
    const [attendantUser, setAttendantUser] = useState('');
    const [attendantPass, setAttendantPass] = useState('');

    const [responseText, setResponseText] = useState('');
    const [isResponding, setIsResponding] = useState(false);

    // Filter and Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterLocation, setFilterLocation] = useState('');

    // Settings State
    const [currentSettings, setCurrentSettings] = useState<AppSettings>(settingsStore.getSettings());

    const manifestations = userStore.getManifestations();
    const attendants = userStore.getUsers().filter(u => u.role === 'attendant');
    const citizens = userStore.getUsers().filter(u => u.role === 'citizen');

    // Statistics
    const stats = {
        total: manifestations.length,
        concluido: manifestations.filter(m => m.status === 'CONCLUÍDO').length,
        emAnalise: manifestations.filter(m => m.status === 'EM ANÁLISE').length,
        emAndamento: manifestations.filter(m => m.status === 'EM ANDAMENTO').length,
        recusado: manifestations.filter(m => m.status === 'RECUSADO').length,
    };

    // Filtered Manifestations
    const filteredManifestations = manifestations.filter(m => {
        const matchesSearch = searchQuery === '' ||
            m.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (m.ownerCpf && m.ownerCpf.includes(searchQuery)) ||
            m.subject.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === '' || m.status === filterStatus;
        const matchesType = filterType === '' || m.type === filterType;
        const matchesLocation = filterLocation === '' || (m.local && m.local.toLowerCase().includes(filterLocation.toLowerCase()));

        return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });

    // Unique locations for filter
    const locations = Array.from(new Set(manifestations.map(m => m.local).filter(Boolean)));

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
            // Force re-render
            setActiveTab('manifestations');
            setTimeout(() => setActiveTab('attendants'), 0);
        }
    };

    const handleDeleteCitizen = (username: string) => {
        const success = userStore.removeUser(username);
        if (success) {
            showToast(`Cidadão removido com sucesso.`, 'success');
            // Force re-render
            setActiveTab('manifestations');
            setTimeout(() => setActiveTab('citizens'), 0);
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

    const citizenManifestations = selectedCitizen
        ? manifestations.filter(m => m.ownerCpf === selectedCitizen.cpf)
        : [];

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

    const handleSaveSettings = () => {
        settingsStore.updateSettings(currentSettings);
        showToast('Configurações salvas com sucesso!', 'success');
    };

    return (
        <div className={`min-h-screen flex ${highContrast ? 'bg-black' : 'bg-white'}`}>
            {/* Sidebar */}
            <aside className={`w-64 border-r flex flex-col pt-8 ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-100'}`}>
                <div className="px-6 mb-10 flex items-center gap-3">
                    <div className={`size-10 rounded-lg flex items-center justify-center ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-primary/10 text-primary'}`}>
                        <span className="material-symbols-outlined text-[24px]">shield_person</span>
                    </div>
                    <h2 className={`font-black text-lg tracking-tight ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Gestão Participa</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('manifestations')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'manifestations' ? (highContrast ? 'bg-yellow-400 text-black border-2 border-white' : 'bg-primary text-white shadow-lg shadow-primary/20') : (highContrast ? 'text-yellow-400 hover:bg-gray-900 hover:border-yellow-400 border border-transparent' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100')}`}
                    >
                        <span className="material-symbols-outlined">description</span>
                        Manifestações
                    </button>
                    {authenticatedUser.role === 'admin' && (
                        <>
                            <button
                                onClick={() => setActiveTab('attendants')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'attendants' ? (highContrast ? 'bg-yellow-400 text-black border-2 border-white' : 'bg-primary text-white shadow-lg shadow-primary/20') : (highContrast ? 'text-yellow-400 hover:bg-gray-900 hover:border-yellow-400 border border-transparent' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100')}`}
                            >
                                <span className="material-symbols-outlined">badge</span>
                                Atendentes
                            </button>
                            <button
                                onClick={() => setActiveTab('citizens')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'citizens' ? (highContrast ? 'bg-yellow-400 text-black border-2 border-white' : 'bg-primary text-white shadow-lg shadow-primary/20') : (highContrast ? 'text-yellow-400 hover:bg-gray-900 hover:border-yellow-400 border border-transparent' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100')}`}
                            >
                                <span className="material-symbols-outlined">groups</span>
                                Cidadãos
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => setActiveTab('configs')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'configs' ? (highContrast ? 'bg-yellow-400 text-black border-2 border-white' : 'bg-primary text-white shadow-lg shadow-primary/20') : (highContrast ? 'text-yellow-400 hover:bg-gray-900 hover:border-yellow-400 border border-transparent' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100')}`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        Configurações
                    </button>
                </nav>

                <div className={`p-6 border-t ${highContrast ? 'border-yellow-400' : 'border-gray-100'}`}>
                    <button
                        onClick={onBack}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${highContrast ? 'text-yellow-400 hover:bg-gray-900 hover:border hover:border-yellow-400' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
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
                        <h1 className={`text-3xl font-black ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                            {activeTab === 'manifestations' && 'Todas as Manifestações'}
                            {activeTab === 'attendants' && 'Gestão de Atendentes'}
                            {activeTab === 'citizens' && 'Base de Cidadãos'}
                            {activeTab === 'configs' && 'Configurações do Sistema'}
                        </h1>
                        <p className={`font-medium ${highContrast ? 'text-yellow-400' : 'text-gray-500'}`}>Bem-vindo, {authenticatedUser.name}</p>
                    </div>
                </header>

                {activeTab === 'manifestations' && (
                    <div className="space-y-6">
                        {/* Summary Stats Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className={`p-4 rounded-2xl shadow-sm border ${highContrast ? 'bg-black border-yellow-400 text-yellow-400' : 'bg-white border-gray-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Total</p>
                                <p className={`text-2xl font-black ${highContrast ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm border ${highContrast ? 'bg-black border-yellow-400' : 'bg-yellow-50 border-yellow-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highContrast ? 'text-yellow-400' : 'text-yellow-600'}`}>Em Análise</p>
                                <p className={`text-2xl font-black ${highContrast ? 'text-white' : 'text-yellow-700'}`}>{stats.emAnalise}</p>
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm border ${highContrast ? 'bg-black border-yellow-400' : 'bg-blue-50 border-blue-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highContrast ? 'text-yellow-400' : 'text-blue-600'}`}>Em Andamento</p>
                                <p className={`text-2xl font-black ${highContrast ? 'text-white' : 'text-blue-700'}`}>{stats.emAndamento}</p>
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm border ${highContrast ? 'bg-black border-yellow-400' : 'bg-green-50 border-green-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highContrast ? 'text-yellow-400' : 'text-green-600'}`}>Concluído</p>
                                <p className={`text-2xl font-black ${highContrast ? 'text-white' : 'text-green-700'}`}>{stats.concluido}</p>
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm border ${highContrast ? 'bg-black border-yellow-400' : 'bg-red-50 border-red-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highContrast ? 'text-yellow-400' : 'text-red-600'}`}>Recusado</p>
                                <p className={`text-2xl font-black ${highContrast ? 'text-white' : 'text-red-700'}`}>{stats.recusado}</p>
                            </div>
                        </div>

                        {/* Filters Panel */}
                        <div className={`p-6 rounded-2xl border flex flex-wrap gap-4 items-end ${highContrast ? 'bg-black border-yellow-400' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex-1 min-w-[200px] space-y-1.5">
                                <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Pesquisar Protocolo / Assunto / CPF</label>
                                <div className="relative">
                                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>search</span>
                                    <input
                                        type="text"
                                        placeholder="Digite para buscar..."
                                        className={`w-full border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-all ${highContrast ? 'bg-black border-yellow-400 text-yellow-400 placeholder-yellow-700 focus:bg-black focus:border-yellow-400' : 'bg-white border-gray-200 focus:border-primary'}`}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                <select
                                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary cursor-pointer"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    <option value="EM ANÁLISE">Em Análise</option>
                                    <option value="EM ANDAMENTO">Em Andamento</option>
                                    <option value="CONCLUÍDO">Concluído</option>
                                    <option value="RECUSADO">Recusado</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tipo</label>
                                <select
                                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary cursor-pointer"
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                >
                                    <option value="">Qualquer Tipo</option>
                                    <option value="SUGESTÃO">Sugestão</option>
                                    <option value="ELOGIO">Elogio</option>
                                    <option value="RECLAMAÇÃO">Reclamação</option>
                                    <option value="SOLICITAÇÃO">Solicitação</option>
                                    <option value="DENÚNCIA">Denúncia</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Local</label>
                                <select
                                    className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary cursor-pointer max-w-[150px]"
                                    value={filterLocation}
                                    onChange={(e) => setFilterLocation(e.target.value)}
                                >
                                    <option value="">Todos os Locais</option>
                                    {locations.map((loc, i) => (
                                        <option key={i} value={loc as string}>{loc as string}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setFilterStatus('');
                                    setFilterType('');
                                    setFilterLocation('');
                                }}
                                className={`px-4 py-2.5 transition-colors font-bold text-xs flex items-center gap-1 ${highContrast ? 'text-yellow-400 hover:text-white' : 'text-gray-400 hover:text-red-500'}`}
                            >
                                <span className="material-symbols-outlined text-sm">filter_alt_off</span>
                                Limpar
                            </button>
                        </div>

                        {/* Manifestations Table */}
                        <div className={`rounded-2xl shadow-sm border overflow-hidden ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'}`}>
                            <table className="w-full text-left">
                                <thead className={`border-b ${highContrast ? 'bg-black border-yellow-400' : 'bg-gray-50 border-gray-200'}`}>
                                    <tr>
                                        <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Protocolo</th>
                                        <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Tipo</th>
                                        <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Assunto</th>
                                        <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Local</th>
                                        <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Status</th>
                                        <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-center ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Mídia</th>
                                        <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Data</th>
                                        <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-right ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${highContrast ? 'divide-yellow-400' : 'divide-gray-100'}`}>
                                    {filteredManifestations.length > 0 ? filteredManifestations.map((m, idx) => (
                                        <tr key={idx} className={`transition-colors cursor-pointer ${highContrast ? 'hover:bg-gray-900 border-yellow-400' : 'hover:bg-gray-50'}`} onClick={() => setSelectedManifestation(m)}>
                                            <td className={`px-6 py-4 font-mono text-xs font-bold ${highContrast ? 'text-white' : 'text-gray-600'}`}>
                                                {m.protocol}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-[9px] font-black rounded uppercase tracking-tighter ${highContrast ? 'bg-black text-yellow-400 border border-yellow-400' : 'bg-blue-50 text-primary'}`}>
                                                    {m.type}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 text-sm font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>{m.subject}</td>
                                            <td className={`px-6 py-4 text-xs font-medium max-w-[120px] truncate ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>{m.local || 'Não informado'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter ${m.status === 'CONCLUÍDO' ? 'bg-green-100 text-green-700' :
                                                    m.status === 'RECUSADO' ? 'bg-red-100 text-red-700' :
                                                        m.status === 'EM ANDAMENTO' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {m.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {m.attachment ? (
                                                    <div className={`flex items-center justify-center gap-1 ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>
                                                        <span className="material-symbols-outlined text-[18px]">
                                                            {m.attachment.type.startsWith('image/') ? 'image' :
                                                                m.attachment.type.startsWith('video/') ? 'movie' :
                                                                    m.attachment.type.startsWith('audio/') ? 'mic' : 'attach_file'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] text-gray-300 font-bold uppercase">---</span>
                                                )}
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>{m.date}</td>
                                            <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setSelectedManifestation(m)}
                                                    className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-gray-50 text-primary hover:bg-primary hover:text-white'}`}
                                                >
                                                    EXAMINAR
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-12 text-center text-gray-400 font-medium font-bold text-sm uppercase tracking-widest italic">
                                                Nenhuma manifestação corresponde aos filtros selecionados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'attendants' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <form onSubmit={handleCreateAttendant} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Novo Atendente</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Nome Completo <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={attendantName}
                                            onChange={(e) => setAttendantName(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm"
                                            placeholder="Ex: Pedro Santos"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Usuário / Login <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={attendantUser}
                                            onChange={(e) => setAttendantUser(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm"
                                            placeholder="pedrosantos"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Senha de Acesso <span className="text-red-500">*</span></label>
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

                {activeTab === 'citizens' && (
                    <div className={`rounded-2xl shadow-sm border overflow-hidden max-w-4xl ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'}`}>
                        <div className={`px-6 py-4 border-b flex justify-between items-center ${highContrast ? 'bg-black border-yellow-400' : 'bg-gray-50 border-gray-200'}`}>
                            <h3 className={`font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Base de Cidadãos Cadastrados</h3>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-primary/10 text-primary'}`}>
                                {citizens.length} usuários
                            </span>
                        </div>
                        <div className={`divide-y ${highContrast ? 'divide-yellow-400' : 'divide-gray-100'}`}>
                            {citizens.length > 0 ? citizens.map((c, idx) => (
                                <div key={idx} className={`px-6 py-4 flex justify-between items-center transition-colors cursor-pointer group ${highContrast ? 'hover:bg-gray-900 border-yellow-400' : 'hover:bg-gray-50'}`} onClick={() => setSelectedCitizen(c)}>
                                    <div className="flex items-center gap-4">
                                        <div className={`size-11 rounded-full flex items-center justify-center font-black transition-all ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-blue-50 text-blue-600 group-hover:bg-primary group-hover:text-white'}`}>
                                            {c.name?.[0] || 'C'}
                                        </div>
                                        <div>
                                            <p className={`font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>{c.name || 'Cidadão sem Nome'}</p>
                                            <div className="flex items-center gap-3 mt-0.5">
                                                <span className={`text-xs font-mono ${highContrast ? 'text-gray-400' : 'text-gray-400'}`}>{c.cpf}</span>
                                                <span className={`size-1 rounded-full ${highContrast ? 'bg-yellow-400' : 'bg-gray-200'}`}></span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-tighter ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-gray-100 text-gray-500'}`}>Login: {c.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${highContrast ? 'text-yellow-400 hover:bg-gray-900' : 'text-primary hover:bg-primary/5'}`}
                                        >
                                            Ver Histórico
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteCitizen(c.username); }}
                                            className="text-red-400 hover:text-red-600 material-symbols-outlined hover:bg-red-50 p-2 rounded-xl transition-all"
                                            title="Excluir Conta do Cidadão"
                                        >
                                            person_remove
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="px-6 py-12 text-center text-gray-400 font-medium italic">
                                    Nenhum cidadão cadastrado no sistema até o momento.
                                </div>
                            )}
                        </div>

                        {/* Citizen Detail Modal Overlay */}
                        {selectedCitizen && (
                            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                                <div className={`rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-up shadow-2xl ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
                                    <header className={`p-6 border-b flex justify-between items-center ${highContrast ? 'bg-black border-yellow-400' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`size-14 rounded-full flex items-center justify-center text-xl font-black ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-primary text-white'}`}>
                                                {selectedCitizen.name?.[0] || 'C'}
                                            </div>
                                            <div>
                                                <h3 className={`text-xl font-black ${highContrast ? 'text-white' : 'text-gray-900'}`}>{selectedCitizen.name}</h3>
                                                <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>{selectedCitizen.cpf}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedCitizen(null)} className={`material-symbols-outlined transition-colors ${highContrast ? 'text-yellow-400 hover:text-yellow-200' : 'text-gray-400 hover:text-gray-900'}`}>close</button>
                                    </header>

                                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                        <section>
                                            <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>Ações Rápidas</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button className={`flex items-center gap-3 p-4 rounded-2xl transition-all text-left ${highContrast ? 'bg-black border border-yellow-400 hover:bg-gray-900' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                                    <span className={`material-symbols-outlined ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>lock_reset</span>
                                                    <div>
                                                        <p className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>Resetar Senha</p>
                                                        <p className={`text-xs ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>Enviar link de recuperação</p>
                                                    </div>
                                                </button>
                                                <button className={`flex items-center gap-3 p-4 rounded-2xl transition-all text-left border-2 group ${highContrast ? 'bg-black border-red-500 hover:bg-red-900/20' : 'bg-gray-50 border-transparent hover:border-red-100 hover:bg-gray-100'}`}>
                                                    <span className={`material-symbols-outlined ${highContrast ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'}`}>block</span>
                                                    <div>
                                                        <p className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>Suspender Conta</p>
                                                        <p className={`text-xs ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>Bloquear acesso temporário</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </section>

                                        <section>
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Histórico de Manifestações</p>
                                                <span className="text-xs font-bold text-gray-400">{citizenManifestations.length} total</span>
                                            </div>

                                            <div className="space-y-3">
                                                {citizenManifestations.length > 0 ? citizenManifestations.map((m, i) => (
                                                    <div key={i} className={`p-4 rounded-2xl border transition-all group ${highContrast ? 'bg-black border-yellow-400 hover:border-white' : 'border-gray-100 hover:border-primary/20'}`}>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className={`text-[10px] font-black px-2 py-1 rounded ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-gray-100 text-gray-500'}`}>{m.protocol}</span>
                                                            <span className={`text-[9px] font-black px-2 py-1 rounded-full ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : (m.status === 'CONCLUÍDO' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600')}`}>{m.status}</span>
                                                        </div>
                                                        <p className={`font-bold text-sm transition-colors ${highContrast ? 'text-white group-hover:text-yellow-400' : 'text-gray-900 group-hover:text-primary'}`}>{m.subject}</p>
                                                        <p className={`text-xs mt-1 line-clamp-2 ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>{m.content}</p>
                                                        <div className={`flex items-center gap-2 mt-3 text-[10px] font-bold ${highContrast ? 'text-gray-400' : 'text-gray-400'}`}>
                                                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                                            {m.date}
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className={`text-center py-10 rounded-2xl ${highContrast ? 'bg-black border border-yellow-400' : 'bg-gray-50'}`}>
                                                        <p className={`text-sm italic ${highContrast ? 'text-gray-400' : 'text-gray-400'}`}>Nenhuma manifestação enviada por este cidadão.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'configs' && (
                    <div className="max-w-4xl space-y-8 animate-fade-in pb-20">
                        {/* Branding Category */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 bg-gray-50 border-b border-gray-100">
                                <h3 className="font-black text-gray-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">palette</span>
                                    Visual e Branding
                                </h3>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nome do Portal</label>
                                        <input
                                            type="text"
                                            value={currentSettings.portalName}
                                            onChange={(e) => setCurrentSettings({ ...currentSettings, portalName: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cor Principal</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={currentSettings.primaryColor}
                                                onChange={(e) => setCurrentSettings({ ...currentSettings, primaryColor: e.target.value })}
                                                className="size-11 rounded-lg border-2 border-white shadow-sm cursor-pointer overflow-hidden p-0"
                                            />
                                            <input
                                                type="text"
                                                value={currentSettings.primaryColor}
                                                readOnly
                                                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rules Category */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 bg-gray-50 border-b border-gray-100">
                                <h3 className="font-black text-gray-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">gavel</span>
                                    Regras e Segurança
                                </h3>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                        <p className="font-bold text-gray-900">Permitir Manifestações Anônimas</p>
                                        <p className="text-xs text-gray-500">Cidadãos podem enviar relatos sem identificação prévia</p>
                                    </div>
                                    <button
                                        onClick={() => setCurrentSettings({ ...currentSettings, allowAnonymous: !currentSettings.allowAnonymous })}
                                        className={`size-12 rounded-xl flex items-center justify-center transition-all ${currentSettings.allowAnonymous ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-200 text-gray-400'}`}
                                    >
                                        <span className="material-symbols-outlined">{currentSettings.allowAnonymous ? 'check' : 'close'}</span>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                        <p className="font-bold text-gray-900">Prazo de Resposta (SLA)</p>
                                        <p className="text-xs text-gray-500">Número máximo de dias para resposta oficial</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            value={currentSettings.slaDays}
                                            onChange={(e) => setCurrentSettings({ ...currentSettings, slaDays: parseInt(e.target.value) || 0 })}
                                            className="w-20 bg-white border border-gray-200 rounded-xl px-3 py-2 text-center font-bold text-primary"
                                        />
                                        <span className="text-sm font-bold text-gray-400">dias</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-red-50 rounded-3xl border border-red-100 p-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                                    <span className="material-symbols-outlined">running_with_errors</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-red-900 uppercase tracking-tight">Modo de Manutenção</h4>
                                    <p className="text-sm text-red-700/70">Bloqueia o acesso de todos os cidadãos ao portal.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCurrentSettings({ ...currentSettings, maintenanceMode: !currentSettings.maintenanceMode })}
                                className={`px-6 py-3 rounded-xl font-bold transition-all ${currentSettings.maintenanceMode ? 'bg-red-600 text-white' : 'bg-white border border-red-200 text-red-600 hover:bg-red-100'}`}
                            >
                                {currentSettings.maintenanceMode ? 'Desativar Manutenção' : 'Ativar Agora'}
                            </button>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                onClick={handleSaveSettings}
                                className="px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">save</span>
                                Salvar Configurações
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Manifestation Detail View (Admin) */}
            {selectedManifestation && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className={`rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
                        <div className="p-10">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <div className="flex gap-2 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' : 'bg-blue-100 text-blue-700'}`}>
                                            {selectedManifestation.type}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400' :
                                            (selectedManifestation.status === 'CONCLUÍDO' ? 'bg-green-100 text-green-700' :
                                                selectedManifestation.status === 'RECUSADO' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700')
                                            }`}>
                                            {selectedManifestation.status}
                                        </span>
                                    </div>
                                    <h2 className={`text-3xl font-black tracking-tight leading-none mb-2 ${highContrast ? 'text-white' : 'text-gray-900'}`}>{selectedManifestation.subject}</h2>
                                    <p className={`font-mono text-sm ${highContrast ? 'text-gray-400' : 'text-gray-400'}`}>Nº Protocolo: <span className={`${highContrast ? 'text-white' : 'text-gray-900'} font-bold`}>{selectedManifestation.protocol}</span></p>
                                </div>
                                <button
                                    onClick={() => setSelectedManifestation(null)}
                                    className={`p-3 rounded-2xl transition-all ${highContrast ? 'bg-black border border-yellow-400 text-yellow-400 hover:bg-gray-900' : 'bg-gray-50 hover:bg-gray-100'}`}
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-gray-100">
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Cidadão</p>
                                    <p className={`font-bold flex items-center gap-2 ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                                        <span className="material-symbols-outlined text-gray-300">person</span>
                                        {selectedManifestation.isAnonymous ? 'ANÔNIMO (Identidade Preservada)' : (selectedManifestation.ownerCpf || 'Visitante')}
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Data do Registro</p>
                                    <p className={`font-bold flex items-center gap-2 ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                                        <span className="material-symbols-outlined text-gray-300">calendar_today</span>
                                        {selectedManifestation.date}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {selectedManifestation.iaAnalysis && selectedManifestation.iaAnalysis.analise && (
                                    <div className="mb-8 p-6 bg-gradient-to-br from-blue-50/50 to-white rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden group">
                                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <span className="material-symbols-outlined text-[120px] text-blue-600">psychology</span>
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="size-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                                    <span className="material-symbols-outlined text-2xl">smart_toy</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-gray-900 leading-none">Análise Preliminar IZA</h3>
                                                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">Inteligência Artificial</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* Sentiment Card */}
                                                <div className={`p-4 rounded-2xl border ${selectedManifestation.iaAnalysis.analise.sentimento === 'negativo' ? 'bg-red-50 border-red-100' :
                                                    selectedManifestation.iaAnalysis.analise.sentimento === 'positivo' ? 'bg-green-50 border-green-100' :
                                                        'bg-gray-50 border-gray-100'
                                                    }`}>
                                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-wider">Sentimento Detectado</p>
                                                    <div className={`flex items-center gap-2 font-black text-lg ${selectedManifestation.iaAnalysis.analise.sentimento === 'negativo' ? 'text-red-600' :
                                                        selectedManifestation.iaAnalysis.analise.sentimento === 'positivo' ? 'text-green-600' :
                                                            'text-gray-600'
                                                        }`}>
                                                        <span className="material-symbols-outlined text-2xl">
                                                            {selectedManifestation.iaAnalysis.analise.sentimento === 'negativo' ? 'sentiment_dissatisfied' :
                                                                selectedManifestation.iaAnalysis.analise.sentimento === 'positivo' ? 'sentiment_satisfied' : 'sentiment_neutral'}
                                                        </span>
                                                        <span className="capitalize">{selectedManifestation.iaAnalysis.analise.sentimento}</span>
                                                    </div>
                                                </div>

                                                {/* Topics Card */}
                                                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-wider">Tópicos Identificados</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedManifestation.iaAnalysis.analise.topicos_detectados.map((topic: string, i: number) => (
                                                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold border border-gray-200 uppercase tracking-tighter">
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Confidence Card */}
                                                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
                                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider flex justify-between">
                                                        Nível de Confiança
                                                        <span className="text-primary">{Math.round(selectedManifestation.iaAnalysis.analise.confianca * 100)}%</span>
                                                    </p>
                                                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-1">
                                                        <div
                                                            className={`h-full rounded-full ${selectedManifestation.iaAnalysis.analise.confianca > 0.8 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                            style={{ width: `${selectedManifestation.iaAnalysis.analise.confianca * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-[10px] font-bold text-gray-500 text-right uppercase">
                                                        {selectedManifestation.iaAnalysis.analise.confianca > 0.9 ? 'Alta Precisão' : 'Média Precisão'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Relato da Manifestação</p>
                                    <div className={`p-8 rounded-3xl leading-relaxed text-lg whitespace-pre-wrap border ${highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
                                        {selectedManifestation.content}
                                    </div>
                                </div>

                                {selectedManifestation.local && (
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`}>Local do Fato</p>
                                        <p className={`p-4 rounded-xl shadow-sm flex items-center gap-3 font-bold text-sm ${highContrast ? 'bg-black border border-yellow-400 text-white' : 'bg-white border border-gray-100 text-gray-900'}`}>
                                            <span className={`material-symbols-outlined ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>location_on</span>
                                            {selectedManifestation.local}
                                        </p>
                                    </div>
                                )}

                                {selectedManifestation.attachment && (
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 italic">Arquivo Anexo</p>
                                        <div className={`p-6 rounded-2xl border flex items-center justify-between ${highContrast ? 'bg-black border-yellow-400' : 'bg-gray-50 border-gray-100'}`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`size-16 rounded-xl shadow-sm border flex items-center justify-center ${highContrast ? 'bg-black border-yellow-400 text-yellow-400' : 'bg-white border-gray-200 text-primary'}`}>
                                                    <span className="material-symbols-outlined text-[32px]">
                                                        {selectedManifestation.attachment.type.startsWith('video/') ? 'movie' :
                                                            selectedManifestation.attachment.type.startsWith('audio/') ? 'mic' :
                                                                selectedManifestation.attachment.type.startsWith('image/') ? 'image' : 'attach_file'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className={`font-black text-sm ${highContrast ? 'text-white' : 'text-gray-900'}`}>{selectedManifestation.attachment.name}</p>
                                                    <p className={`text-xs uppercase font-bold ${highContrast ? 'text-gray-400' : 'text-gray-400'}`}>{selectedManifestation.attachment.type}</p>
                                                </div>
                                            </div>
                                            <a
                                                href={selectedManifestation.attachment.url}
                                                download={selectedManifestation.attachment.name}
                                                className={`px-6 py-3 font-black rounded-xl text-xs flex items-center gap-2 transition-all ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-primary text-white hover:bg-primary-dark'}`}
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
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Escrever Resposta Final <span className="text-red-500">*</span></p>
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
