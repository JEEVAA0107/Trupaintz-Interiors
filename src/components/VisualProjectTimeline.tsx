import React, { useState } from 'react';
import { ProjectMilestone, MilestoneStatus } from '../types';
import { useNotification } from '../context/NotificationContext';
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  Hammer, 
  Sparkles, 
  Calendar, 
  User, 
  ChevronDown, 
  ChevronUp, 
  CheckSquare, 
  Square, 
  Maximize2, 
  AlertCircle,
  ShieldCheck,
  Check,
  Star
} from 'lucide-react';

interface VisualProjectTimelineProps {
  milestones: ProjectMilestone[];
  onUpdateMilestones?: (updated: ProjectMilestone[]) => void;
  onReviewMilestone?: (stageName: string) => void;
  clientName?: string;
  projectName?: string;
}

export const VisualProjectTimeline: React.FC<VisualProjectTimelineProps> = ({
  milestones: initialMilestones,
  onUpdateMilestones,
  onReviewMilestone,
  clientName = 'Valued Homeowner',
  projectName = 'Residential Renovation',
}) => {
  const { addNotification } = useNotification();
  const [milestones, setMilestones] = useState<ProjectMilestone[]>(initialMilestones);
  const [activeFilter, setActiveFilter] = useState<'All' | MilestoneStatus>('All');
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(
    initialMilestones.find(m => m.status === 'Execution Phase')?.id || initialMilestones[0]?.id || null
  );
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  // Status mapping and styling helpers
  const getStatusBadge = (status: ProjectMilestone['status']) => {
    switch (status) {
      case 'Execution Phase':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Hammer className="h-3.5 w-3.5 animate-pulse" />
            <span>Execution Phase</span>
          </span>
        );
      case 'Material Sourcing':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
            <Package className="h-3.5 w-3.5" />
            <span>Material Sourcing</span>
          </span>
        );
      case 'In Progress':
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400 border border-sky-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>In Progress</span>
          </span>
        );
      case 'Completed':
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Completed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-500/10 px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 border border-neutral-500/20">
            <Clock className="h-3.5 w-3.5" />
            <span>Scheduled</span>
          </span>
        );
    }
  };

  // Toggle subtask checklist item
  const handleToggleSubtask = (milestoneIdx: number, subtaskId: string) => {
    const updated = [...milestones];
    const targetMilestone = { ...updated[milestoneIdx] };
    if (!targetMilestone.subtasks) return;

    targetMilestone.subtasks = targetMilestone.subtasks.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    // Recalculate completion percent
    const completedCount = targetMilestone.subtasks.filter(st => st.completed).length;
    const newPercent = Math.round((completedCount / targetMilestone.subtasks.length) * 100);
    targetMilestone.completionPercent = newPercent;

    if (newPercent === 100 && targetMilestone.status !== 'Completed') {
      targetMilestone.status = 'Completed';
      addNotification('Milestone Fully Completed', `All tasks for "${targetMilestone.stage}" signed off!`, 'project');
    }

    updated[milestoneIdx] = targetMilestone;
    setMilestones(updated);
    if (onUpdateMilestones) onUpdateMilestones(updated);
  };

  const handleSignOffStage = (stageName: string, idx: number) => {
    const updated = [...milestones];
    updated[idx] = {
      ...updated[idx],
      status: 'Completed',
      completionPercent: 100,
    };
    if (updated[idx].subtasks) {
      updated[idx].subtasks = updated[idx].subtasks?.map(st => ({ ...st, completed: true }));
    }
    setMilestones(updated);
    if (onUpdateMilestones) onUpdateMilestones(updated);
    addNotification('Stage Verified by Client', `Quality signoff recorded for ${stageName}. Certificate logged.`, 'project');
  };

  const handleRequestAudit = (stageName: string) => {
    addNotification(
      'Site Audit Requested',
      `Inspection visit requested for "${stageName}". Site Architect Arun Kumar notified.`,
      'project'
    );
  };

  const filteredMilestones = milestones.filter(m => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'In Progress') return m.status === 'In Progress' || m.status === 'in_progress';
    if (activeFilter === 'Completed') return m.status === 'Completed' || m.status === 'completed';
    return m.status === activeFilter;
  });

  // Calculate totals
  const totalCompleted = milestones.filter(m => m.status === 'Completed' || m.status === 'completed').length;
  const inExecution = milestones.filter(m => m.status === 'Execution Phase').length;
  const inSourcing = milestones.filter(m => m.status === 'Material Sourcing').length;
  const inProgressCount = milestones.filter(m => m.status === 'In Progress' || m.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      
      {/* Visual Stepper Tracker Card */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
        
        {/* Header & Status Metrics Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Project Milestone Roadmap</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white mt-1">
              Visual Execution Timeline
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Live tracking for {clientName} · {projectName}
            </p>
          </div>

          {/* Status Breakdown Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-500/20">
              <CheckCircle2 className="h-3 w-3" />
              <span>{totalCompleted} Completed</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium border border-amber-500/20">
              <Hammer className="h-3 w-3" />
              <span>{inExecution} Execution Phase</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium border border-indigo-500/20">
              <Package className="h-3 w-3" />
              <span>{inSourcing} Material Sourcing</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-400 font-medium border border-sky-500/20">
              <Sparkles className="h-3 w-3" />
              <span>{inProgressCount} In Progress</span>
            </span>
          </div>
        </div>

        {/* Horizontal Visual Step Connector (Desktop & Tablet) */}
        <div className="hidden md:block pt-8 pb-4">
          <div className="relative flex items-center justify-between">
            {/* Connecting Track Line */}
            <div className="absolute left-6 right-6 top-5 h-1 bg-neutral-100 dark:bg-neutral-800 -z-0">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-indigo-500 transition-all duration-700"
                style={{
                  width: `${(totalCompleted / (milestones.length - 1)) * 100}%`,
                }}
              />
            </div>

            {milestones.map((m, idx) => {
              const isCompleted = m.status === 'Completed' || m.status === 'completed';
              const isExecution = m.status === 'Execution Phase';
              const isSourcing = m.status === 'Material Sourcing';
              const isInProgress = m.status === 'In Progress' || m.status === 'in_progress';
              const isExpanded = expandedMilestoneId === m.id;

              return (
                <button
                  key={m.id || idx}
                  onClick={() => setExpandedMilestoneId(isExpanded ? null : m.id || `m-${idx}`)}
                  className="group relative z-10 flex flex-col items-center text-center focus:outline-none max-w-[130px]"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      isCompleted
                        ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                        : isExecution
                        ? 'border-amber-500 bg-amber-500 text-white ring-4 ring-amber-500/20 shadow-lg scale-110'
                        : isSourcing
                        ? 'border-indigo-500 bg-indigo-500 text-white ring-4 ring-indigo-500/20 shadow-md'
                        : isInProgress
                        ? 'border-sky-500 bg-sky-500 text-white ring-4 ring-sky-500/20'
                        : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : isExecution ? (
                      <Hammer className="h-4 w-4" />
                    ) : isSourcing ? (
                      <Package className="h-4 w-4" />
                    ) : isInProgress ? (
                      <Sparkles className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    )}
                  </div>

                  <span className="font-semibold text-xs text-neutral-900 dark:text-white mt-2.5 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {m.phaseCategory || m.stage.split('.')[1] || m.stage}
                  </span>

                  <div className="mt-1">
                    {getStatusBadge(m.status)}
                  </div>

                  <span className="font-mono text-[10px] text-neutral-400 mt-1">
                    {m.targetDate}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 max-w-fit">
          {[
            { id: 'All', label: 'All Stages' },
            { id: 'Execution Phase', label: 'Execution Phase' },
            { id: 'Material Sourcing', label: 'Material Sourcing' },
            { id: 'In Progress', label: 'In Progress' },
            { id: 'Completed', label: 'Completed' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Vertical Milestone Progress Cards */}
      <div className="space-y-4">
        {filteredMilestones.map((milestone, idx) => {
          const isExpanded = expandedMilestoneId === milestone.id;
          const isExecution = milestone.status === 'Execution Phase';
          const isSourcing = milestone.status === 'Material Sourcing';
          const isInProgress = milestone.status === 'In Progress' || milestone.status === 'in_progress';
          const isCompleted = milestone.status === 'Completed' || milestone.status === 'completed';

          return (
            <div
              key={milestone.id || idx}
              className={`rounded-2xl border transition-all ${
                isExecution
                  ? 'border-amber-400 dark:border-amber-700/80 bg-white dark:bg-neutral-900 shadow-md ring-1 ring-amber-400/30'
                  : isSourcing
                  ? 'border-indigo-300 dark:border-indigo-800/80 bg-white dark:bg-neutral-900 shadow-sm'
                  : isInProgress
                  ? 'border-sky-300 dark:border-sky-800/80 bg-white dark:bg-neutral-900 shadow-sm'
                  : isCompleted
                  ? 'border-emerald-200 dark:border-emerald-900/40 bg-neutral-50/50 dark:bg-neutral-900/30'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
              }`}
            >
              {/* Card Header Accordion Bar */}
              <div
                onClick={() => setExpandedMilestoneId(isExpanded ? null : milestone.id || `m-${idx}`)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {/* Status Indicator Icon Block */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      isCompleted
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : isExecution
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : isSourcing
                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                        : isInProgress
                        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : isExecution ? (
                      <Hammer className="h-5 w-5 animate-pulse" />
                    ) : isSourcing ? (
                      <Package className="h-5 w-5" />
                    ) : isInProgress ? (
                      <Sparkles className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(milestone.status)}
                      {milestone.phaseCategory && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                          · {milestone.phaseCategory}
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-base sm:text-lg font-bold text-neutral-950 dark:text-white mt-1">
                      {milestone.stage}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                        <span>Target: {milestone.targetDate}</span>
                      </span>
                      {milestone.leadArtisan && (
                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5 text-neutral-400" />
                          <span>{milestone.leadArtisan}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Progress % & Accordion Arrow */}
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-white tabular-nums">
                      {milestone.completionPercent}%
                    </span>
                    <div className="w-24 sm:w-28 bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted
                            ? 'bg-emerald-500'
                            : isExecution
                            ? 'bg-amber-500'
                            : isSourcing
                            ? 'bg-indigo-500'
                            : 'bg-sky-500'
                        }`}
                        style={{ width: `${milestone.completionPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Stage Deep Details */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-6">
                  
                  {/* Notes / Site Log */}
                  <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/50 p-4 border border-neutral-200/60 dark:border-neutral-700/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                      Site Supervisor Log
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {milestone.notes}
                    </p>
                  </div>

                  {/* Subtask Quality Verification Checklist */}
                  {milestone.subtasks && milestone.subtasks.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                          Milestone Quality Checkpoints ({milestone.subtasks.filter(s => s.completed).length}/{milestone.subtasks.length} Completed)
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          Click to toggle inspection verification
                        </span>
                      </div>

                      <div className="space-y-2">
                        {milestone.subtasks.map((task) => (
                          <button
                            key={task.id}
                            type="button"
                            onClick={() => handleToggleSubtask(idx, task.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-colors ${
                              task.completed
                                ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 text-neutral-800 dark:text-neutral-200'
                                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {task.completed ? (
                                <CheckSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              ) : (
                                <Square className="h-4 w-4 text-neutral-400 shrink-0" />
                              )}
                              <span className={task.completed ? 'line-through text-neutral-500' : 'font-medium'}>
                                {task.title}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                              {task.completed ? 'VERIFIED' : 'PENDING'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Photographic Proof Grid */}
                  {milestone.photos && milestone.photos.length > 0 && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-3">
                        Site Photographic Proofs
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {milestone.photos.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() => setActivePhotoModal(photo)}
                            className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-950 cursor-pointer group shadow-sm"
                          >
                            <img
                              src={photo}
                              alt={`${milestone.stage} inspection proof`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1 font-medium">
                              <Maximize2 className="h-3.5 w-3.5" />
                              <span>View Full Size</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Milestone Actions Row */}
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-amber-500" />
                      <span>Compliant with TruPaintz 10-Year Warranty Standards</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRequestAudit(milestone.stage)}
                        className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        Request Joint Inspection
                      </button>

                      {isCompleted && onReviewMilestone && (
                        <button
                          type="button"
                          onClick={() => onReviewMilestone(milestone.stage)}
                          className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
                        >
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          <span>Rate Milestone</span>
                        </button>
                      )}

                      {!isCompleted && (
                        <button
                          onClick={() => handleSignOffStage(milestone.stage, idx)}
                          className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 shadow-sm transition-colors"
                        >
                          Sign Off Stage
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Photo Modal */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={activePhotoModal}
              alt="Site photographic inspection enlarged"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 text-xs rounded-full">
              Click anywhere to close
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
