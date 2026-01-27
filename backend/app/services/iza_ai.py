import json
import time

def analisar_sentimento_iza(texto: str) -> dict:
    """
    Simula a análise de texto pela IA IZA.
    """
    
    # TODO: Integração via API com Inteligência Artificial IZA da Ouvidoria-Geral
    
    # Simulating network latency
    time.sleep(0.5)
    
    # Mock logic for demonstration
    texto_lower = texto.lower()
    sentimento = "neutro"
    score = 0.5
    
    if any(word in texto_lower for word in ["ruim", "péssimo", "buraco", "demora", "lixo"]):
        sentimento = "negativo"
        score = 0.9
    elif any(word in texto_lower for word in ["ótimo", "excelente", "parabéns", "bom"]):
        sentimento = "positivo"
        score = 0.95
        
    return {
        "service": "IZA_AI_V1",
        "analise": {
            "sentimento": sentimento,
            "confianca": score,
            "topicos_detectados": ["infraestrutura", "atendimento"] if "buraco" in texto_lower else ["geral"]
        }
    }
