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
    iaAnalysis?: any;
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

const manifestations: Manifestation[] = [];

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
