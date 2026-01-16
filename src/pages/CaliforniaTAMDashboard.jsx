import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Utensils, Hotel, Heart, Factory, ShoppingBag, GraduationCap, ChevronDown, TrendingUp, MapPin, Users, Warehouse, Clapperboard, Landmark, Building, Target, DollarSign, AlertCircle, BarChart3, CheckCircle, Sun, Moon } from 'lucide-react';

const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
};

const sectors = [
  {
    id: 'residential',
    name: 'Multi-Family Residential',
    icon: Building2,
    color: '#10B981',
    description: 'Apartments & Property Management',
    totalLabel: 'Total Apartment Units',
    totalValue: 3130264,
    metrics: [
      { label: 'Total Apartment Units', value: 3130264, highlight: true },
      { label: 'High-Density (50+ units)', value: '34.3%', sublabel: 'Best route efficiency' },
      { label: 'Mid-Size (20-49 units)', value: '19.4%' },
      { label: 'Mid-Size (10-19 units)', value: '22.7%' },
      { label: 'Small (5-9 units)', value: '23.6%' },
      { label: 'Affordable Housing Units', value: 676799, sublabel: 'HUD REAC compliance required' },
      { label: 'Units in Development', value: 44700, sublabel: 'New construction pipeline' },
    ],
    metros: [
      { name: 'Los Angeles-Long Beach-Anaheim', value: 1443142 },
      { name: 'San Francisco-Oakland-Fremont', value: 477429 },
      { name: 'San Diego-Carlsbad', value: 312055 },
      { name: 'San Jose-Sunnyvale-Santa Clara', value: 184231 },
      { name: 'Riverside-San Bernardino (IE)', value: 183440 },
      { name: 'Sacramento-Roseville-Folsom', value: 151076 },
      { name: 'Fresno', value: 51749 },
    ],
    insights: [
      { type: 'opportunity', text: 'High-density complexes (50+ units) offer best route efficiency at 34.3% of market' },
      { type: 'compliance', text: 'Affordable housing (676K units) requires audit-ready pest control for HUD REAC inspections - high retention accounts' },
      { type: 'strategy', text: 'Target Property Management Companies, HOAs, REITs, and Affordable Housing Developers' },
    ]
  },
  {
    id: 'foodservice',
    name: 'Food Service & Restaurants',
    icon: Utensils,
    color: '#F59E0B',
    description: 'Commercial Kitchens & Food Prep',
    totalLabel: 'Restaurant Locations',
    totalValue: 86779,
    metrics: [
      { label: 'Restaurant Locations (CA)', value: 86779, highlight: true },
      { label: 'Single-Unit Operations', value: '70%+', sublabel: 'Requires street sales approach' },
      { label: 'Employees Under 50', value: '90%+', sublabel: 'Small business focus' },
      { label: 'Minority-Owned (CA)', value: '58%', sublabel: 'Highest in U.S.' },
      { label: 'Asian-Owned', value: '34%' },
      { label: 'Hispanic-Owned', value: '22%' },
      { label: 'Women-Owned (50%+)', value: '48%' },
      { label: 'Industry Rank', value: '2nd', sublabel: 'Largest private employer in CA' },
    ],
    nationalContext: [
      { label: 'U.S. Restaurant Locations', value: '1M+' },
      { label: 'U.S. Industry Employees', value: '15.9M' },
      { label: 'U.S. Forecast Sales (2025)', value: '$1.5T' },
      { label: 'Economic Contribution', value: '$3.5T' },
    ],
    insights: [
      { type: 'strategy', text: 'Street sales approach essential - over 70% are single-unit operations, not chains' },
      { type: 'opportunity', text: 'Health department regulations and inspections create consistent, recurring demand' },
      { type: 'demographic', text: '58% minority-owned in CA (highest in nation) - diverse ownership requires tailored approach' },
      { type: 'scale', text: '2nd largest private-sector employer in California - massive market' },
    ]
  },
  {
    id: 'hospitality',
    name: 'Hotels & Lodging',
    icon: Hotel,
    color: '#6366F1',
    description: 'Hotels, Motels & Resorts',
    totalLabel: 'Hotel Properties',
    totalValue: 6778,
    metrics: [
      { label: 'Hotel Properties', value: 6778, highlight: true },
      { label: 'Total Guestrooms', value: 571794, highlight: true },
      { label: 'Hotel Guest Spending', value: '$85.7B' },
      { label: 'Direct Employment', value: 258604 },
      { label: 'Wages & Salaries (Direct)', value: '$16.1B' },
      { label: 'Total Industry Wages', value: '$69.9B' },
      { label: 'Share of CA Jobs', value: '3.9%' },
      { label: 'Total Taxes Generated', value: '$30.8B' },
      { label: 'Lodging Taxes', value: '$2.7B' },
    ],
    insights: [
      { type: 'opportunity', text: 'Bed bug services: 571,794 guestrooms represent massive responsive revenue opportunity' },
      { type: 'budget', text: '$69.9B in industry wages indicates robust operational budgets for services' },
      { type: 'strategy', text: 'Hotels require brand protection - premium service positioning justified' },
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Clinical',
    icon: Heart,
    color: '#EC4899',
    description: 'Hospitals, Clinics & Care Facilities',
    totalLabel: 'Healthcare Facilities',
    totalValue: '10,546',
    metrics: [
      { label: 'Total Hospitals (All Types)', value: 440, highlight: true, sublabel: '78,530 beds' },
      { label: 'General Acute Care Hospitals', value: 357, sublabel: '73,403 beds' },
      { label: 'Acute Psychiatric Hospitals', value: 41, sublabel: '4,063 beds' },
      { label: 'Chemical Dep. Recovery Hospitals', value: 7, sublabel: '429 beds' },
      { label: 'Psychiatric Health Facilities', value: 35, sublabel: '635 beds' },
      { label: 'Community Clinics', value: 1246, highlight: true },
      { label: 'Chronic Dialysis Clinics', value: 649 },
      { label: 'Skilled Nursing Facilities', value: 1079, sublabel: '108,876 beds' },
      { label: 'Hospice Agencies', value: 2704 },
      { label: 'Home Health Agencies', value: 4032 },
    ],
    subSection: {
      title: 'Top Counties - All Hospitals',
      metrics: [
        { label: 'Los Angeles County', value: 102, sublabel: '23,433 beds' },
        { label: 'Orange County', value: 30, sublabel: '5,986 beds' },
        { label: 'San Diego County', value: 25, sublabel: '6,342 beds' },
        { label: 'San Bernardino County', value: 24, sublabel: '4,278 beds' },
        { label: 'Riverside County', value: 23, sublabel: '3,840 beds' },
        { label: 'Sacramento County', value: 20, sublabel: '3,658 beds' },
      ]
    },
    metros: [
      { name: 'Los Angeles (Dialysis)', value: '198 clinics' },
      { name: 'Orange County (Dialysis)', value: '50 clinics' },
      { name: 'San Diego (Dialysis)', value: '37 clinics' },
      { name: 'San Bernardino (Dialysis)', value: '36 clinics' },
      { name: 'Riverside (Dialysis)', value: '35 clinics' },
      { name: 'Sacramento (Dialysis)', value: '29 clinics' },
    ],
    insights: [
      { type: 'compliance', text: 'Zero-tolerance environments requiring strict IPM protocols - 440 hospitals with 78,530 beds statewide' },
      { type: 'value', text: 'Hospitals are high-value audit accounts. LA County alone has 102 hospitals with 23,433 beds' },
      { type: 'opportunity', text: 'Community clinics (1,246) and dialysis centers (649) offer high-volume recurring service opportunities' },
      { type: 'scale', text: 'SNFs (1,079 facilities with 108,876 beds) overlap with senior living vertical for comprehensive contracts' },
    ]
  },
  {
    id: 'seniorliving',
    name: 'Senior Living & Long-Term Care',
    icon: Users,
    color: '#F472B6',
    description: 'RCFEs, SNFs & Adult Facilities',
    totalLabel: 'Licensed Facilities',
    totalValue: '15,256',
    metrics: [
      { label: 'RCFEs (Assisted Living)', value: 7939, highlight: true, sublabel: '207,618 beds • Age 60+' },
      { label: 'Standard RCFEs', value: 7830, sublabel: '172,751 beds' },
      { label: 'RCFE-CCRCs', value: 109, sublabel: '34,867 beds' },
      { label: 'Adult Residential Facilities (ARFs)', value: 6128, highlight: true, sublabel: '40,041 beds • Ages 18-59' },
      { label: 'Skilled Nursing Facilities (SNFs)', value: 1079, sublabel: '108,876 beds (from healthcare data)' },
      { label: 'Total Beds (RCFE + ARF)', value: 247659 },
    ],
    subSection: {
      title: 'Top Counties - RCFEs (Assisted Living)',
      metrics: [
        { label: 'Los Angeles County', value: 1648, sublabel: '43,390 beds' },
        { label: 'Orange County', value: 1054, sublabel: '25,199 beds' },
        { label: 'Sacramento County', value: 634, sublabel: '10,712 beds' },
        { label: 'San Diego County', value: 581, sublabel: '22,248 beds' },
        { label: 'Riverside County', value: 530, sublabel: '10,669 beds' },
        { label: 'Contra Costa County', value: 435, sublabel: '7,512 beds' },
      ]
    },
    metros: [
      { name: 'Los Angeles County (ARF)', value: '1,596 facilities • 11,602 beds' },
      { name: 'San Diego County (ARF)', value: '577 facilities • 3,377 beds' },
      { name: 'Riverside County (ARF)', value: '460 facilities • 2,456 beds' },
      { name: 'Orange County (ARF)', value: '384 facilities • 2,537 beds' },
      { name: 'San Bernardino County (ARF)', value: '380 facilities • 2,179 beds' },
      { name: 'Sacramento County (ARF)', value: '354 facilities • 1,967 beds' },
    ],
    insights: [
      { type: 'opportunity', text: 'RCFEs often operate in converted residential structures - unique service requirements. LA County alone has 1,648 facilities.' },
      { type: 'compliance', text: 'SNFs are institutional/clinical environments with strict regulatory oversight' },
      { type: 'strategy', text: 'ARFs (6,128 facilities) focus on behavioral and social support for ages 18-59 - different client profile than elderly care' },
      { type: 'scale', text: 'Combined 247,659 beds across RCFE and ARF facilities - massive recurring service opportunity' },
    ]
  },
  {
    id: 'education',
    name: 'Education & Schools',
    icon: GraduationCap,
    color: '#0EA5E9',
    description: 'K-12 Schools & Higher Education',
    totalLabel: 'Educational Institutions',
    totalValue: '13,400+',
    metrics: [
      { label: 'Public K-12 Schools', value: '~10,200', highlight: true, sublabel: 'All types including charters' },
      { label: 'Private K-12 Schools (≥6 students)', value: '~3,000' },
      { label: 'All Private Schools (incl. micro)', value: '~33,600', sublabel: 'Includes home/micro-schools' },
    ],
    subSection: {
      title: 'Higher Education',
      metrics: [
        { label: 'Community Colleges', value: 116, sublabel: 'In 73 districts' },
        { label: 'UC Campuses', value: 10, sublabel: 'Housing + food service' },
        { label: 'CSU Campuses', value: 23, sublabel: 'Housing, dining halls' },
        { label: 'Private Nonprofit Colleges', value: '~150+' },
        { label: 'For-Profit Colleges', value: '70-80' },
        { label: 'Total Degree-Granting Campuses', value: '~375' },
      ]
    },
    insights: [
      { type: 'compliance', text: 'Public schools require Healthy Schools Act compliance - specialized protocols' },
      { type: 'strategy', text: 'Public entities require complex RFP processes - longer sales cycles' },
      { type: 'opportunity', text: 'Higher ed campuses offer large contracts: food service, dorms, student unions, facilities' },
    ]
  },
  {
    id: 'warehousing',
    name: 'Warehousing & Logistics',
    icon: Warehouse,
    color: '#8B5CF6',
    description: 'Distribution Centers & Storage',
    totalLabel: 'Warehouse Facilities',
    totalValue: '34,000+',
    metrics: [
      { label: 'SCAG Region Warehouses', value: 34133, highlight: true, sublabel: '6-county Southern CA' },
      { label: 'Transportation & Warehousing Est.', value: 21178, sublabel: 'NAICS 48-49 statewide' },
      { label: 'SoCal Warehouse/DC Est. (NAICS 493)', value: '~1,500', sublabel: '5 SoCal counties only' },
      { label: 'Cold Storage Facilities', value: 'Hundreds', sublabel: 'Ports, Central Valley, IE' },
    ],
    insights: [
      { type: 'scale', text: 'Tens of thousands of addressable warehouse buildings statewide' },
      { type: 'opportunity', text: 'Heaviest concentration in SCAG region (Inland Empire + LA/OC) - 34,133 facilities' },
      { type: 'strategy', text: 'Cold storage is specialist subset clustered around ports and Central Valley' },
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Food Processing',
    icon: Factory,
    color: '#7C3AED',
    description: 'F&B Plants & Industrial',
    totalLabel: 'F&B Manufacturing Plants',
    totalValue: 6569,
    metrics: [
      { label: 'Food & Beverage Mfg. Plants', value: 6569, highlight: true, sublabel: 'High-value audit accounts' },
      { label: 'CA Manufacturing Share', value: '66%', sublabel: 'Of Pacific-NW region establishments' },
      { label: 'Total Manufacturing Facilities', value: 'Tens of thousands', sublabel: 'All NAICS 31-33' },
    ],
    insights: [
      { type: 'value', text: 'F&B manufacturing plants are "great high-value pest accounts" due to audit requirements' },
      { type: 'compliance', text: 'Third-party audit requirements: SQF, AIB, BRC certification' },
      { type: 'strategy', text: 'Core high-priority: 6,500+ F&B plants. Rest is long tail of light industrial, packaging' },
    ]
  },
  {
    id: 'retail',
    name: 'Retail & Grocery',
    icon: ShoppingBag,
    color: '#14B8A6',
    description: 'Grocery, Convenience & Shopping',
    totalLabel: 'Retail Locations',
    totalValue: '57,000+',
    metrics: [
      { label: 'Grocery Stores (Broad)', value: '~30,000', highlight: true, sublabel: 'Including ethnic markets' },
      { label: 'Supermarkets (Major Chains)', value: '~4,700', sublabel: 'True supermarket universe' },
      { label: 'Convenience Stores (Broad)', value: 12169, sublabel: 'Includes gas stations' },
      { label: 'Convenience Stores (Strict)', value: '~6,800', sublabel: 'NAICS definition' },
      { label: 'Shopping Centers', value: 15285, sublabel: 'Neighborhood to regional malls' },
    ],
    insights: [
      { type: 'opportunity', text: 'Shopping centers (15,285) offer multi-tenant contract potential' },
      { type: 'strategy', text: 'Ethnic markets within 30K grocery represent diverse, fragmented sales opportunities' },
      { type: 'scale', text: 'C-stores are small tickets but high volume - 12,000+ locations' },
    ]
  },
  {
    id: 'office',
    name: 'Office & Commercial Buildings',
    icon: Building,
    color: '#64748B',
    description: 'Office Buildings & Mixed-Use',
    totalLabel: 'Cities & Towns',
    totalValue: 481,
    metrics: [
      { label: 'Incorporated Cities/Towns', value: 481, highlight: true },
      { label: 'Class A/B Office Buildings', value: 'Thousands', sublabel: 'Coastal metros concentration' },
      { label: 'Key Markets', value: 'SF Bay, LA/OC, SD, Sacramento' },
    ],
    insights: [
      { type: 'scale', text: 'Huge, diffuse market - each city has dozens to hundreds of multi-tenant office buildings' },
      { type: 'opportunity', text: 'County/state/federal office complexes in addition to private buildings' },
      { type: 'strategy', text: 'Overlaps with Retail & Government verticals - strip centers, mixed-use' },
    ]
  },
  {
    id: 'entertainment',
    name: 'Hospitality & Entertainment',
    icon: Clapperboard,
    color: '#EF4444',
    description: 'Casinos, Theaters & Venues',
    totalLabel: 'Entertainment Venues',
    totalValue: '790+',
    metrics: [
      { label: 'Tribal Casinos', value: 66, highlight: true },
      { label: 'Cardrooms (Non-Tribal)', value: 59 },
      { label: 'Theme & Amusement Parks', value: '30-35', sublabel: 'Major parks' },
      { label: 'Major Stadiums & Arenas', value: '25-30', sublabel: 'Pro teams + D-I colleges' },
      { label: 'Movie Theater Sites', value: '~600', sublabel: '4,800 screens' },
      { label: 'Event Venues', value: 'Thousands', sublabel: 'Convention centers, fairgrounds' },
    ],
    insights: [
      { type: 'value', text: 'Casinos (66 tribal + 59 cardrooms) are high-value accounts with 24/7 operations' },
      { type: 'opportunity', text: 'Theme parks (30-35) have massive square footage and food service operations' },
      { type: 'strategy', text: 'Stadiums/arenas selected by prospecting specific cities and teams' },
    ]
  },
  {
    id: 'government',
    name: 'Government & Institutional',
    icon: Landmark,
    color: '#0D9488',
    description: 'Prisons, Military & Public Housing',
    totalLabel: 'Government Facilities',
    totalValue: '1,300+',
    metrics: [
      { label: 'Counties', value: 58, highlight: true },
      { label: 'Incorporated Cities/Towns', value: 481 },
      { label: 'State Adult Prisons', value: 33 },
      { label: 'Military Installations', value: 44 },
      { label: 'Public Housing Facilities/Agencies', value: 662 },
      { label: 'County Jails', value: 'Dozens', sublabel: 'e.g., 5 in Riverside County' },
    ],
    insights: [
      { type: 'scale', text: 'Thousands of government-owned sites: city halls, libraries, courthouses, admin buildings' },
      { type: 'opportunity', text: 'Public housing (662 agencies) - recurring contracts with compliance requirements' },
      { type: 'strategy', text: 'Military bases (44) and prisons (33) are large, secure facility contracts' },
    ]
  },
];

const InsightBadge = ({ type, text, isDark }) => {
  const configs = {
    opportunity: { icon: Target, color: '#10B981', bg: 'rgba(16,185,129,0.1)', label: 'Opportunity' },
    strategy: { icon: TrendingUp, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: 'Strategy' },
    compliance: { icon: AlertCircle, color: '#EC4899', bg: 'rgba(236,72,153,0.1)', label: 'Compliance' },
    value: { icon: DollarSign, color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', label: 'High Value' },
    demographic: { icon: Users, color: '#6366F1', bg: 'rgba(99,102,241,0.1)', label: 'Demographics' },
    budget: { icon: DollarSign, color: '#14B8A6', bg: 'rgba(20,184,166,0.1)', label: 'Budget' },
    scale: { icon: BarChart3, color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', label: 'Scale' },
  };

  const config = configs[type] || configs.opportunity;
  const Icon = config.icon;

  const textColor = isDark ? 'text-slate-300' : 'text-slate-700';
  const borderColor = isDark ? 'border-white/5' : 'border-black/5';

  return (
    <div style={{ backgroundColor: config.bg }} className={`rounded-xl p-4 border ${borderColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color: config.color }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: config.color }}>
          {config.label}
        </span>
      </div>
      <p className={`text-sm ${textColor} leading-relaxed`}>{text}</p>
    </div>
  );
};

const MetricCard = ({ label, value, sublabel, highlight, isDark }) => {
  const colors = {
    text: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-200' : 'text-slate-700',
    textTertiary: isDark ? 'text-slate-400' : 'text-slate-600',
    textQuaternary: isDark ? 'text-slate-500' : 'text-slate-500',
    bgHighlight: isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-emerald-50 border-emerald-200',
    bgNormal: isDark ? 'bg-slate-800/30' : 'bg-slate-100',
  };

  return (
    <div className={`p-4 rounded-xl ${highlight ? `${colors.bgHighlight} border` : colors.bgNormal}`}>
      <div className={`font-bold ${highlight ? `text-2xl ${colors.text}` : `text-lg ${colors.textSecondary}`}`}>
        {typeof value === 'number' ? formatNumber(value) : value}
      </div>
      <div className={`text-sm ${colors.textTertiary} mt-1`}>{label}</div>
      {sublabel && <div className={`text-xs ${colors.textQuaternary} mt-1`}>{sublabel}</div>}
    </div>
  );
};

export default function CaliforniaTAMDashboard() {
  const [selectedSectorId, setSelectedSectorId] = useState('residential');
  const [theme, setTheme] = useState('dark');

  const selectedSector = sectors.find(s => s.id === selectedSectorId) || sectors[0];
  const Icon = selectedSector.icon;

  const isDark = theme === 'dark';

  const colors = {
    bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    cardBg: isDark ? 'bg-slate-900/80' : 'bg-white',
    cardBorder: isDark ? 'border-slate-800' : 'border-slate-200',
    text: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-slate-600',
    textTertiary: isDark ? 'text-slate-500' : 'text-slate-500',
    summaryBg: isDark ? 'bg-slate-900/70' : 'bg-white',
    summaryBorder: isDark ? 'border-slate-800' : 'border-slate-200',
    selectBg: isDark ? 'bg-slate-900' : 'bg-white',
    selectBorder: isDark ? 'border-slate-700' : 'border-slate-300',
    selectBorderHover: isDark ? 'border-slate-600' : 'border-slate-400',
    selectBorderFocus: isDark ? 'border-emerald-500' : 'border-emerald-600',
    metricBg: isDark ? 'bg-slate-800/30' : 'bg-slate-100',
    metricBgHighlight: isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-emerald-50 border-emerald-200',
    pillBg: isDark ? 'bg-slate-800/50' : 'bg-slate-200',
    pillBgHover: isDark ? 'bg-slate-800' : 'bg-slate-300',
    pillText: isDark ? 'text-slate-400' : 'text-slate-600',
    pillTextHover: isDark ? 'text-white' : 'text-slate-900',
    footerBorder: isDark ? 'border-slate-800' : 'border-slate-200',
    footerText: isDark ? 'text-slate-600' : 'text-slate-400',
  };

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-200`} style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Background */}
      <div className="fixed inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Back to PestSuite Navigation */}
      <div className={`fixed top-4 left-4 z-50`}>
        <Link
          to="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
            isDark
              ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 shadow-md'
          } backdrop-blur-sm`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          Back to PestSuite
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(16,185,129,0.15)' }}>
                <Target size={28} className="text-emerald-400" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${colors.text}`}>California TAM Dashboard</h1>
                <p className={colors.textTertiary}>Pest Control Market Intelligence • 2024-2025 Data</p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-3 rounded-xl ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'} transition-colors`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
            </button>
          </div>
        </header>

        {/* Summary Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {[
            { label: 'Restaurants', value: '86,779', color: '#F59E0B' },
            { label: 'Apartment Units', value: '3.1M', color: '#10B981' },
            { label: 'Hotel Rooms', value: '571K', color: '#6366F1' },
            { label: 'Healthcare', value: '10,546', color: '#EC4899' },
            { label: 'Senior/Adult Care', value: '15,256', color: '#F472B6' },
            { label: 'F&B Mfg Plants', value: '6,569', color: '#8B5CF6' },
          ].map((stat, i) => (
            <div key={i} className={`${colors.summaryBg} backdrop-blur rounded-xl p-4 border ${colors.summaryBorder}`}>
              <div className={`text-2xl font-bold ${colors.text}`}>{stat.value}</div>
              <div className={`text-xs ${colors.textTertiary} mt-1`}>{stat.label}</div>
              <div className="h-1 rounded-full mt-3" style={{ backgroundColor: `${stat.color}30` }}>
                <div className="h-full rounded-full w-3/4" style={{ backgroundColor: stat.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Dropdown Selector */}
        <div className="mb-8">
          <label className={`block text-sm font-medium ${colors.textSecondary} mb-2`}>
            Select Market Vertical
          </label>
          <div className="relative">
            <select
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className={`w-full ${colors.selectBg} border-2 ${colors.selectBorder} rounded-xl py-4 px-5 pr-12
                ${colors.text} text-lg font-medium appearance-none cursor-pointer
                focus:outline-none focus:${colors.selectBorderFocus} transition-colors
                hover:${colors.selectBorderHover}`}
            >
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name} — {typeof sector.totalValue === 'number' ? formatNumber(sector.totalValue) : sector.totalValue} {sector.totalLabel}
                </option>
              ))}
            </select>
            <ChevronDown
              size={24}
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${colors.textSecondary} pointer-events-none`}
            />
          </div>
        </div>

        {/* Selected Sector Detail */}
        <div className={`${colors.cardBg} backdrop-blur-xl rounded-2xl border ${colors.cardBorder} overflow-hidden`}>
          {/* Sector Header */}
          <div
            className={`p-6 border-b ${colors.cardBorder}`}
            style={{ background: `linear-gradient(135deg, ${selectedSector.color}15, transparent)` }}
          >
            <div className="flex items-center gap-4">
              <div
                className="p-4 rounded-2xl"
                style={{ backgroundColor: `${selectedSector.color}20` }}
              >
                <Icon size={32} style={{ color: selectedSector.color }} />
              </div>
              <div className="flex-1">
                <h2 className={`text-2xl font-bold ${colors.text}`}>{selectedSector.name}</h2>
                <p className={colors.textSecondary}>{selectedSector.description}</p>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${colors.text}`}>
                  {typeof selectedSector.totalValue === 'number'
                    ? formatNumber(selectedSector.totalValue)
                    : selectedSector.totalValue}
                </div>
                <div className={`text-sm ${colors.textTertiary}`}>{selectedSector.totalLabel}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Key Metrics Grid */}
            <section>
              <h3 className={`text-sm font-semibold ${colors.textTertiary} uppercase tracking-wider mb-4 flex items-center gap-2`}>
                <BarChart3 size={16} />
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {selectedSector.metrics.map((metric, i) => (
                  <MetricCard key={i} {...metric} isDark={isDark} />
                ))}
              </div>
            </section>

            {/* National Context (if exists) */}
            {selectedSector.nationalContext && (
              <section>
                <h3 className={`text-sm font-semibold ${colors.textTertiary} uppercase tracking-wider mb-4`}>
                  National Context (U.S.)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedSector.nationalContext.map((metric, i) => (
                    <MetricCard key={i} {...metric} isDark={isDark} />
                  ))}
                </div>
              </section>
            )}

            {/* Sub-section (if exists) */}
            {selectedSector.subSection && (
              <section>
                <h3 className={`text-sm font-semibold ${colors.textTertiary} uppercase tracking-wider mb-4`}>
                  {selectedSector.subSection.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedSector.subSection.metrics.map((metric, i) => (
                    <MetricCard key={i} {...metric} isDark={isDark} />
                  ))}
                </div>
              </section>
            )}

            {/* Top Metros (if exists) */}
            {selectedSector.metros && selectedSector.metros.length > 0 && (
              <section>
                <h3 className={`text-sm font-semibold ${colors.textTertiary} uppercase tracking-wider mb-4 flex items-center gap-2`}>
                  <MapPin size={16} />
                  {selectedSector.id === 'seniorliving' ? 'Top Counties - ARFs (Adult Residential)' :
                   selectedSector.id === 'healthcare' ? 'Top Counties - Dialysis Clinics' :
                   'Top California Markets'}
                </h3>
                <div className="space-y-2">
                  {selectedSector.metros.map((metro, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isDark ? 'bg-slate-800/40 hover:bg-slate-800/60' : 'bg-slate-100 hover:bg-slate-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                          style={{ backgroundColor: `${selectedSector.color}20`, color: selectedSector.color }}>
                          {i + 1}
                        </div>
                        <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{metro.name}</span>
                      </div>
                      <span className={`font-semibold ${colors.text}`}>
                        {typeof metro.value === 'number' ? formatNumber(metro.value) : metro.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Strategic Insights */}
            <section>
              <h3 className={`text-sm font-semibold ${colors.textTertiary} uppercase tracking-wider mb-4 flex items-center gap-2`}>
                <CheckCircle size={16} />
                Strategic Insights
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedSector.insights.map((insight, i) => (
                  <InsightBadge key={i} {...insight} isDark={isDark} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Quick Nav Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setSelectedSectorId(sector.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedSectorId === sector.id
                  ? `${colors.text}`
                  : `${colors.pillBg} ${colors.pillText} hover:${colors.pillBgHover} hover:${colors.pillTextHover}`
                }`}
              style={selectedSectorId === sector.id ? { backgroundColor: sector.color } : {}}
            >
              {sector.name}
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className={`mt-12 pt-6 border-t ${colors.footerBorder}`}>
          <p className={`text-sm ${colors.footerText} text-center`}>
            Data: NRA 2024-25, NMHC 2023, AHLA, CDSS Licensed Facilities (May 2025), CDPH Healthcare Facilities (June 2025), USDA ERS, SCAG, CDE
          </p>
        </footer>
      </div>
    </div>
  );
}
