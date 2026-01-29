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
    {
        username: 'ad',
        cpf: '000.000.000-00',
        password: 'kl',
        name: 'Administrador Global',
        role: 'admin'
    },
    {
        username: 'atendente',
        cpf: '000.000.000-02',
        password: '1',
        name: 'Atendente de Teste',
        role: 'attendant'
    },
    {
        username: 'user',
        cpf: '123.456.789-00',
        password: '1',
        name: 'Cidadão de Teste',
        role: 'citizen'
    }
];
const manifestations: Manifestation[] = [
    {
        protocol: 'PROT-EXEMPLO-001',
        type: 'RECLAMAÇÃO',
        subject: 'Iluminação Pública',
        content: 'Poste queimado na rua principal há 3 dias.',
        ownerCpf: '123.456.789-00',
        date: '25/01/2026',
        status: 'EM ANÁLISE',
        local: 'Asa Norte, Brasília-DF',
        isAnonymous: false
    }
];

export const userStore = {
    // User methods
    getUsers: () => [...users],
    addUser: (user: User) => {
        users.push(user);
        return true;
    },
    findUser: (identifier: string) => {
        return users.find(u => u.username === identifier || u.cpf === identifier);
    },
    authenticate: (identifier: string, password: string) => {
        const user = users.find(u => (u.username === identifier || u.cpf === identifier) && u.password === password);
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
