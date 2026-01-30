export type UserRole = 'citizen' | 'admin' | 'attendant';

export interface User {
    username: string;
    cpf: string;
    password: string;
    name?: string;
    role: UserRole;
}

export interface Manifestation {
    protocol: string;
    type: string;
    subject: string;
    content: string;
    ownerCpf?: string;
    date: string;
    status: string;
    local?: string;
    isAnonymous: boolean;
    attachment?: {
        name: string;
        type: string;
        url: string;
    };
    response?: string;
    responseTime?: string;
    responderName?: string;
}

// In-memory data that resets on application load
const users: User[] = [
    { username: 'ad', cpf: '000.000.000-00', password: 'kl', name: 'Administrador Global', role: 'admin' },
    { username: 'atendente', cpf: '000.000.000-02', password: '1', name: 'Atendente de Teste', role: 'attendant' },
    { username: '111.111.111-11', cpf: '111.111.111-11', password: '1', name: 'Ana Souza', role: 'citizen' },
    { username: '222.222.222-22', cpf: '222.222.222-22', password: '1', name: 'Bruno Oliveira', role: 'citizen' },
    { username: '333.333.333-33', cpf: '333.333.333-33', password: '1', name: 'Carla Dias', role: 'citizen' },
    { username: '444.444.444-44', cpf: '444.444.444-44', password: '1', name: 'Daniel Lima', role: 'citizen' },
    { username: '555.555.555-55', cpf: '555.555.555-55', password: '1', name: 'Elena Martins', role: 'citizen' },
    { username: '666.666.666-66', cpf: '666.666.666-66', password: '1', name: 'Fábio Rocha', role: 'citizen' },
    { username: '777.777.777-77', cpf: '777.777.777-77', password: '1', name: 'Gabriel Santos', role: 'citizen' }
];

const manifestations: Manifestation[] = [
    // Ana Souza
    { protocol: 'MAN-ANA-001', type: 'RECLAMAÇÃO', subject: 'Buraco na pista', content: 'Buraco enorme na EPTG altura do Guará.', ownerCpf: '111.111.111-11', date: '20/01/2026', status: 'EM ANÁLISE', local: 'Guará, DF', isAnonymous: false },
    { protocol: 'MAN-ANA-002', type: 'ELOGIO', subject: 'Limpeza Urbana', content: 'Parabéns pela limpeza no Parque da Cidade.', ownerCpf: '111.111.111-11', date: '22/01/2026', status: 'CONCLUÍDO', local: 'Asa Sul', isAnonymous: false },
    // Bruno Oliveira
    { protocol: 'MAN-BRU-001', type: 'SUGESTÃO', subject: 'Ciclovias', content: 'Sugiro expandir a ciclovia na W3 Norte.', ownerCpf: '222.222.222-22', date: '21/05/2026', status: 'EM ANÁLISE', local: 'Asa Norte', isAnonymous: false },
    { protocol: 'MAN-BRU-002', type: 'RECLAMAÇÃO', subject: 'Iluminação', content: 'Postes apagados na Comercial Norte de Taguatinga.', ownerCpf: '222.222.222-22', date: '24/05/2026', status: 'EM ANÁLISE', local: 'Taguatinga', isAnonymous: false },
    // Carla Dias
    { protocol: 'MAN-CAR-001', type: 'RECLAMAÇÃO', subject: 'Falta de água', content: 'Estamos sem água há 24h aqui no condomínio.', ownerCpf: '333.333.333-33', date: '25/01/2026', status: 'CONCLUÍDO', local: 'Águas Claras', isAnonymous: false },
    { protocol: 'MAN-CAR-002', type: 'SOLICITAÇÃO', subject: 'Poda de árvore', content: 'Árvore com risco de queda sobre fiação.', ownerCpf: '333.333.333-33', date: '26/01/2026', status: 'EM ANÁLISE', local: 'Sudoeste', isAnonymous: false },
    // Daniel Lima
    { protocol: 'MAN-DAN-001', type: 'SOLICITAÇÃO', subject: 'Troca de lâmpada', content: 'Lâmpada do poste em frente à minha casa queimou.', ownerCpf: '444.444.444-44', date: '27/01/2026', status: 'EM ANÁLISE', local: 'Ceilândia', isAnonymous: false },
    { protocol: 'MAN-DAN-002', type: 'RECLAMAÇÃO', subject: 'Barulho excessivo', content: 'Festa com som alto até 4h da manhã.', ownerCpf: '444.444.444-44', date: '28/01/2026', status: 'EM ANÁLISE', local: 'Ceilândia', isAnonymous: false },
    // Elena Martins
    { protocol: 'MAN-ELE-001', type: 'ELOGIO', subject: 'Atendimento UPA', content: 'Fui muito bem atendida na UPA de Samambaia.', ownerCpf: '555.555.555-55', date: '28/01/2026', status: 'CONCLUÍDO', local: 'Samambaia', isAnonymous: false },
    { protocol: 'MAN-ELE-002', type: 'SUGESTÃO', subject: 'Cursos gratuitos', content: 'Poderiam oferecer cursos de informática básica.', ownerCpf: '555.555.555-55', date: '29/01/2026', status: 'EM ANÁLISE', local: 'Online', isAnonymous: false },
    // Fábio Rocha
    { protocol: 'MAN-FAB-001', type: 'RECLAMAÇÃO', subject: 'Ônibus lotado', content: 'A linha 0.330 está sempre superlotada.', ownerCpf: '666.666.666-66', date: '29/01/2026', status: 'EM ANÁLISE', local: 'Rodoviária', isAnonymous: false },
    { protocol: 'MAN-FAB-002', type: 'SOLICITAÇÃO', subject: 'Pintura de faixa', content: 'Faixa de pedestre apagada perto da escola.', ownerCpf: '666.666.666-66', date: '28/01/2026', status: 'EM ANÁLISE', local: 'Sobradinho', isAnonymous: false },
    // Gabriel Santos
    { protocol: 'MAN-GAB-001', type: 'RECLAMAÇÃO', subject: 'Escola sem merenda', content: 'Relatos de falta de merenda na escola do bairro.', ownerCpf: '777.777.777-77', date: '27/01/2026', status: 'EM ANÁLISE', local: 'Paranoá', isAnonymous: false },
    { protocol: 'MAN-GAB-002', type: 'ELOGIO', subject: 'Policiamento', content: 'Rondas frequentes trazem mais segurança.', ownerCpf: '777.777.777-77', date: '29/01/2026', status: 'CONCLUÍDO', local: 'Paranoá', isAnonymous: false }
];

export const userStore = {
    // User methods
    getUsers: () => [...users],
    addUser: (user: User) => {
        users.push(user);
        return true;
    },
    findUser: (identifier: string) => {
        const cleanId = identifier.replace(/\D/g, '');
        return users.find(u =>
            u.username.replace(/\D/g, '') === cleanId ||
            u.cpf.replace(/\D/g, '') === cleanId ||
            u.username === identifier
        );
    },
    authenticate: (identifier: string, password: string) => {
        const cleanId = identifier.replace(/\D/g, '');
        const user = users.find(u =>
            (u.username.replace(/\D/g, '') === cleanId ||
                u.cpf.replace(/\D/g, '') === cleanId ||
                u.username === identifier) &&
            u.password === password
        );
        return user || null;
    },

    // Manifestation methods
    saveManifestation: (manifestation: Manifestation) => {
        manifestations.push(manifestation);
        return manifestation;
    },
    getManifestations: () => [...manifestations],
    getManifestationsByUser: (cpf: string) => {
        return manifestations.filter(m => m.ownerCpf === cpf);
    },
    findManifestationByProtocol: (protocol: string) => {
        return manifestations.find(m => m.protocol === protocol);
    },
    updateManifestation: (protocol: string, updates: Partial<Manifestation>) => {
        const index = manifestations.findIndex(m => m.protocol === protocol);
        if (index !== -1) {
            manifestations[index] = { ...manifestations[index], ...updates };
            return true;
        }
        return false;
    },
    removeUser: (username: string) => {
        const index = users.findIndex(u => u.username === username);
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        }
        return false;
    }
};
