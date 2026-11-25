import { useState } from 'react'
import { Database, Folder, FolderPlus, Plus, FileSpreadsheet, ArrowUpDown } from 'lucide-react'
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

  // ===== View: buka spreadsheet =====
  if (open?.type === 'sheet') {
    return (
      <div className="min-w-0">
        {/* Baris aksi + judul: wrap di mobile supaya nama panjang tidak mendorong tombol */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button className="btn shrink-0" onClick={() => setOpen(null)}>← Kembali</button>
          <h1 className="min-w-0 break-words text-base font-bold sm:text-lg">{open.name}</h1>
        </div>

        {/* Spreadsheet: scroll horizontal di mobile, normal di layar lebar */}
        <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
          <div className="min-w-[640px] sm:min-w-0">
            <Spreadsheet />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-0">
      {/* ===== Header ===== */}
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-lg font-bold sm:text-xl">
            <Database size={20} className="shrink-0 text-brand" />Database All
          </h1>
          <p className="mt-1 text-xs text-muted">Spreadsheet cloud — real-time multiplayer & cross-file lookup.</p>
        </div>
        <button className="btn shrink-0 self-start">Root</button>
      </header>

      {/* ===== Toolbar ===== */}
      <div className="card mb-4 flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
        {/* 2 tombol tambah: grid 2 kolom di mobile, sejajar di sm+ */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
          <button className="btn justify-center" onClick={() => add('folder')}>
            <FolderPlus size={13} />Folder Baru
          </button>
          <button className="btn btn-brand justify-center" onClick={() => add('sheet')}>
            <Plus size={13} />Spreadsheet Baru
          </button>
        </div>

        {/* Urutkan: full-width di mobile, label dipendekkan */}
        <button
          className="btn w-full justify-center whitespace-nowrap sm:w-auto"
          onClick={() => setAsc(!asc)}
          aria-label={asc ? 'Urutkan Z-A' : 'Urutkan A-Z'}
        >
          <ArrowUpDown size={13} />
          <span className="hidden sm:inline">Urutkan: </span>
          <span>{asc ? 'A–Z' : 'Z–A'}</span>
        </button>
      </div>

      {/* ===== Konten ===== */}
      <div className="card min-h-[420px] p-3 sm:p-5">
        {sorted.length === 0 ? (
          <div className="grid h-[300px] place-items-center text-center sm:h-[380px]">
            <div>
              <Folder size={30} className="mx-auto mb-3 text-muted" />
              <p className="mb-3 text-xs text-muted">Folder ini masih kosong</p>
              <button className="btn btn-brand" onClick={() => add('sheet')}>
                <Plus size={13} />Buat Spreadsheet
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
            {sorted.map((e) => (
              <button
                key={e.id}
                onClick={() => e.type === 'sheet' && setOpen(e)}
                className="min-w-0 rounded-xl border border-line p-3 text-center text-xs font-semibold hover:bg-brandsoft/40 sm:p-4"
              >
                {e.type === 'folder'
                  ? <Folder className="mx-auto mb-2 text-brand" />
                  : <FileSpreadsheet className="mx-auto mb-2 text-ok" />}
                {/* Nama panjang: break kata, jangan sampai merusak grid */}
                <span className="block break-words leading-tight">{e.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}