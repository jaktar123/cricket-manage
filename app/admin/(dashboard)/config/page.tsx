
import { createClient } from '@/lib/supabase/server'
import FeeSettings from '@/components/admin/FeeSettings'

export default async function ConfigPage() {
  const supabase = await createClient()
  
  // Fetch registration fee structure
  const { data: feeData } = await supabase
    .from('global_settings')
    .select('value')
    .eq('key', 'registration_fee')
    .single();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">System Configuration</h1>
        <p className="text-slate-400">Manage tournament settings, fees, and global parameters.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <FeeSettings initialValue={feeData?.value || "100"} />
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-bold text-lg mb-4 text-slate-500 italic">More settings coming soon...</h3>
            <p className="text-slate-500 text-sm">
              Future options will include registration deadlines, tournament dates, and team allocation rules.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-800 text-slate-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <h3 className="text-slate-400 font-bold text-lg mb-2">Advanced Config</h3>
          <p className="text-slate-600 text-sm max-w-xs">
            This section will be used for technical tournament parameters once the registration phase is complete.
          </p>
        </div>
      </div>
    </div>
  )
}
