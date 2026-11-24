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
    <div>
      <div className="card mb-4 p-4">
        <PageHeader
          icon={Settings} title="Admin Panel (Admin Stasiun)"
          subtitle="Kelola role pengguna, setujui pendaftaran baru, dan atur penempatan stasiun gateway."
          right={<button className="btn"><RefreshCw size={12} />Muat Ulang</button>}
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className="text-[10px] text-muted">{s.label}</div>
            <div className={`mt-2 text-xl font-bold ${s.cls}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-line text-left text-[10px] font-bold text-muted">
              <th className="p-4">USER</th><th className="text-center">STATUS</th><th className="text-center">STASIUN</th><th className="text-center">ROLE</th><th className="text-center">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id} className="border-b border-line/60">
                <td className="p-4"><div className="font-bold">{u.nama}</div><div className="text-[10px] text-muted">{u.email}</div></td>
                <td className="text-center">
                  <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] ${u.aktif ? 'bg-ok/15 text-ok' : 'bg-line text-muted'}`}>
                    {u.aktif && <Check size={10} />}{u.aktif ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="text-center font-bold">{u.stasiun}</td>
                <td className={`text-center font-semibold ${u.role === 'Admin' ? 'text-info' : ''}`}>{u.role}</td>
                <td className="text-center">
                  <button onClick={() => toggle(u.id)} className={`inline-flex items-center gap-1 text-[11px] font-semibold ${u.aktif ? 'text-brand' : 'text-ok'}`}>
                    <XCircle size={12} />{u.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
