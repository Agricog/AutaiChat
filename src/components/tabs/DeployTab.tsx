interface Props { publicId: string; }

export default function DeployTab({ publicId }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert('Copied!')).catch(() => alert('Failed to copy'));
  };

  const scriptCode = `<script defer src="https://autoreplychat.com/embed.js" data-bot-id="${publicId}"></script>`;
  const iframeCode = `<iframe src="https://autoreplychat.com/chat/${publicId}" style="width: 400px; height: 600px; border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"></iframe>`;
  const directLink = `https://autoreplychat.com/chat/${publicId}`;

  const sectionCls = 'bg-slate-50 rounded-xl p-6 mb-5';

  return (
    <div>
      <div className={sectionCls}>
        <h4 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">🔗 Direct Link</h4>
        <p className="text-sm text-slate-500 mb-4">Share this link to let users access your chatbot directly.</p>
        <div className="flex gap-3">
          <input type="text" readOnly value={directLink} onClick={e => (e.target as HTMLInputElement).select()} className="flex-1 px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white" />
          <button onClick={() => copyToClipboard(directLink)} className="px-4 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition">Copy</button>
        </div>
      </div>

      <div className={sectionCls}>
        <h4 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">📜 Website Script</h4>
        <p className="text-sm text-slate-500 mb-4">Add this code to the header of your website to display the chatbot on all pages.</p>
        <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-200 overflow-x-auto whitespace-pre-wrap break-all">{scriptCode}</div>
        <button onClick={() => copyToClipboard(scriptCode)} className="mt-3 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">Copy Code</button>
      </div>

      <div className={sectionCls}>
        <h4 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">🖼️ Iframe Embed</h4>
        <p className="text-sm text-slate-500 mb-4">Embed the chatbot directly into your page layout.</p>
        <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-200 overflow-x-auto whitespace-pre-wrap break-all">{iframeCode}</div>
        <button onClick={() => copyToClipboard(iframeCode)} className="mt-3 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">Copy Code</button>
      </div>

      <p className="text-slate-400 text-sm mt-5">Bot ID: <strong>{publicId}</strong></p>
    </div>
  );
}
