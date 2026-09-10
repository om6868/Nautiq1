import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { KpiOverview } from './components/KpiOverview';
import { FuelPredictionCard } from './components/FuelPredictionCard';
import { VoyageOptimizer } from './components/VoyageOptimizer';
import { FuelScenarioEngine } from './components/FuelScenarioEngine';
import { FleetAnalytics } from './components/FleetAnalytics';
import { AlgorithmComparison } from './components/AlgorithmComparison';
import { ImpactFooter } from './components/ImpactFooter';
import { VoyageInput } from './types';
import { Sparkles, X } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  const [showDemoToast, setShowDemoToast] = useState<boolean>(false);

  // Default initial scenario (Mumbai -> Singapore Container Ship)
  const [voyageInput, setVoyageInput] = useState<VoyageInput>({
    vesselType: 'Container Ship',
    originPortId: 'mumbai',
    destPortId: 'singapore',
    distanceNM: 3200,
    speedKnots: 18.0,
    cargoLoadPct: 82,
    fuelType: 'HFO'
  });

  // Demo Mode autofill trigger
  const handleTriggerDemoMode = () => {
    setVoyageInput({
      vesselType: 'Container Ship',
      originPortId: 'mumbai',
      destPortId: 'singapore',
      distanceNM: 3200,
      speedKnots: 18.0,
      cargoLoadPct: 82,
      fuelType: 'HFO'
    });
    setIsDemoActive(true);
    setShowDemoToast(true);
    setActiveTab('optimizer');

    setTimeout(() => {
      setShowDemoToast(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F4] text-[#1F2937] flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTriggerDemoMode={handleTriggerDemoMode}
        isDemoActive={isDemoActive}
      />

      {/* Demo Mode Notification Toast */}
      {showDemoToast && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#D9E2DE] text-xs text-[#1F2937] shadow-sm">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#258F87] shrink-0" />
              <span>
                <strong>Demo Scenario Loaded:</strong> Mumbai → Singapore | Container Ship (82% Cargo, 18 kts, HFO). Click <strong>Optimize My Voyage</strong> to view recommendations.
              </span>
            </div>
            <button
              onClick={() => setShowDemoToast(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Dynamic Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Fleet KPIs & Active Voyage */}
            <KpiOverview
              onOptimizeCurrentVoyage={() => setActiveTab('optimizer')}
              onNavigateToPrediction={() => setActiveTab('prediction')}
              currentVoyage={voyageInput}
            />

            {/* Quick-Access Section 1: Voyage Optimizer */}
            <div className="pt-2">
              <VoyageOptimizer
                voyageInput={voyageInput}
                setVoyageInput={setVoyageInput}
              />
            </div>
          </div>
        )}

        {activeTab === 'prediction' && (
          <FuelPredictionCard
            voyageInput={voyageInput}
            setVoyageInput={setVoyageInput}
            onGoToOptimizer={() => setActiveTab('optimizer')}
          />
        )}

        {activeTab === 'optimizer' && (
          <VoyageOptimizer
            voyageInput={voyageInput}
            setVoyageInput={setVoyageInput}
          />
        )}

        {activeTab === 'scenarios' && (
          <FuelScenarioEngine
            voyageInput={voyageInput}
            setVoyageInput={setVoyageInput}
            onGoToOptimizer={() => setActiveTab('optimizer')}
          />
        )}

        {activeTab === 'analytics' && (
          <FleetAnalytics
            voyageInput={voyageInput}
          />
        )}

        {activeTab === 'benchmarks' && (
          <AlgorithmComparison
            voyageInput={voyageInput}
            onGoToOptimizer={() => setActiveTab('optimizer')}
          />
        )}

        {/* Global Impact Footer */}
        <ImpactFooter />
      </main>
    </div>
  );
}

export default App;
