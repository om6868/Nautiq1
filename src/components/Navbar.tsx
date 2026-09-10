import React from 'react';
import { Anchor, Sparkles, Compass, Zap, BarChart3, Fuel } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-[#0B132B] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Anchor className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              Nauti<span className="text-teal-400">Q</span>
            </span>
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
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-teal-300 border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Demo Mode Action Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onTriggerDemoMode}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                isDemoActive
                  ? 'bg-teal-700 text-white border border-teal-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              title="Preload sample scenario (Mumbai → Singapore Container Ship)"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Demo Mode</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
