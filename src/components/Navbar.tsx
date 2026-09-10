import React from 'react';
import { Anchor, Sparkles, Compass, ShieldCheck, Zap, BarChart3, Layers, Fuel } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTriggerDemoMode: () => void;
  isDemoActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onTriggerDemoMode,
  isDemoActive
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'prediction', label: 'Fuel Prediction', icon: Zap },
    { id: 'optimizer', label: 'Voyage Optimizer', icon: Sparkles },
    { id: 'scenarios', label: 'Fuel Scenarios', icon: Fuel },
    { id: 'analytics', label: 'Fleet Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070C18]/90 backdrop-blur-md border-b border-sky-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Subtitle */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-400 p-[2px] shadow-lg shadow-sky-500/20">
              <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                <Anchor className="w-6 h-6 text-emerald-400 transform -rotate-12" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-white font-mono">
                  Nauti<span className="text-emerald-400">Q</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  SIH 2026
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
                  by <strong className="text-slate-200">FlowState</strong>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                AI-Powered Green Fleet Optimization • <span className="text-sky-400 font-semibold">Predict. Optimize. Decarbonize.</span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Demo Mode Button & Problem Statement Tag */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onTriggerDemoMode}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md ${
                isDemoActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                  : 'bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white shadow-sky-500/20'
              }`}
              title="Preload polished judge benchmark scenario (Mumbai → Singapore Container Ship)"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>🎯 Demo Mode</span>
            </button>

            <div className="hidden lg:flex flex-col items-end text-right pl-2 border-l border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono">PROBLEM STATEMENT</span>
              <span className="text-xs font-bold text-slate-200 font-mono">SIH26138</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
