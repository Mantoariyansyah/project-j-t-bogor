import { BookOpen, History } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Spreadsheet from '../components/Spreadsheet'

export default function DbReferensi() {
  return (
    <div className="min-w-0">
      <PageHeader
        icon={BookOpen}
        title="Database Referensi"
        subtitle="Spreadsheet data referensi resi — copy-paste langsung dari Excel, tersimpan otomatis."
        right={
          <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end sm:gap-2">
            <span className="whitespace-nowrap text-[10px] text-ok">
              ● Tersimpan
            </span>
            <button className="btn whitespace-nowrap">
              <History size={12} />
              <span className="hidden sm:inline">Riwayat Versi</span>
              <span className="sm:hidden">Riwayat</span>
            </button>
          </div>
        }
      />

      {/* Legend + Panduan */}
      <div className="card mb-4 flex flex-col gap-2 px-3 py-2.5 font-mono text-[10px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 sm:flex sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-0">
          <span>A=Resi</span>
          <span>B=Waktu</span>
          <span>C=Seller</span>
          <span>D=Nama Barang</span>
          <span className="col-span-2 sm:col-span-1">E=Jumlah</span>
        </div>
        <button className="btn self-start whitespace-nowrap sm:self-auto">
          <BookOpen size={12} /> Panduan
        </button>
      </div>

      {/* Spreadsheet: biarkan bisa di-scroll horizontal di mobile */}
      <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
        <div className="min-w-[640px] sm:min-w-0">
          <Spreadsheet framedCols={5} />
        </div>
      </div>
    </div>
  )
}