import React, { useState, useEffect } from 'react';
import { LoyaltyReward, LoyaltyTransaction, ClientReferral } from '../types';
import { useNotification } from '../context/NotificationContext';
import { 
  Award, 
  Gift, 
  Users, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Tag, 
  CheckCircle2,
  X,
  Send,
  Coins
} from 'lucide-react';

interface ClientLoyaltyProgramProps {
  clientName: string;
  projectName: string;
}

const INITIAL_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-1',
    title: 'Bespoke Italian Stucco Feature Wall (Up to 100 sq.ft.)',
    category: 'Artisanal Wall Finish',
    pointsCost: 1200,
    valueINR: 15000,
    description: 'Hand-troweled Venetian lime plaster with metallic mica gold flecks for any bedroom or foyer accent wall.',
    tag: 'Most Popular',
  },
  {
    id: 'rew-2',
    title: 'Complimentary 1-Year Finish Inspection & Touch-up',
    category: 'Annual Maintenance',
    pointsCost: 600,
    valueINR: 8000,
    description: 'Comprehensive inspection by a certified senior artisan with micro-blemish burnishing and deep seal buffing.',
    tag: 'Zero Cost Touchup',
  },
  {
    id: 'rew-3',
    title: 'Architectural Magnetic Track & Cove LED Upgrade',
    category: 'Lighting Architecture',
    pointsCost: 1400,
    valueINR: 18000,
    description: '10-meter seamless 2700K indirect cove profile or magnetic spotlight channel installation.',
    tag: 'Luxury Ambience',
  },
  {
    id: 'rew-4',
    title: 'Thermal Moisture & Waterproofing Audit (2nd Property)',
    category: 'Diagnostic Audit',
    pointsCost: 400,
    valueINR: 5000,
    description: 'Non-invasive pinless moisture meter and Fluke thermal scan for any apartment, villa, or commercial studio.',
    tag: 'Property Care',
  },
  {
    id: 'rew-5',
    title: 'On-Site 2x2 Physical Swatch Box & Design Review',
    category: 'Consultation',
    pointsCost: 300,
    valueINR: 4000,
    description: 'Custom fabricated physical stucco swatches brought to your residence with lighting Kelvin test.',
    tag: 'Material Library',
  },
  {
    id: 'rew-6',
    title: 'Direct ₹10,000 Renovation Credit Voucher',
    category: 'Invoice Credit',
    pointsCost: 1000,
    valueINR: 10000,
    description: 'Direct deduction off your next project milestone, modular joinery order, or repainting contract.',
    tag: 'Direct Savings',
  },
];

const INITIAL_REFERRALS: ClientReferral[] = [
  {
    id: 'ref-1',
    name: 'Suresh Nambiar',
    phone: '+91 98450 88219',
    property: 'Villa 18, Palm Meadows',
    status: 'Site Visit Booked',
    pointsPending: 750,
    date: '28 Sep 2026',
  },
  {
    id: 'ref-2',
    name: 'Ananya Deshmukh',
    phone: '+91 99001 44521',
    property: 'Tower C, Godrej Woodsman',
    status: 'Project Commenced',
    pointsPending: 2000,
    date: '15 Sep 2026',
  },
];

const INITIAL_TRANSACTIONS: LoyaltyTransaction[] = [
  {
    id: 'tx-1',
    title: 'Milestone 01 Signoff Bonus (Substrate Preparation)',
    type: 'earned',
    points: 500,
    date: '18 Sep 2026',
  },
  {
    id: 'tx-2',
    title: 'Milestone 02 Signoff Bonus (False Ceiling Framing)',
    type: 'earned',
    points: 500,
    date: '26 Sep 2026',
  },
  {
    id: 'tx-3',
    title: 'Verified Milestone Review Submission',
    type: 'earned',
    points: 250,
    date: 'Yesterday',
  },
  {
    id: 'tx-4',
    title: 'Referral Qualified: Ananya Deshmukh Project Kickoff',
    type: 'earned',
    points: 1200,
    date: '15 Sep 2026',
  },
];

export const ClientLoyaltyProgram: React.FC<ClientLoyaltyProgramProps> = ({
  clientName,
  projectName,
}) => {
  const { addNotification } = useNotification();

  // Persisted state
  const [points, setPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('trupaintz_loyalty_points');
      if (saved) return Number(saved);
    } catch {}
    return 2450;
  });

  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('trupaintz_loyalty_txs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TRANSACTIONS;
  });

  const [referrals, setReferrals] = useState<ClientReferral[]>(() => {
    try {
      const saved = localStorage.getItem('trupaintz_loyalty_referrals');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_REFERRALS;
  });

  const [activeTab, setActiveTab] = useState<'catalog' | 'referrals' | 'history'>('catalog');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeVoucherModal, setActiveVoucherModal] = useState<{
    reward: LoyaltyReward;
    voucherCode: string;
  } | null>(null);

  // Referral form fields
  const [refName, setRefName] = useState('');
  const [refPhone, setRefPhone] = useState('');
  const [refProperty, setRefProperty] = useState('');
  const [refSubmitting, setRefSubmitting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('trupaintz_loyalty_points', String(points));
      localStorage.setItem('trupaintz_loyalty_txs', JSON.stringify(transactions));
      localStorage.setItem('trupaintz_loyalty_referrals', JSON.stringify(referrals));
    } catch {}
  }, [points, transactions, referrals]);

  const referralCode = `TRUPAINTZ-${clientName.toUpperCase().replace(/\s+/g, '').slice(0, 6)}88`;

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      addNotification('Referral Code Copied', `Code ${referralCode} copied to clipboard! Share with friends to earn 2,000 points.`, 'system');
    }
  };

  const handleRedeemReward = (reward: LoyaltyReward) => {
    if (points < reward.pointsCost) {
      addNotification(
        'Insufficient Points',
        `You need ${reward.pointsCost - points} more points to redeem ${reward.title}.`,
        'system'
      );
      return;
    }

    const voucherCode = `TP-REDEEM-${reward.category.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBalance = points - reward.pointsCost;
    setPoints(newBalance);

    const newTx: LoyaltyTransaction = {
      id: `tx-${Date.now()}`,
      title: `Redeemed: ${reward.title}`,
      type: 'redeemed',
      points: reward.pointsCost,
      date: 'Just now',
      voucherCode,
    };

    setTransactions(prev => [newTx, ...prev]);
    setActiveVoucherModal({ reward, voucherCode });

    addNotification(
      'Reward Redeemed Successfully!',
      `Voucher #${voucherCode} issued for "${reward.title}". ₹${reward.valueINR.toLocaleString('en-IN')} credit applied to your client account.`,
      'project'
    );
  };

  const handleSendReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refName.trim() || !refPhone.trim()) return;

    setRefSubmitting(true);
    setTimeout(() => {
      const newRef: ClientReferral = {
        id: `ref-${Date.now()}`,
        name: refName,
        phone: refPhone,
        property: refProperty || 'Residential Apartment',
        status: 'Invited',
        pointsPending: 2000,
        date: 'Today',
      };

      setReferrals(prev => [newRef, ...prev]);

      // Award 100 instant bonus points for sharing referral
      const bonusPts = 100;
      setPoints(prev => prev + bonusPts);

      const bonusTx: LoyaltyTransaction = {
        id: `tx-${Date.now()}`,
        title: `Referral Invitation Sent to ${refName}`,
        type: 'earned',
        points: bonusPts,
        date: 'Just now',
      };
      setTransactions(prev => [bonusTx, ...prev]);

      addNotification(
        'Referral Invitation Dispatched',
        `+100 Bonus Points added! Our design desk will contact ${refName} for a site consultation. You will earn +2,000 points upon their project kickoff!`,
        'project'
      );

      setRefName('');
      setRefPhone('');
      setRefProperty('');
      setRefSubmitting(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Points & Tier Status Card */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <Award className="h-4 w-4" />
              <span>Rewards &amp; Referrals</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1">
              Rewards Program
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Earn points on milestone signoffs, reviews, and referrals.
            </p>
          </div>

          {/* Points Balance Pill */}
          <div className="flex items-center gap-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 p-4 rounded-2xl self-start md:self-auto">
            <div className="h-12 w-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block uppercase tracking-wider">
                Available Reward Balance
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
                  {points.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-semibold text-neutral-500">Pts</span>
              </div>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                ≈ ₹{(points * 10).toLocaleString('en-IN')} Interior Service Value
              </span>
            </div>
          </div>
        </div>

        {/* Tier Status & Progress */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-600 dark:text-neutral-300">
          <div>
            <span className="text-neutral-400 block">Current Patron Tier</span>
            <span className="font-display text-base font-bold text-neutral-950 dark:text-white mt-0.5 block">
              Gold Patron Atelier
            </span>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              5% Bonus Points on All Finish Signoffs
            </span>
          </div>

          <div>
            <span className="text-neutral-400 block">Next Tier Milestone</span>
            <span className="font-display text-base font-bold text-neutral-950 dark:text-white mt-0.5 block">
              Platinum Heritage Atelier
            </span>
            <span className="text-[11px] text-neutral-500 block">
              {Math.max(0, 3000 - points)} pts to unlock free annual finish touch-ups
            </span>
          </div>

          <div>
            <span className="text-neutral-400 block">Client Project Reference</span>
            <span className="font-semibold text-neutral-900 dark:text-white mt-0.5 block truncate">
              {projectName}
            </span>
            <span className="text-[11px] text-neutral-400 font-mono">
              Earn 500 pts per verified milestone
            </span>
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, Math.round((points / 3000) * 100))}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
            <span>Silver (0 pts)</span>
            <span>Gold Patron (2,000 pts)</span>
            <span>Platinum Heritage (3,000 pts)</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 max-w-fit">
          {[
            { id: 'catalog', label: 'Redeem Interior Services', icon: Gift },
            { id: 'referrals', label: 'Referral Rewards (+2,000 Pts)', icon: Users },
            { id: 'history', label: 'Points Activity Ledger', icon: Clock },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Tab 1: Reward Redemption Catalog */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
              Available Service Redemptions
            </h4>
            <span className="text-xs text-neutral-500">
              Your Balance: <strong className="font-mono text-amber-600 dark:text-amber-400">{points} Pts</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INITIAL_REWARDS.map(reward => {
              const canAfford = points >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                      <span className="font-medium text-amber-600 dark:text-amber-400">{reward.category}</span>
                      <span className="rounded bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-neutral-700 dark:text-neutral-300">
                        {reward.tag}
                      </span>
                    </div>

                    <h5 className="font-display text-base font-bold text-neutral-950 dark:text-white leading-snug">
                      {reward.title}
                    </h5>

                    <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {reward.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-bold text-neutral-950 dark:text-white block">
                        {reward.pointsCost} Pts
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Saves ₹{reward.valueINR.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={!canAfford}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        canAfford
                          ? 'bg-amber-600 text-white hover:bg-amber-500 shadow-sm'
                          : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem Service' : `Need ${reward.pointsCost - points} pts`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Referral Rewards & Invite System */}
      {activeTab === 'referrals' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Referral Code & Share Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unique Invite Code Banner */}
            <div className="rounded-2xl border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/50 dark:bg-amber-950/20 p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                Your Unique Homeowner Referral Code
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">
                Share with neighbors or friends renovating their homes. They receive a <strong>free digital moisture audit</strong>, and you earn <strong>2,000 points (₹20,000 value)</strong>!
              </p>

              <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 border border-amber-200 dark:border-amber-900/60 p-2 rounded-xl">
                <span className="font-mono text-sm font-bold text-neutral-950 dark:text-white px-2 flex-1">
                  {referralCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shrink-0"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            {/* Invite a Friend Form */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <h4 className="font-display text-base font-bold text-neutral-950 dark:text-white">
                Invite a Friend for Free Site Inspection
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5 mb-4">
                We'll contact them with your compliments and send our Lead Site Architect.
              </p>

              <form onSubmit={handleSendReferral} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Friend's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={refName}
                    onChange={(e) => setRefName(e.target.value)}
                    placeholder="e.g. Karthik Venkat"
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-50 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={refPhone}
                    onChange={(e) => setRefPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-50 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Apartment / Villa Society
                  </label>
                  <input
                    type="text"
                    value={refProperty}
                    onChange={(e) => setRefProperty(e.target.value)}
                    placeholder="e.g. Sobha Windfall, Tower 3"
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-50 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={refSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shadow-sm disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{refSubmitting ? 'Sending Invitation...' : 'Send Invitation (+100 Pts Instant Bonus)'}</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Referral Tracking Table */}
          <div className="lg:col-span-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <h4 className="font-display text-base font-bold text-neutral-950 dark:text-white">
                Your Referral Activity Tracker
              </h4>
              <span className="text-xs text-neutral-500 font-mono">
                {referrals.length} Referrals
              </span>
            </div>

            <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-2">
              {referrals.map(ref => (
                <div key={ref.id} className="py-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white block">{ref.name}</span>
                    <span className="text-[11px] text-neutral-500">{ref.property} · {ref.date}</span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        ref.status === 'Project Commenced'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {ref.status}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">
                      +{ref.pointsPending} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                Reward Payout Schedule:
              </span>
              <ul className="space-y-1 text-[11px]">
                <li>• +100 Points: Immediately when you send an invitation</li>
                <li>• +750 Points: When friend completes free on-site moisture audit</li>
                <li>• +2,000 Points: When friend commences their interior project</li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Points Ledger History */}
      {activeTab === 'history' && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <h4 className="font-display text-base font-bold text-neutral-950 dark:text-white">
              Points Ledger &amp; Redemptions History
            </h4>
            <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
              Total Transactions: {transactions.length}
            </span>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {transactions.map(tx => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-neutral-900 dark:text-white block">{tx.title}</span>
                  <span className="text-[11px] text-neutral-400">{tx.date}</span>
                  {tx.voucherCode && (
                    <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">
                      Voucher #{tx.voucherCode}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono text-sm font-bold ${
                      tx.type === 'earned'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {tx.type === 'earned' ? `+${tx.points}` : `-${tx.points}`} Pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Redeemed Voucher Modal */}
      {activeVoucherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 text-center space-y-4">
            <button
              onClick={() => setActiveVoucherModal(null)}
              className="absolute top-4 right-4 rounded-full bg-neutral-100 p-2 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="h-16 w-16 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <Gift className="h-8 w-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Service Voucher Activated
              </span>
              <h4 className="font-display text-xl font-bold text-neutral-950 dark:text-white mt-1">
                {activeVoucherModal.reward.title}
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Value: ₹{activeVoucherModal.reward.valueINR.toLocaleString('en-IN')} Credit
              </p>
            </div>

            {/* Voucher Box */}
            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-amber-500/40">
              <span className="text-[10px] text-neutral-400 block mb-1 uppercase tracking-wider">
                Voucher Redemption Code
              </span>
              <span className="font-mono text-lg font-bold text-neutral-950 dark:text-white tracking-wider">
                {activeVoucherModal.voucherCode}
              </span>
            </div>

            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Show this voucher to your Lead Architect Arun Kumar or apply it directly on your next stage signoff. Valid for 12 months.
            </p>

            <button
              onClick={() => setActiveVoucherModal(null)}
              className="w-full rounded-xl bg-amber-600 py-3 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shadow-md"
            >
              Done &amp; View Rewards
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
