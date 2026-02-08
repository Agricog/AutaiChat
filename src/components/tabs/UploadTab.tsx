import { useState, useRef } from 'react';
import { api } from '../../lib/api';

interface Props {
  customerId: number;
  botId: number;
  showAlert: (type: 'success' | 'error', message: string) => void;
  refreshData: () => void;
}

export default function UploadTab({ customerId, botId, showAlert, refreshData }: Props) {
  const [uploading, setUploading] = useState(false);
  const [websiteMode, setWebsiteMode] = useState<'full' | 'single'>('full');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [qaQuestion, setQaQuestion] = useState('');
  const [qaAnswer, setQaAnswer] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) formData.append('files', files[i]);
      formData.append('customerId', String(customerId));
      formData.append('botId', String(botId));
      await api.upload('/api/content/upload', formData);
      showAlert('success', 'Files uploaded!');
      refreshData();
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleWebsiteScrape = async () => {
    if (!websiteUrl.trim()) { showAlert('error', 'Please enter a URL'); return; }
    setUploading(true);
    try {
      const data = await api.post('/api/content/scrape-website', { customerId, botId, url: websiteUrl, mode: websiteMode });
      if (websiteMode === 'full') {
        showAlert('success', data.message || 'Crawl started! Refresh to see progress.');
      } else {
        showAlert('success', data.message || 'Website scraped!');
      }
      setWebsiteUrl('');
      refreshData();
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Scraping failed');
    } finally {
      setUploading(false);
    }
  };

  const handleYoutube = async () => {
    if (!youtubeUrl.trim()) { showAlert('error', 'Please enter a YouTube URL'); return; }
    setUploading(true);
    try {
      const data = await api.post('/api/content/youtube', { customerId, botId, url: youtubeUrl });
      showAlert('success', data.message || 'Transcript extracted!');
      setYoutubeUrl('');
      refreshData();
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Extraction failed');
    } finally {
      setUploading(false);
    }
  };

  const handleTextUpload = async () => {
    if (!textTitle.trim() || !textContent.trim()) { showAlert('error', 'Please fill in title and content'); return; }
    setUploading(true);
    try {
      const data = await api.post('/api/content/text', { customerId, botId, title: textTitle, content: textContent });
      showAlert('success', data.message || 'Text uploaded!');
      setTextTitle(''); setTextContent('');
      refreshData();
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleQAUpload = async () => {
    if (!qaQuestion.trim() || !qaAnswer.trim()) { showAlert('error', 'Please fill in question and answer'); return; }
    setUploading(true);
    try {
      const content = `Q: ${qaQuestion}\n\nA: ${qaAnswer}`;
      const title = `Q&A: ${qaQuestion.substring(0, 50)}${qaQuestion.length > 50 ? '...' : ''}`;
      await api.post('/api/content/text', { customerId, botId, title, content });
      showAlert('success', 'Q&A pair added!');
      setQaQuestion(''); setQaAnswer('');
      refreshData();
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Failed to add');
    } finally {
      setUploading(false);
    }
  };

  const cardCls = 'bg-white rounded-xl border border-slate-200 mb-6';
  const headerCls = 'px-5 py-4 border-b border-slate-200';
  const bodyCls = 'px-5 py-5';
  const inputCls = 'w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const btnCls = 'px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 transition inline-flex items-center gap-2';

  return (
    <div>
      {/* File Upload */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Upload Files</h3></div>
        <div className={bodyCls}>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400 hover:bg-slate-50 transition"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            <div className="text-sm font-medium text-slate-800">Click to upload or drag and drop</div>
            <div className="text-xs text-slate-400 mt-1">PDF, Word, Text, CSV (max 20MB)</div>
          </div>
          <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.docx,.txt,.csv" multiple onChange={handleFileUpload} />
          {uploading && <p className="text-sm text-blue-500 mt-3 text-center">Uploading…</p>}
        </div>
      </div>

      {/* Website Scrape */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Import from Website</h3></div>
        <div className={bodyCls}>
          <div className="flex bg-slate-100 rounded-lg p-1 mb-4">
            <button onClick={() => setWebsiteMode('full')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${websiteMode === 'full' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>Full Website</button>
            <button onClick={() => setWebsiteMode('single')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${websiteMode === 'single' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>Single Page</button>
          </div>
          <input type="url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://example.com" className={`${inputCls} mb-4`} />
          <button onClick={handleWebsiteScrape} disabled={uploading} className={btnCls}>Start Scraping</button>
        </div>
      </div>

      {/* YouTube */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Import from YouTube</h3></div>
        <div className={bodyCls}>
          <input type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className={`${inputCls} mb-4`} />
          <button onClick={handleYoutube} disabled={uploading} className={`${btnCls} bg-red-600 hover:bg-red-700`}>Extract Transcript</button>
        </div>
      </div>

      {/* Text Content */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Add Text Content</h3></div>
        <div className={bodyCls}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
            <input type="text" value={textTitle} onChange={e => setTextTitle(e.target.value)} placeholder="e.g., Product Information, FAQ" className={inputCls} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
            <textarea value={textContent} onChange={e => setTextContent(e.target.value)} rows={5} placeholder="Paste your content here..." className={`${inputCls} resize-y`} />
          </div>
          <button onClick={handleTextUpload} disabled={uploading} className={btnCls}>Upload Text</button>
        </div>
      </div>

      {/* Q&A Pair */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Add Q&A Pair</h3></div>
        <div className={bodyCls}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Question</label>
            <input type="text" value={qaQuestion} onChange={e => setQaQuestion(e.target.value)} placeholder="e.g., What are your business hours?" className={inputCls} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Answer</label>
            <textarea value={qaAnswer} onChange={e => setQaAnswer(e.target.value)} rows={4} placeholder="We're open Monday-Friday, 9am-5pm." className={`${inputCls} resize-y`} />
          </div>
          <button onClick={handleQAUpload} disabled={uploading} className={btnCls}>Add Q&A Pair</button>
        </div>
      </div>
    </div>
  );
}
