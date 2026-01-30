# 1º Hackathon em Controle Social - Desafio Participa DF
## Solução - Categoria Ouvidoria

Bem-vindo ao repositório da solução desenvolvida para a categoria **Ouvidoria** do Desafio Participa DF. Esta aplicação é um **PWA (Progressive Web App)** moderno, focado em acessibilidade, usabilidade e integração inovadora com Inteligência Artificial para análise de sentimentos.

---

## 🚀 Como Rodar o Projeto

Prezamos pela simplicidade de execução. Siga os passos abaixo para rodar toda a aplicação (Frontend + Backend) com poucos comandos.

### Pré-requisitos
- **Node.js** (versão 18+ recomendada)
- **Python** (versão 3.9+ recomendada)

### Passo a Passo

#### 1. Instalação
Abra um terminal na pasta raiz do projeto e execute os comandos para instalar as dependências do Backend e Frontend:

```bash
# Instalar dependências do Backend (Python)
pip install -r backend/requirements.txt

# Instalar dependências do Frontend (Node.js)
npm install
```

#### 2. Execução (Modo Simplificado)
Para rodar tudo (API + Interface) simultaneamente, execute na raiz:

```bash
npm run dev:all
```
- O Frontend abrirá em: `http://localhost:3000`
- O Backend rodará em: `http://localhost:8000`

---

#### *Opcional: Execução Manual (Separada)*
Se preferir rodar em terminais separados para debugar:

**Terminal 1 (Backend):**
```bash
npm run backend
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

---

## 📋 Funcionalidades Principais

### Acessibilidade & Multicanalidade (WCAG 2.1 AA)
- **Envio de Relatos Multimídia**: O cidadão pode registrar manifestações por **Texto**, **Áudio** (gravador integrado), **Vídeo** (câmera integrada) ou **Upload de Arquivos**.
- **Design Inclusivo**: Alto contraste, navegação por teclado e suporte a leitores de tela (`aria-labels`, `live regions`).
- **PWA (Progressive Web App)**: Pode ser instalado no celular ou desktop, funcionando como um aplicativo nativo.

### Integração com IA IZA
- **Análise Automática**: Ao receber uma manifestação, o backend aciona o módulo `iza_ai.py`.
- **Detecção de Sentimento**: A IA analisa o texto do relato para classificar o sentimento (Positivo, Negativo, Neutro) e identificar tópicos urgentes (ex: "buraco", "lixo"), priorizando o atendimento.
- **Anonimato Seguro**: Opção de envio anônimo que garante que dados pessoais não sejam persistidos se o cidadão optar pelo sigilo.

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**
- **React 19** + **TypeScript**: Robustez e modernidade.
- **Vite**: Build tool ultrarrápida.
- **TailwindCSS**: Estilização responsiva e acessível.
- **VitePWA**: Configuração para funcionamento offline/app.

**Backend:**
- **FastAPI (Python)**: Alta performance para APIs assíncronas.
- **SQLAlchemy (SQLite)**: Gerenciamento eficiente e simples de dados.
- **Pydantic**: Validação rigorosa de dados.

---

## 📹 Vídeo de Demonstração

[Link para o Vídeo de Demonstração (YouTube/Vimeo)]
*Insira aqui o link final do vídeo conforme exigido no item 8.2.2-III do edital.*

---

## 📄 Estrutura de Arquivos

```
/backend
  /app
    /services/iza_ai.py  # Módulo de Inteligência Artificial
    /api                 # Endpoints da API
    /models              # Modelos do Banco de Dados
  main.py                # Ponto de entrada do servidor
/frontend
  /components            # Componentes React (ReportForm, etc.)
  /services              # Integração com API
README.md                # Este arquivo
```

---
*Desenvolvido com foco na cidadania e transparência.*
