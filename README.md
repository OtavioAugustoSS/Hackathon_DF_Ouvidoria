# Participa DF 🏙️

## Visão Geral
**Participa DF** é uma plataforma moderna de Ouvidoria desenvolvida para o Hackathon "Participa DF". O objetivo é aproximar o cidadão do Governo do Distrito Federal, permitindo o registro ágil de manifestações (reclamações, elogios, sugestões) com suporte multimídia e acessibilidade.

A solução foca em **Multicanalidade** (áudio, vídeo, texto) e **Experiência do Usuário (UX)**, garantindo que qualquer cidadão possa exercer sua cidadania digital.

---

## 🚀 Tecnologias

O projeto utiliza uma stack moderna e performática:

- **Frontend**: 
  - **React 19** com **Vite** (Build ultra-rápido).
  - **Tailwind CSS** (Design System responsivo).
  - **PWA (Progressive Web App)**: Funciona offline e instalável em dispositivos móveis.
  
- **Backend**:
  - **FastAPI** (Python): Alto desempenho e validação automática de dados.
  - **SQLite/MySQL**: Persistência robusta.
  - **Clean Architecture**: Separação clara de responsabilidades.

---

## 🛠️ Como Rodar (Passo a Passo)

### Pré-requisitos
- Node.js 18+
- Python 3.9+

### 1. Backend (API)

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/Mac
# source venv/bin/activate

pip install -r requirements.txt
python main.py
```

A API estará rodando em `http://localhost:8000`.

### 2. Frontend (Aplicação Web/PWA)

```bash
# Em outro terminal, na raiz do projeto
npm install
npm run dev
```

Acesse a aplicação em `http://localhost:3000`.

---

## 🏗️ Decisões de Arquitetura (Clean Code)

A arquitetura foi pensada para escalabilidade e manutenção:

1.  **Frontend Modular**: Componentes reutilizáveis em `/components`, separação de lógica de API em `/services`.
2.  **PWA First**: Configuração via `vite-plugin-pwa` para garantir cache de assets e instalabilidade, atendendo aos requisitos de mobilidade do edital.
3.  **Acessibilidade (WCAG)**: Foco em semântica HTML, uso correto de `aria-labels`, contrastes adequados e atributos `lang` para leitores de tela.
4.  **Multimídia Otimizada**: Uploads de arquivos grandes via `multipart/form-data`, com feedbacks visuais imediatos (previews) para o usuário antes do envio.

---

## 🎥 Vídeo de Apresentação

[LINK DO YOUTUBE AQUI]

---

*Desenvolvido com ❤️ para o Hackathon Participa DF.*
