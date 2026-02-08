import { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../lib/api';
import {
  Upload,
  FileText,
  Globe,
  Youtube,
  Type,
  Trash2,
  RefreshCw,
  Clock,
  CheckSquare,
  Square,
  AlertCircle,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';

interface Document {
  id: number;
  title: string;
  content_type: string;
  source_url?: string;
  char_count?: number;
  created_at: string;
  last_retrained_at?: string;
}

interface RetrainSchedule {
  retrain_frequency: string | null;
  retrain_time: string | null;
}

interface Props {
  customerId: number;
  botId: number;
  botPublicId: string;
}

type UploadMode = 'file' | 'text' | 'website' | 'youtube' | null;

// ── Toast notification ─────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
        type === 'success'
          ? 'bg-emerald-600 text-white'
          : 'bg-red-600 text-white'
      }`}
    >
      {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}

// ── Type badge colours ─────────────────────────────────────────────
function typeBadge(contentType: string) {
  const map: Record<string, { label: string; cls: string }> = {
    pdf: { label: 'PDF', cls: 'bg-red-100 text-red-700' },
    word: { label: 'Word', cls: 'bg-blue-100 text-blue-700' },
    docx: { label: 'Word', cls: 'bg-blue-100 text-blue-700' },
    text: { label: 'Text', cls: 'bg-gray-100 text-gray-700' },
    csv: { label: 'CSV', cls: 'bg-green-100 text-green-700' },
    website: { label: 'Website', cls: 'bg-purple-100 text-purple-700' },
    youtube: { label: 'YouTube', cls: 'bg-orange-100 text-orange-700' },
    qa: { label: 'Q&A', cls: 'bg-teal-100 text-teal-700' },
  };
  const t = map[contentType?.toLowerCase()] || { label: contentType || 'Unknown', cls: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${t.cls}`}>
      {t.label}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════
export default function DocumentsTab({ customerId, botId }: Props) {
  // ── State ──────────────────────────────────────────────────────
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [uploadMode, setUploadMode] = useState<UploadMode>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Text upload
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  // Website scrape
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [fullSite, setFullSite] = useState(false);

  // YouTube
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // Retrain schedule modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [schedule, setSchedule] = useState<RetrainSchedule>({ retrain_frequency: null, retrain_time: null });
  const [scheduleFreq, setScheduleFreq] = useState('none');
  const [scheduleTime, setScheduleTime] = useState('03:00');

  // Bulk operation in progress
  const [bulkAction, setBulkAction] = useState<string | null>(null);

  // ── Load documents ─────────────────────────────────────────────
  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get(`/api/documents?botId=${botId}`);
      setDocuments(data.documents || data || []);
    } catch (err) {
      console.error('Failed to load documents:', err);
      setToast({ message: 'Failed to load documents', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [botId]);

  const loadSchedule = useCallback(async () => {
    try {
      const data = await api.get(`/api/content/retrain-schedule/${botId}`);
      setSchedule(data);
      setScheduleFreq(data.retrain_frequency || 'none');
      setScheduleTime(data.retrain_time || '03:00');
    } catch {
      // No schedule set yet — that's fine
    }
  }, [botId]);

  useEffect(() => {
    loadDocuments();
    loadSchedule();
    setSelectedIds(new Set());
  }, [botId, loadDocuments, loadSchedule]);

  // ── Selection helpers ──────────────────────────────────────────
  const allSelected = documents.length > 0 && selectedIds.size === documents.length;
  const someSelected = selectedIds.size > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(documents.map((d) => d.id)));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Notification helper ────────────────────────────────────────
  const notify = (message: string, type: 'success' | 'error' = 'success') =>
    setToast({ message, type });

  // ── Upload: File ───────────────────────────────────────────────
  const handleFileUpload = async (file: File) => {
    const maxSize = 20 * 1024 * 1024;
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/csv',
    ];
    if (file.size > maxSize) {
      notify('File too large. Maximum size is 20 MB.', 'error');
      return;
    }
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|docx?|txt|csv)$/i)) {
      notify('Unsupported file type. Use PDF, Word, TXT, or CSV.', 'error');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('customerId', String(customerId));
      formData.append('botId', String(botId));
      await api.upload('/api/content/upload', formData);
      notify(`"${file.name}" uploaded successfully`);
      loadDocuments();
      setUploadMode(null);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  };

  // ── Upload: Text ───────────────────────────────────────────────
  const handleTextUpload = async () => {
    if (!textContent.trim()) {
      notify('Please enter some content', 'error');
      return;
    }
    setUploading(true);
    try {
      await api.post('/api/content/text', {
        customerId,
        botId,
        title: textTitle || 'Untitled Document',
        content: textContent,
      });
      notify('Text content uploaded successfully');
      setTextTitle('');
      setTextContent('');
      loadDocuments();
      setUploadMode(null);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  // ── Upload: Website Scrape ─────────────────────────────────────
  const handleScrape = async () => {
    if (!scrapeUrl.trim()) {
      notify('Please enter a URL', 'error');
      return;
    }
    setUploading(true);
    try {
      const data = await api.post('/api/content/scrape', {
        customerId,
        botId,
        url: scrapeUrl,
        fullSite,
      });
      const msg = fullSite
        ? `Website crawled — ${data.pagesScraped || 'multiple'} pages scraped`
        : `Page scraped — "${data.title || 'page'}"`;
      notify(msg);
      setScrapeUrl('');
      setFullSite(false);
      loadDocuments();
      setUploadMode(null);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : 'Scrape failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  // ── Upload: YouTube ────────────────────────────────────────────
  const handleYoutube = async () => {
    if (!youtubeUrl.trim()) {
      notify('Please enter a YouTube URL', 'error');
      return;
    }
    setUploading(true);
    try {
      await api.post('/api/content/youtube', {
        customerId,
        botId,
        url: youtubeUrl,
      });
      notify('YouTube transcript extracted successfully');
      setYoutubeUrl('');
      loadDocuments();
      setUploadMode(null);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : 'Extraction failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  // ── Bulk: Retrain ──────────────────────────────────────────────
  const handleRetrain = async () => {
    if (selectedIds.size === 0) return;
    setBulkAction('retrain');
    try {
      await api.post('/api/content/retrain', {
        customerId,
        botId,
        documentIds: Array.from(selectedIds),
      });
      notify(`${selectedIds.size} document(s) retrained`);
      setSelectedIds(new Set());
      loadDocuments();
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : 'Retrain failed', 'error');
    } finally {
      setBulkAction(null);
    }
  };

  // ── Bulk: Delete ───────────────────────────────────────────────
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Delete ${selectedIds.size} document(s)? This cannot be undone.`)) return;
    setBulkAction('delete');
    try {
      await api.post('/api/content/delete-bulk', {
        customerId,
        botId,
        documentIds: Array.from(selectedIds),
      });
      notify(`${selectedIds.size} document(s) deleted`);
      setSelectedIds(new Set());
      loadDocuments();
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : 'Delete failed', 'error');
    } finally {
      setBulkAction(null);
    }
  };

  // ── Schedule: Save ─────────────────────────────────────────────
  const handleSaveSchedule = async () => {
    try {
      await api.post('/api/content/retrain-schedule', {
        botId,
        frequency: scheduleFreq === 'none' ? null : scheduleFreq,
        time: scheduleFreq === 'none' ? null : scheduleTime,
      });
      notify(
        scheduleFreq === 'none'
          ? 'Retrain schedule removed'
          : `Retrain scheduled ${scheduleFreq} at ${scheduleTime} UTC`
      );
      setShowScheduleModal(false);
      loadSchedule();
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : 'Failed to save schedule', 'error');
    }
  };

  // ── Upload mode buttons ────────────────────────────────────────
  const uploadModes: { key: UploadMode; label: string; icon: typeof Upload }[] = [
    { key: 'file', label: 'Upload File', icon: Upload },
    { key: 'text', label: 'Paste Text', icon: Type },
    { key: 'website', label: 'Scrape Website', icon: Globe },
    { key: 'youtube', label: 'YouTube Video', icon: Youtube },
  ];

  // ════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════
  return (
    <div className="space-y-6">
      {/* ─── Upload section ─────────────────────────────────────── */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Add Training Content</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Upload files, paste text, scrape websites, or extract YouTube transcripts
          </p>
        </div>

        {/* Mode selector */}
        <div className="px-6 py-4 flex flex-wrap gap-2">
          {uploadModes.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setUploadMode(uploadMode === key ? null : key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition ${
                uploadMode === key
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              {label}
              {uploadMode === key ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          ))}
        </div>

        {/* Upload forms */}
        {uploadMode && (
          <div className="px-6 pb-6">
            {/* ── File upload ──────────────── */}
            {uploadMode === 'file' && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
                  dragOver
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm font-medium text-gray-700">
                  Click to browse or drag & drop a file
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, Word (.docx), Text (.txt), CSV — up to 20 MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.csv"
                  onChange={onFileSelect}
                  className="hidden"
                />
                {uploading && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600">
                    <RefreshCw size={14} className="animate-spin" />
                    Uploading…
                  </div>
                )}
              </div>
            )}

            {/* ── Text upload ─────────────── */}
            {uploadMode === 'text' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Document title (e.g. Product Information, FAQ)"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  rows={8}
                  placeholder="Paste your content here…"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleTextUpload}
                  disabled={uploading}
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
                >
                  {uploading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
                  Upload Text
                </button>
              </div>
            )}

            {/* ── Website scrape ───────────── */}
            {uploadMode === 'website' && (
              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fullSite}
                    onChange={(e) => setFullSite(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Crawl full website (follows internal links)
                </label>
                {fullSite && (
                  <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    Full site crawls may take several minutes depending on the website size.
                  </p>
                )}
                <button
                  onClick={handleScrape}
                  disabled={uploading}
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
                >
                  {uploading ? <RefreshCw size={14} className="animate-spin" /> : <Globe size={14} />}
                  {fullSite ? 'Crawl Website' : 'Scrape Page'}
                </button>
              </div>
            )}

            {/* ── YouTube ─────────────────── */}
            {uploadMode === 'youtube' && (
              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleYoutube}
                  disabled={uploading}
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
                >
                  {uploading ? <RefreshCw size={14} className="animate-spin" /> : <Youtube size={14} />}
                  Extract Transcript
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── Documents table ────────────────────────────────────── */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header with count + actions */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Documents{' '}
              <span className="text-gray-400 font-normal">({documents.length})</span>
            </h2>
            {schedule.retrain_frequency && (
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                <Clock size={12} />
                Auto-retrain: {schedule.retrain_frequency} at {schedule.retrain_time} UTC
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {someSelected && (
              <>
                <button
                  onClick={handleRetrain}
                  disabled={bulkAction !== null}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition"
                >
                  {bulkAction === 'retrain' ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <RefreshCw size={14} />
                  )}
                  Retrain ({selectedIds.size})
                </button>
                <button
                  onClick={handleBulkDelete}
                  disabled={bulkAction !== null}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50 transition"
                >
                  {bulkAction === 'delete' ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  Delete ({selectedIds.size})
                </button>
              </>
            )}
            <button
              onClick={() => {
                setShowScheduleModal(true);
                loadSchedule();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              <Clock size={14} />
              Schedule
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">Loading documents…</div>
        ) : documents.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FileText size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">No documents yet</p>
            <p className="text-gray-400 text-xs mt-1">Upload files or scrape a website to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="pl-6 pr-2 py-3 w-10">
                    <button onClick={toggleSelectAll} className="text-gray-400 hover:text-gray-600">
                      {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                    </button>
                  </th>
                  <th className="px-3 py-3">Title</th>
                  <th className="px-3 py-3 w-24">Type</th>
                  <th className="px-3 py-3 w-24 text-right">Chars</th>
                  <th className="px-3 py-3 w-24">Status</th>
                  <th className="px-3 py-3 w-28">Date</th>
                  <th className="px-3 py-3 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className={`hover:bg-gray-50 transition ${
                      selectedIds.has(doc.id) ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <td className="pl-6 pr-2 py-3">
                      <button
                        onClick={() => toggleSelect(doc.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {selectedIds.has(doc.id) ? (
                          <CheckSquare size={16} className="text-blue-600" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-gray-900 truncate max-w-xs">
                        {doc.title || 'Untitled'}
                      </div>
                      {doc.source_url && (
                        <a
                          href={doc.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline flex items-center gap-0.5 mt-0.5"
                        >
                          {doc.source_url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 50)}
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </td>
                    <td className="px-3 py-3">{typeBadge(doc.content_type)}</td>
                    <td className="px-3 py-3 text-right text-gray-500 tabular-nums">
                      {doc.char_count != null ? doc.char_count.toLocaleString() : '—'}
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle size={12} />
                        Indexed
                      </span>
                    </td>
                    <td className="px-3 py-3 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(doc.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={async () => {
                          if (!window.confirm(`Delete "${doc.title}"?`)) return;
                          try {
                            await api.post('/api/content/delete-bulk', {
                              customerId,
                              botId,
                              documentIds: [doc.id],
                            });
                            notify('Document deleted');
                            loadDocuments();
                          } catch {
                            notify('Delete failed', 'error');
                          }
                        }}
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Delete document"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ─── Retrain Schedule Modal ─────────────────────────────── */}
      {showScheduleModal && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setShowScheduleModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Retrain Schedule</h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Automatically re-scrape website documents on a schedule to keep training data fresh.
              </p>

              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Frequency</span>
                  <select
                    value={scheduleFreq}
                    onChange={(e) => setScheduleFreq(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None (disabled)</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </label>

                {scheduleFreq !== 'none' && (
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Time (UTC)</span>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSchedule}
                  className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── Toast ──────────────────────────────────────────────── */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
