import React, { useState } from 'react';
import { ProjectDocumentItem } from '../types';
import { useNotification } from '../context/NotificationContext';
import { 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  Search, 
  Upload, 
  FileCheck, 
  Calendar, 
  X, 
  ExternalLink,
  Lock,
  Printer
} from 'lucide-react';

interface ProjectDocumentsModuleProps {
  clientName: string;
  projectName: string;
}

const INITIAL_DOCUMENTS: ProjectDocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Master Turnkey Renovation Contract & Scope Deed',
    category: 'Contracts & Warranties',
    documentType: 'PDF Document',
    size: '3.8 MB',
    dateUploaded: '12 Sep 2026',
    referenceNumber: 'TP-CON-2026-8842',
    issuer: 'TruPaintz Legal & Project Office',
    status: 'Signed',
    description: 'Bespoke residential renovation contract outlining fixed-price scope, milestone payment schedules, and 100% dust-containment protocol.',
    previewContent: `MASTER INTERIOR RENOVATION CONTRACT
Project ID: PRJ-8842
Parties: TruPaintz & Interiors Pvt. Ltd. and Rajesh Sharma
Property: Greenwood Heights Villa 3BHK, Sarjapur Road, Bengaluru
Contract Scope: Turnkey living elevation, Italian Stucco, cove false ceiling framing, dustless substrate sanding, and Asian Paints Royale Aspira application.
Payment Terms: 30% Mobilization, 25% Stage 02, 25% Stage 04, 20% Final Quality Handover.
Warranties: 10-Year adhesion guarantee, 5-year anti-efflorescence warranty.
Signatures: Digitally verified by Arun Kumar (Lead Site Architect) and Rajesh Sharma (Homeowner).`,
  },
  {
    id: 'doc-2',
    title: '10-Year Master Adhesion & Moisture Warranty Certificate',
    category: 'Contracts & Warranties',
    documentType: 'Certificate',
    size: '1.4 MB',
    dateUploaded: '12 Sep 2026',
    referenceNumber: 'TP-WAR-2026-9921',
    issuer: 'TruPaintz Quality Assurance Bureau',
    status: 'Active',
    description: 'Official 10-Year structural adhesion warranty covering Venetian lime stucco, Royale Aspira surfaces, and anti-peeling protection.',
    previewContent: `TRUPAINTZ 10-YEAR MASTER WARRANTY CERTIFICATE
Certificate Number: TP-WAR-2026-9921
Beneficiary: Rajesh Sharma
Protected Substrates: Monolithic living room masonry, drywall cove ceiling framing, master bedroom masonry.
Coverage Standards:
1. Guaranteed non-flaking and non-chalking adhesion for 120 months.
2. Resistance against osmotic moisture blistering up to 12% relative substrate humidity.
3. Micro-polishing and touch-up coverage at 12-month interval.
Authorized Signatory: TruPaintz Technical Council.`,
  },
  {
    id: 'doc-3',
    title: 'Approved 2D CAD Floorplan & Reflected Ceiling Layout (RCL)',
    category: 'Architectural Drawings',
    documentType: 'CAD / Architectural PDF',
    size: '5.2 MB',
    dateUploaded: '14 Sep 2026',
    referenceNumber: 'TP-DWG-RCL-03',
    issuer: 'Arun Kumar, Senior Site Architect',
    status: 'Verified',
    description: 'Precision CAD layout specifying drywall perimeter shadowlines, 2700K indirect cove channels, and magnetic track spotlight placements.',
    previewContent: `REFLECTED CEILING LAYOUT (RCL) SPECIFICATION
Drawing Ref: TP-DWG-RCL-03 | Scale: 1:50
Room Elevations:
- Living Hall (22ft x 16ft): 120mm perimeter drop with concealed aluminum cove extrusion.
- Dining Area: Double-beaded acoustic shadowline with central chandelier junction box.
- Master Bedroom: Recessed magnetic track profile with 4x 12W 2700K warm spotlights.
All channels grounded with fire-retardant conduits compliant with National Building Code (NBC) 2016.`,
  },
  {
    id: 'doc-4',
    title: 'Pre-Commencement Ultrasonic Moisture & Substrate Audit',
    category: 'Audit Reports',
    documentType: 'Diagnostic Report',
    size: '2.1 MB',
    dateUploaded: '13 Sep 2026',
    referenceNumber: 'TP-AUDIT-MOIST-109',
    issuer: 'TruPaintz Diagnostic Laboratory',
    status: 'Verified',
    description: 'Fluke thermal imaging scan and pinless electronic moisture meter readings confirming substrate moisture at 8.2% (well within safe 12% ceiling).',
    previewContent: `SUBSTRATE MOISTURE & EFFLORESCENCE DIAGNOSTIC REPORT
Scan Device: Fluke Ti401 Pro Thermal Imager & Tramex CME5 Moisture Meter
Substrate Tested: Cement plaster masonry walls, reinforced concrete slab.
Readings:
- Living Room East Wall: 8.1% moisture (Safe)
- Living Room TV Elevation: 7.9% moisture (Optimal for Italian lime application)
- Ceiling Slab: 8.6% moisture (No seepage detected)
- Plaster Hardness Index: Grade 4.5 MPa (Sufficient structural density)
Conclusion: Approved for dustless mechanized sanding and acrylic primer bonding.`,
  },
  {
    id: 'doc-5',
    title: 'Architectural Bill of Quantities (BOQ) & Material Specification',
    category: 'Contracts & Warranties',
    documentType: 'Itemized BOQ',
    size: '2.9 MB',
    dateUploaded: '12 Sep 2026',
    referenceNumber: 'TP-BOQ-2026-08',
    issuer: 'TruPaintz Estimations Bureau',
    status: 'Verified',
    description: 'Full bill of quantities specifying imported Italian Novacolor lime plaster, Asian Paints Royale Aspira, and Blum soft-close mechanisms.',
    previewContent: `ARCHITECTURAL BILL OF QUANTITIES (BOQ)
Batch ID: TP-BOQ-2026-08
Itemized Procurements:
1. Novacolor Era Veneziana Slaked Lime Plaster (28 Buckets, Lot #IT-88412)
2. Novacolor Cera Wax Protective Glaze (Gold Fleck Finish)
3. Asian Paints Royale Aspira Luxury Emulsion (Base Tint Champagne Dune)
4. Saint-Gobain Gyproc Moisture-Resistant Drywall Sheets (62 Boards)
5. Blum Servo-Drive Motorized Bi-fold Cabinetry Fittings (Set of 6)
All items inspected and authenticated at Bengaluru central depot prior to site delivery.`,
  },
  {
    id: 'doc-6',
    title: 'GST Registered Tax Invoice #TP-2026-INV88',
    category: 'Invoices & Receipts',
    documentType: 'Tax Invoice',
    size: '1.1 MB',
    dateUploaded: '26 Sep 2026',
    referenceNumber: 'TP-INV-2026-88',
    issuer: 'TruPaintz Accounts Division',
    status: 'Paid',
    description: 'GST-compliant receipt reflecting 30% advance deposit and Milestone 02 signoff payment disbursement.',
    previewContent: `GST TAX INVOICE & RECEIPT
Invoice No: TP-2026-INV88 | GSTIN: 29AAACT9824P1Z4
Billed To: Rajesh Sharma, Greenwood Heights Villa 3BHK
Total Billed Amount: ₹2,01,750 (Including 18% CGST + SGST: ₹30,775)
Payment Status: PAID IN FULL via NEFT Transaction Ref: UTR-99824102948
Next Milestone Due: ₹85,000 upon Italian Stucco Elevation Final Handover.`,
  },
];

export const ProjectDocumentsModule: React.FC<ProjectDocumentsModuleProps> = ({
  clientName,
  projectName,
}) => {
  const { addNotification } = useNotification();
  const [documents, setDocuments] = useState<ProjectDocumentItem[]>(INITIAL_DOCUMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreviewDoc, setActivePreviewDoc] = useState<ProjectDocumentItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'All',
    'Contracts & Warranties',
    'Architectural Drawings',
    'Audit Reports',
    'Invoices & Receipts',
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesQuery = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleDownload = (doc: ProjectDocumentItem) => {
    const content = doc.previewContent || doc.description;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.referenceNumber}_${doc.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addNotification(
      'Document Download Initiated',
      `${doc.title} (${doc.referenceNumber}) saved to your downloads.`,
      'system'
    );
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];

    setTimeout(() => {
      const newDoc: ProjectDocumentItem = {
        id: `doc-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: 'Architectural Drawings',
        documentType: 'Client Uploaded File',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        dateUploaded: 'Just now',
        referenceNumber: `CLI-UP-${Math.floor(1000 + Math.random() * 9000)}`,
        issuer: clientName,
        status: 'Active',
        description: `Homeowner uploaded document for site reference: ${file.name}`,
        previewContent: `CLIENT UPLOADED SPECIFICATION\nFile Name: ${file.name}\nUploaded By: ${clientName}\nProject: ${projectName}\nStatus: Received by Arun Kumar (Site Architect)`,
      };

      setDocuments(prev => [newDoc, ...prev]);
      setIsUploading(false);

      addNotification(
        'Document Uploaded to Site Vault',
        `"${file.name}" has been shared with Lead Architect Arun Kumar.`,
        'project'
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <ShieldCheck className="h-4 w-4" />
              <span>Project Documents</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1">
              Contracts &amp; Documents
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Access your signed contract, 10-year warranty certificate, drawings, and invoices.
            </p>
          </div>

          {/* Upload Document Button */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shadow-sm cursor-pointer">
              <Upload className="h-4 w-4" />
              <span>{isUploading ? 'Uploading...' : 'Upload Document'}</span>
              <input
                type="file"
                className="hidden"
                onChange={handleSimulateUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 max-w-fit">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents or codes..."
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 pl-8 pr-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

        </div>

      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm flex flex-col justify-between hover:border-amber-500/40 transition-colors group"
          >
            <div>
              {/* Category & Status Row */}
              <div className="flex items-center justify-between text-xs text-neutral-500 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  {doc.category}
                </span>

                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    doc.status === 'Signed' || doc.status === 'Active' || doc.status === 'Verified' || doc.status === 'Paid'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              {/* Title & Ref */}
              <div className="mt-3 flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="font-display text-sm font-bold text-neutral-950 dark:text-white leading-snug group-hover:text-amber-600 transition-colors">
                    {doc.title}
                  </h4>
                  <span className="font-mono text-[10px] text-neutral-400 block mt-0.5">
                    Ref: {doc.referenceNumber}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {doc.description}
              </p>
            </div>

            {/* Meta & Action Footer */}
            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
              <div className="text-[11px] text-neutral-400 font-mono">
                <span>{doc.size}</span>
                <span className="mx-1.5">·</span>
                <span>{doc.dateUploaded}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActivePreviewDoc(doc)}
                  className="flex items-center gap-1 rounded-lg border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Preview document content"
                >
                  <Eye className="h-3 w-3" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(doc)}
                  className="flex items-center gap-1 rounded-lg bg-neutral-900 dark:bg-amber-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-neutral-800 dark:hover:bg-amber-500 transition-colors"
                  title="Download copy"
                >
                  <Download className="h-3 w-3" />
                  <span>Get</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
            
            <button
              onClick={() => setActivePreviewDoc(null)}
              className="absolute top-4 right-4 rounded-full bg-neutral-100 p-2 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Document Preview</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white mt-1">
              {activePreviewDoc.title}
            </h3>

            {/* Document Attributes Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-neutral-100 dark:border-neutral-800 mt-3 text-xs">
              <div>
                <span className="text-neutral-400 block text-[11px]">Reference No.</span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                  {activePreviewDoc.referenceNumber}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Issuing Office</span>
                <span className="font-semibold text-neutral-900 dark:text-white truncate block">
                  {activePreviewDoc.issuer}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Uploaded Date</span>
                <span className="font-mono text-neutral-900 dark:text-white">
                  {activePreviewDoc.dateUploaded}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Verification</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>256-Bit Signed</span>
                </span>
              </div>
            </div>

            {/* Document Readable Content Box */}
            <div className="mt-4 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 font-mono text-xs text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed border border-neutral-200 dark:border-neutral-800 max-h-72 overflow-y-auto">
              {activePreviewDoc.previewContent}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Official Document for {projectName}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(activePreviewDoc)}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 shadow-sm transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
