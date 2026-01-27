from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, func, Date
from app.core.database import Base

class Manifestacao(Base):
    __tablename__ = "manifestacoes"

    id = Column(Integer, primary_key=True, index=True)
    protocolo = Column(String(50), unique=True, index=True, nullable=False)
    
    # 1. Identification
    tipo_manifestacao = Column(String(50), nullable=False) # Denuncia, Elogio, etc.
    assunto = Column(String(100), nullable=False) # Saude, Transporte, etc.
    conteudo_texto = Column(Text, nullable=False)
    
    # 2. Citizen Data (Nullable if anonymous)
    is_anonimo = Column(Boolean, default=False)
    nome = Column(String(150), nullable=True)
    email = Column(String(150), nullable=True)
    telefone = Column(String(50), nullable=True)
    cpf = Column(String(20), nullable=True)

    # 3. Location & Time
    local_ocorrencia = Column(String(255), nullable=True)
    data_ocorrencia = Column(Date, nullable=True)

    # 4. Attachments & Metadata
    caminho_midia = Column(String(255), nullable=True)
    tipo_midia = Column(String(50), nullable=True) # audio, video, image, file
    status = Column(String(20), default="RECEBIDO")
    analise_ia_metadata = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
