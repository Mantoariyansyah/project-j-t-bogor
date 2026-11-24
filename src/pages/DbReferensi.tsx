import { BookOpen, History } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Spreadsheet from '../components/Spreadsheet'

export default function DbReferensi() {
  return (
    <div>
      <PageHeader
        icon={BookOpen} title="Database Referensi"
        subtitle="Spreadsheet data referensi resi — copy-paste langsung dari Excel, tersimpan otomatis."
        right={<div className="flex flex-col items-end gap-2"><span className="text-[10px] text-ok">● Tersimpan</span><button className="btn"><History size={12} />Riwayat Versi</button></div>}
      />
      <div className="card mb-4 flex items-center justify-between px-4 py-3 font-mono text-[10px] text-muted">
        <span>A=Resi · B=Waktu · C=Seller · D=Nama Barang · E=Jumlah</span>
        <button className="btn"><BookOpen size={12} />Panduan</button>
      </div>
      <Spreadsheet framedCols={5} />
    </div>
  )
}
