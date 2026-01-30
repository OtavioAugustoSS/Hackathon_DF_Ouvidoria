import React, { useState, useEffect } from 'react';
import ChannelSelection from './components/ChannelSelection';
import ReportForm from './components/ReportForm';
import LoginScreen from './components/LoginScreen';
import TransparencyPage from './components/TransparencyPage';
import ServicesPage from './components/ServicesPage';
import HelpPage from './components/HelpPage';
import ReportsPage from './components/ReportsPage';
import OpenDataPage from './components/OpenDataPage';
import ServiceCharterPage from './components/ServiceCharterPage';
import HowItWorksPage from './components/HowItWorksPage';
import AccessibilityPage from './components/AccessibilityPage';
import AdminDashboard from './components/AdminDashboard';
import { TipoManifestacao, Channel } from './types';
import { User, userStore, Manifestation } from './services/userStore';
import { settingsStore } from './services/settingsStore';
import Toast, { ToastType } from './components/Toast';

type ViewState = 'HOME' | 'TYPE_SELECTION' | 'CHANNEL_SELECTION' | 'REPORT_FORM' | 'LOGIN' | 'TRANSPARENCY' | 'SERVICES' | 'HELP' | 'REPORTS' | 'OPEN_DATA' | 'SERVICE_CHARTER' | 'HOW_IT_WORKS' | 'ACCESSIBILITY' | 'ADMIN_DASHBOARD';

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [selectedType, setSelectedType] = useState<TipoManifestacao | undefined>(undefined);
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(undefined);
  const [searchProtocol, setSearchProtocol] = useState('');
  const [mapKey, setMapKey] = useState(0);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchedManifestation, setSearchedManifestation] = useState<Manifestation | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const globalSettings = settingsStore.getSettings();

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  const handleStartManifestation = (type?: TipoManifestacao) => {
    if (type) {
      setSelectedType(type);
      setView('CHANNEL_SELECTION');
    } else {
      setSelectedType(undefined);
      setView('TYPE_SELECTION');
    }
    window.scrollTo(0, 0);
  };

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    setView('REPORT_FORM');
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

  const handleLoginSuccess = (user: User) => {
    setAuthenticatedUser(user);
    if (user.role === 'admin' || user.role === 'attendant') {
      setView('ADMIN_DASHBOARD');
    } else {
      setView('HOME');
    }
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setIsUserDropdownOpen(false);
    setView('HOME');
    window.scrollTo(0, 0);
  };

  const handleTransparency = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setView('TRANSPARENCY');
    window.scrollTo(0, 0);
  };

  const handleServices = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setView('SERVICES');
    window.scrollTo(0, 0);
  };

  const handleHelp = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setView('HELP');
    window.scrollTo(0, 0);
  };

  const handleReports = () => {
    setView('REPORTS');
    window.scrollTo(0, 0);
  };

  const handleOpenData = () => {
    setView('OPEN_DATA');
    window.scrollTo(0, 0);
  };

  const handleServiceCharter = () => {
    setView('SERVICE_CHARTER');
    window.scrollTo(0, 0);
  };

  const handleBackToTransparency = () => {
    setView('TRANSPARENCY');
    window.scrollTo(0, 0);
  };

  const handleHowItWorks = () => {
    setView('HOW_IT_WORKS');
    window.scrollTo(0, 0);
  };

  const handleAccessibility = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setView('ACCESSIBILITY');
    window.scrollTo(0, 0);
  };

  const toggleHighContrast = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setHighContrast(!highContrast);
  };

  const handleBackToChannel = () => {
    setView('CHANNEL_SELECTION');
    window.scrollTo(0, 0);
  };

  const handleConsultar = () => {
    if (!searchProtocol.trim()) {
      showToast("Por favor, digite um número de protocolo.", 'warning');
      return;
    }
    const found = userStore.findManifestationByProtocol(searchProtocol.trim().toUpperCase());
    if (found) {
      setSearchedManifestation(found);
    } else {
      showToast(`Protocolo ${searchProtocol} não encontrado.`, 'error');
    }
  };

  const handleFeatureNotAvailable = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast("Funcionalidade disponível na versão completa.", 'info');
  };

  const increaseFontSize = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setFontSize(prev => Math.min(prev + 10, 150));
  };

  const decreaseFontSize = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setFontSize(prev => Math.max(prev - 10, 80));
  };

  return (
    <div className={highContrast ? 'high-contrast' : ''}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-primary focus:text-white focus:p-4 focus:rounded-b-lg">
        Pular para o conteúdo principal
      </a>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        {/* Accessibility Bar */}
        <div className="bg-primary text-white text-xs py-2 px-4 border-b border-primary-dark">
          <div className="layout-container flex justify-between items-center max-w-7xl mx-auto w-full px-4 md:px-8">
            <div className="flex gap-4">
              <span className="opacity-80">Governo do Distrito Federal</span>
            </div>
            <div className="flex gap-6 font-medium items-center">
              <div className="flex items-center bg-white/10 rounded-lg overflow-hidden border border-white/20 mr-2">
                <button
                  onClick={decreaseFontSize}
                  className="px-3 py-1 hover:bg-white/20 transition-colors border-r border-white/20 font-bold"
                  title="Diminuir fonte"
                >
                  A-
                </button>
                <button
                  onClick={increaseFontSize}
                  className="px-3 py-1 hover:bg-white/20 transition-colors font-bold"
                  title="Aumentar fonte"
                >
                  A+
                </button>
              </div>
              <a className="hover:underline opacity-90 hover:opacity-100 flex items-center gap-1 cursor-pointer" onClick={toggleHighContrast}>
                <span className="material-symbols-outlined text-[16px]">contrast</span> Alto Contraste
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
                  <h2 className="text-xl font-black tracking-tight leading-none text-gray-900">{globalSettings.portalName}</h2>
                  <span className="text-[10px] theme-text-secondary font-bold uppercase tracking-widest mt-1">Ouvidoria Oficial</span>
                </div>
              </div>
            </div>
            <nav className="hidden lg:flex gap-8 items-center text-sm font-medium">
              <a className={`transition-colors cursor-pointer ${['HOME', 'TYPE_SELECTION', 'CHANNEL_SELECTION', 'REPORT_FORM', 'LOGIN', 'ACCESSIBILITY'].includes(view) ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'}`} onClick={handleBackToHome}>Início</a>
              <a className={`transition-colors cursor-pointer ${['TRANSPARENCY', 'OPEN_DATA', 'SERVICE_CHARTER'].includes(view) ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'}`} onClick={handleTransparency}>Transparência</a>
              <a className={`transition-colors cursor-pointer ${view === 'SERVICES' ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'}`} onClick={handleServices}>Serviços</a>
              <a className={`transition-colors cursor-pointer ${['HELP', 'HOW_IT_WORKS'].includes(view) ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'}`} onClick={handleHelp}>Ajuda</a>
              {authenticatedUser && (
                <a className={`transition-colors cursor-pointer ${view === 'REPORTS' ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'}`} onClick={handleReports}>Minhas Manifestações</a>
              )}
              {authenticatedUser && (authenticatedUser.role === 'admin' || authenticatedUser.role === 'attendant') && (
                <button
                  onClick={() => setView('ADMIN_DASHBOARD')}
                  className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[10px] font-black uppercase hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">shield_person</span>
                  Painel Gestão
                </button>
              )}
            </nav>
            <div className="flex gap-3 relative">
              {!authenticatedUser ? (
                <button
                  onClick={handleLogin}
                  aria-label="Entrar na área do cidadão"
                  className="hidden sm:flex items-center justify-center h-10 px-6 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-full transition-all shadow-sm gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">account_circle</span>
                  <span>Entrar</span>
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"
                  >
                    <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {(authenticatedUser.name || authenticatedUser.username).charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-bold text-gray-900 leading-tight">{authenticatedUser.name || authenticatedUser.username}</span>
                      <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        Cidadão Verificado
                      </span>
                    </div>
                    <span className={`material-symbols-outlined text-gray-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <button
                        onClick={() => { setView('HOME'); setIsUserDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[20px]">person</span>
                        Meu Perfil
                      </button>
                      <button
                        onClick={() => { handleReports(); setIsUserDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[20px]">description</span>
                        Minhas Manifestações
                      </button>
                      {authenticatedUser && (authenticatedUser.role === 'admin' || authenticatedUser.role === 'attendant') && (
                        <button
                          onClick={() => { setView('ADMIN_DASHBOARD'); setIsUserDropdownOpen(false); }}
                          className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-primary/5 flex items-center gap-2 font-bold"
                        >
                          <span className="material-symbols-outlined text-[20px]">shield_person</span>
                          Acessar Painel ADM
                        </button>
                      )}
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold"
                      >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Sair (Log off)
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Abrir menu"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}>
        <aside
          className={`absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col p-8 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <h2 className="font-black text-lg text-gray-900">{globalSettings.portalName}</h2>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="material-symbols-outlined text-gray-400 hover:text-red-500">close</button>
          </div>

          <nav className="flex flex-col gap-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-4">Navegação Principal</p>
            <button
              onClick={() => { setView('HOME'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${view === 'HOME' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="material-symbols-outlined">home</span> Início
            </button>
            <button
              onClick={() => { handleTransparency(); setMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${view === 'TRANSPARENCY' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="material-symbols-outlined">visibility</span> Transparência
            </button>
            <button
              onClick={() => { handleServices(); setMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${view === 'SERVICES' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="material-symbols-outlined">grid_view</span> Serviços
            </button>
            <button
              onClick={() => { handleHelp(); setMobileMenuOpen(false); }}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${view === 'HELP' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="material-symbols-outlined">help</span> Ajuda
            </button>

            {authenticatedUser && (
              <>
                <div className="h-px bg-gray-100 my-4"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-4">Área do Cidadão</p>
                <button
                  onClick={() => { handleReports(); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${view === 'REPORTS' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <span className="material-symbols-outlined">description</span> Minhas Manifestações
                </button>
                {(authenticatedUser.role === 'admin' || authenticatedUser.role === 'attendant') && (
                  <button
                    onClick={() => { setView('ADMIN_DASHBOARD'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-primary hover:bg-primary/5 border border-primary/20"
                  >
                    <span className="material-symbols-outlined">shield_person</span> Painel Administrativo
                  </button>
                )}
              </>
            )}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-100">
            {!authenticatedUser ? (
              <button
                onClick={() => { handleLogin(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined">login</span> Entrar no Sistema
              </button>
            ) : (
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all"
              >
                <span className="material-symbols-outlined">logout</span> Sair da Conta
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* VIEW ROUTING */}
      <main id="main-content">
        {view === 'HOME' && (
          <>
            {/* Hero Section */}
            <section className="relative bg-white overflow-hidden pb-12 pt-10 md:pt-16 lg:pb-24">
              <div className="absolute inset-0 hero-pattern pointer-events-none"></div>
              <div className="layout-container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="flex flex-col gap-6 max-w-2xl">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit ${highContrast ? 'bg-black border-yellow-400' : 'bg-blue-50 border-blue-100'}`}>
                      <span className={`flex h-2 w-2 rounded-full animate-pulse ${highContrast ? 'bg-yellow-400' : 'bg-primary'}`}></span>
                      <span className={`text-xs font-bold tracking-wide uppercase ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>Participação Social Ativa</span>
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
                      <button onClick={handleHowItWorks} className="flex items-center justify-center h-12 px-8 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary text-base font-bold rounded-lg transition-all w-full sm:w-auto">
                        Saiba como funciona
                      </button>
                    </div>
                  </div>
                  <div className="relative w-full aspect-[4/3] lg:aspect-square lg:h-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-100 group">
                    <iframe
                      key={mapKey}
                      title="Mapa da Localização da Ouvidoria - Palácio do Buriti"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.387979678661!2d-47.91526362491501!3d-15.78341698485609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3ae8c7c98007%3A0xe5452f137eb13cc3!2sPal%C3%A1cio%20do%20Buriti!5e0!3m2!1spt-BR!2sbr!4v1706497745771!5m2!1spt-BR!2sbr"
                      className="w-full h-full border-0 absolute inset-0"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <button
                      onClick={() => setMapKey(prev => prev + 1)}
                      className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg shadow-lg border border-gray-200 transition-all flex items-center gap-2 text-xs font-bold z-20"
                      title="Centralizar Mapa na Ouvidoria"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">my_location</span>
                      Centralizar
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Search Section */}
            <section className="relative z-20 -mt-10 mb-12 px-4 md:px-8">
              <div className="layout-container max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 md:p-3 border border-gray-100 flex flex-col md:flex-row gap-2">
                  <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4 h-14 md:h-16 border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-gray-600 text-[24px]">search</span>
                    <input
                      className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-600 text-base ml-2 outline-none"
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

        {view === 'TYPE_SELECTION' && (
          <section className="bg-background-light py-16 md:py-24 animate-in fade-in duration-500">
            <div className="layout-container max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex flex-col gap-6 mb-12">
                <button
                  onClick={handleBackToHome}
                  className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium w-fit"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  Voltar
                </button>
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
        )}

        {view === 'CHANNEL_SELECTION' && (
          <ChannelSelection
            onBack={handleBackToHome}
            onSelectChannel={handleChannelSelect}
            highContrast={highContrast}
          />
        )}

        {view === 'REPORT_FORM' && (
          <ReportForm
            onBack={handleBackToChannel}
            initialType={selectedType}
            initialChannel={selectedChannel}
            authenticatedUser={authenticatedUser}
            showToast={showToast}
            highContrast={highContrast}
          />
        )}

        {view === 'LOGIN' && (
          <LoginScreen
            onBack={handleBackToHome}
            onLoginSuccess={handleLoginSuccess}
            showToast={showToast}
            highContrast={highContrast}
          />
        )}

        {view === 'TRANSPARENCY' && (
          <TransparencyPage
            onBack={handleBackToHome}
            onGoToReports={handleReports}
            onGoToOpenData={handleOpenData}
            onGoToServiceCharter={handleServiceCharter}
          />
        )}

        {view === 'SERVICES' && (
          <ServicesPage onBack={handleBackToHome} highContrast={highContrast} />
        )}

        {view === 'HELP' && (
          <HelpPage onBack={handleBackToHome} />
        )}

        {view === 'REPORTS' && (
          <ReportsPage
            onBack={handleBackToHome}
            authenticatedUser={authenticatedUser}
          />
        )}

        {view === 'OPEN_DATA' && (
          <OpenDataPage onBack={handleBackToTransparency} />
        )}

        {view === 'SERVICE_CHARTER' && (
          <ServiceCharterPage onBack={handleBackToTransparency} />
        )}

        {view === 'HOW_IT_WORKS' && (
          <HowItWorksPage onBack={handleBackToHome} onStartManifestation={() => handleStartManifestation()} />
        )}

        {view === 'ACCESSIBILITY' && (
          <AccessibilityPage onBack={handleBackToHome} />
        )}

        {view === 'ADMIN_DASHBOARD' && (authenticatedUser?.role === 'admin' || authenticatedUser?.role === 'attendant') && (
          <AdminDashboard
            onBack={handleBackToHome}
            authenticatedUser={authenticatedUser}
            showToast={showToast}
            highContrast={highContrast}
          />
        )}

        {/* Manifestation Detail Modal for Search Results */}
        {searchedManifestation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="bg-primary px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined">search_check</span>
                  Detalhes da Manifestação
                </h3>
                <button
                  onClick={() => setSearchedManifestation(null)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">

                {/* Status Badge & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block ${searchedManifestation.status === 'CONCLUÍDO' ? 'bg-green-100 text-green-700' :
                      searchedManifestation.status === 'EM ANÁLISE' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                      {searchedManifestation.status}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900">{searchedManifestation.subject}</h2>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-500 uppercase">Protocolo</span>
                    <span className="text-lg font-mono font-bold text-primary">{searchedManifestation.protocol}</span>
                  </div>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">category</span> Tipo
                    </p>
                    <p className="font-bold text-gray-900">{searchedManifestation.type}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span> Data
                    </p>
                    <p className="font-bold text-gray-900">{searchedManifestation.date}</p>
                  </div>
                  {searchedManifestation.local && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 col-span-2">
                      <p className="text-xs uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span> Local do Fato
                      </p>
                      <p className="text-gray-900 font-bold">{searchedManifestation.local}</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs uppercase font-bold text-gray-900 mb-2 flex items-center gap-2 border-b pb-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                    Relato
                  </p>
                  <div className="p-6 bg-gray-50 rounded-2xl text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100 text-justify">
                    {searchedManifestation.content}
                  </div>
                </div>

                {/* Attachments */}
                {searchedManifestation.attachment && (
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-900 mb-2 flex items-center gap-2 border-b pb-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">attach_file</span>
                      Anexos
                    </p>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      {searchedManifestation.attachment.type.startsWith('image/') ? (
                        <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                          <img
                            src={searchedManifestation.attachment.url}
                            alt="Anexo da manifestação"
                            className="w-full h-auto max-h-96 object-contain bg-gray-200"
                          />
                        </div>
                      ) : searchedManifestation.attachment.type.startsWith('video/') ? (
                        <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                          <video controls className="w-full max-h-96 bg-black">
                            <source src={searchedManifestation.attachment.url} type={searchedManifestation.attachment.type} />
                            Seu navegador não suporta a reprodução de vídeo.
                          </video>
                        </div>
                      ) : searchedManifestation.attachment.type.startsWith('audio/') ? (
                        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                          <audio controls className="w-full">
                            <source src={searchedManifestation.attachment.url} type={searchedManifestation.attachment.type} />
                            Seu navegador não suporta a reprodução de áudio.
                          </audio>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                          <span className="material-symbols-outlined text-gray-400">inventory_2</span>
                          <span className="text-sm font-medium text-gray-700">{searchedManifestation.attachment.name}</span>
                          <a
                            href={searchedManifestation.attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-primary hover:underline text-sm font-bold"
                          >
                            Baixar
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Responses (if any) could go here */}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSearchedManifestation(null)}
                    className="py-3 px-8 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    Fechar
                  </button>
                </div>

              </div>
            </div>
          </div>
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
                <p className="text-gray-600 max-w-sm mb-6">
                  O canal oficial de comunicação entre o cidadão e o Governo do Distrito Federal. Sua participação é fundamental para a construção de políticas públicas mais eficientes.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-6">Serviços</h4>
                <ul className="flex flex-col gap-3 text-gray-600 text-sm">
                  <li><a className="hover:text-primary cursor-pointer" onClick={() => handleStartManifestation()}>Registrar Manifestação</a></li>
                  <li><a className="hover:text-primary cursor-pointer" onClick={handleBackToHome}>Acompanhar Protocolo</a></li>
                  <li><a className="hover:text-primary cursor-pointer" onClick={handleTransparency}>Painel da Transparência</a></li>
                  <li><a className="hover:text-primary cursor-pointer" onClick={handleServiceCharter}>Carta de Serviços</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-6">Ajuda & Suporte</h4>
                <ul className="flex flex-col gap-3 text-gray-600 text-sm">
                  <li><a className="hover:text-primary cursor-pointer" onClick={handleHelp}>Perguntas Frequentes</a></li>
                  <li><a className="hover:text-primary cursor-pointer" onClick={handleHowItWorks}>Manual do Usuário</a></li>
                  <li><a className="hover:text-primary" href="#">Política de Privacidade</a></li>
                  <li><a className="hover:text-primary" href="#">Termos de Uso</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
              <p>© 2024 Governo do Distrito Federal. Todos os direitos reservados.</p>
              <div className="flex gap-6">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Sistema Operacional</span>
              </div>
            </div>
          </div>
        </footer>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Maintenance Mode Overlay */}
        {globalSettings.maintenanceMode && (!authenticatedUser || authenticatedUser.role === 'citizen') && (
          <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-[999] flex flex-col items-center justify-center p-8 text-center">
            <div className="size-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <span className="material-symbols-outlined text-5xl">engineering</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">{globalSettings.portalName}</h2>
            <h3 className="text-xl font-bold text-red-600 mb-6 uppercase tracking-widest">Portal em Manutenção</h3>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Estamos realizando melhorias técnicas no sistema. O acesso para cidadãos está temporariamente suspenso para garantir a integridade dos dados e uma melhor experiência futura.
            </p>
            <div className="mt-10 pt-10 border-t border-gray-100 w-full max-w-xs">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Previsão de Retorno</p>
              <p className="text-sm font-black text-gray-900 mt-1">Hoje às 22:00h</p>
            </div>

            {/* Admin bypass info */}
            <p className="mt-8 text-[10px] text-gray-400 font-medium italic">
              Administradores e Atendentes ainda podem acessar via login direto para testes.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
