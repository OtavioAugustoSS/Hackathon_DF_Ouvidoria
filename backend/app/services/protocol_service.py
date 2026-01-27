import random
import string
from datetime import datetime

def gerar_protocolo() -> str:
    """
    Gera um protocolo único no formato OUV-ANO-XXXXXX
    """
    year = datetime.now().year
    # Generating a random 6-character alphanumeric string (uppercase)
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"OUV-{year}-{suffix}"
