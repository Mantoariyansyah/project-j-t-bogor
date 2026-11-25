import { useState } from 'react'
import { Settings, RefreshCw, Check, XCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { users as seed } from '../data/mock'

export default function AdminPanel() {
  const [list, setList] = useState(seed)
  const toggle = (id: number) => setList((l) => l.map((u) => (u.id === id ? { ...u, aktif: !u.aktif } : u)))

  const stats = [
    { label: 'Total User', value: list.length, cls: '' },
    { label: 'Menunggu', value: 0, cls: 'text-warn' },
    { label: 'Admin', value: list.filter((u) => u.role === 'Admin').length, cls: 'text-info' },
  ]

  return (
    <div className="min-w-0">
      {/* ===== Header ===== */}
      <div className="card mb-4 p-3 sm:p-4">
        <PageHeader
          icon={Settings}
          title="Admin Panel (Admin Stasiun)"
          subtitle="Kelola role pengguna, setujui pendaftaran baru, dan atur penempatan stasiun gateway."
          right={
            <button className="btn shrink-0 whitespace-nowrap">
              <RefreshCw size={12} />
              <span className="hidden sm:inline">Muat Ulang</span>
              <span className="sm:hidden">Muat</span>
            </button>
          }
        />
      </div>

      {/* ===== Stats ===== */}
      <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card min-w-0 p-2.5 sm:p-4">
            <div className="truncate text-[10px] text-muted">{s.label}</div>
            <div className={`mt-1 truncate text-lg font-bold sm:mt-2 sm:text-xl ${s.cls}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* ===== List ===== */}
      <div className="card overflow-hidden">
        {/* --- MOBILE: card list --- */}
        <div className="divide-y divide-line/60 md:hidden">
          {list.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted">Belum ada pengguna.</div>
          ) : (
            list.map((u) => (
              <div key={u.id} className="space-y-3 p-3">
                {/* Nama + status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-xs font-bold">{u.nama}</div>
                    <div className="truncate text-[10px] text-muted">{u.email}</div>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[10px] ${
                      u.aktif ? 'bg-ok/15 text-ok' : 'bg-line text-muted'
                    }`}
                  >
                    {u.aktif && <Check size={10} />}
                    {u.aktif ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted">Stasiun</div>
                    <div className="truncate font-bold">{u.stasiun}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted">Role</div>
                    <div className={`truncate font-semibold ${u.role === 'Admin' ? 'text-info' : ''}`}>
                      {u.role}
                    </div>
                  </div>
                </div>

                {/* Aksi full-width */}
                <button
                  onClick={() => toggle(u.id)}
                  className={`btn w-full justify-center whitespace-nowrap ${u.aktif ? 'text-brand' : 'text-ok'}`}
                >
                  <XCircle size={12} />
                  {u.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
              </div>
            ))
          )}
        </div>

        {/* --- DESKTOP: tabel --- */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] text-xs">
            <thead>
              <tr className="border-b border-line text-left text-[10px] font-bold text-muted">
                <th className="p-4">USER</th>
                <th className="p-4 text-center">STATUS</th>
                <th className="p-4 text-center">STASIUN</th>
                <th className="p-4 text-center">ROLE</th>
                <th className="p-4 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id} className="border-b border-line/60">
                  <td className="max-w-[220px] p-4">
                    <div className="truncate font-bold">{u.nama}</div>
                    <div className="truncate text-[10px] text-muted">{u.email}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] ${
                        u.aktif ? 'bg-ok/15 text-ok' : 'bg-line text-muted'
                      }`}
                    >
                      {u.aktif && <Check size={10} />}
                      {u.aktif ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold">{u.stasiun}</td>
                  <td className={`p-4 text-center font-semibold ${u.role === 'Admin' ? 'text-info' : ''}`}>
                    {u.role}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggle(u.id)}
                      className={`inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold ${
                        u.aktif ? 'text-brand' : 'text-ok'
                      }`}
                    >
                      <XCircle size={12} />
                      {u.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}