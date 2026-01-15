import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

// --- Icons ---
const Home = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const Bug = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/>
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/>
    <path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/>
    <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>
  </svg>
);

const AlertCircle = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const PlayCircle = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
  </svg>
);

const RotateCcw = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
  </svg>
);

const Zap = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const TrendingUp = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

const Users = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Pause = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const Play = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const Flame = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const Target = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const Spray = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h.01"/><path d="M7 5h.01"/><path d="M11 7h.01"/><path d="M3 7h.01"/><path d="M7 9h.01"/><path d="M3 11h.01"/>
    <rect x="15" y="5" width="4" height="2" rx="1"/><path d="M17 5V3"/><path d="M17 7v4"/>
    <rect x="13" y="11" width="8" height="10" rx="1"/>
  </svg>
);

const BedBugIcon = ({ active }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" className={`inline-block transition-transform ${active ? 'scale-110' : ''}`}>
    <ellipse cx="20" cy="23" rx="11" ry="7" fill={active ? "#991b1b" : "#8B3A3A"} opacity="0.2"/>
    <ellipse cx="20" cy="20" rx="10" ry="13" fill="#8B3A3A"/>
    <ellipse cx="20" cy="20" rx="9" ry="12" fill="#A94442"/>
    <line x1="13" y1="18" x2="8" y2="15" stroke="#6D2828" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="22" x2="7" y2="22" stroke="#6D2828" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="27" y1="18" x2="32" y2="15" stroke="#6D2828" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="27" y1="22" x2="33" y2="22" stroke="#6D2828" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="20" cy="11" rx="4" ry="3" fill="#8B3A3A"/>
  </svg>
);

const pestData = {
  german_roach: {
    name: 'German Roach', icon: '🪳', color: '#dc2626',
    gestationDays: 28,
    eggsPerOotheca: 35,
    sexualMaturityDays: 60,
    adultLifespanDaysFemale: 200,
    reproductionInterval: 28,
    lifetimeEggCap: 210,
    eggSurvivalRate: 0.90,
    juvenileSurvivalRate: 0.50,
    adultMonthlyMortality: 0.15
  },
  bed_bug: {
    name: 'Bed Bug', icon: 'custom', color: '#991b1b',
    gestationDays: 8,
    eggsPerBatch: 14,
    sexualMaturityDays: 37,
    adultLifespanDaysFemale: 180,
    reproductionInterval: 7,
    lifetimeEggCap: 350,
    eggSurvivalRate: 0.97,
    juvenileSurvivalRate: 0.82,
    adultMonthlyMortality: 0.10
  },
  rat: {
    name: 'Roof Rat', icon: '🐀', color: '#7c2d12',
    gestationDays: 22,
    pupsPerLitter: 6,
    sexualMaturityDays: 84,
    adultLifespanDaysFemale: 365,
    reproductionInterval: 91,
    lifetimeEggCap: null,
    eggSurvivalRate: 1.0,
    juvenileSurvivalRate: 0.75,
    adultMonthlyMortality: 0.08
  },
  mouse: {
    name: 'House Mouse', icon: '🐁', color: '#92400e',
    gestationDays: 19,
    pupsPerLitter: 6,
    sexualMaturityDays: 35,
    adultLifespanDaysFemale: 365,
    reproductionInterval: 46,
    lifetimeEggCap: null,
    eggSurvivalRate: 1.0,
    juvenileSurvivalRate: 0.70,
    adultMonthlyMortality: 0.12
  }
};

export default function PestReproductionApp() {
  const [selectedPest, setSelectedPest] = useState('german_roach');
  const [startingFemales, setStartingFemales] = useState(2);
  const [startingMales, setStartingMales] = useState(2);
  const [timeframeMonths, setTimeframeMonths] = useState(6);
  const [femalesStartPregnant, setFemalesStartPregnant] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [heatEnabled, setHeatEnabled] = useState(false);
  const [heatMonth, setHeatMonth] = useState(2);
  const [heatKillRate, setHeatKillRate] = useState(95);
  const [trappingEnabled, setTrappingEnabled] = useState(false);
  const [trappingMonth, setTrappingMonth] = useState(2);
  const [trappingKillRate, setTrappingKillRate] = useState(70);
  const [baitEnabled, setBaitEnabled] = useState(false);
  const [baitMonth, setBaitMonth] = useState(2);
  const [baitKillRate, setBaitKillRate] = useState(85);
  const [simulationKey, setSimulationKey] = useState(0);
  const [showMethodology, setShowMethodology] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const [results, setResults] = useState({
    withHeatData: [],
    withoutHeatData: [],
    heatStats: null
  });

  const timeframe = timeframeMonths * 30;
  const pest = pestData[selectedPest];

  // Clamp treatment months to not exceed timeframe
  useEffect(() => {
    if (heatMonth > timeframeMonths) {
      setHeatMonth(timeframeMonths);
    }
    if (trappingMonth > timeframeMonths) {
      setTrappingMonth(timeframeMonths);
    }
    if (baitMonth > timeframeMonths) {
      setBaitMonth(timeframeMonths);
    }
  }, [timeframeMonths, heatMonth, trappingMonth, baitMonth]);

  useEffect(() => {
    if (!isSimulating) return;

    // Seeded random for consistent comparison between runs
    const createSeededRandom = (seed) => {
      let state = seed;
      return () => {
        state = (state * 1103515245 + 12345) & 0x7fffffff;
        return state / 0x7fffffff;
      };
    };

    const simulate = (shouldApplyTreatment, randomSeed) => {
      const random = createSeededRandom(randomSeed);
      const heatDay = (shouldApplyTreatment && selectedPest === 'bed_bug') ? (heatMonth - 1) * 30 + 1 : null;
      const trappingDay = (shouldApplyTreatment && (selectedPest === 'rat' || selectedPest === 'mouse')) ? (trappingMonth - 1) * 30 + 1 : null;
      let stats = null;
      
      let females = [];
      let males = [];
      let juveniles = [];
      let idCounter = 0;
      
      for (let i = 0; i < startingFemales; i++) {
        females.push({
          id: idCounter++,
          birthDay: -pest.sexualMaturityDays,
          lastRepro: femalesStartPregnant ? -pest.reproductionInterval : -9999,
          deathDay: pest.adultLifespanDaysFemale,
          lifetimeEggs: 0
        });
      }
      for (let i = 0; i < startingMales; i++) {
        males.push({
          id: idCounter++,
          birthDay: -pest.sexualMaturityDays,
          deathDay: pest.adultLifespanDaysFemale
        });
      }
      
      const data = [{
        day: 0,
        total: startingFemales + startingMales,
        females: startingFemales,
        males: startingMales,
        juveniles: 0
      }];

      for (let day = 1; day <= timeframe; day++) {
        
        if (heatDay && day === heatDay) {
          const bornJuvs = juveniles.filter(j => j.birthDay <= day);
          const beforeTotal = females.length + males.length + bornJuvs.length;
          
          const killPercent = heatKillRate / 100;
          const keepPercent = 1 - killPercent;
          
          const newFemaleCount = Math.max(females.length > 0 ? 1 : 0, Math.round(females.length * keepPercent));
          const newMaleCount = Math.max(males.length > 0 ? 1 : 0, Math.round(males.length * keepPercent));
          const newJuvCount = Math.max(juveniles.length > 0 ? 1 : 0, Math.round(juveniles.length * keepPercent));
          
          females = females.slice(0, newFemaleCount);
          males = males.slice(0, newMaleCount);
          juveniles = juveniles.slice(0, newJuvCount);
          
          const bornJuvsAfter = juveniles.filter(j => j.birthDay <= day);
          const afterTotal = females.length + males.length + bornJuvsAfter.length;
          
          stats = {
            day,
            before: beforeTotal,
            after: afterTotal,
            killed: beforeTotal - afterTotal,
            killRate: heatKillRate,
            type: 'heat'
          };
        }

        // === TRAPPING TREATMENT (for rats/mice) ===
        if (trappingDay && day === trappingDay) {
          const bornJuvs = juveniles.filter(j => j.birthDay <= day);
          const beforeTotal = females.length + males.length + bornJuvs.length;
          
          const killPercent = trappingKillRate / 100;
          const keepPercent = 1 - killPercent;
          
          const newFemaleCount = Math.max(females.length > 0 ? 1 : 0, Math.round(females.length * keepPercent));
          const newMaleCount = Math.max(males.length > 0 ? 1 : 0, Math.round(males.length * keepPercent));
          const newJuvCount = Math.max(juveniles.length > 0 ? 1 : 0, Math.round(juveniles.length * keepPercent));
          
          females = females.slice(0, newFemaleCount);
          males = males.slice(0, newMaleCount);
          juveniles = juveniles.slice(0, newJuvCount);
          
          const bornJuvsAfter = juveniles.filter(j => j.birthDay <= day);
          const afterTotal = females.length + males.length + bornJuvsAfter.length;
          
          stats = {
            day,
            before: beforeTotal,
            after: afterTotal,
            killed: beforeTotal - afterTotal,
            killRate: trappingKillRate,
            type: 'trapping'
          };
        }

        if (day % 30 === 0) {
          const adultSurvival = 1 - (pest.adultMonthlyMortality || 0);
          females = females.filter(() => random() < adultSurvival);
          males = males.filter(() => random() < adultSurvival);
        }

        const matured = juveniles.filter(j => (day - j.birthDay) >= pest.sexualMaturityDays);
        juveniles = juveniles.filter(j => (day - j.birthDay) < pest.sexualMaturityDays);
        
        const juvenileSurvivalRate = pest.juvenileSurvivalRate || 1.0;
        
        matured.forEach(j => {
          if (random() < juvenileSurvivalRate) {
            if (j.sex === 'female') {
              females.push({ ...j, lastRepro: day, deathDay: day + pest.adultLifespanDaysFemale, lifetimeEggs: 0 });
            } else {
              males.push({ ...j, deathDay: day + pest.adultLifespanDaysFemale });
            }
          }
        });

        females = females.filter(f => day < f.deathDay);
        males = males.filter(m => day < m.deathDay);

        const totalPop = females.length + males.length + juveniles.length;
        if (males.length > 0 && totalPop < 150000) {
          females.forEach(f => {
            if ((day - f.lastRepro) >= pest.reproductionInterval) {
              const hasCapacity = !pest.lifetimeEggCap || f.lifetimeEggs < pest.lifetimeEggCap;
              
              if (hasCapacity) {
                f.lastRepro = day;
                const baseEggCount = pest.eggsPerOotheca || pest.eggsPerBatch || pest.pupsPerLitter || 5;
                
                let eggCount = baseEggCount;
                if (pest.lifetimeEggCap) {
                  const remaining = pest.lifetimeEggCap - f.lifetimeEggs;
                  eggCount = Math.min(baseEggCount, remaining);
                }
                
                f.lifetimeEggs = (f.lifetimeEggs || 0) + eggCount;
                
                const eggSurvivalRate = pest.eggSurvivalRate || 1.0;
                
                for (let e = 0; e < eggCount; e++) {
                  if (random() < eggSurvivalRate) {
                    juveniles.push({
                      id: idCounter++,
                      birthDay: day + pest.gestationDays,
                      sex: idCounter % 2 === 0 ? 'female' : 'male'
                    });
                  }
                }
              }
            }
          });
        }

        const bornJuveniles = juveniles.filter(j => j.birthDay <= day);
        const currentTotal = females.length + males.length + bornJuveniles.length;
        
        data.push({
          day,
          total: currentTotal,
          females: females.length,
          males: males.length,
          juveniles: bornJuveniles.length
        });

        if (currentTotal > 150000) break;
      }

      return { data, stats };
    };

    // Use same seed for reproducibility
    const seed = simulationKey * 12345 + 67890;
    
    // Only run baseline simulation - treatment comparison is calculated dynamically
    const baselineResult = simulate(false, seed);

    setResults({
      withHeatData: baselineResult.data,
      withoutHeatData: [],
      heatStats: null
    });

  }, [isSimulating, simulationKey]);

  useEffect(() => {
    if (isAnimating && currentDay < timeframe) {
      const timer = setTimeout(() => setCurrentDay(d => Math.min(d + 2, timeframe)), 20);
      return () => clearTimeout(timer);
    } else if (currentDay >= timeframe) {
      setIsAnimating(false);
    }
  }, [isAnimating, currentDay, timeframe]);

  const { withHeatData, withoutHeatData, heatStats } = results;

  // Calculate treatment comparison dynamically from baseline data
  const treatmentComparison = useMemo(() => {
    if (!withHeatData || withHeatData.length === 0) return null;
    
    const isBedBug = selectedPest === 'bed_bug';
    const isRodent = selectedPest === 'rat' || selectedPest === 'mouse';
    const isRoach = selectedPest === 'german_roach';
    
    if ((isBedBug && !heatEnabled) || (isRodent && !trappingEnabled) || (isRoach && !baitEnabled)) {
      return null;
    }
    
    let treatmentMonth, killRate, treatmentType;
    if (isBedBug) {
      treatmentMonth = heatMonth;
      killRate = heatKillRate;
      treatmentType = 'heat';
    } else if (isRodent) {
      treatmentMonth = trappingMonth;
      killRate = trappingKillRate;
      treatmentType = 'trapping';
    } else if (isRoach) {
      treatmentMonth = baitMonth;
      killRate = baitKillRate;
      treatmentType = 'bait';
    }
    
    const treatmentDay = (treatmentMonth - 1) * 30 + 1;
    
    // Find the data point at treatment day
    const treatmentIndex = withHeatData.findIndex(d => d.day >= treatmentDay);
    if (treatmentIndex === -1) return null;
    
    const beforeData = withHeatData[treatmentIndex];
    const beforeTotal = beforeData.total;
    const keepRate = (100 - killRate) / 100;
    
    // Calculate survivors
    const survivorFemales = Math.max(1, Math.round(beforeData.females * keepRate));
    const survivorMales = Math.max(1, Math.round(beforeData.males * keepRate));
    const survivorJuveniles = Math.max(1, Math.round(beforeData.juveniles * keepRate));
    const afterTotal = survivorFemales + survivorMales + survivorJuveniles;
    
    // Calculate treated population trajectory
    const treatedData = withHeatData.map((point, idx) => {
      if (point.day < treatmentDay) {
        return { ...point, treatedTotal: point.total };
      }
      
      const originalAtTreatment = beforeTotal;
      const treatedAtTreatment = afterTotal;
      
      if (originalAtTreatment === 0) return { ...point, treatedTotal: 0 };
      
      const growthFactor = point.total / originalAtTreatment;
      const treatedTotal = Math.round(treatedAtTreatment * growthFactor);
      
      return { ...point, treatedTotal };
    });
    
    return {
      data: treatedData,
      stats: {
        day: treatmentDay,
        before: beforeTotal,
        after: afterTotal,
        killed: beforeTotal - afterTotal,
        killRate: killRate,
        type: treatmentType
      }
    };
  }, [withHeatData, selectedPest, heatEnabled, trappingEnabled, baitEnabled, heatMonth, trappingMonth, baitMonth, heatKillRate, trappingKillRate, baitKillRate]);

  const currentStats = useMemo(() => {
    if (!withHeatData || withHeatData.length === 0) {
      return { day: 0, total: startingFemales + startingMales, females: startingFemales, males: startingMales, juveniles: 0 };
    }
    const idx = withHeatData.findIndex(d => d.day > currentDay);
    return idx === -1 ? withHeatData[withHeatData.length - 1] : withHeatData[Math.max(0, idx - 1)];
  }, [currentDay, withHeatData, startingFemales, startingMales]);

  const visibleData = useMemo(() => withHeatData.filter(d => d.day <= currentDay), [withHeatData, currentDay]);
  
  const chartData = useMemo(() => {
    if (!treatmentComparison) return visibleData;
    
    // Merge treatment data into visible data
    const treatedMap = new Map();
    treatmentComparison.data.forEach(p => treatedMap.set(p.day, p.treatedTotal));
    
    return visibleData.map(point => ({
      ...point,
      treatedTotal: treatedMap.get(point.day) ?? point.total
    }));
  }, [visibleData, treatmentComparison]);

  const getInfestationLevel = (total) => {
    if (total < 100) return { label: 'LOW', color: 'bg-green-100 text-green-700 border-green-300' };
    if (total < 500) return { label: 'MODERATE', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' };
    if (total < 2000) return { label: 'HEAVY', color: 'bg-orange-100 text-orange-700 border-orange-300' };
    return { label: 'SEVERE', color: 'bg-red-100 text-red-700 border-red-300' };
  };

  const level = getInfestationLevel(currentStats.total);

  const handleReset = () => {
    // Hard reset - clear everything
    setIsSimulating(false);
    setIsAnimating(false);
    setCurrentDay(0);
    setResults({ withHeatData: [], withoutHeatData: [], heatStats: null });
    setShowMethodology(false);
    setExpandedSections({});
    
    // Reset all settings to defaults
    setSelectedPest('german_roach');
    setStartingFemales(2);
    setStartingMales(2);
    setTimeframeMonths(6);
    setFemalesStartPregnant(true);
    setHeatEnabled(false);
    setHeatMonth(2);
    setHeatKillRate(95);
    setTrappingEnabled(false);
    setTrappingMonth(2);
    setTrappingKillRate(70);
    setBaitEnabled(false);
    setBaitMonth(2);
    setBaitKillRate(85);
    
    // Force chart re-render
    setSimulationKey(k => k + 1);
  };

  const startNewAssessment = () => {
    // Reset treatment settings
    setHeatEnabled(false);
    setTrappingEnabled(false);
    setBaitEnabled(false);
    
    // Stop everything first
    setIsSimulating(false);
    setIsAnimating(false);
    setCurrentDay(0);
    setResults({ withHeatData: [], withoutHeatData: [], heatStats: null });
    setSimulationKey(k => k + 1);
    
    // Start fresh after state settles
    setTimeout(() => {
      setIsSimulating(true);
      setIsAnimating(true);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 p-4 text-slate-800 relative overflow-hidden font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto mb-4 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 font-medium text-sm transition-all shadow-sm">
          <Home size={18} /> Back to PestSuite
        </Link>
      </nav>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="backdrop-blur-xl bg-white/80 p-4 rounded-2xl border border-slate-200 shadow-lg">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Biological Growth Simulator</h1>
            {!isSimulating ? (
              <p className="text-slate-500 text-sm">Strategic Territory Assessment Tool | PestSuite.ai</p>
            ) : (
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-2xl">{pest.icon === 'custom' ? <BedBugIcon active={true}/> : pest.icon}</span>
                <span className="text-lg font-bold text-indigo-600">{pest.name}</span>
              </div>
            )}
          </div>
          {isSimulating && (
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-2xl border-2 font-bold text-sm flex items-center gap-2 backdrop-blur-md shadow-lg ${level.color}`}>
                <AlertCircle size={18} /> {level.label}
              </div>
              <button onClick={handleReset} className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl border border-white/20 transition-transform hover:scale-105">
                <RotateCcw size={18}/> NEW SIMULATION
              </button>
            </div>
          )}
        </header>

        {!isSimulating ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Species Selection */}
              <section className="backdrop-blur-xl bg-white/80 p-6 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-indigo-600"><Bug size={20}/> Species Selection</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(pestData).map(([key, data]) => (
                    <button key={key} onClick={() => setSelectedPest(key)} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedPest === key ? 'border-indigo-500 bg-indigo-100' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <span className="text-3xl">{data.icon === 'custom' ? <BedBugIcon active={selectedPest === key}/> : data.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">{data.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Population Settings */}
              <section className="backdrop-blur-xl bg-white/80 p-6 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-indigo-600"><Users size={20}/> Initial Population</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-indigo-600 uppercase mb-2">Females</label>
                    <input type="number" min="1" max="50" value={startingFemales} onChange={e => setStartingFemales(Number(e.target.value))} className="w-full p-3 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigo-600 uppercase mb-2">Males</label>
                    <input type="number" min="1" max="50" value={startingMales} onChange={e => setStartingMales(Number(e.target.value))} className="w-full p-3 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 outline-none focus:border-indigo-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={femalesStartPregnant} onChange={e => setFemalesStartPregnant(e.target.checked)} className="w-5 h-5 rounded accent-indigo-500"/><span className="text-sm text-slate-700">Females start pregnant</span></label>
                </div>
              </section>

            </div>

            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl border border-indigo-400 shadow-lg text-white">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2"><Zap size={20}/> Duration of Infestation</h3>
                <div className="space-y-4">
                  <label className="block text-xs font-bold opacity-90 uppercase mb-1">Timeframe: {timeframeMonths} Months</label>
                  <input type="range" min="1" max="24" value={timeframeMonths} onChange={e => setTimeframeMonths(Number(e.target.value))} className="w-full accent-white"/>
                  <button onClick={startNewAssessment} className="w-full py-4 bg-white text-indigo-700 rounded-xl font-extrabold shadow-lg hover:bg-indigo-50 flex items-center justify-center gap-2 transition-transform hover:scale-105">
                    <PlayCircle size={22}/> RUN ASSESSMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-purple-100 p-4 rounded-2xl border border-purple-200 shadow-md"><p className="text-purple-600 text-xs font-bold uppercase tracking-wider">Timeframe</p><p className="text-2xl font-black text-slate-800">{timeframeMonths} Mo</p><p className="text-xs text-slate-500">{timeframe} days</p></div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md"><p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Day</p><p className="text-2xl font-black text-slate-800">{currentStats.day}</p><p className="text-xs text-slate-500">of {timeframe}</p></div>
              <div className="bg-indigo-100 p-4 rounded-2xl border border-indigo-200 shadow-md"><p className="text-indigo-600 text-xs font-bold uppercase tracking-wider">Total</p><p className="text-2xl font-black text-slate-800">{currentStats.total.toLocaleString()}</p></div>
              <div className="bg-red-100 p-4 rounded-2xl border border-red-200 shadow-md"><p className="text-red-600 text-xs font-bold uppercase tracking-wider">Adults</p><p className="text-2xl font-black text-slate-800">{(currentStats.females + currentStats.males).toLocaleString()}</p></div>
              <div className="bg-orange-100 p-4 rounded-2xl border border-orange-200 shadow-md"><p className="text-orange-600 text-xs font-bold uppercase tracking-wider">Juveniles</p><p className="text-2xl font-black text-slate-800">{currentStats.juveniles.toLocaleString()}</p></div>
            </div>

            {/* Treatment Controls - Interactive */}
            {selectedPest === 'bed_bug' && (
              <div className={`p-4 rounded-2xl border ${heatEnabled ? 'bg-orange-100 border-orange-300' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={heatEnabled} onChange={e => setHeatEnabled(e.target.checked)} className="w-5 h-5 rounded accent-orange-500"/>
                    <Flame size={24} className="text-orange-500"/>
                    <span className="font-bold text-orange-600">Heat Treatment Comparison</span>
                  </label>
                  {heatEnabled && treatmentComparison && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentDay >= treatmentComparison.stats.day ? 'bg-orange-500 text-slate-800' : 'bg-slate-200 text-slate-600'}`}>
                      {currentDay >= treatmentComparison.stats.day ? 'APPLIED' : 'PENDING'}
                    </div>
                  )}
                </div>
                
                {heatEnabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-orange-600 uppercase mb-2">Treatment Month: {heatMonth}</label>
                        <input type="range" min="1" max={timeframeMonths} value={Math.min(heatMonth, timeframeMonths)} onChange={e => setHeatMonth(Number(e.target.value))} className="w-full accent-orange-500"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-orange-600 uppercase mb-2">Kill Rate: {heatKillRate}%</label>
                        <input type="range" min="50" max="100" value={heatKillRate} onChange={e => setHeatKillRate(Number(e.target.value))} className="w-full accent-orange-500"/>
                      </div>
                    </div>
                    
                    {/* Stats when treatment day is reached */}
                    {treatmentComparison && currentDay >= treatmentComparison.stats.day && (
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-orange-300">
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <p className="text-xs text-slate-500 font-bold uppercase">Before</p>
                          <p className="text-xl font-black text-slate-800">{treatmentComparison.stats.before.toLocaleString()}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-xl border border-red-200">
                          <p className="text-xs text-red-600 font-bold uppercase">Killed</p>
                          <p className="text-xl font-black text-red-600">-{treatmentComparison.stats.killed.toLocaleString()}</p>
                        </div>
                        <div className="bg-emerald-100 p-3 rounded-xl border border-emerald-200">
                          <p className="text-xs text-emerald-600 font-bold uppercase">Survived</p>
                          <p className="text-xl font-black text-emerald-600">{treatmentComparison.stats.after.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {selectedPest === 'german_roach' && (
              <div className={`p-4 rounded-2xl border ${baitEnabled ? 'bg-blue-100 border-blue-300' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={baitEnabled} onChange={e => setBaitEnabled(e.target.checked)} className="w-5 h-5 rounded accent-blue-500"/>
                    <Spray size={24} className="text-blue-500"/>
                    <span className="font-bold text-blue-600">Gel Bait Treatment Comparison</span>
                  </label>
                  {baitEnabled && treatmentComparison && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentDay >= treatmentComparison.stats.day ? 'bg-blue-500 text-slate-800' : 'bg-slate-200 text-slate-600'}`}>
                      {currentDay >= treatmentComparison.stats.day ? 'APPLIED' : 'PENDING'}
                    </div>
                  )}
                </div>
                
                {baitEnabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-blue-600 uppercase mb-2">Treatment Month: {baitMonth}</label>
                        <input type="range" min="1" max={timeframeMonths} value={Math.min(baitMonth, timeframeMonths)} onChange={e => setBaitMonth(Number(e.target.value))} className="w-full accent-blue-500"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-blue-600 uppercase mb-2">Kill Rate: {baitKillRate}%</label>
                        <input type="range" min="50" max="95" value={baitKillRate} onChange={e => setBaitKillRate(Number(e.target.value))} className="w-full accent-blue-500"/>
                      </div>
                    </div>
                    
                    {/* Stats when treatment day is reached */}
                    {treatmentComparison && currentDay >= treatmentComparison.stats.day && (
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-blue-300">
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <p className="text-xs text-slate-500 font-bold uppercase">Before</p>
                          <p className="text-xl font-black text-slate-800">{treatmentComparison.stats.before.toLocaleString()}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-xl border border-red-200">
                          <p className="text-xs text-red-600 font-bold uppercase">Killed</p>
                          <p className="text-xl font-black text-red-600">-{treatmentComparison.stats.killed.toLocaleString()}</p>
                        </div>
                        <div className="bg-emerald-100 p-3 rounded-xl border border-emerald-200">
                          <p className="text-xs text-emerald-600 font-bold uppercase">Survived</p>
                          <p className="text-xl font-black text-emerald-600">{treatmentComparison.stats.after.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {(selectedPest === 'rat' || selectedPest === 'mouse') && (
              <div className={`p-4 rounded-2xl border ${trappingEnabled ? 'bg-emerald-100 border-emerald-300' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={trappingEnabled} onChange={e => setTrappingEnabled(e.target.checked)} className="w-5 h-5 rounded accent-emerald-500"/>
                    <Target size={24} className="text-emerald-500"/>
                    <span className="font-bold text-emerald-600">Trapping Program Comparison</span>
                  </label>
                  {trappingEnabled && treatmentComparison && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentDay >= treatmentComparison.stats.day ? 'bg-emerald-500 text-slate-800' : 'bg-slate-200 text-slate-600'}`}>
                      {currentDay >= treatmentComparison.stats.day ? 'APPLIED' : 'PENDING'}
                    </div>
                  )}
                </div>
                
                {trappingEnabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-emerald-600 uppercase mb-2">Trapping Month: {trappingMonth}</label>
                        <input type="range" min="1" max={timeframeMonths} value={Math.min(trappingMonth, timeframeMonths)} onChange={e => setTrappingMonth(Number(e.target.value))} className="w-full accent-emerald-500"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-emerald-600 uppercase mb-2">Capture Rate: {trappingKillRate}%</label>
                        <input type="range" min="30" max="90" value={trappingKillRate} onChange={e => setTrappingKillRate(Number(e.target.value))} className="w-full accent-emerald-500"/>
                      </div>
                    </div>
                    
                    {/* Stats when treatment day is reached */}
                    {treatmentComparison && currentDay >= treatmentComparison.stats.day && (
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-300">
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <p className="text-xs text-slate-500 font-bold uppercase">Before</p>
                          <p className="text-xl font-black text-slate-800">{treatmentComparison.stats.before.toLocaleString()}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-xl border border-red-200">
                          <p className="text-xs text-red-600 font-bold uppercase">Captured</p>
                          <p className="text-xl font-black text-red-600">-{treatmentComparison.stats.killed.toLocaleString()}</p>
                        </div>
                        <div className="bg-emerald-100 p-3 rounded-xl border border-emerald-200">
                          <p className="text-xs text-emerald-600 font-bold uppercase">Survived</p>
                          <p className="text-xl font-black text-emerald-600">{treatmentComparison.stats.after.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-4">
              <button onClick={() => currentDay >= timeframe ? setCurrentDay(0) : setIsAnimating(!isAnimating)} className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 hover:bg-indigo-500 text-white">
                {isAnimating ? <Pause size={20}/> : <Play size={20}/>}
              </button>
              <input type="range" min="0" max={timeframe} value={currentDay} onChange={e => { setCurrentDay(Number(e.target.value)); setIsAnimating(false); }} className="flex-1 accent-indigo-500"/>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg h-80">
              <ResponsiveContainer width="100%" height="100%" key={simulationKey}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                    <linearGradient id="treatedGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                    <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                    <linearGradient id="baitGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                  <XAxis dataKey="day" tick={{fill: '#64748b', fontSize: 11}}/>
                  <YAxis tick={{fill: '#64748b', fontSize: 11}} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v}/>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}/>
                  <Legend />
                  {treatmentComparison && (
                    <ReferenceLine 
                      x={treatmentComparison.stats.day} 
                      stroke={treatmentComparison.stats.type === 'heat' ? "#f97316" : treatmentComparison.stats.type === 'bait' ? "#3b82f6" : "#10b981"} 
                      strokeWidth={2} 
                      label={{
                        value: treatmentComparison.stats.type === 'heat' ? 'HEAT' : treatmentComparison.stats.type === 'bait' ? 'BAIT' : 'TRAPPING', 
                        fill: treatmentComparison.stats.type === 'heat' ? '#f97316' : treatmentComparison.stats.type === 'bait' ? '#3b82f6' : '#10b981', 
                        fontSize: 10
                      }}
                    />
                  )}
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke={treatmentComparison ? "#ef4444" : "#6366f1"} 
                    strokeWidth={2} 
                    fill={treatmentComparison ? "url(#totalGrad)" : "url(#baseGrad)"} 
                    name={treatmentComparison ? "No Treatment" : "Total Population"} 
                    connectNulls
                  />
                  {treatmentComparison && (
                    <Area 
                      type="monotone" 
                      dataKey="treatedTotal" 
                      stroke={treatmentComparison.stats.type === 'heat' ? "#f97316" : treatmentComparison.stats.type === 'bait' ? "#3b82f6" : "#10b981"} 
                      strokeWidth={3} 
                      fill={treatmentComparison.stats.type === 'heat' ? "url(#treatedGrad)" : treatmentComparison.stats.type === 'bait' ? "url(#baitGrad)" : "url(#treatedGrad)"} 
                      name={treatmentComparison.stats.type === 'heat' ? "With Heat Treatment" : treatmentComparison.stats.type === 'bait' ? "With Gel Bait" : "With Trapping"} 
                      connectNulls
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      
      {/* Methodology Button */}
      <div className="max-w-6xl mx-auto mt-8 relative z-10">
        <button 
          onClick={() => setShowMethodology(true)} 
          className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-800 text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
          </svg>
          View Methodology & Scientific Basis
        </button>
      </div>

      {/* Methodology Modal */}
      {showMethodology && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-12" onClick={() => { setShowMethodology(false); setExpandedSections({}); }}>
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl max-h-[70vh] overflow-y-auto shadow-2xl mx-8" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-slate-800">Simulation Methodology</h2>
              <button onClick={() => { setShowMethodology(false); setExpandedSections({}); }} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-slate-600">
              <section>
                <p className="text-sm leading-relaxed">
                  This simulator uses an agent-based model where each individual organism is tracked through its lifecycle. 
                  The model incorporates scientifically-backed reproduction rates, mortality factors, and development timelines.
                </p>
              </section>

              {/* German Cockroach - Collapsible */}
              <section className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, roach: !prev.roach}))}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-bold text-indigo-600 flex items-center gap-2">🪳 German Cockroach</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedSections.roach ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {expandedSections.roach && (
                  <div className="p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="text-slate-500">Ootheca Gestation:</span> <span className="text-slate-800 font-medium">28 days</span></div>
                      <div><span className="text-slate-500">Eggs per Ootheca:</span> <span className="text-slate-800 font-medium">35</span></div>
                      <div><span className="text-slate-500">Sexual Maturity:</span> <span className="text-slate-800 font-medium">60 days</span></div>
                      <div><span className="text-slate-500">Adult Lifespan:</span> <span className="text-slate-800 font-medium">200 days</span></div>
                      <div><span className="text-slate-500">Egg Survival Rate:</span> <span className="text-slate-800 font-medium">90%</span></div>
                      <div><span className="text-slate-500">Juvenile Survival:</span> <span className="text-slate-800 font-medium">50%</span></div>
                      <div><span className="text-slate-500">Monthly Adult Mortality:</span> <span className="text-slate-800 font-medium">15%</span></div>
                      <div><span className="text-slate-500">Lifetime Egg Cap:</span> <span className="text-slate-800 font-medium">210</span></div>
                    </div>
                    <p className="text-slate-500 mt-3 text-xs">
                      Female carries ootheca for ~28 days until nymphs emerge. Nymphs undergo 6-7 molts over 60 days. 
                      ~50% nymph mortality due to hazardous molting process. Female produces 4-8 oothecae in lifetime.
                    </p>
                  </div>
                )}
              </section>

              {/* Bed Bug - Collapsible */}
              <section className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, bedbug: !prev.bedbug}))}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-bold text-indigo-600 flex items-center gap-2">🛏️ Bed Bug</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedSections.bedbug ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {expandedSections.bedbug && (
                  <div className="p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="text-slate-500">Egg Incubation:</span> <span className="text-slate-800 font-medium">8 days</span></div>
                      <div><span className="text-slate-500">Eggs per Batch:</span> <span className="text-slate-800 font-medium">14</span></div>
                      <div><span className="text-slate-500">Sexual Maturity:</span> <span className="text-slate-800 font-medium">37 days</span></div>
                      <div><span className="text-slate-500">Adult Lifespan:</span> <span className="text-slate-800 font-medium">180 days</span></div>
                      <div><span className="text-slate-500">Egg Hatch Rate:</span> <span className="text-slate-800 font-medium">97%</span></div>
                      <div><span className="text-slate-500">Juvenile Survival:</span> <span className="text-slate-800 font-medium">82%</span></div>
                      <div><span className="text-slate-500">Monthly Adult Mortality:</span> <span className="text-slate-800 font-medium">10%</span></div>
                      <div><span className="text-slate-500">Lifetime Egg Cap:</span> <span className="text-slate-800 font-medium">350</span></div>
                    </div>
                    <p className="text-slate-500 mt-3 text-xs">
                      Eggs hatch in 6-10 days. Nymphs require 5 blood meals over 37 days to reach maturity. 
                      ~80% egg-to-adult survival under optimal conditions. Females lay 1-7 eggs daily after feeding.
                    </p>
                  </div>
                )}
              </section>

              {/* Roof Rat - Collapsible */}
              <section className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, rat: !prev.rat}))}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-bold text-indigo-600 flex items-center gap-2">🐀 Roof Rat</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedSections.rat ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {expandedSections.rat && (
                  <div className="p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="text-slate-500">Gestation Period:</span> <span className="text-slate-800 font-medium">22 days</span></div>
                      <div><span className="text-slate-500">Pups per Litter:</span> <span className="text-slate-800 font-medium">6</span></div>
                      <div><span className="text-slate-500">Sexual Maturity:</span> <span className="text-slate-800 font-medium">84 days (12 weeks)</span></div>
                      <div><span className="text-slate-500">Adult Lifespan:</span> <span className="text-slate-800 font-medium">365 days</span></div>
                      <div><span className="text-slate-500">Birth Survival:</span> <span className="text-slate-800 font-medium">100%</span></div>
                      <div><span className="text-slate-500">Juvenile Survival:</span> <span className="text-slate-800 font-medium">75%</span></div>
                      <div><span className="text-slate-500">Monthly Adult Mortality:</span> <span className="text-slate-800 font-medium">8%</span></div>
                      <div><span className="text-slate-500">Reproduction Interval:</span> <span className="text-slate-800 font-medium">91 days</span></div>
                    </div>
                    <p className="text-slate-500 mt-3 text-xs">
                      Gestation 21-23 days. Sexual maturity at 12 weeks. Pre-weaning mortality 15-25% in favorable conditions. 
                      Indoor populations have lower mortality than wild populations.
                    </p>
                  </div>
                )}
              </section>

              {/* House Mouse - Collapsible */}
              <section className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, mouse: !prev.mouse}))}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-bold text-indigo-600 flex items-center gap-2">🐁 House Mouse</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedSections.mouse ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {expandedSections.mouse && (
                  <div className="p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="text-slate-500">Gestation Period:</span> <span className="text-slate-800 font-medium">19 days</span></div>
                      <div><span className="text-slate-500">Pups per Litter:</span> <span className="text-slate-800 font-medium">6</span></div>
                      <div><span className="text-slate-500">Sexual Maturity:</span> <span className="text-slate-800 font-medium">35 days (5 weeks)</span></div>
                      <div><span className="text-slate-500">Adult Lifespan:</span> <span className="text-slate-800 font-medium">365 days</span></div>
                      <div><span className="text-slate-500">Birth Survival:</span> <span className="text-slate-800 font-medium">100%</span></div>
                      <div><span className="text-slate-500">Juvenile Survival:</span> <span className="text-slate-800 font-medium">70%</span></div>
                      <div><span className="text-slate-500">Monthly Adult Mortality:</span> <span className="text-slate-800 font-medium">12%</span></div>
                      <div><span className="text-slate-500">Reproduction Interval:</span> <span className="text-slate-800 font-medium">46 days</span></div>
                    </div>
                    <p className="text-slate-500 mt-3 text-xs">
                      Gestation 19-21 days. Rapid sexual maturity at 35 days. Pre-weaning mortality 15-39% depending on conditions. 
                      Higher metabolic rate leads to higher mortality than rats.
                    </p>
                  </div>
                )}
              </section>

              {/* Treatment Modeling - Collapsible */}
              <section className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, treatment: !prev.treatment}))}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-bold text-indigo-600 flex items-center gap-2">💊 Treatment Modeling</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedSections.treatment ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {expandedSections.treatment && (
                  <div className="p-4 space-y-3 text-sm">
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-1">Gel Bait Treatment (German Roaches)</h4>
                      <p className="text-slate-500 text-xs">
                        Professional gel bait applications target roaches through ingestion and secondary poisoning. 
                        Default 85% kill rate accounts for bait-averse individuals and harborage limitations. 
                        Multiple applications recommended for complete elimination.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-orange-400 font-semibold mb-1">Heat Treatment (Bed Bugs)</h4>
                      <p className="text-slate-500 text-xs">
                        Thermal remediation at 120-140°F kills all life stages. Default 95% kill rate accounts for 
                        potential harborage areas not reaching lethal temperatures. Survivors can repopulate if not followed up.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-emerald-400 font-semibold mb-1">Trapping Programs (Rodents)</h4>
                      <p className="text-slate-500 text-xs">
                        Intensive trapping programs typically achieve 50-80% population reduction depending on placement, 
                        bait selection, and population density. Default 70% capture rate reflects professional-grade implementation.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Model Assumptions - Collapsible */}
              <section className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, assumptions: !prev.assumptions}))}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-bold text-indigo-600 flex items-center gap-2">⚙️ Model Assumptions</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedSections.assumptions ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {expandedSections.assumptions && (
                  <div className="p-4">
                    <ul className="text-sm space-y-2 text-slate-500">
                      <li className="flex gap-2"><span className="text-indigo-600">•</span> Optimal environmental conditions (temperature, humidity, food availability)</li>
                      <li className="flex gap-2"><span className="text-indigo-600">•</span> 50/50 male-female offspring ratio</li>
                      <li className="flex gap-2"><span className="text-indigo-600">•</span> No predation or external mortality factors beyond natural death</li>
                      <li className="flex gap-2"><span className="text-indigo-600">•</span> Consistent seeded randomization for reproducible comparisons</li>
                      <li className="flex gap-2"><span className="text-indigo-600">•</span> Population cap at 150,000 for performance optimization</li>
                    </ul>
                  </div>
                )}
              </section>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
                <p>This model is intended for educational and sales demonstration purposes. Real-world infestations may vary based on environmental factors, structural conditions, and pest management interventions.</p>
              </div>

              {/* Close Button */}
              <div className="pt-6">
                <button 
                  onClick={() => { setShowMethodology(false); setExpandedSections({}); }} 
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                  </svg>
                  Back to Simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
