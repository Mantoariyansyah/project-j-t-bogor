import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Search, Trash2, RefreshCw, Download, Upload, Sparkles, Columns2, Filter, Undo2,
  ChevronLeft, ChevronRight, Image as ImageIcon,
} from 'lucide-react'
import type { Item } from '../data/mock'

const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const COLS = ['No', 'Waktu Upload', 'Kategori', 'Nama Barang (Merek)', 'Foto', 'No Waybill', 'Kode Registrasi']

export default function ItemTable({ title, icon, data, showUndo = false, total }: {
  title: string; icon: ReactNode; data: Item[]; showUndo?: boolean; total: number
}) {
  const [q, setQ] = useState('')
  const [month, setMonth] = useState(10)
  const [year, setYear] = useState(2026)
  const [selected, setSelected] = useState<number[]>([])
  const [compact, setCompact] = useState(false)

  const rows = useMemo(
    () => data.filter((r) => `${r.nama} ${r.kategori} ${r.waybill}`.toLowerCase().includes(q.toLowerCase())),
    [data, q],
  )
  const toggle = (id: number) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const allChecked = rows.length > 0 && rows.every((r) => selected.includes(r.id))

  const exportCsv = () => {
    const head = 'No,Waktu,Kategori,Nama,Waybill,Kode\n'
    const body = rows.map((r) => [r.id, r.waktu, r.kategori, `"${r.nama}"`, r.waybill, r.kode].join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([head + body], { type: 'text/csv' }))
    a.download = `${title.toLowerCase().replace(/\s/g, '-')}.csv`
    a.click()
  }

  return (
    <div>
      <h1 className="mb-4 flex items-center gap-2 text-xl font-bold"><span className="text-brand">{icon}</span>{title}</h1>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <label className="relative min-w-[220px] flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input className="input w-full pl-9" placeholder="Cari (Ctrl+F)" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <select className="input" value={month} onChange={(e) => setMonth(+e.target.value)}>
          {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
        </select>
        <select className="input" value={year} onChange={(e) => setYear(+e.target.value)}>
          {[2024, 2025, 2026, 2027].map((y) => <option key={y}>{y}</option>)}
        </select>
        <button className="btn"><Trash2 size={13} />Riwayat Terhapus</button>
        <button className="btn"><RefreshCw size={13} />Refresh</button>
        <button className="btn btn-ok" onClick={exportCsv}><Download size={13} />Ekspor Excel</button>
        <button className="btn"><Upload size={13} />Import Data</button>
        <button className="btn btn-brand"><Sparkles size={13} />Cocokkan Resi (AI)</button>
        {showUndo && <button className="btn text-brand" aria-label="Urungkan"><Undo2 size={13} /></button>}
        <button className="btn" aria-label="Kolom"><Columns2 size={13} /></button>
      </div>

      <div className="mb-3 border-b border-line pb-2 text-[10px] font-semibold text-muted">Ringkasan Data ›</div>

      <div className="card overflow-hidden">
        <div className="max-h-[calc(100vh-280px)] overflow-auto">
          <table className="w-full min-w-[900px] text-center text-xs">
            <thead className="sticky top-0 z-10 bg-bg">
              <tr className="border-b border-line">
                <th className="w-10 p-3"><input type="checkbox" checked={allChecked} onChange={() => setSelected(allChecked ? [] : rows.map((r) => r.id))} /></th>
                {COLS.map((c) => (
                  <th key={c} className="p-3 font-bold">
                    <span className="inline-flex items-center gap-1">{c}{c !== 'Kode Registrasi' && <Filter size={10} className="text-muted" />}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-line/60 hover:bg-brandsoft/30">
                  <td className="p-3"><input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggle(r.id)} /></td>
                  <td className="font-bold">{r.id}</td>
                  <td className="text-[11px] font-semibold">{r.waktu}</td>
                  <td className="font-semibold">{r.kategori}</td>
                  <td className="max-w-[280px] px-3 font-semibold">{r.nama}</td>
                  <td className={compact ? 'p-1' : 'p-3'}>
                    {r.foto
                      ? <img src={r.foto} alt={r.nama} className="mx-auto h-16 w-24 rounded-md object-cover" />
                      : <div className={`mx-auto grid place-items-center rounded-md bg-bg text-muted ${compact ? 'h-8 w-12' : 'h-16 w-24'}`}><ImageIcon size={18} /></div>}
                  </td>
                  <td className="font-semibold">{r.waybill || '—'}</td>
                  <td className="text-muted">{r.kode || '—'}</td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={8} className="p-10 text-muted">Tidak ada data yang cocok.</td></tr>}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-3 text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span>Tampilkan: <select className="input !py-1"><option>Semua</option><option>50</option><option>100</option></select> baris</span>
            <span>Tinggi: <select className="input !py-1" onChange={(e) => setCompact(e.target.value === 'Ringkas')}><option>Normal</option><option>Ringkas</option></select></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Total {total} data</span>
            <button className="btn !p-1.5" aria-label="Sebelumnya"><ChevronLeft size={12} /></button>
            <span className="font-semibold text-ink">Halaman 1 dari 1</span>
            <button className="btn !p-1.5" aria-label="Berikutnya"><ChevronRight size={12} /></button>
          </div>
        </footer>
      </div>
    </div>
  )
}
