import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Users, 
  Calendar, 
  Layers, 
  Search, 
  Plus, 
  FileText,
  Filter,
  Check,
  Smartphone
} from 'lucide-react';
import { AppDownloadBanner } from './AppDownloadBanner';

interface SiteProject {
  id: string;
  name: string;
  client: string;
  location: string;
  service: string;
  value: number;
  stage: 'Prep & Sanding' | 'Putty & Primer' | 'Italian Stucco' | 'Final Coat' | 'Handover Quality Audit';
  progress: number;
  deadline: string;
  leadArchitect: string;
  status: 'on_track' | 'needs_attention' | 'completed';
}

const INITIAL_SITES: SiteProject[] = [
  {
    id: 'PRJ-2026-88',
    name: 'Greenwood Heights 3BHK Renovation',
    client: 'Rajesh Sharma',
    location: 'Sarjapur Main Road',
    service: 'Italian Stucco + False Ceilings',
    value: 580000,
    stage: 'Italian Stucco',
    progress: 72,
    deadline: '28 Oct 2026',
    leadArchitect: 'Arun Kumar',
    status: 'on_track',
  },
  {
    id: 'PRJ-2026-92',
    name: 'The Solarium Penthouse',
    client: 'Vikram & Ananya Sen',
    location: 'Indiranagar 100ft Rd',
    service: 'Turnkey Living + Roman Stucco',
    value: 1250000,
    stage: 'Handover Quality Audit',
    progress: 95,
    deadline: '06 Oct 2026',
    leadArchitect: 'Arun Kumar',
    status: 'on_track',
  },
  {
    id: 'PRJ-2026-94',
    name: 'Prestige Lakeside Villa 14',
    client: 'Kavita Menon',
    location: 'Varthur Lake View',
    service: 'Modular Kitchen + Dustless Repaint',
    value: 840000,
    stage: 'Putty & Primer',
    progress: 48,
    deadline: '15 Nov 2026',
    leadArchitect: 'Deepak Rao',
    status: 'on_track',
  },
  {
    id: 'PRJ-2026-99',
    name: 'UB City Boutique Studio',
    client: 'Tara Oberoi',
    location: 'Lavelle Road',
    service: 'Monolithic Microtopping & Track Ceilings',
    value: 620000,
    stage: 'Prep & Sanding',
    progress: 30,
    deadline: '22 Nov 2026',
    leadArchitect: 'Pooja Hegde',
    status: 'needs_attention',
  },
];

export const ProjectManagerDashboard: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();

  const [sites, setSites] = useState<SiteProject[]>(INITIAL_SITES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState<SiteProject | null>(sites[0]);
  const [stageUpdate, setStageUpdate] = useState('');
  const [logNote, setLogNote] = useState('');

  // Export CSV Report Action
  const handleExportCSV = () => {
    const headers = ['Project ID,Project Name,Client,Location,Service,Contract Value (INR),Stage,Progress %,Deadline,Lead Architect,Status\n'];
    const rows = sites.map(s => 
      `"${s.id}","${s.name}","${s.client}","${s.location}","${s.service}",${s.value},"${s.stage}",${s.progress},"${s.deadline}","${s.leadArchitect}","${s.status}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `TruPaintz_Project_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addNotification(
      'Analytics Report Exported',
      'Executive CSV summary for all active projects has been downloaded.',
      'system'
    );
  };

  const handleUpdateProgress = (newProgress: number) => {
    if (!selectedSite) return;
    setSites(prev => prev.map(s => s.id === selectedSite.id ? { ...s, progress: newProgress } : s));
    setSelectedSite(prev => prev ? { ...prev, progress: newProgress } : null);
    addNotification('Site Progress Updated', `${selectedSite.name} progress adjusted to ${newProgress}%.`, 'project');
  };

  const filteredSites = sites.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPipeline = sites.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner Navigation & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
            <span>Project Management Console</span>
            <span aria-hidden="true">·</span>
            <span>Lead: {user?.name || 'Arun Kumar'}</span>
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            Executive Site Analytics &amp; Operations
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="rounded-lg border border-neutral-300 px-3.5 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Return to Public Site
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-500 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* Mobile App Download Card (Android APK) */}
      <div className="mt-8">
        <AppDownloadBanner />
      </div>

      {/* Quantitative Rigor Stats Row (Anti-Slop Tabular Numbers) */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Active Sites</span>
          <p className="mt-2 font-mono text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
            {sites.length}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block">
            100% mechanized crews deployed
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Total Pipeline Value</span>
          <p className="mt-2 font-mono text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
            ₹{(totalPipeline / 100000).toFixed(2)}L
          </p>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Across Bengaluru metro sites
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">On-Time Velocity</span>
          <p className="mt-2 font-mono text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
            98.4%
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block">
            Within 35-day average cycle
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Client Satisfaction Index</span>
          <p className="mt-2 font-mono text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
            4.95 / 5.0
          </p>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Based on 140+ verified handovers
          </span>
        </div>
      </div>

      {/* Main Grid: Site Directory & Detailed Operations Panel */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sites List (Col-Span 7) */}
        <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
          
          <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search projects, clients or localities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
            <span className="text-xs text-neutral-400 font-mono shrink-0">
              {filteredSites.length} Projects
            </span>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {filteredSites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              return (
                <div
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-amber-500/10 border-l-4 border-amber-500'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                        <span className="font-mono">{site.id}</span>
                        <span aria-hidden="true">·</span>
                        <span>{site.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>Lead: {site.leadArchitect}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-neutral-950 dark:text-white mt-1">
                        {site.name}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        Client: {site.client} · Scope: {site.service}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                        ₹{(site.value / 100000).toFixed(2)}L
                      </span>
                      <div className="mt-1 flex items-center gap-1.5 justify-end">
                        <div className="w-16 bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-500 h-full rounded-full"
                            style={{ width: `${site.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-neutral-500">{site.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
                    <span>Current Stage: <strong className="text-neutral-800 dark:text-neutral-200">{site.stage}</strong></span>
                    <span>Deadline: {site.deadline}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Project Management Action Drawer (Col-Span 5) */}
        {selectedSite && (
          <div className="lg:col-span-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-6">
            
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
                {selectedSite.id} · Active Inspection
              </span>
              <h3 className="font-display text-xl font-bold text-neutral-950 dark:text-white mt-1">
                {selectedSite.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Client: {selectedSite.client} ({selectedSite.location})
              </p>
            </div>

            {/* Progress Adjustment */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span>Update Completion Percentage:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{selectedSite.progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={selectedSite.progress}
                onChange={(e) => handleUpdateProgress(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex gap-2 mt-3">
                {[25, 50, 75, 100].map(val => (
                  <button
                    key={val}
                    onClick={() => handleUpdateProgress(val)}
                    className="flex-1 rounded-lg border border-neutral-200 dark:border-neutral-700 py-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stage Checklist */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Site Verification Checklist
              </h4>
              <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                {[
                  'Thermal Moisture Audit Under 10%',
                  'HEPA Mechanized Sanding Complete',
                  'Client Approved 2x2 Swatch On-Site',
                  'Cove Lighting Channel Laser-Aligned',
                  'Post-Job Masking Cleanliness Signoff',
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 cursor-pointer">
                    <input type="checkbox" defaultChecked={idx < 3} className="rounded accent-amber-600" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Direct Communication Note to Client */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Broadcast Site Update to Client ({selectedSite.client})
              </label>
              <textarea
                rows={2}
                value={logNote}
                onChange={(e) => setLogNote(e.target.value)}
                placeholder="e.g. Living room Italian Stucco second coat burnished; curing under ventilation..."
                className="w-full rounded-xl border border-neutral-300 bg-white p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (logNote.trim()) {
                    addNotification(
                      `Update Dispatched to ${selectedSite.client}`,
                      logNote,
                      'project'
                    );
                    setLogNote('');
                  }
                }}
                className="mt-2 w-full rounded-lg bg-neutral-900 dark:bg-amber-600 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
              >
                Send Client Push Notification
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
