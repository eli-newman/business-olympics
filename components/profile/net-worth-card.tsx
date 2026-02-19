'use client'

export function NetWorthCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
      <h3 className="text-sm text-zinc-400 mb-3">Net Worth Snapshot</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-zinc-400">Assets</span>
          <span className="text-white font-mono">$1,240</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Debt</span>
          <span className="text-red-400 font-mono">-$18,500</span>
        </div>
        <div className="flex justify-between border-t border-zinc-800 pt-2">
          <span className="text-zinc-400">Net</span>
          <span className="text-red-400 font-mono font-bold">-$17,260</span>
        </div>
      </div>
      <p className="text-xs text-zinc-600 mt-3">Mock data — connect your accounts to track real numbers</p>
    </div>
  )
}
