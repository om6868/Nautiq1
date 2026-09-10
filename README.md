# ⚓ NautiQ — AI-Powered Green Fleet Optimization

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10B981?style=for-the-badge&logo=github)](https://om6868.github.io/Nautiq1/)
[![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-0284C7?style=for-the-badge)](https://sih.gov.in/)
[![Theme](https://img.shields.io/badge/Theme-Clean%20%26%20Green%20Technology-059669?style=for-the-badge)](#)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **Predict ship fuel consumption and recommend the optimal voyage plan by balancing fuel cost, greenhouse gas emissions, and schedule reliability.**

🌐 **Live Application URL:** [https://om6868.github.io/Nautiq1/](https://om6868.github.io/Nautiq1/)

---

## 🏆 Project Information

* **Team Name:** FlowState
* **Problem Statement ID:** SIH26138
* **Problem Title:** Quantum Inspired Fuel Consumption Prediction and Green Fleet Optimization
* **Theme:** Clean and Green Technology
* **Product Name:** **NautiQ**
* **Motto:** *Predict. Optimize. Decarbonize.*

---

## 📖 About NautiQ

Maritime shipping accounts for **~3% of total global greenhouse gas (GHG) emissions** and consumes over 300 million tons of heavy fossil fuels annually. With incoming **IMO 2030 / 2050 Net-Zero mandates**, **EU ETS maritime carbon levies**, and escalating bunker fuel volatility, fleet operators need intelligent decision support to cut costs and decarbonize their operations.

**NautiQ** is a maritime AI operations platform that:
1. **Predicts instantaneous & voyage-level fuel consumption** using calibrated hydrodynamic physics models and fuel calorific properties.
2. **Optimizes voyage plans** using a **Quantum-Inspired Combinatorial Optimization Engine** that searches 100+ multi-variable states (speed levels, route corridors, alternative green fuels) to find the global Pareto-optimal trade-off between **Cost, Emissions, and Berth Schedule Reliability**.
3. **Enforces Real-World Port Fuel Availability Constraints**, ensuring that clean alternative fuels (Methanol, LNG, Ammonia, Hydrogen) are only recommended if they are verified and physically bunkered at origin and destination terminals.

---

## 🚀 Core Features

### 1. ⚡ Voyage Fuel Prediction (Feature 1)
* **Interactive Parameters:** Vessel Type (*Container Ship, Bulk Carrier, Tanker, LNG Carrier*), Origin/Destination Ports, Voyage Distance (NM), Cruising Speed (knots), Cargo Load (%), and Current Fuel.
* **Instant Deterministic Engine:** Calculates **Fuel Burn (Metric Tons)**, **Bunker Cost (₹ Lakhs / USD)**, **CO₂ Emissions (MT)**, and **Voyage Duration (Hours/Days)**.
* **IMO Carbon Intensity Indicator (CII):** Automatically computes the vessel's regulatory grade (**A, B, C, D, or E**) and EEOI score based on transport work.
* **Physics-Informed Foundations:** Based on Admiralty power laws ($P \propto \Delta^{2/3} \cdot V^{3.05}$) accounting for displacement, auxiliary generator load, and Lower Heating Value (LHV) conversion.

---

### 2. 🌌 NautiQ Voyage Optimizer (Feature 2 — Main Demo)
* **Large Primary Action:** `⚡ Optimize My Voyage`
* **Quantum-Inspired Hamiltonian Solver:** Simulates discrete Quadratic Unconstrained Binary Optimization (QUBO) across speed gradations, navigational lanes, and alternative fuels.
* **3 Candidate Comparison Plans:**
  * **Option 1 — Current Plan:** Baseline operational plan (User's entered speed & fuel).
  * **Option 2 — NautiQ Eco:** Maximum decarbonization plan (Clean fuels + slow-steaming).
  * **Option 3 — NautiQ Balanced (⭐ Recommended):** Sweet spot delivering **11–14% lower fuel cost**, **18–22% lower emissions**, with minimal schedule impact (+0.8 hr ETA absorbed in port buffer).
* **AI Explanations ("View Why This Was Recommended"):**
  1. *Hydrodynamic Speed:* Cubic propulsion resistance reduction.
  2. *Green Fuel Transition:* Lower well-to-wake carbon intensity per MJ.
  3. *Berth Reliability:* Schedule buffer protects terminal window.
  4. *Port Bunkering:* Fuel availability verified at both origin and destination.
* **Technical Drawer:** Mathematical QUBO formulation and PINN neural surrogate details for judges.

---

### 3. 🌿 Green Fuel Scenario Engine & Port Constraints (Feature 3)
* **Multi-Fuel Matrix:** Comparative analysis across 6 marine fuels:
  * **HFO** (Heavy Fuel Oil - 40.2 MJ/kg | 3.11 tCO₂/t)
  * **MGO** (Marine Gas Oil - 42.7 MJ/kg | 3.21 tCO₂/t)
  * **LNG** (Liquefied Natural Gas - 49.2 MJ/kg | 2.75 tCO₂/t)
  * **Methanol** (Green e-Methanol - 19.9 MJ/kg | 1.38 tCO₂/t)
  * **Hydrogen** (Liquid H₂ - 120.0 MJ/kg | 0.05 tCO₂/t)
  * **Ammonia** (Green NH₃ - 18.6 MJ/kg | 0.12 tCO₂/t)
* **Hard Operational Port Constraint:**
  * Interactive bunkering status: `✅ Available`, `⚠️ Limited`, `❌ Unavailable` across major global hubs (Mumbai, Singapore, Rotterdam, Dubai, Shanghai, Colombo).
  * *“NautiQ treats fuel availability as a hard operational constraint.”* — Unavailable fuels are strictly excluded from optimization recommendations.
* **Interactive Carbon Tax Simulator:** Real-time slider ($0 to $250/ton CO₂) demonstrating when green fuels reach economic parity with fossil fuels under global carbon levies.

---

### 4. 📊 Fleet Decarbonization Analytics
* Fleet-wide metrics across 128 active deployments: **12.8% Fuel Saved**, **18.4% Net Carbon Avoided**, **₹3.07 Cr Cumulative Savings**.
* Interactive **Cost vs. Emissions Trade-off** and **Alternative Fuel Carbon Benchmark** visual charts.
* **Maritime Corridor Schematic** with sea state, wave swell, current assistance, and slow-steaming eco zones.

---

## 🎯 60-Second Judge Presentation Walkthrough

1. **Open the Website:** [https://om6868.github.io/Nautiq1/](https://om6868.github.io/Nautiq1/)
2. **Click "🎯 Demo Mode"** in the top navbar:
   * Instantly loads the benchmark scenario: **Mumbai → Singapore**, **Container Ship**, **82% Cargo**, **18 knots**, **HFO**.
3. **Click "⚡ Optimize My Voyage"**:
   * Watch the Quantum-Inspired solver evaluate 100+ permutations in real-time.
4. **Inspect the "⭐ NautiQ Recommended" Plan**:
   * See the sweet spot recommendation: **Switch to Methanol + Adjust Speed to 16.8 knots**.
   * Note the savings: **12% Fuel Saved**, **19% Emission Cut**, **+0.8 hr ETA buffer**.
5. **Click "View Why This Was Recommended"**:
   * Walk through the 4 operational AI rationales.
6. **Navigate to "Fuel Scenarios"**:
   * Show how unavailable fuels (like Hydrogen in Mumbai) are pruned by the port constraint.
   * Slide the **Carbon Tax Simulator** to show green fuel profitability under IMO regulations.

---

## 📐 Mathematical Formulation

### 1. Hydrodynamic Power & Fuel Consumption Model
$$P_{\text{prop}} = \frac{\Delta^{2/3} \cdot V^{3.05}}{C_{\text{adm}}} \cdot \eta_{\text{weather}}$$
$$\text{Fuel}_{\text{burn}} (\text{MT}) = \left(\frac{P_{\text{prop}} \cdot \text{SFOC}_{\text{base}} \cdot \text{LHV}_{\text{HFO}}}{\text{LHV}_{\text{fuel}}} + P_{\text{aux}}\right) \cdot \frac{\text{Distance}}{V \cdot 24}$$

### 2. Quantum Multi-Objective Hamiltonian (QUBO)
$$\min_{s \in \mathcal{S}} \mathcal{H}(s) = w_{\text{cost}} \cdot \frac{C(s)}{C_0} + w_{\text{co2}} \cdot \frac{E(s)}{E_0} + w_{\text{time}} \cdot \left(1 + \frac{\max(0, T(s) - T_0)}{\tau_{\text{buffer}}}\right) + \lambda \cdot P_{\text{unavail}}(s)$$

Where:
* $C(s)$ = Bunker cost of candidate state $s$
* $E(s)$ = Well-to-wake lifecycle CO₂ emissions
* $T(s)$ = Transit duration vs baseline buffer window $\tau_{\text{buffer}}$
* $P_{\text{unavail}}(s) \in \{0, 1\}$ = Hard penalty for ports without bunkering infrastructure ($\lambda \to \infty$)

---

## 💻 Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18 (Hooks, Strict Mode, Modular Components) |
| **Language** | TypeScript 5.7 (Strict Type Safety) |
| **Styling & Theme** | Tailwind CSS 3.4, Custom Maritime Glassmorphism (`#070C18`, `#0B132B`, `#10B981`) |
| **Data Visualization** | Recharts 2.15 (Responsive Bar, Tooltips, Custom Legends), Lucide React Icons |
| **Build & Tooling** | Vite 6.1 (ESBuild, Fast HMR), PostCSS, Autoprefixer |
| **CI/CD Deployment** | GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages |

---

## 🛠️ Local Development Setup

Follow these steps to run the application locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/om6868/Nautiq1.git

# 2. Navigate to project directory
cd Nautiq1

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Open in browser
# Visit http://localhost:5173
```

### Production Build
```bash
# Compile TypeScript and build minified production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 👥 Team FlowState — SIH 2026

* **Product:** NautiQ
* **Problem Statement:** SIH26138 — Quantum Inspired Fuel Consumption Prediction and Green Fleet Optimization
* **Theme:** Clean and Green Technology

---

<div align="center">
  <sub>Built with 💚 by <strong>Team FlowState</strong> for Smart India Hackathon 2026. Prototype powered by physics-calibrated deterministic algorithms and simulated AIS fleet data.</sub>
</div>
