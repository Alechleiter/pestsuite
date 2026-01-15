import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Info, Eye, Dog, ChevronDown, ChevronUp, PlayCircle, RotateCcw, Sparkles, Home } from 'lucide-react';
import * as Tone from 'tone';

const CircleOfCompetence = () => {
  // Added standard defaults so the tool looks impressive immediately on load
  const [timeframeYears, setTimeframeYears] = useState(5);
  const [workingDaysPerYear, setWorkingDaysPerYear] = useState(260);
  const [visualUnitsPerDay, setVisualUnitsPerDay] = useState(12);
  const [k9UnitsPerDay, setK9UnitsPerDay] = useState(80);
  const [showInfo, setShowInfo] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [hoverVisual, setHoverVisual] = useState(false);
  const [hoverK9, setHoverK9] = useState(false);

  const animationRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const totalWorkingDays = (timeframeYears || 0) * (workingDaysPerYear || 0);
  const visualTotal = (visualUnitsPerDay || 0) * totalWorkingDays;
  const k9Total = (k9UnitsPerDay || 0) * totalWorkingDays;

  // Animated values based on progress
  const animatedVisualTotal = Math.floor(visualTotal * animationProgress);
  const animatedK9Total = Math.floor(k9Total * animationProgress);

  // Radius calculations based on Volume of a sphere (V = 4/3 * pi * r^3)
  const visualRadius = Math.pow((3 * (showResults ? animatedVisualTotal : visualTotal)) / (4 * Math.PI), 1/3);
  const k9Radius = Math.pow((3 * (showResults ? animatedK9Total : k9Total)) / (4 * Math.PI), 1/3);
  const maxRadius = Math.max(visualRadius, k9Radius);

  // Dynamic scaling to fit the SVG viewbox regardless of input size
  const baseScale = maxRadius > 0 ? 120 / maxRadius : 1;
  const scaledVisualRadius = visualRadius * baseScale;
  const scaledK9Radius = k9Radius * baseScale;

  // Calculation for "Time to Mastery" (10,000 units)
  const calculateMasteryYears = (unitsPerDay) => {
    if (!unitsPerDay || !workingDaysPerYear) return '0.0';
    const years = 10000 / (unitsPerDay * workingDaysPerYear);
    return years.toFixed(1);
  };

  const visualMasteryYears = calculateMasteryYears(visualUnitsPerDay);
  const k9MasteryYears = calculateMasteryYears(k9UnitsPerDay);

  useEffect(() => {
    const animate = () => {
      setRotation(prev => (prev + 0.5) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const [dollarBills, setDollarBills] = useState([]);
  const [bedBugs, setBedBugs] = useState([]);

  useEffect(() => {
    if (dollarBills.length > 0) {
      const timer = setTimeout(() => {
        setDollarBills(prev => prev.map(bill => ({ ...bill, animate: true })));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [dollarBills.length]);

  useEffect(() => {
    if (bedBugs.length > 0) {
      const timer = setTimeout(() => {
        setBedBugs(prev => prev.map(bug => ({ ...bug, animate: true })));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [bedBugs.length]);

  const triggerDollarBills = () => {
    const newBills = [];
    
    for (let i = 0; i < 30; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * 200 + 100;
      newBills.push({
        id: i,
        endX: Math.cos(angle) * speed,
        endY: Math.sin(angle) * speed + 150,
        rotation: Math.random() * 720 - 360,
        delay: Math.random() * 300,
        animate: false
      });
    }
    
    setDollarBills(newBills);
    
    setTimeout(() => {
      setDollarBills([]);
    }, 4000);
  };

  const triggerBedBugs = () => {
    const newBugs = [];
    
    for (let i = 0; i < 35; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * 250 + 100;
      newBugs.push({
        id: i,
        endX: Math.cos(angle) * speed,
        endY: Math.sin(angle) * speed,
        size: Math.random() * 10 + 14,
        delay: Math.random() * 200,
        animate: false
      });
    }
    
    setBedBugs(newBugs);
    
    setTimeout(() => {
      setBedBugs([]);
    }, 3000);
  };

  const runSimulation = async () => {
    await Tone.start();
    setIsAnimating(true);
    setShowResults(true);
    setAnimationProgress(0);

    // Create dramatic synth for build-up
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.5, decay: 0.3, sustain: 0.7, release: 1 }
    }).toDestination();
    synth.volume.value = -10;

    // Play dramatic chord progression (Orchestral build)
    const now = Tone.now();
    synth.triggerAttackRelease(['C3', 'E3', 'G3'], '0.5', now);
    synth.triggerAttackRelease(['D3', 'F3', 'A3'], '0.5', now + 0.6);
    synth.triggerAttackRelease(['E3', 'G3', 'B3'], '0.5', now + 1.2);
    synth.triggerAttackRelease(['G3', 'B3', 'D4'], '1', now + 1.8);

    const duration = 3000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    // Tick sound synth (like a clock or counter)
    const tickSynth = new Tone.MembraneSynth({
      pitchDecay: 0.01,
      octaves: 2,
      envelope: { attack: 0.001, decay: 0.05, sustain: 0 }
    }).toDestination();
    tickSynth.volume.value = -20;

    progressIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimationProgress(progress);

      // Play tick sound every 5 steps
      if (currentStep % 5 === 0) {
        tickSynth.triggerAttackRelease('C2', '0.05');
      }

      if (currentStep >= steps) {
        clearInterval(progressIntervalRef.current);
        setIsAnimating(false);

        // Play completion chime
        const chime = new Tone.Synth({
          oscillator: { type: 'sine' },
          envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.5 }
        }).toDestination();
        chime.volume.value = -8;
        const chimeTime = Tone.now();
        chime.triggerAttackRelease('C5', '0.3', chimeTime);
        chime.triggerAttackRelease('E5', '0.3', chimeTime + 0.15);
        chime.triggerAttackRelease('G5', '0.5', chimeTime + 0.3);
      }
    }, stepDuration);
  };

  const resetSimulation = () => {
    setShowResults(false);
    setAnimationProgress(0);
    setIsAnimating(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to render the 3D-looking spheres
  const renderSphere = (cx, cy, radius, baseColor, label, value, isHovered, icon, onLabelClick, onSphereClick) => {
    // Prevent rendering if radius is invalid
    if (!radius || isNaN(radius)) return null;

    const scale = isHovered ? 1.15 : 1;
    const layers = 10;
    const colors = {
      visual: { bright: '#ffcc80', mid: '#ff9800', dark: '#e65100', deepDark: '#bf360c', glow: '#ff9800' },
      k9: { bright: '#81d4fa', mid: '#29b6f6', dark: '#0277bd', deepDark: '#01579b', glow: '#29b6f6' }
    };
    const colorScheme = baseColor === 'orange' ? colors.visual : colors.k9;

    return (
      <g 
        transform={`translate(${cx}, ${cy}) scale(${scale})`} 
        style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', cursor: 'pointer' }}
        onClick={onSphereClick}
      >
        {/* Outer glow */}
        <circle
          cx={0}
          cy={0}
          r={radius * 1.3}
          fill={colorScheme.glow}
          opacity={isHovered ? 0.25 : 0.1}
          style={{ filter: 'blur(20px)', transition: 'opacity 0.3s ease' }}
        />
        
        {/* Shadow */}
        <ellipse cx={0} cy={radius + 30} rx={radius * 0.8} ry={radius * 0.25} fill="rgba(0,0,0,0.4)" style={{ filter: 'blur(8px)' }} />
        
        {/* Invisible clickable area covering full sphere */}
        <circle
          cx={0}
          cy={0}
          r={radius * 1.1}
          fill="transparent"
        />
        
        {/* Sphere Body */}
        {[...Array(layers)].map((_, i) => {
          const layerRadius = radius * (1 - (i * 0.06));
          const opacity = 1 - (i * 0.08);
          const rotationOffset = (rotation + (i * 12)) % 360;
          const layerDepth = i / layers;
          let fillColor = layerDepth < 0.25 ? colorScheme.bright : layerDepth < 0.5 ? colorScheme.mid : layerDepth < 0.75 ? colorScheme.dark : colorScheme.deepDark;

          return (
            <circle
              key={i}
              cx={Math.sin(rotationOffset * Math.PI / 180) * i * 1.5}
              cy={-i * 2.5}
              r={layerRadius}
              fill={fillColor}
              opacity={opacity}
            />
          );
        })}

        {/* Inner highlight */}
        <ellipse
          cx={-radius * 0.25}
          cy={-radius * 0.35}
          rx={radius * 0.5}
          ry={radius * 0.3}
          fill="url(#highlightGradient)"
          opacity={0.6}
          transform={`rotate(-30)`}
        />
        
        {/* Top shine */}
        <circle
          cx={-radius * 0.2}
          cy={-radius * 0.4}
          r={radius * 0.15}
          fill="white"
          opacity={0.4}
        />

        {/* Label & Icon - positioned below sphere */}
        <g 
          transform={`translate(0, ${radius + 50})`} 
          onClick={onLabelClick ? onLabelClick : undefined} 
          style={{ cursor: onLabelClick ? 'pointer' : 'default' }}
        >
          {/* Invisible clickable background */}
          <rect
            x={-100}
            y={-20}
            width={200}
            height={80}
            fill="transparent"
          />
          <text 
            x={0} 
            y={0} 
            textAnchor="middle" 
            fill="#fff" 
            fontSize={isHovered ? 28 : 16} 
            fontWeight="bold"
            style={{ transition: 'font-size 0.3s ease' }}
          >
            {label}
          </text>
          <text 
            x={0} 
            y={isHovered ? 32 : 24} 
            textAnchor="middle" 
            fill="#94a3b8" 
            fontSize={isHovered ? 20 : 14}
            style={{ transition: 'font-size 0.3s ease' }}
          >
            {value.toLocaleString()} units
          </text>
        </g>
      </g>
    );
  };

  // ---------------- RESULTS VIEW ----------------
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6 lg:p-10 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Navigation */}
        <nav className="max-w-7xl mx-auto mb-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-all">
            <Home className="w-4 h-4" /> Back to PestSuite
          </Link>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-6 py-3 rounded-full text-lg mb-6 border border-green-500/30 shadow-lg shadow-green-500/10">
              <Sparkles className="w-6 h-6" />
              <span className="font-semibold">Simulation Complete</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-4 tracking-tight">
              Circle of Competence
            </h1>
            <p className="text-2xl text-purple-300/80 font-light">{timeframeYears}-Year Coverage Projection</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="group bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent rounded-2xl p-6 lg:p-8 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 text-sm lg:text-base font-medium">Visual Total</span>
              </div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">{animatedVisualTotal.toLocaleString()}</div>
              <div className="text-slate-400 text-sm lg:text-base">units inspected</div>
            </div>
            <div className="group bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent rounded-2xl p-6 lg:p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center gap-2 mb-3">
                <Dog className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 text-sm lg:text-base font-medium">K9 Total</span>
              </div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">{animatedK9Total.toLocaleString()}</div>
              <div className="text-slate-400 text-sm lg:text-base">units inspected</div>
            </div>
            <div className="group bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-transparent rounded-2xl p-6 lg:p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 text-sm lg:text-base font-medium">K9 Advantage</span>
              </div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
                {animatedVisualTotal > 0 ? (animatedK9Total / animatedVisualTotal).toFixed(1) : '0.0'}x
              </div>
              <div className="text-slate-400 text-sm lg:text-base">multiplier</div>
            </div>
            <div className="group bg-gradient-to-br from-green-500/20 via-green-600/10 to-transparent rounded-2xl p-6 lg:p-8 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400 text-lg">+</span>
                <span className="text-green-400 text-sm lg:text-base font-medium">Additional Units</span>
              </div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">{(animatedK9Total - animatedVisualTotal).toLocaleString()}</div>
              <div className="text-slate-400 text-sm lg:text-base">K9 advantage</div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-3xl p-8 lg:p-10 mb-10 border border-slate-700/50 shadow-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center tracking-tight">Coverage Capacity Visualization</h2>
            <svg viewBox="0 0 1000 500" className="w-full h-auto max-h-[50vh]">
              <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#1e1b4b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect width="1000" height="500" fill="url(#bgGradient)" rx="20" />
              
              {/* Grid lines for depth */}
              <g opacity="0.1">
                {[...Array(10)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="white" strokeWidth="1"/>
                ))}
                {[...Array(20)].map((_, i) => (
                  <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="white" strokeWidth="1"/>
                ))}
              </g>

              <g onMouseEnter={() => setHoverVisual(true)} onMouseLeave={() => setHoverVisual(false)}>
                {renderSphere(250, 180, scaledVisualRadius, 'orange', 'Visual Inspection', animatedVisualTotal, hoverVisual, <Eye className="w-5 h-5 text-orange-400" />, null, triggerBedBugs)}
              </g>

              <g onMouseEnter={() => setHoverK9(true)} onMouseLeave={() => setHoverK9(false)}>
                {renderSphere(750, 180, scaledK9Radius, 'blue', 'K9 Team', animatedK9Total, hoverK9, <Dog className="w-5 h-5 text-blue-400" />, null, triggerDollarBills)}
              </g>

              {/* Confetti particles */}
            </svg>
            
            {/* Bed Bugs Overlay - Orange Circle */}
            {bedBugs.length > 0 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: '1.5rem' }}>
                <div className="absolute" style={{ left: '25%', top: '36%' }}>
                  {bedBugs.map((bug) => (
                    <div
                      key={bug.id}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        transform: bug.animate 
                          ? `translate(${bug.endX}px, ${bug.endY}px) scale(1)` 
                          : 'translate(0, 0) scale(0.3)',
                        opacity: bug.animate ? 0 : 1,
                        transition: `all 2s ease-out ${bug.delay}ms`,
                      }}
                    >
                      <div style={{
                        width: bug.size,
                        height: bug.size * 0.7,
                        backgroundColor: '#8B4513',
                        borderRadius: '50% 50% 40% 40%',
                        position: 'relative',
                        boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.1)'
                      }}>
                        {/* Head */}
                        <div style={{
                          position: 'absolute',
                          top: -bug.size * 0.25,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: bug.size * 0.5,
                          height: bug.size * 0.35,
                          backgroundColor: '#654321',
                          borderRadius: '50%'
                        }}/>
                        {/* Legs left */}
                        <div style={{ position: 'absolute', left: -4, top: '20%', width: 6, height: 2, backgroundColor: '#654321', transform: 'rotate(-30deg)' }}/>
                        <div style={{ position: 'absolute', left: -5, top: '50%', width: 7, height: 2, backgroundColor: '#654321' }}/>
                        <div style={{ position: 'absolute', left: -4, top: '80%', width: 6, height: 2, backgroundColor: '#654321', transform: 'rotate(30deg)' }}/>
                        {/* Legs right */}
                        <div style={{ position: 'absolute', right: -4, top: '20%', width: 6, height: 2, backgroundColor: '#654321', transform: 'rotate(30deg)' }}/>
                        <div style={{ position: 'absolute', right: -5, top: '50%', width: 7, height: 2, backgroundColor: '#654321' }}/>
                        <div style={{ position: 'absolute', right: -4, top: '80%', width: 6, height: 2, backgroundColor: '#654321', transform: 'rotate(-30deg)' }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Dollar Bills Overlay - Blue Circle */}
            {dollarBills.length > 0 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: '1.5rem' }}>
                <div className="absolute" style={{ left: '75%', top: '36%' }}>
                  {dollarBills.map((bill) => (
                    <div
                      key={bill.id}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        transform: bill.animate 
                          ? `translate(${bill.endX}px, ${bill.endY}px) rotate(${bill.rotation}deg)` 
                          : 'translate(0, 0) rotate(0deg)',
                        opacity: bill.animate ? 0 : 1,
                        transition: `all 3s ease-out ${bill.delay}ms`,
                      }}
                    >
                      <div 
                        style={{
                          width: 45,
                          height: 20,
                          background: 'linear-gradient(135deg, #85bb65 0%, #3d8b40 50%, #2e7d32 100%)',
                          borderRadius: 2,
                          border: '1px solid #1b5e20',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                          position: 'relative',
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          inset: 2,
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: 1
                        }}/>
                        <span style={{ 
                          color: '#e8f5e9', 
                          fontWeight: 'bold', 
                          fontSize: 12,
                          textShadow: '0 1px 1px rgba(0,0,0,0.4)'
                        }}>$</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Analysis Text */}
          <div className="max-w-4xl mx-auto text-center mb-10">
            <div className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl">
              <h3 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">The Mastery Gap</h3>
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                When the threat demands mastery-level pattern recognition, <span className="text-orange-400 font-semibold">good enough</span> means 
                operating outside your circle of competence entirely. K9 teams reach 10,000 units{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-black text-2xl lg:text-3xl">
                  {(parseFloat(visualMasteryYears) / parseFloat(k9MasteryYears)).toFixed(1)}x faster
                </span>{' '}
                than visual inspection.
              </p>
            </div>
          </div>

          <button
            onClick={resetSimulation}
            className="flex items-center gap-3 mx-auto bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl shadow-purple-500/25 text-xl"
          >
            <RotateCcw className="w-6 h-6" />
            Run New Simulation
          </button>
        </div>
      </div>
    );
  }

  // ---------------- INPUT VIEW ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6 lg:p-10 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="max-w-5xl mx-auto mb-4 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-all">
          <Home className="w-4 h-4" /> Back to PestSuite
        </Link>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10 lg:mb-14">
          <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-4 tracking-tight">
            Circle of Competence
          </h1>
          <p className="text-2xl lg:text-3xl text-purple-300/80 font-light mb-3">Visualizing Mastery Through Repetition</p>
          <p className="text-lg text-slate-400">Configure your scenario and run the simulation</p>
        </div>

        {/* Info Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl p-6 lg:p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-left hover:shadow-xl hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Info className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-xl lg:text-2xl">What is Circle of Competence?</h2>
                  <p className="text-slate-400 text-base lg:text-lg">Click to learn about the 10,000 unit rule</p>
                </div>
              </div>
              {showInfo ? <ChevronUp className="w-7 h-7 text-slate-400" /> : <ChevronDown className="w-7 h-7 text-slate-400" />}
            </div>
          </button>

          {showInfo && (
            <div className="mt-6 bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-slate-700/50 space-y-6">
              <blockquote className="border-l-4 border-purple-500 pl-6 italic text-slate-300 text-xl lg:text-2xl">
                "Ten thousand hours is the magic number of greatness." — Malcolm Gladwell
              </blockquote>
              <p className="text-slate-300 text-lg lg:text-xl leading-relaxed">
                <strong className="text-white">Circle of competence</strong> is your earned advantage—mastery through deliberate practice and repetition.
              </p>
              <div className="bg-slate-700/40 rounded-xl p-6 lg:p-8">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-3">From Hours to Inspections: The 10,000 Unit Rule</h3>
                <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
                  Each unit inspected represents a deliberate practice session. Just as a surgeon becomes a master through thousands of procedures, a detector achieves mastery through 10,000 unit inspections.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Panel */}
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-700/50 mb-8 shadow-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Configure Your Simulation</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <div className="group">
              <label className="block text-slate-300 text-lg mb-3 font-medium">Timeframe (Years)</label>
              <input
                type="number"
                value={timeframeYears}
                onChange={(e) => setTimeframeYears(e.target.value)}
                placeholder="Enter years"
                className="w-full bg-slate-700/50 text-white text-xl lg:text-2xl px-6 py-4 rounded-xl border-2 border-slate-600 focus:border-purple-400 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
              />
              <p className="text-slate-500 text-base mt-2">{totalWorkingDays.toLocaleString()} total working days</p>
            </div>
            <div className="group">
              <label className="block text-slate-300 text-lg mb-3 font-medium">Working Days per Year</label>
              <input
                type="number"
                value={workingDaysPerYear}
                onChange={(e) => setWorkingDaysPerYear(e.target.value)}
                placeholder="Enter days"
                className="w-full bg-slate-700/50 text-white text-xl lg:text-2xl px-6 py-4 rounded-xl border-2 border-slate-600 focus:border-purple-400 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
              />
              <p className="text-slate-500 text-base mt-2">Standard: 260 days</p>
            </div>
          </div>

          {/* Visual & K9 Configuration - Side by Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Visual Rep Input */}
            <div className="bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent rounded-2xl p-6 lg:p-8 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Eye className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-white font-bold text-xl lg:text-2xl">Visual Inspector</h3>
              </div>
              <div>
                <label className="block text-slate-300 text-base mb-3">Units per Day</label>
                <input
                  type="number"
                  value={visualUnitsPerDay}
                  onChange={(e) => setVisualUnitsPerDay(e.target.value)}
                  placeholder="Enter units/day"
                  className="w-full bg-slate-700/50 text-white text-xl lg:text-2xl px-6 py-4 rounded-xl border-2 border-orange-500/30 focus:border-orange-400 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="mt-6 p-5 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <p className="text-orange-300 text-base mb-2">Time to Reach Mastery (10,000 units)</p>
                <p className="text-5xl lg:text-6xl font-black text-orange-400 mb-2">{visualMasteryYears} <span className="text-2xl font-medium">years</span></p>
                <p className="text-slate-400 text-sm">Based on {(visualUnitsPerDay * workingDaysPerYear).toLocaleString()} inspections per year</p>
              </div>
            </div>

            {/* K9 Rep Input */}
            <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent rounded-2xl p-6 lg:p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Dog className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-xl lg:text-2xl">K9 Team</h3>
              </div>
              <div>
                <label className="block text-slate-300 text-base mb-3">Units per Day</label>
                <input
                  type="number"
                  value={k9UnitsPerDay}
                  onChange={(e) => setK9UnitsPerDay(e.target.value)}
                  placeholder="Enter units/day"
                  className="w-full bg-slate-700/50 text-white text-xl lg:text-2xl px-6 py-4 rounded-xl border-2 border-blue-500/30 focus:border-blue-400 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="mt-6 p-5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <p className="text-blue-300 text-base mb-2">Time to Reach Mastery (10,000 units)</p>
                <p className="text-5xl lg:text-6xl font-black text-blue-400 mb-2">{k9MasteryYears} <span className="text-2xl font-medium">years</span></p>
                <p className="text-slate-400 text-sm">Based on {(k9UnitsPerDay * workingDaysPerYear).toLocaleString()} inspections per year</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={isAnimating}
          className="w-full flex items-center justify-center gap-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 text-white font-black py-6 px-10 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-2xl shadow-purple-500/25 text-2xl lg:text-3xl"
        >
          <PlayCircle className="w-8 h-8 lg:w-10 lg:h-10" />
          {isAnimating ? 'Running...' : 'Run Simulation'}
        </button>
        <p className="text-center text-slate-400 text-lg mt-4">🔊 Sound enabled - Turn up your volume!</p>
      </div>
    </div>
  );
};

export default CircleOfCompetence;
