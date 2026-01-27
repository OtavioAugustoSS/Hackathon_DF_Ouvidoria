import React, { useState } from 'react';
import ChannelSelection from './components/ChannelSelection';
import ReportForm from './components/ReportForm';
import LoginScreen from './components/LoginScreen';
import { TipoManifestacao, Channel } from './types';

type ViewState = 'HOME' | 'CHANNEL_SELECTION' | 'REPORT_FORM' | 'LOGIN';

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedType, setSelectedType] = useState<TipoManifestacao | undefined>(undefined);
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(undefined);

  // Called when user clicks a card on Home or "Registrar Manifestação"
  const handleStartManifestation = (type?: TipoManifestacao) => {
    setSelectedType(type);
    setView('CHANNEL_SELECTION');
    window.scrollTo(0, 0);
  };

  // Called when user selects a channel (Text, Audio, etc.)
  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    setView('REPORT_FORM'); // Now goes to Form instead of Modal
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setView('HOME');
    setSelectedType(undefined);
    setSelectedChannel(undefined);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setView('LOGIN');
    window.scrollTo(0, 0);
  };

  const handleBackToChannel = () => {
    setView('CHANNEL_SELECTION');
    window.scrollTo(0, 0);
  }

  const [searchProtocol, setSearchProtocol] = useState('');

  const handleConsultar = () => {
    if (!searchProtocol.trim()) {
      alert("Por favor, digite um número de protocolo.");
      return;
    }
    alert(`Consultando protocolo ${searchProtocol}... Status: EM ANÁLISE`);
  };

  const handleFeatureNotAvailable = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Funcionalidade disponível na versão completa.");
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        {/* Accessibility Bar */}
        <div className="bg-primary text-white text-xs py-2 px-4 border-b border-primary-dark">
          <div className="layout-container flex justify-between items-center max-w-7xl mx-auto w-full px-4 md:px-8">
            <div className="flex gap-4">
              <span className="opacity-80">Governo do Distrito Federal</span>
            </div>
            <div className="flex gap-6 font-medium">
              <a className="hover:underline opacity-90 hover:opacity-100 flex items-center gap-1" href="#">
                <span className="material-symbols-outlined text-[16px]">visibility</span> Acessibilidade
              </a>
              <a className="hover:underline opacity-90 hover:opacity-100 flex items-center gap-1" href="#">
                <span className="material-symbols-outlined text-[16px]">contrast</span> Alto Contraste
              </a>
              <a className="hover:underline opacity-90 hover:opacity-100 flex items-center gap-1" href="#">
                <span className="material-symbols-outlined text-[16px]">translate</span> V-Libras
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="border-b border-gray-100">
          <div className="layout-container max-w-7xl mx-auto w-full px-4 md:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4 cursor-pointer" onClick={handleBackToHome}>
              <div className="flex items-center gap-3 text-gray-900">
                <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">account_balance</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-black tracking-tight leading-none text-gray-900">Participa DF</h2>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Ouvidoria Oficial</span>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-700">
              <a className="hover:text-primary transition-colors" href="#" onClick={handleBackToHome}>Início</a>
              <a className="hover:text-primary transition-colors" href="#" onClick={handleFeatureNotAvailable}>Transparência</a>
              <a className="hover:text-primary transition-colors" href="#" onClick={handleFeatureNotAvailable}>Serviços</a>
              <a className="hover:text-primary transition-colors" href="#" onClick={handleFeatureNotAvailable}>Ajuda</a>
            </nav>
            <div className="flex gap-3">
              <button
                onClick={handleLogin}
                aria-label="Entrar na área do cidadão"
                className="hidden sm:flex items-center justify-center h-10 px-6 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-full transition-all shadow-sm gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                <span>Entrar</span>
              </button>
              <button className="md:hidden p-2 text-gray-600">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* VIEW ROUTING */}
      {view === 'HOME' && (
        <>
          {/* Hero Section */}
          <section className="relative bg-white overflow-hidden pb-12 pt-10 md:pt-16 lg:pb-24">
            <div className="absolute inset-0 hero-pattern pointer-events-none"></div>
            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit">
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-bold text-primary tracking-wide uppercase">Participação Social Ativa</span>
                  </div>
                  <h1 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                    Sua voz constrói um <span className="text-primary">Distrito Federal</span> melhor
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    A plataforma oficial de participação social. Registre manifestações, acompanhe protocolos e transforme sua cidade com segurança e transparência.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      onClick={() => handleStartManifestation()}
                      className="flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
                    >
                      Registrar Manifestação
                    </button>
                    <button onClick={handleFeatureNotAvailable} className="flex items-center justify-center h-12 px-8 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary text-base font-bold rounded-lg transition-all w-full sm:w-auto">
                      Saiba como funciona
                    </button>
                  </div>
                </div>
                <div className="relative w-full aspect-[4/3] lg:aspect-square lg:h-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-100 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10"></div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChCP8ptEHoOJhtKRKXxyPPBdcWGwW-lchhXBBBUikNiIYN9CPlOrUB4zd2rYrsYLc_6m0_tTKz1toJe7llLeYL1YKMGKhch0PQYqqBK50e6jyggRHepAYPdg-lqphKj326v8FtTDTud0AuSsIrrnHt_3yzwMKMq2S0IH1wI_Tlq04S92wHx8OcBD_niJ2BZz1MLCQRitVwpabG8b2GTBhxOfxGhOidXeax6HslAyqlCDgndmtX7LY8szIUdHlhX7JOX9tjnvj9YA")' }}
                  >
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search Section */}
          <section className="relative z-20 -mt-10 mb-12 px-4 md:px-8">
            <div className="layout-container max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 md:p-3 border border-gray-100 flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4 h-14 md:h-16 border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-gray-400 text-[24px]">search</span>
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500 text-base ml-2 outline-none"
                    placeholder="Digite o número do protocolo para acompanhar..."
                    type="text"
                    onChange={(e) => setSearchProtocol(e.target.value)}
                    value={searchProtocol}
                  />
                </div>
                <button
                  onClick={handleConsultar}
                  className="h-14 md:h-16 px-8 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Consultar</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="bg-background-light py-16 md:py-24">
            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">Selecione o tipo de manifestação</h2>
                  <p className="text-gray-600 text-lg">Escolha a opção que melhor descreve sua necessidade para iniciarmos o atendimento com agilidade.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Card Denúncia */}
                <div onClick={() => handleStartManifestation(TipoManifestacao.DENUNCIA)} className="cursor-pointer group flex flex-col bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="size-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">warning</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Denúncia</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Relate ilícitos ou irregularidades na administração pública para investigação.</p>
                  <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:underline">
                    Iniciar registro <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                  </div>
                </div>

                {/* Card Reclamação */}
                <div onClick={() => handleStartManifestation(TipoManifestacao.RECLAMACAO)} className="cursor-pointer group flex flex-col bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="size-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">thumb_down</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Reclamação</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Expresse insatisfação com serviços públicos prestados ou atendimento.</p>
                  <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:underline">
                    Iniciar registro <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                  </div>
                </div>

                {/* Card Sugestão */}
                <div onClick={() => handleStartManifestation(TipoManifestacao.SUGESTAO)} className="cursor-pointer group flex flex-col bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="size-14 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">lightbulb</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sugestão</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Envie ideias e propostas inovadoras para melhorar a nossa cidade.</p>
                  <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:underline">
                    Iniciar registro <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                  </div>
                </div>

                {/* Card Elogio */}
                <div onClick={() => handleStartManifestation(TipoManifestacao.ELOGIO)} className="cursor-pointer group flex flex-col bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="size-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">thumb_up</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Elogio</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Reconheça um bom atendimento ou serviço prestado com excelência.</p>
                  <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:underline">
                    Iniciar registro <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Metrics Banner */}
          <section className="bg-primary text-white py-12 md:py-16">
            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                <div className="flex flex-col items-center gap-2 p-4">
                  <span className="text-5xl font-black tracking-tight">1.2M+</span>
                  <span className="text-blue-100 font-medium text-lg">Atendimentos Realizados</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4">
                  <span className="text-5xl font-black tracking-tight">95%</span>
                  <span className="text-blue-100 font-medium text-lg">Taxa de Resposta</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4">
                  <span className="text-5xl font-black tracking-tight">48h</span>
                  <span className="text-blue-100 font-medium text-lg">Tempo Médio de Resposta</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {view === 'CHANNEL_SELECTION' && (
        <ChannelSelection
          onBack={handleBackToHome}
          onSelectChannel={handleChannelSelect}
        />
      )}

      {view === 'REPORT_FORM' && (
        <ReportForm
          onBack={handleBackToChannel}
          initialType={selectedType}
          initialChannel={selectedChannel}
        />
      )}

      {view === 'LOGIN' && (
        <LoginScreen onBack={handleBackToHome} />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6 text-primary">
                <span className="material-symbols-outlined text-[32px]">account_balance</span>
                <span className="text-2xl font-black text-gray-900">Participa DF</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-6">
                O canal oficial de comunicação entre o cidadão e o Governo do Distrito Federal. Sua participação é fundamental para a construção de políticas públicas mais eficientes.
              </p>
              <div className="flex gap-4">
                <a className="size-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </a>
                <a className="size-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Serviços</h4>
              <ul className="flex flex-col gap-3 text-gray-600 text-sm">
                <li><a className="hover:text-primary" href="#">Registrar Manifestação</a></li>
                <li><a className="hover:text-primary" href="#">Acompanhar Protocolo</a></li>
                <li><a className="hover:text-primary" href="#">Painel da Transparência</a></li>
                <li><a className="hover:text-primary" href="#">Carta de Serviços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Ajuda & Suporte</h4>
              <ul className="flex flex-col gap-3 text-gray-600 text-sm">
                <li><a className="hover:text-primary" href="#">Perguntas Frequentes</a></li>
                <li><a className="hover:text-primary" href="#">Manual do Usuário</a></li>
                <li><a className="hover:text-primary" href="#">Política de Privacidade</a></li>
                <li><a className="hover:text-primary" href="#">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2024 Governo do Distrito Federal. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Sistema Operacional</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
