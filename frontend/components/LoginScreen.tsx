import React, { useState } from 'react';

interface LoginScreenProps {
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for login would go here
    console.log('Login attempt with:', { identifier, password });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full text-primary mb-4">
            <span className="material-symbols-outlined text-[32px]">lock</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Entrar</h2>
          <p className="text-gray-500 mt-2">Acesse sua conta para acompanhar suas manifestações</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">CPF ou E-mail</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">person</span>
              <input
                type="text"
                required
                className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-900"
                placeholder="000.000.000-00 ou seu@email.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Senha</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">key</span>
              <input
                type="password"
                required
                className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="size-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Lembrar de mim</span>
            </label>
            <a href="#" className="font-bold text-primary hover:text-primary-dark transition-colors">Esqueceu a senha?</a>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-center text-gray-500 text-sm mb-6">Ou entre com sua conta institucional</p>
          <button className="w-full h-12 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all mb-4">
            <img src="https://www.gov.br/++theme++padrao_govbr/img/govbr-logo-large.png" alt="Gov.br" className="h-6" />
            Entrar com Gov.br
          </button>
          
          <button 
            onClick={onBack}
            className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Voltar para o Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
