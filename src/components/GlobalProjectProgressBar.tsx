import React from 'react';
import { ProjectMilestone } from '../types';
import { 
  CheckCircle2, 
  Hammer, 
  Package, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface GlobalProjectProgressBarProps {
  milestones: ProjectMilestone[];
  startDate?: string;
  estimatedFinish?: string;
  onSelectMilestone?: (milestoneStage: string) => void;
}

export const GlobalProjectProgressBar: React.FC<GlobalProjectProgressBarProps> = ({
  milestones,
  startDate = '12 Sep 2026',
  estimatedFinish = '28 Oct 2026',
  onSelectMilestone,
}) => {
  const total = milestones.length;
  if (total === 0) return null;

  // Calculate aggregated progress percentage
  const totalCompletionSum = milestones.reduce((sum, m) => sum + (m.completionPercent || 0), 0);
  const globalProgress = Math.round(totalCompletionSum / total);

  // Group milestones by status for visual aggregation
  const completed = milestones.filter(m => m.status === 'Completed' || m.status === 'completed');
  const execution = milestones.filter(m => m.status === 'Execution Phase');
  const sourcing = milestones.filter(m => m.status === 'Material Sourcing');
  const inProgress = milestones.filter(m => m.status === 'In Progress' || m.status === 'in_progress');
  const pending = milestones.filter(m => m.status === 'Pending' || m.status === 'pending');

  // Calculate proportional segment widths based on milestone completion contributions
  const completedContribution = Math.round(
    (completed.reduce((sum, m) => sum + m.completionPercent, 0) / totalCompletionSum) * globalProgress
  ) || 0;

  const executionContribution = Math.round(
    (execution.reduce((sum, m) => sum + m.completionPercent, 0) / totalCompletionSum) * globalProgress
  ) || 0;

  const sourcingContribution = Math.round(
    (sourcing.reduce((sum, m) => sum + m.completionPercent, 0) / totalCompletionSum) * globalProgress
  ) || 0;

  const inProgressContribution = Math.max(
    0,
    globalProgress - (completedContribution + executionContribution + sourcingContribution)
  );

  return (
    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
      
      {/* Top Header Row with Aggregated Percentage */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Project Milestones</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 mt-1.5">
            <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white tabular-nums">
              {globalProgress}%
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wide">
                Overall Progress
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>On Schedule · {completed.length} of {total} Milestones Complete</span>
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Status Breakdown Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>{completed.length} Completed</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium border border-amber-500/20">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{execution.length} In Progress</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium border border-indigo-500/20">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span>{sourcing.length} Sourcing</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium border border-neutral-200 dark:border-neutral-700">
            <span className="h-2 w-2 rounded-full bg-neutral-400" />
            <span>{pending.length} Upcoming</span>
          </div>
        </div>
      </div>

      {/* Main Global Segmented Progress Bar */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
            Progress by Status
          </span>
          <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
            {globalProgress}% / 100%
          </span>
        </div>

        {/* Multi-Segment Aggregated Bar Container */}
        <div className="relative h-4 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex shadow-inner">
          {/* Completed Segment */}
          {completedContribution > 0 && (
            <div
              className="h-full bg-emerald-500 transition-all duration-700 relative group cursor-pointer"
              style={{ width: `${completedContribution}%` }}
              title={`Completed Milestones: ${completedContribution}% of total project`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Execution Phase Segment */}
          {executionContribution > 0 && (
            <div
              className="h-full bg-amber-500 transition-all duration-700 relative group cursor-pointer"
              style={{ width: `${executionContribution}%` }}
              title={`Execution Phase: ${executionContribution}% of total project`}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          )}

          {/* Material Sourcing Segment */}
          {sourcingContribution > 0 && (
            <div
              className="h-full bg-indigo-500 transition-all duration-700 relative group cursor-pointer"
              style={{ width: `${sourcingContribution}%` }}
              title={`Material Sourcing: ${sourcingContribution}% of total project`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* In Progress Segment */}
          {inProgressContribution > 0 && (
            <div
              className="h-full bg-sky-500 transition-all duration-700 relative group cursor-pointer"
              style={{ width: `${inProgressContribution}%` }}
              title={`In Progress: ${inProgressContribution}% of total project`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* Legend Indicator under Bar */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-neutral-400 font-mono pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Completed ({completedContribution}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Execution ({executionContribution}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>Sourcing ({sourcingContribution}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>In Progress ({inProgressContribution}%)</span>
            </span>
          </div>

          <span className="text-neutral-500 dark:text-neutral-400">
            Remaining: {100 - globalProgress}%
          </span>
        </div>
      </div>

      {/* Individual Milestone Progress Strip */}
      <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Milestones Overview
          </span>
          <span className="text-[11px] text-neutral-400">
            Click any milestone to view details
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {milestones.map((m, idx) => {
            const isCompleted = m.status === 'Completed' || m.status === 'completed';
            const isExecution = m.status === 'Execution Phase';
            const isSourcing = m.status === 'Material Sourcing';
            const isInProgress = m.status === 'In Progress' || m.status === 'in_progress';

            const statusColor = isCompleted
              ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10'
              : isExecution
              ? 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/10'
              : isSourcing
              ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-950/10'
              : isInProgress
              ? 'text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-50/30 dark:bg-sky-950/10'
              : 'text-neutral-400 border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30';

            return (
              <button
                key={m.id || idx}
                onClick={() => onSelectMilestone && onSelectMilestone(m.stage)}
                className={`p-3 rounded-2xl border text-left transition-all hover:scale-[1.02] focus:outline-none ${statusColor}`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="font-bold">Stage 0{idx + 1}</span>
                  <span className="font-bold tabular-nums">{m.completionPercent}%</span>
                </div>

                <p className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1 leading-snug">
                  {m.phaseCategory || m.stage.split('.')[1] || m.stage}
                </p>

                <div className="mt-2 w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isCompleted
                        ? 'bg-emerald-500'
                        : isExecution
                        ? 'bg-amber-500'
                        : isSourcing
                        ? 'bg-indigo-500'
                        : 'bg-sky-500'
                    }`}
                    style={{ width: `${m.completionPercent}%` }}
                  />
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
                  <span className="truncate">{m.status}</span>
                  <span className="font-mono shrink-0">{m.targetDate.split(' ')[0]} {m.targetDate.split(' ')[1]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Handover & Quality Guarantee Footer Bar */}
      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-neutral-400" />
            <span>Start Date: <strong className="font-mono text-neutral-800 dark:text-neutral-200">{startDate}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-amber-500" />
            <span>Target Completion: <strong className="font-mono text-amber-600 dark:text-amber-400">{estimatedFinish}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck className="h-4 w-4" />
          <span>10-Year Quality &amp; Adhesion Warranty Included</span>
        </div>
      </div>

    </div>
  );
};
