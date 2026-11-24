import { useState } from 'react'
import type { ClipboardEvent } from 'react'

const COLS = Array.from({ length: 16 }, (_, i) => String.fromCharCode(65 + i))

/** Grid sederhana ala Excel. Mendukung paste langsung dari Excel (tab/enter). */
export default function Spreadsheet({ rows = 30, framedCols = 0 }: { rows?: number; framedCols?: number }) {
  const [cells, setCells] = useState<Record<string, string>>({})
  const [active, setActive] = useState('A1')

  const set = (k: string, v: string) => setCells((c) => ({ ...c, [k]: v }))

  const onPaste = (e: ClipboardEvent, r: number, c: number) => {
    const text = e.clipboardData.getData('text')
    if (!text.includes('\t') && !text.includes('\n')) return
    e.preventDefault()
    const next = { ...cells }
    text.trim().split('\n').forEach((line, i) =>
      line.split('\t').forEach((v, j) => {
        if (c + j < COLS.length) next[`${COLS[c + j]}${r + i + 1}`] = v.replace(/\r$/, '')
      }))
    setCells(next)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white text-slate-800">
      <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2 text-xs text-slate-500">
        <span className="w-14 rounded border border-slate-200 px-2 py-0.5 text-center">{active}</span>
        <span className="italic">fx</span>
        <span className="truncate">{cells[active] ?? ''}</span>
      </div>
      <div className="max-h-[56vh] overflow-auto">
        <table className="border-collapse text-xs">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="w-10 border border-slate-200 bg-slate-50" />
              {COLS.map((c) => <th key={c} className="min-w-[110px] border border-slate-200 bg-slate-50 py-1 font-medium text-slate-500">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, r) => (
              <tr key={r}>
                <td className="border border-slate-200 bg-slate-50 text-center text-slate-500">{r + 1}</td>
                {COLS.map((c, ci) => {
                  const k = `${c}${r + 1}`
                  return (
                    <td key={k} className={`border p-0 ${ci < framedCols ? 'border-slate-800' : 'border-slate-200'}`}>
                      <input
                        value={cells[k] ?? ''} onFocus={() => setActive(k)}
                        onChange={(e) => set(k, e.target.value)} onPaste={(e) => onPaste(e, r, ci)}
                        className="h-6 w-full bg-transparent px-1.5 outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
