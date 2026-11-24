import { useState } from 'react'
import { Database, Folder, FolderPlus, Plus, FileSpreadsheet } from 'lucide-react'
import Spreadsheet from '../components/Spreadsheet'

interface Entry { id: number; type: 'folder' | 'sheet'; name: string }

export default function DatabaseAll() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [open, setOpen] = useState<Entry | null>(null)
  const [asc, setAsc] = useState(true)

  const add = (type: Entry['type']) => {
    const name = window.prompt(type === 'folder' ? 'Nama folder' : 'Nama spreadsheet')
    if (name) setEntries((e) => [...e, { id: Date.now(), type, name }])
  }
  const sorted = [...entries].sort((a, b) => (asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))

  if (open?.type === 'sheet') {
    return (
      <div>
        <button className="btn mb-3" onClick={() => setOpen(null)}>← Kembali</button>
        <h1 className="mb-3 text-lg font-bold">{open.name}</h1>
        <Spreadsheet />
      </div>
    )
  }

  return (
    <div>
      <header className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold"><Database size={20} className="text-brand" />Database All</h1>
          <p className="mt-1 text-xs text-muted">Spreadsheet cloud — real-time multiplayer & cross-file lookup.</p>
        </div>
        <button className="btn">Root</button>
      </header>

      <div className="card mb-4 flex items-center justify-between p-3">
        <div className="flex gap-2">
          <button className="btn" onClick={() => add('folder')}><FolderPlus size={13} />Folder Baru</button>
          <button className="btn btn-brand" onClick={() => add('sheet')}><Plus size={13} />Spreadsheet Baru</button>
        </div>
        <button className="btn" onClick={() => setAsc(!asc)}>Urutkan: {asc ? 'Nama (A-Z)' : 'Nama (Z-A)'}</button>
      </div>

      <div className="card min-h-[420px] p-5">
        {sorted.length === 0 ? (
          <div className="grid h-[380px] place-items-center text-center">
            <div>
              <Folder size={30} className="mx-auto mb-3 text-muted" />
              <p className="mb-3 text-xs text-muted">Folder ini masih kosong</p>
              <button className="btn btn-brand" onClick={() => add('sheet')}><Plus size={13} />Buat Spreadsheet</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {sorted.map((e) => (
              <button key={e.id} onClick={() => e.type === 'sheet' && setOpen(e)} className="rounded-xl border border-line p-4 text-center text-xs font-semibold hover:bg-brandsoft/40">
                {e.type === 'folder' ? <Folder className="mx-auto mb-2 text-brand" /> : <FileSpreadsheet className="mx-auto mb-2 text-ok" />}
                {e.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
