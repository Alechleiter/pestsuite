import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const apps = [
    {
      name: 'Population Simulator',
      description: 'Visualize exponential pest reproduction over time with treatment comparisons',
      icon: '📊',
      status: 'live',
      url: '/simulator',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      name: 'Circle of Competence',
      description: 'Visualize mastery through repetition - compare K9 vs visual inspection capacity',
      icon: '🎯',
      status: 'live',
      url: '/competence',
      color: 'from-purple-500 to-blue-600'
    },
    {
      name: 'Service Quote Generator',
      description: 'Generate professional quotes for residential and commercial clients',
      icon: '📝',
      status: 'coming',
      url: '#',
      color: 'from-orange-500 to-red-600'
    },
    {
      name: 'Training Modules',
      description: 'Interactive training tools for pest identification and treatment',
      icon: '🎓',
      status: 'coming',
      url: '#',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Route Optimizer',
      description: 'Optimize daily service routes for maximum efficiency',
      icon: '🗺️',
      status: 'coming',
      url: '#',
      color: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Inspection Checklist',
      description: 'Digital inspection forms and documentation tools',
      icon: '✅',
      status: 'coming',
      url: '#',
      color: 'from-violet-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
              🪳
            </div>
            <span className="text-2xl font-black text-slate-800">PestSuite<span className="text-indigo-600">.ai</span></span>
          </Link>
          <Link 
            to="/simulator"
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg"
          >
            Launch Simulator
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 border border-indigo-200 rounded-full text-indigo-700 text-sm font-semibold mb-6">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Professional Pest Management Tools
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
          AI-Powered Tools for<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Pest Management Pros</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Powerful simulators, calculators, and productivity tools designed specifically for pest control professionals.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            to="/simulator"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <span>🚀</span> Try Population Simulator
          </Link>
          <a 
            href="#apps" 
            className="px-8 py-4 bg-white text-slate-700 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-lg flex items-center gap-2"
          >
            View All Tools
          </a>
        </div>
      </section>

      {/* Apps Grid */}
      <section id="apps" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-slate-800 text-center mb-4">Our Tools</h2>
        <p className="text-slate-600 text-center mb-12">Click any live tool to get started</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => {
            const CardWrapper = app.status === 'live' ? Link : 'div';
            const cardProps = app.status === 'live' ? { to: app.url } : {};
            
            return (
              <CardWrapper
                key={index}
                {...cardProps}
                className={`group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all ${app.status === 'live' ? 'hover:scale-105 cursor-pointer' : 'cursor-default opacity-75'}`}
              >
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${app.status === 'live' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {app.status === 'live' ? '● LIVE' : 'COMING SOON'}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {app.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-2">{app.name}</h3>
                <p className="text-slate-600 text-sm">{app.description}</p>

                {/* Arrow for live apps */}
                {app.status === 'live' && (
                  <div className="mt-4 flex items-center gap-2 text-indigo-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Launch App 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </div>
                )}
              </CardWrapper>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-slate-800 text-center mb-12">Why PestSuite?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🔬
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Science-Based</h3>
              <p className="text-slate-600">Built on peer-reviewed research and real-world pest management data</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Instant Results</h3>
              <p className="text-slate-600">No downloads or installations. Works instantly in your browser</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                📱
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Mobile Ready</h3>
              <p className="text-slate-600">Use on any device - desktop, tablet, or phone in the field</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-black text-slate-800 mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-slate-600 mb-8">Try our tools now - they're free!</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            to="/simulator"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-xl hover:scale-105"
          >
            🪳 Population Simulator
          </Link>
          <Link 
            to="/competence"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-xl hover:from-purple-500 hover:to-blue-500 transition-all shadow-xl hover:scale-105"
          >
            🎯 Circle of Competence
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                🪳
              </div>
              <span className="text-xl font-bold text-white">PestSuite<span className="text-indigo-400">.ai</span></span>
            </Link>
            <p className="text-sm">© 2025 PestSuite. Professional pest management tools.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
