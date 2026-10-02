import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { INITIAL_CLIENT_PROJECT } from '../data/mockData';
import { ClientProject, ProjectMilestone } from '../types';
import { VisualProjectTimeline } from './VisualProjectTimeline';
import { MilestoneReviewModal } from './MilestoneReviewModal';
import { ServiceCostExportModal } from './ServiceCostExportModal';
import { ClientLoyaltyProgram } from './ClientLoyaltyProgram';
import { GlobalProjectProgressBar } from './GlobalProjectProgressBar';
import { VisualBudgetTracker } from './VisualBudgetTracker';
import { ProjectDocumentsModule } from './ProjectDocumentsModule';
import { UploadedProjectPhotos } from './UploadedProjectPhotos';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileCheck, 
  Palette, 
  Image as ImageIcon, 
  PhoneCall, 
  ChevronRight, 
  ShieldCheck, 
  Send, 
  Star, 
  Download, 
  FileSpreadsheet,
  Award,
  Coins,
  Gift,
  PieChart,
  FolderLock,
  FileText,
  Camera
} from 'lucide-react';

export const ClientPortal: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [project, setProject] = useState<ClientProject>(INITIAL_CLIENT_PROJECT);
  const [activeTab, setActiveTab] = useState<'timeline' | 'photos' | 'budget' | 'documents' | 'loyalty' | 'updates' | 'swatches' | 'billing'>('timeline');
  const [clientComment, setClientComment] = useState('');
  
  // Review & Service Cost Export Modal states
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewMilestoneStage, setReviewMilestoneStage] = useState('01. Substrate Prep & Dustless Sanding');
  const [isExportCostModalOpen, setIsExportCostModalOpen] = useState(false);

  const handleUpdateMilestones = (updated: ProjectMilestone[]) => {
    // Recalculate overall progress
    const total = updated.reduce((sum, m) => sum + m.completionPercent, 0);
    const overall = Math.round(total / updated.length);

    setProject(prev => ({
      ...prev,
      milestones: updated,
      overallProgress: overall,
    }));
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientComment.trim()) return;

    const newUpdate = {
      id: `up-${Date.now()}`,
      date: 'Just now',
      text: `Client Note: ${clientComment}`,
    };

    setProject(prev => ({
      ...prev,
      liveUpdates: [newUpdate, ...prev.liveUpdates],
    }));

    addNotification('Client Note Posted', 'Your site question has been sent to Arun Kumar.', 'project');
    setClientComment('');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
            <span>Client Portal</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{project.id}</span>
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            {project.projectName}
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{project.location}</span>
            <span aria-hidden="true">·</span>
            <span>Project Manager: {project.managerName}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('photos')}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
            title="View Site Photos"
          >
            <Camera className="h-3.5 w-3.5 text-amber-500" />
            <span>Site Photos (8)</span>
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            title="View Project Budget & Expenses"
          >
            <PieChart className="h-3.5 w-3.5 text-amber-500" />
            <span>Budget (₹2.01L / ₹3.45L)</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            title="View Contracts & Documents"
          >
            <FileText className="h-3.5 w-3.5 text-neutral-500" />
            <span>Documents (6)</span>
          </button>

          <button
            onClick={() => setActiveTab('loyalty')}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            title="View Rewards & Points"
          >
            <Coins className="h-3.5 w-3.5 text-amber-500" />
            <span>Rewards (2,450 Pts)</span>
          </button>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>Rate Milestone</span>
          </button>

          <button
            onClick={() => setIsExportCostModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-neutral-500" />
            <span>Export Costs</span>
          </button>

          <button
            onClick={onBackToHome}
            className="rounded-lg border border-neutral-300 px-3.5 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Back to Site
          </button>
        </div>
      </div>

      {/* Global Project Progress Bar - Aggregating all Milestone Statuses */}
      <div className="mt-8">
        <GlobalProjectProgressBar
          milestones={project.milestones}
          startDate={project.startDate}
          estimatedFinish={project.estimatedFinish}
          onSelectMilestone={(stage) => {
            setActiveTab('timeline');
          }}
        />
      </div>

      {/* Interactive Tabs */}
      <div className="mt-8 flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto">
        {[
          { id: 'timeline', label: 'Timeline' },
          { id: 'photos', label: 'Photos (8)' },
          { id: 'budget', label: 'Budget & Costs' },
          { id: 'documents', label: 'Documents (6)' },
          { id: 'loyalty', label: 'Rewards' },
          { id: 'updates', label: 'Live Updates' },
          { id: 'swatches', label: 'Color Swatches' },
          { id: 'billing', label: 'Billing & Payments' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Visual Project Timeline & Milestone Stages */}
      {activeTab === 'timeline' && (
        <div className="mt-6">
          <VisualProjectTimeline
            milestones={project.milestones}
            onUpdateMilestones={handleUpdateMilestones}
            onReviewMilestone={(stage) => {
              setReviewMilestoneStage(stage);
              setIsReviewModalOpen(true);
            }}
            clientName={project.clientName}
            projectName={project.projectName}
          />
        </div>
      )}

      {/* Tab: Uploaded Project Photos Gallery */}
      {activeTab === 'photos' && (
        <div className="mt-6">
          <UploadedProjectPhotos
            clientName={project.clientName}
            projectName={project.projectName}
          />
        </div>
      )}

      {/* Tab: Visual Budget Tracker */}
      {activeTab === 'budget' && (
        <div className="mt-6">
          <VisualBudgetTracker
            totalContractValue={project.contractValue}
            amountPaid={project.amountPaid}
            projectName={project.projectName}
            clientName={project.clientName}
          />
        </div>
      )}

      {/* Tab: Project Documents Vault */}
      {activeTab === 'documents' && (
        <div className="mt-6">
          <ProjectDocumentsModule
            clientName={project.clientName}
            projectName={project.projectName}
          />
        </div>
      )}

      {/* Tab: Patron Loyalty & Service Rewards */}
      {activeTab === 'loyalty' && (
        <div className="mt-6">
          <ClientLoyaltyProgram
            clientName={project.clientName}
            projectName={project.projectName}
          />
        </div>
      )}

      {/* Tab 2: Live Site Updates & Photos */}
      {activeTab === 'updates' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {project.liveUpdates.map((update) => (
              <div
                key={update.id}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>Site Broadcast</span>
                  <span className="font-mono">{update.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {update.text}
                </p>
                {update.image && (
                  <div className="mt-3 aspect-[16/9] max-h-60 rounded-xl overflow-hidden bg-neutral-950">
                    <img
                      src={update.image}
                      alt="Site condition snapshot"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Message to Site Architect */}
          <div className="lg:col-span-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm self-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
              Direct Desk to Site Architect
            </h4>
            <p className="text-xs text-neutral-500 mb-4">
              Need a small adjustment or clarification on today's coats?
            </p>
            <form onSubmit={handleSendComment} className="space-y-3">
              <textarea
                rows={3}
                required
                value={clientComment}
                onChange={(e) => setClientComment(e.target.value)}
                placeholder="Type your message for Arun Kumar..."
                className="w-full rounded-xl border border-neutral-300 bg-neutral-50 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Note to Site Team</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Approved Swatches */}
      {activeTab === 'swatches' && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.selectedColors.map((col, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex items-center gap-4"
            >
              <div
                className="h-12 w-12 rounded-xl border border-black/20 shadow-inner shrink-0"
                style={{ backgroundColor: col.hex }}
              />
              <div>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block">
                  {col.room}
                </span>
                <h4 className="text-sm font-bold text-neutral-950 dark:text-white mt-0.5">
                  {col.name}
                </h4>
                <span className="text-xs font-mono text-neutral-400">{col.hex}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Contract & Billing */}
      {activeTab === 'billing' && (
        <div className="mt-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <span className="text-xs text-neutral-400 block">Total Contract Scope</span>
              <p className="font-mono text-2xl font-bold text-neutral-950 dark:text-white mt-1 tabular-nums">
                ₹{project.contractValue.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block">Amount Disbursed to Date</span>
              <p className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                ₹{project.amountPaid.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block">Handover Milestone Balance</span>
              <p className="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
                ₹{(project.contractValue - project.amountPaid).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-100 dark:border-neutral-800 pt-6">
            <div>
              <span className="text-xs text-neutral-500 block">Next invoice unlocks upon: <strong>Stage 04 (Italian Stucco Handover)</strong></span>
              <span className="text-[11px] text-neutral-400 font-mono">GST Registered Invoice Reference #TP-2026-INV88</span>
            </div>
            
            <button
              onClick={() => setIsExportCostModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <Download className="h-4 w-4" />
              <span>Export Itemized Service Cost BOQ (CSV/Print)</span>
            </button>
          </div>
        </div>
      )}

      {/* Milestone Review & Rating Modal */}
      <MilestoneReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        milestones={project.milestones}
        clientName={project.clientName}
        projectName={project.projectName}
        location={project.location}
        defaultMilestoneStage={reviewMilestoneStage}
      />

      {/* Project Service Cost Breakdown Export Modal */}
      <ServiceCostExportModal
        isOpen={isExportCostModalOpen}
        onClose={() => setIsExportCostModalOpen(false)}
        projectName={project.projectName}
        clientName={project.clientName}
        totalCost={project.contractValue}
        sqft={1800}
      />

    </div>
  );
};
