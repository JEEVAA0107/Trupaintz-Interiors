import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, ShieldCheck, HardHat, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAsDemoClient, loginAsDemoManager, loginWithCredentials } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'client' | 'manager'>('client');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    loginWithCredentials(email, role, name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
        
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 rounded-full bg-neutral-100 p-2 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-6">
          <span className="font-display text-xl font-bold text-amber-600 dark:text-amber-400">
            TruPaintz &amp; Interiors
          </span>
          <h3 className="font-display text-2xl font-bold text-neutral-950 dark:text-white mt-1">
            {mode === 'login' ? 'Project Portal Login' : 'Create Homeowner Account'}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Access your live renovation milestones, approved swatches, or PM operations.
          </p>
        </div>

        {/* Quick Demo Access Switchers */}
        <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-3 mb-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            One-Click Instant Preview Profiles:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={loginAsDemoClient}
              className="flex items-center gap-2 rounded-lg border border-amber-500/40 bg-white dark:bg-neutral-900 p-2 text-left text-xs text-neutral-900 dark:text-white hover:border-amber-500 transition-colors"
            >
              <User className="h-4 w-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-semibold block leading-tight">Client Mode</span>
                <span className="text-[10px] text-neutral-400">Rajesh Sharma</span>
              </div>
            </button>

            <button
              onClick={loginAsDemoManager}
              className="flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-2 text-left text-xs text-neutral-900 dark:text-white hover:border-amber-500 transition-colors"
            >
              <HardHat className="h-4 w-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-semibold block leading-tight">Manager Mode</span>
                <span className="text-[10px] text-neutral-400">Arun Kumar</span>
              </div>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priyadarshini Rao"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. client@example.com"
              className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Portal Account Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`py-2 text-xs rounded-xl border font-medium ${
                  role === 'client'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-500'
                }`}
              >
                Homeowner / Client
              </button>
              <button
                type="button"
                onClick={() => setRole('manager')}
                className={`py-2 text-xs rounded-xl border font-medium ${
                  role === 'manager'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-500'
                }`}
              >
                Site Project Manager
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shadow-md"
          >
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Create & Access Account'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-500">
          {mode === 'login' ? (
            <span>
              Don't have an active project account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-amber-600 dark:text-amber-400 font-semibold underline"
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-amber-600 dark:text-amber-400 font-semibold underline"
              >
                Sign In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
