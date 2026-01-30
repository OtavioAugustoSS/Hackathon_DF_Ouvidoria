import React, { useState } from 'react';
import { userStore, User } from '../services/userStore';
import { ToastType } from './Toast';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (user: User) => void;
  showToast: (message: string, type: ToastType) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLoginSuccess, showToast }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    // If it's a numeric-only input or looks like a CPF, apply mask. 
    // Otherwise allow administrative usernames like 'ad'
    if (/^\d/.test(e.target.value) || e.target.value === '') {
      setLoginIdentifier(formatted);
    } else {
      setLoginIdentifier(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering) {
      if (!loginIdentifier || !fullName || !password) {
        showToast('Por favor, preencha todos os campos.', 'warning');
        return;
      }

      // loginIdentifier is the CPF in registration mode
      const existingUser = userStore.findUser(loginIdentifier);
      if (existingUser) {
        showToast('Este CPF já está cadastrado.', 'error');
        return;
      }

      const newUser: User = {
        username: loginIdentifier, // CPF as username for consistency
        cpf: loginIdentifier,
        password,
        name: fullName,
        role: 'citizen'
      };
      userStore.addUser(newUser);
      showToast('Cadastro realizado com sucesso! Agora você pode entrar.', 'success');
      setIsRegistering(false);
      setPassword('');
    } else {
      const user = userStore.authenticate(loginIdentifier, password);
      if (user) {
        showToast(`Bem-vindo, ${user.name || user.username}! Login realizado com sucesso.`, 'success');
        onLoginSuccess(user);
      } else {
        showToast('Credenciais inválidas. Verifique seu CPF e senha.', 'error');
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full text-primary mb-4">
            <span className="material-symbols-outlined text-[32px]">{isRegistering ? 'person_add' : 'lock'}</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {isRegistering ? 'Criar Conta' : 'Entrar'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isRegistering
              ? 'Cadastre-se com seu CPF para acompanhar suas manifestações'
              : 'Acesse com seu CPF para acompanhar suas manifestações'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {/* Honeypot to prevent autofill leakage */}
          <input type="text" name="prevent_autofill_id" style={{ display: 'none' }} />
          <input type="password" name="prevent_autofill_password" style={{ display: 'none' }} />
          <input type="text" name="fake_usernameremembered" style={{ display: 'none' }} />

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">CPF</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">fingerprint</span>
              <input
                type="text"
                required
                className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-900"
                placeholder="000.000.000-00"
                value={loginIdentifier}
                onChange={handleLoginChange}
                autoComplete="off"
                name="user_login_cpf_unique"
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
              />
            </div>
          </div>

          {isRegistering && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nome Completo</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">person</span>
                <input
                  type="text"
                  required
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-900"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="off"
                  name="user_register_fullname_unique"
                  readOnly
                  onFocus={(e) => e.target.removeAttribute('readonly')}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Senha</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">key</span>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full h-12 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                name="user_password_unique"
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            {isRegistering ? 'Cadastrar' : 'Entrar'}
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setLoginIdentifier(''); // Clear state on toggle
                setPassword('');
                setFullName('');
              }}
              className="font-bold text-primary hover:text-primary-dark transition-colors"
            >
              {isRegistering ? 'Entre aqui' : 'Cadastre-se'}
            </button>
          </p>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100">
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
