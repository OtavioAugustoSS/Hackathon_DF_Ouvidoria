export interface ManifestacaoResponse {
    id: number;
    protocolo: string;
    tipo_manifestacao: string;
    assunto: string;
    conteudo_texto: string;
    status: string;
    created_at: string;
}

export enum TipoManifestacao {
    DENUNCIA = "Denúncia",
    RECLAMACAO = "Reclamação",
    SUGESTAO = "Sugestão",
    ELOGIO = "Elogio",
    SOLICITACAO = "Solicitação"
}

export type Channel = 'TEXT' | 'AUDIO' | 'VIDEO' | 'UPLOAD';
