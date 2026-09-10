# ⚓ NautiQ — AI-Powered Green Fleet Optimization

**Smart India Hackathon 2026**  
- **Team:** FlowState  
- **Problem Statement ID:** SIH26138 – Quantum Inspired Fuel Consumption Prediction and Green Fleet Optimization  
- **Theme:** Clean and Green Technology  

> **Predict ship fuel consumption and recommend the best voyage plan by balancing fuel cost, emissions and schedule reliability.**

---

## 🌊 Core Features

1. **Voyage Fuel Prediction (Feature 1)**:
   - Physics-informed deterministic hydrodynamic model calibrated with speed-power cubic curve ($P \propto \Delta^{2/3} \cdot V^3$).
   - Calculates estimated fuel burn (MT), bunker cost (₹ / $), greenhouse gas emissions (MT CO₂e), and IMO Carbon Intensity Indicator (CII Grade A–E).

2. **NautiQ Voyage Optimizer (Feature 2 — Main Demo)**:
   - Quantum-inspired combinatorial multi-objective solver evaluating 100+ voyage permutations across Speed levels $\times$ Route corridors $\times$ Fuel types.
   - Generates and compares 3 plans:
     - **Option 1 — Current Plan** (Baseline)
     - **Option 2 — NautiQ Eco** (Emissions-first)
     - **Option 3 — NautiQ Balanced (⭐ NautiQ Recommended)**
   - Explains AI rationales via *"View Why This Was Recommended"* and exposes the QUBO mathematical Hamiltonian matrix for technical evaluation.

3. **Green Fuel Scenario Engine (Feature 3)**:
   - Benchmarks 6 fuels: **HFO, MGO, LNG, Methanol, Hydrogen, Ammonia**.
   - **Hard Operational Constraint**: Real-time port bunkering checks (✅ Available, ⚠️ Limited, ❌ Unavailable). Unavailable fuels at origin/destination are strictly prohibited from recommendation.
   - **Interactive Carbon Tax Simulator**: Simulates IMO/EU ETS carbon levies ($0–$250/ton CO₂) to test clean fuel economic parity.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Custom Maritime Glassmorphism
- **Visualizations:** Recharts, Lucide React
- **Deployment:** GitHub Pages / GitHub Actions

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git

# Navigate to directory
cd <repo-name>

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:5173` to explore the dashboard.

---

## 📄 License & Disclaimer

Developed by **Team FlowState** for SIH 2026. Prototype uses simulated hydrodynamic and weather parameters for live demonstration.
