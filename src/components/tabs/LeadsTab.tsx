import type { DashLead } from '../../pages/DashboardPage';

interface Props { leads: DashLead[]; }

export default function LeadsTab({ leads }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="px-5 py-4 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-800">Captured Leads</h3>
      </div>
      <div className="px-5 py-4">
        {leads.length > 0 ? leads.map(lead => (
          <div key={lead.id} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
            <div>
              <div className="text-sm font-medium text-slate-800">{lead.name}</div>
              <div className="text-xs text-slate-400">{lead.email} • {new Date(lead.created_at).toLocaleDateString()}</div>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600">New</span>
          </div>
        )) : (
          <p className="text-slate-400 text-center py-10 text-sm">No leads captured yet.</p>
        )}
      </div>
    </div>
  );
}
