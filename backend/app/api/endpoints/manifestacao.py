from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
from datetime import date
import shutil
import os
import json

from app.core.database import get_db
from app.core.config import settings
from app.models.manifestacao import Manifestacao
from app.schemas.manifestacao import ManifestacaoResponse
from app.services.iza_ai import analisar_sentimento_iza
from app.services.protocol_service import gerar_protocolo

router = APIRouter()

@router.post("/nova-manifestacao", response_model=ManifestacaoResponse)
async def criar_manifestacao(
    tipo_manifestacao: str = Form(...),
    assunto: str = Form(...),
    conteudo_texto: str = Form(...),
    is_anonimo: bool = Form(False),
    # Optional Citizen Data
    nome: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    telefone: Optional[str] = Form(None),
    cpf: Optional[str] = Form(None),
    # Optional Location Data
    local_ocorrencia: Optional[str] = Form(None),
    data_ocorrencia: Optional[date] = Form(None),
    # Files
    arquivo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # 1. Generate Protocol
    protocolo = gerar_protocolo()
    
    # 2. Handle File Upload (if exists)
    caminho_arquivo = None
    tipo_midia = None
    
    if arquivo:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        filename = f"{protocolo}_{arquivo.filename}"
        file_location = os.path.join(settings.UPLOAD_DIR, filename)
        
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(arquivo.file, file_object)
        
        caminho_arquivo = file_location
        if arquivo.content_type:
            if "audio" in arquivo.content_type: tipo_midia = "audio"
            elif "video" in arquivo.content_type: tipo_midia = "video"
            elif "image" in arquivo.content_type: tipo_midia = "image"
            else: tipo_midia = "file"

    # 3. Call IZA AI Service
    analise_ai = analisar_sentimento_iza(conteudo_texto)
    
    # 4. Clean anonymous data if strictly anonymous
    if is_anonimo:
        nome = None
        email = None
        telefone = None
        cpf = None

    # 5. Save to Database
    db_manifestacao = Manifestacao(
        protocolo=protocolo,
        tipo_manifestacao=tipo_manifestacao,
        assunto=assunto,
        conteudo_texto=conteudo_texto,
        
        is_anonimo=is_anonimo,
        nome=nome,
        email=email,
        telefone=telefone,
        cpf=cpf,
        
        local_ocorrencia=local_ocorrencia,
        data_ocorrencia=data_ocorrencia,
        
        caminho_midia=caminho_arquivo,
        tipo_midia=tipo_midia,
        status="RECEBIDO",
        analise_ia_metadata=json.dumps(analise_ai)
    )
    
    db.add(db_manifestacao)
    db.commit()
    db.refresh(db_manifestacao)
    
    return db_manifestacao
