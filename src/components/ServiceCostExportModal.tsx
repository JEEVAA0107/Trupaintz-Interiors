import React from 'react';
import { ServiceCostLineItem } from '../types';
import { useNotification } from '../context/NotificationContext';
import { Download, Printer, X, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

interface ServiceCostExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  clientName?: string;
  sqft?: number;
  baseRate?: number;
  totalCost?: number;
  serviceScope?: string;
}

export const ServiceCostExportModal: React.FC<ServiceCostExportModalProps> = ({
  isOpen,
  onClose,
  projectName = 'Greenwood Heights 3BHK Renovation',
  clientName = 'Rajesh Sharma',
  sqft = 1800,
  baseRate = 77,
  totalCost,
  serviceScope = 'Italian Stucco + Premium Painting & Ceilings',
}) => {
  const { addNotification } = useNotification();

  if (!isOpen) return null;

  const calculatedTotal = totalCost || Math.round(sqft * baseRate);
  const gstAmount = Math.round(calculatedTotal * 0.18);
  const grandTotal = calculatedTotal + gstAmount;

  const costItems: ServiceCostLineItem[] = [
    {
      code: 'SRV-01',
      category: 'Surface Preparation',
      description: 'Mechanized HEPA dustless sanding, thermal moisture testing, and acrylic bonding primer',
      unit: 'sq.ft',
      rate: 14,
      quantity: sqft,
      total: Math.round(sqft * 14),
    },
    {
      code: 'SRV-02',
      category: 'Italian Stucco Accent',
      description: 'Hand-troweled authentic Italian Venetian slaked lime with metallic mica gold flecks (2 coats)',
      unit: 'sq.ft',
      rate: 42,
      quantity: Math.round(sqft * 0.45),
      total: Math.round(sqft * 0.45 * 42),
    },
    {
      code: 'SRV-03',
      category: 'Ceiling Architecture',
      description: 'Drywall false ceiling framing with concealed 2700K indirect cove LED channels',
      unit: 'sq.ft',
      rate: 35,
      quantity: Math.round(sqft * 0.5),
      total: Math.round(sqft * 0.5 * 35),
    },
    {
      code: 'SRV-04',
      category: 'Royale Aspira Paint',
      description: 'Luxury zero-VOC silk emulsion with Teflon surface protector for bedrooms and hallways',
      unit: 'sq.ft',
      rate: 22,
      quantity: Math.round(sqft * 0.65),
      total: Math.round(sqft * 0.65 * 22),
    },
    {
      code: 'SRV-05',
      category: 'Protection & Quality Handover',
      description: 'Full poly-masking of furnishings, post-job deep sanitization, and 10-Year Warranty Certification',
      unit: 'Lump Sum',
      rate: 18500,
      quantity: 1,
      total: 18500,
    },
  ];

  const subtotal = costItems.reduce((sum, item) => sum + item.total, 0);

  const handleExportCSV = () => {
    const headers = 'Item Code,Category,Scope Description,Unit,Rate (INR),Quantity,Line Total (INR)\n';
    const rows = costItems.map(
      item =>
        `"${item.code}","${item.category}","${item.description}","${item.unit}",${item.rate},${item.quantity},${item.total}`
    );
    const summaryRows = [
      `\n"","","Subtotal Net Cost","","",,${subtotal}`,
      `"","","GST (18%)","","",,${Math.round(subtotal * 0.18)}`,
      `"","","Grand Total (INR)","","",,${Math.round(subtotal * 1.18)}`,
    ];

    const blob = new Blob([headers + rows.join('\n') + summaryRows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `TruPaintz_Service_Cost_Breakdown_${clientName.replace(/\s+/g, '_')}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addNotification(
      'Service Cost Export Downloaded',
      `Detailed itemized CSV breakdown for ${clientName} generated.`,
      'system'
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-neutral-100 p-2 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header / Brand Lockup */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800 gap-4">
          <div>
            <span className="font-display text-2xl font-bold text-neutral-950 dark:text-white">
              TruPaintz &amp; Interiors
            </span>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              Architectural Bill of Quantities (BOQ) &amp; Service Cost Specification
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print BOQ</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 text-xs">
          <div>
            <span className="text-neutral-400 block">Client Reference</span>
            <span className="font-semibold text-neutral-900 dark:text-white">{clientName}</span>
          </div>
          <div>
            <span className="text-neutral-400 block">Project Description</span>
            <span className="font-semibold text-neutral-900 dark:text-white truncate block">{projectName}</span>
          </div>
          <div>
            <span className="text-neutral-400 block">Specified Area</span>
            <span className="font-mono font-semibold text-neutral-900 dark:text-white">{sqft} sq.ft.</span>
          </div>
          <div>
            <span className="text-neutral-400 block">Lead Architect</span>
            <span className="font-semibold text-neutral-900 dark:text-white">Arun Kumar</span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 pb-2">
                <th className="py-2 font-medium">Code</th>
                <th className="py-2 font-medium">Service Category &amp; Inclusions</th>
                <th className="py-2 font-medium text-right">Unit Rate</th>
                <th className="py-2 font-medium text-right">Qty</th>
                <th className="py-2 font-medium text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-neutral-700 dark:text-neutral-300">
              {costItems.map((item) => (
                <tr key={item.code} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                  <td className="py-3 font-mono font-semibold text-amber-600 dark:text-amber-400">{item.code}</td>
                  <td className="py-3 pr-4">
                    <span className="font-semibold text-neutral-900 dark:text-white block">{item.category}</span>
                    <span className="text-[11px] text-neutral-500 leading-snug block">{item.description}</span>
                  </td>
                  <td className="py-3 text-right font-mono">
                    ₹{item.rate.toLocaleString('en-IN')}<span className="text-[10px] text-neutral-400">/{item.unit}</span>
                  </td>
                  <td className="py-3 text-right font-mono">{item.quantity.toLocaleString('en-IN')}</td>
                  <td className="py-3 text-right font-mono font-semibold text-neutral-900 dark:text-white">
                    ₹{item.total.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grand Total Summary Box */}
        <div className="mt-6 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Net Material &amp; Mechanized Labor:</span>
              <span className="font-mono font-semibold text-neutral-900 dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Applicable Goods &amp; Services Tax (GST 18%):</span>
              <span className="font-mono text-neutral-700 dark:text-neutral-300">₹{Math.round(subtotal * 0.18).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-1">
              <span className="font-bold text-sm text-neutral-900 dark:text-white">Grand Total Estimated Project Cost:</span>
              <span className="font-mono text-base font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                ₹{Math.round(subtotal * 1.18).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Warranty and Terms Note */}
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Includes TruPaintz 10-Year Anti-Peeling Structural Adhesion Warranty</span>
          </div>
          <span className="text-[11px] font-mono">Quotation Valid for 30 Days</span>
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Close
          </button>
          <button
            onClick={handleExportCSV}
            className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 shadow-sm"
          >
            Download CSV Report
          </button>
        </div>

      </div>
    </div>
  );
};
