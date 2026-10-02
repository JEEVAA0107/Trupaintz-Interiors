import React, { useState } from 'react';
import { PhaseBudgetBreakdown } from '../types';
import { useNotification } from '../context/NotificationContext';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ShieldCheck, 
  FileSpreadsheet, 
  Layers, 
  ArrowUpRight,
  Info
} from 'lucide-react';

interface VisualBudgetTrackerProps {
  totalContractValue?: number;
  amountPaid?: number;
  projectName?: string;
  clientName?: string;
}

const DEFAULT_PHASES: PhaseBudgetBreakdown[] = [
  {
    id: 'ph-1',
    phaseCode: 'PH-01',
    phaseName: 'Substrate Prep & Mechanized HEPA Sanding',
    category: 'Surface Engineering',
    allocatedAmount: 32000,
    spentAmount: 32000,
    status: 'Reconciled',
    description: 'Festool mechanized sanding, ultrasonic moisture audit, and crystalline bonding primer application.',
    materialSpent: 14000,
    laborSpent: 18000,
  },
  {
    id: 'ph-2',
    phaseCode: 'PH-02',
    phaseName: 'Drywall False Ceiling Framing & Profile Channels',
    category: 'Architectural Framing',
    allocatedAmount: 48000,
    spentAmount: 48000,
    status: 'Reconciled',
    description: 'Saint-Gobain Gypframe grid, perimeter shadowline bead, and concealed 2700K indirect LED coves.',
    materialSpent: 29000,
    laborSpent: 19000,
  },
  {
    id: 'ph-3',
    phaseCode: 'PH-03',
    phaseName: 'Artisanal Italian Stucco Living Elevation',
    category: 'Artisanal Plaster',
    allocatedAmount: 95000,
    spentAmount: 71250,
    status: 'In Execution',
    description: '3-coat Novacolor Venetian lime stucco with hand-burnished Champagne gold mica glazing.',
    materialSpent: 48000,
    laborSpent: 23250,
  },
  {
    id: 'ph-4',
    phaseCode: 'PH-04',
    phaseName: 'Modular Joinery & Fluted Oak Divider',
    category: 'Custom Millwork',
    allocatedAmount: 85000,
    spentAmount: 34000,
    status: 'Material Procured',
    description: 'Factory-cut matte graphite acrylic cabinetry with Blum servo soft-close hardware.',
    materialSpent: 34000,
    laborSpent: 0,
  },
  {
    id: 'ph-5',
    phaseCode: 'PH-05',
    phaseName: 'Royale Aspira Paint & Final Touch-up',
    category: 'Protective Finishes',
    allocatedAmount: 60000,
    spentAmount: 12000,
    status: 'Initial Stage',
    description: 'Teflon-enriched zero-VOC Asian Paints Royale Aspira on bedrooms and corridor elevations.',
    materialSpent: 8500,
    laborSpent: 3500,
  },
  {
    id: 'ph-6',
    phaseCode: 'PH-06',
    phaseName: 'Quality Handover & 10-Yr Warranty Certification',
    category: 'Assurance & Contingency',
    allocatedAmount: 25000,
    spentAmount: 4500,
    status: 'Initial Stage',
    description: 'Final thermal scans, poly-masking cleanup, and official digital warranty issuance.',
    materialSpent: 2000,
    laborSpent: 2500,
  },
];

export const VisualBudgetTracker: React.FC<VisualBudgetTrackerProps> = ({
  totalContractValue = 345000,
  amountPaid = 201750,
  projectName = 'Greenwood Heights 3BHK Renovation',
  clientName = 'Rajesh Sharma',
}) => {
  const { addNotification } = useNotification();
  const [phases] = useState<PhaseBudgetBreakdown[]>(DEFAULT_PHASES);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const totalAllocated = phases.reduce((acc, p) => acc + p.allocatedAmount, 0);
  const totalSpent = phases.reduce((acc, p) => acc + p.spentAmount, 0);
  const remainingBudget = totalAllocated - totalSpent;
  const spentPercent = Math.round((totalSpent / totalAllocated) * 100);

  // Material vs Labor aggregates
  const totalMaterialSpent = phases.reduce((acc, p) => acc + p.materialSpent, 0);
  const totalLaborSpent = phases.reduce((acc, p) => acc + p.laborSpent, 0);

  const categories = ['All', ...Array.from(new Set(phases.map(p => p.category)))];

  const filteredPhases = filterCategory === 'All' 
    ? phases 
    : phases.filter(p => p.category === filterCategory);

  const handleExportCSV = () => {
    const headers = 'Phase Code,Phase Name,Category,Allocated (INR),Spent (INR),Remaining (INR),Utilization %,Status,Materials (INR),Labor (INR)\n';
    const rows = phases.map(p => {
      const util = Math.round((p.spentAmount / p.allocatedAmount) * 100);
      const rem = p.allocatedAmount - p.spentAmount;
      return `"${p.phaseCode}","${p.phaseName}","${p.category}",${p.allocatedAmount},${p.spentAmount},${rem},"${util}%","${p.status}",${p.materialSpent},${p.laborSpent}`;
    });

    const summaryRows = [
      `\n"","Total Budget Allocation","Totals",${totalAllocated},${totalSpent},${remainingBudget},"${spentPercent}%","Reconciled",${totalMaterialSpent},${totalLaborSpent}`,
    ];

    const blob = new Blob([headers + rows.join('\n') + summaryRows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `TruPaintz_Budget_Reconciliation_${clientName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addNotification(
      'Budget Reconciliation Exported',
      `Itemized CSV budget statement for ${projectName} downloaded.`,
      'system'
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top Budget Header Card */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <TrendingUp className="h-4 w-4" />
              <span>Project Budget</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1">
              Budget &amp; Expenses
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Track contracted budget allocations and verified expenses for each project phase.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shadow-sm self-start lg:self-auto"
          >
            <Download className="h-4 w-4" />
            <span>Export Budget CSV</span>
          </button>
        </div>

        {/* 4 Financial Metric Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Allocated */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Contracted Budget
            </span>
            <div className="font-mono text-2xl font-bold text-neutral-950 dark:text-white mt-1 tabular-nums">
              ₹{totalAllocated.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">
              Fixed Price Scope
            </span>
          </div>

          {/* Card 2: Disbursed / Spent */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40">
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              Spent to Date ({spentPercent}%)
            </span>
            <div className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
              ₹{totalSpent.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-600/80 font-mono mt-0.5 block">
              Verified Against Milestones
            </span>
          </div>

          {/* Card 3: Remaining Capital */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              Remaining Balance
            </span>
            <div className="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
              ₹{remainingBudget.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-amber-600/80 font-mono mt-0.5 block">
              Scheduled For Later Phases
            </span>
          </div>

          {/* Card 4: Variance Health */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Budget Status
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                On Budget
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 block">
              0% Cost Overrun
            </span>
          </div>

        </div>

        {/* Global Budget Track */}
        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-2">
            <span className="font-semibold text-neutral-900 dark:text-white">
              Total Budget Spent
            </span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white">
              ₹{totalSpent.toLocaleString('en-IN')} of ₹{totalAllocated.toLocaleString('en-IN')} ({spentPercent}%)
            </span>
          </div>

          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-3 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="bg-emerald-500 h-full transition-all duration-700"
              style={{ width: `${spentPercent}%` }}
              title={`Disbursed Capital: ${spentPercent}%`}
            />
            <div
              className="bg-neutral-200 dark:bg-neutral-700 h-full transition-all duration-700"
              style={{ width: `${100 - spentPercent}%` }}
              title={`Remaining Capital: ${100 - spentPercent}%`}
            />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Materials Disbursed: ₹{totalMaterialSpent.toLocaleString('en-IN')}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Labor Disbursed: ₹{totalLaborSpent.toLocaleString('en-IN')}</span>
              </span>
            </div>
            <span>Remaining Buffer: ₹{remainingBudget.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

      {/* Phase Breakdown List & Filter Bar */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h4 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
              Phase-by-Phase Budget Breakdown
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5">
              Breakdown across preparation, framing, finishes, and custom joinery.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 max-w-fit">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Phase Items List */}
        <div className="space-y-4">
          {filteredPhases.map(phase => {
            const utilization = Math.round((phase.spentAmount / phase.allocatedAmount) * 100);
            const remaining = phase.allocatedAmount - phase.spentAmount;

            const isReconciled = phase.status === 'Reconciled';
            const isExecution = phase.status === 'In Execution';

            return (
              <div
                key={phase.id}
                className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 transition-colors shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        {phase.phaseCode}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">·</span>
                      <span className="text-[11px] font-medium text-neutral-500">
                        {phase.category}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">·</span>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          isReconciled
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : isExecution
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                        }`}
                      >
                        {phase.status}
                      </span>
                    </div>

                    <h5 className="font-display text-base font-bold text-neutral-950 dark:text-white mt-1">
                      {phase.phaseName}
                    </h5>

                    <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  {/* Financial Numbers Cluster */}
                  <div className="flex items-baseline lg:items-end flex-row lg:flex-col justify-between gap-4 shrink-0">
                    <div>
                      <span className="text-[11px] text-neutral-400 lg:text-right block">Allocated Scope</span>
                      <span className="font-mono text-base font-bold text-neutral-950 dark:text-white tabular-nums">
                        ₹{phase.allocatedAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-neutral-400 lg:text-right block">Disbursed to Date</span>
                      <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        ₹{phase.spentAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comparative Progress Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-500">
                      Disbursed: <strong className="text-neutral-900 dark:text-white">{utilization}%</strong>
                    </span>
                    <span className="text-neutral-400">
                      Unspent Remaining: <strong className="text-neutral-700 dark:text-neutral-300">₹{remaining.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>

                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isReconciled
                          ? 'bg-emerald-500'
                          : isExecution
                          ? 'bg-amber-500'
                          : 'bg-indigo-500'
                      }`}
                      style={{ width: `${utilization}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-neutral-400 font-mono pt-0.5">
                    <span>Material: ₹{phase.materialSpent.toLocaleString('en-IN')}</span>
                    <span>Artisan Labor: ₹{phase.laborSpent.toLocaleString('en-IN')}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
