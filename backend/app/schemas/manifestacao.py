from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, date

class ManifestacaoBase(BaseModel):
    tipo_manifestacao: str
    assunto: str
    conteudo_texto: str
    is_anonimo: bool = False
    
    # Citizen Data
    nome: Optional[str] = None
    email: Optional[EmailStr] = None
    telefone: Optional[str] = None
    cpf: Optional[str] = None
    
    # Location
    local_ocorrencia: Optional[str] = None
    data_ocorrencia: Optional[date] = None

class ManifestacaoCreate(ManifestacaoBase):
    pass

class ManifestacaoResponse(ManifestacaoBase):
    id: int
    protocolo: str
    caminho_midia: Optional[str] = None
    tipo_midia: Optional[str] = None
    status: str
    created_at: datetime
    analise_ia_metadata: Optional[str] = None

    class Config:
        from_attributes = True
