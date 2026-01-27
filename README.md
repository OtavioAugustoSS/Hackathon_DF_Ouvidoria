# Participa DF - Ouvidoria PWA 🏛️

## 📢 Sobre o Projeto
**Participa DF** é a evolução da comunicação entre o cidadão e o Governo do Distrito Federal. Desenvolvida para o Hackathon "Participa DF", esta plataforma de Ouvidoria foca na **experiência do usuário (UX)**, **transparência** e **acessibilidade universal**.

Ao contrário de formulários tradicionais, o Participa DF oferece uma abordagem **multicanal**, permitindo que o cidadão registre manifestações por texto, áudio ou vídeo, de forma intuitiva e inclusiva, garantindo que todas as vozes sejam ouvidas, independentemente de barreiras físicas ou tecnológicas.

---

## 🚀 Tecnologias e Inovações

A solução foi construída com um stack moderno para garantir performance, escalabilidade e facilidade de uso:

*   **Frontend Interativo**:
    *   **React 19 + Vite**: Performance extrema e carregamento instantâneo.
    *   **Tailwind CSS**: Design system responsivo e visualmente impactante.
    *   **MediaRecorder API**: Gravação nativa de áudio e vídeo diretamente no navegador.
    *   **PWA (Progressive Web App)**: Funciona offline, instalável no celular e leve.

*   **Backend Robusto**:
    *   **FastAPI (Python)**: API assíncrona de alta performance.
    *   **Clean Architecture**: Código organizado, testável e fácil de manter.
    *   **MySQL/SQLite**: Persistência de dados segura e confiável.

---

## 🏆 Destaques da Solução

### ♿ Acessibilidade (WCAG 2.1 AA)
O projeto nasceu inclusivo. Cada componente foi auditado para garantir:
*   Contraste adequado para baixa visão.
*   Navegação completa por teclado.
*   Uso rigoroso de `aria-labels` e atributos semânticos para leitores de tela.
*   Suporte a ferramentas de assistência.

### 🤖 Integração com IA IZA
Preparado para o futuro, o Participa DF foi arquitetado para integração com a **IA IZA**. A estrutura de dados já prevê o processamento de linguagem natural para classificação automática de manifestações e análise de sentimento, agilizando o encaminhamento para os órgãos responsáveis.

---

## 🛠️ Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação completa em seu ambiente local.

### 1. Backend (API)

Abra um terminal na pasta `backend`:

```bash
# 1. Crie o ambiente virtual
python -m venv venv

# 2. Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
# source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Inicie o servidor
uvicorn main:app --reload
```
O servidor iniciará em `http://localhost:8000`.

### 2. Frontend (Aplicação Web/PWA)

Abra outro terminal na raiz do projeto (onde está o `package.json`):

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```
Acesse a aplicação em `http://localhost:3000`.

---

*Participa DF: Sua voz constrói a cidade. 🏙️*
