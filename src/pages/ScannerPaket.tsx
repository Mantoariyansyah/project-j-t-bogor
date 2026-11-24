import { useRef, useState } from 'react'
import {
  Camera, Image as ImageIcon, Zap, UploadCloud, X, Maximize, List,
  CheckCircle2, Trash2, ChevronLeft, ChevronRight, Loader2,
  Users, MapPin, Package, Layers,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'

interface Photo { id: number; url: string }
interface Result { id: number; nama: string; kategori: string; qty: number }

/* ─── Data Demo (foto sesuai nama barang) ───────────── */
const DEMO_PHOTOS: Photo[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
  },
]

const DEMO_RESULTS: Result[] = [
  { id: 1, nama: 'Kardus Sepatu Adidas', kategori: 'Fashion', qty: 1 },
  { id: 2, nama: 'Buku Tulis A5', kategori: 'Alat Tulis', qty: 2 },
  { id: 3, nama: 'Headphone Sony WH-1000', kategori: 'Elektronik', qty: 1 },
]

export default function ScannerPaket() {
  const [photos, setPhotos] = useState<Photo[]>(DEMO_PHOTOS)
  const [mode, setMode] = useState('Barang Berbeda')
  const [tim, setTim] = useState('TIM A')
  const [area, setArea] = useState('Rak A-3')
  const [results, setResults] = useState<Result[]>(DEMO_RESULTS)
  const [loading, setLoading] = useState(false)
  const [showMaximize, setShowMaximize] = useState(false)
  const [showList, setShowList] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)
  const input = useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const next = Array.from(files).slice(0, 5 - photos.length).map((f, i) => ({
      id: Date.now() + i,
      url: URL.createObjectURL(f),
    }))
    setPhotos((p) => [...p, ...next])
  }

  // TODO: ganti dengan panggilan API AI sungguhan
  const identify = () => {
    setLoading(true)
    setTimeout(() => {
      setResults(
        photos.map((p, i) => {
          const existing = results.find((r) => r.id === p.id)
          return existing || {
            id: p.id,
            nama: `Barang #${i + 1} (hasil AI)`,
            kategori: 'Belum dikategorikan',
            qty: 1,
          }
        }),
      )
      setLoading(false)
    }, 900)
  }

  const removePhoto = (id: number) => {
    setPhotos((p) => p.filter((x) => x.id !== id))
    setResults((r) => r.filter((x) => x.id !== id))
  }

  const removeResult = (id: number) => {
    setResults((r) => r.filter((x) => x.id !== id))
    setPhotos((p) => p.filter((x) => x.id !== id))
  }

  const totalQty = results.reduce((s, r) => s + r.qty, 0)
  const currentPhoto = photos[previewIndex]

  return (
    <div className="max-w-3xl pb-10 mx-auto space-y-4">
      <PageHeader
        icon={Camera}
        title="Scanner Paket"
        subtitle="Foto barang, biarkan AI mengenali nama & kategorinya secara otomatis."
      />

      {/* ── Upload & Identifikasi ─────────────────────── */}
      <section className="p-4 card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="flex items-center gap-2 text-xs font-bold">
            <ImageIcon size={14} className="text-brand" /> FOTO BARANG
            <span className="font-normal text-muted">(MAKS. 5)</span>
          </h2>
          <span className="rounded-full bg-bg px-2 py-0.5 text-[10px] font-semibold text-muted">
            {photos.length}/5
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {photos.map((p) => (
            <div key={p.id} className="group relative h-[68px] w-[68px]">
              <img
                src={p.url}
                alt=""
                className="object-cover w-full h-full border rounded-lg border-line"
              />
              <button
                aria-label="Hapus foto"
                onClick={() => removePhoto(p.id)}
                className="absolute grid w-5 h-5 text-white transition rounded-full shadow opacity-0 -right-1 -top-1 place-items-center bg-brand group-hover:opacity-100 hover:scale-110"
              >
                <X size={11} />
              </button>
            </div>
          ))}

          {photos.length < 5 && (
            <button
              onClick={() => input.current?.click()}
              className="grid h-[68px] w-[68px] place-items-center rounded-lg border border-dashed border-brand/50 text-muted transition hover:border-brand hover:bg-brandsoft/40"
            >
              <span className="flex flex-col items-center gap-0.5">
                <ImageIcon size={14} />
                <span className="text-[9px] font-semibold">Tambah</span>
              </span>
            </button>
          )}

          <input
            ref={input}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        <button
          disabled={!photos.length || loading}
          onClick={identify}
          className="btn btn-brand mt-3 w-full justify-center !py-2 text-xs disabled:opacity-40"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <Zap size={13} />}
          {loading ? 'Mengidentifikasi…' : 'Identifikasi Otomatis dengan AI'}
        </button>
      </section>

      {/* ── Jenis Pemindaian ──────────────────────────── */}
      <section className="flex items-center justify-between gap-3 p-3 card">
        <div className="min-w-0">
          <div className="text-xs font-bold">Jenis Pemindaian</div>
          <div className="text-[10px] text-muted">
            Pilih barang sama atau berbeda dalam satu batch.
          </div>
        </div>
        <select
          className="input shrink-0 text-[11px]"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option>Barang Berbeda</option>
          <option>Barang Sama</option>
        </select>
      </section>

      {/* ── Detail Batch ──────────────────────────────── */}
      <section className="p-4 card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="flex items-center gap-2 text-xs font-bold">
            <UploadCloud size={14} className="text-brand" /> DETAIL BATCH BARANG
          </h2>
          <span className="text-[10px] text-muted">
            {results.length} item · {totalQty} qty
          </span>
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-line bg-bg/40 py-6 text-center">
            <UploadCloud size={18} className="text-muted" />
            <p className="text-[11px] font-semibold text-muted">Belum ada barang di batch</p>
            <p className="text-[9px] text-muted/70">Unggah foto & identifikasi dengan AI</p>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {results.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center gap-2.5 rounded-lg border border-line bg-bg/30 p-2 transition hover:border-brand/40"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brandsoft text-[10px] font-bold text-brand">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0 leading-tight">
                  <p className="truncate text-[11px] font-semibold text-ink">{r.nama}</p>
                  <p className="text-[9px] text-muted">
                    {r.kategori} · qty {r.qty}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <CheckCircle2 size={9} /> AI
                </span>
                <button
                  aria-label="Hapus dari batch"
                  onClick={() => removeResult(r.id)}
                  className="p-1 transition rounded-md text-muted hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <Trash2 size={12} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Pengaturan Global */}
        <div className="pt-3 mt-4 border-t border-line">
          <h3 className="text-[11px] font-bold">Pengaturan Global</h3>
          <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-[1fr_1.4fr]">
            <div>
              <label className="text-[9px] font-bold uppercase tracking-wide text-muted">
                Tim
              </label>
              <div className="relative mt-1">
                <Users
                  size={12}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <select
                  className="input w-full pl-7 text-[11px]"
                  value={tim}
                  onChange={(e) => setTim(e.target.value)}
                >
                  <option>TIM A</option>
                  <option>TIM B</option>
                  <option>TIM C</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-wide text-muted">
                Area Penempatan
              </label>
              <div className="mt-1 flex gap-1.5">
                <div className="relative flex-1">
                  <MapPin
                    size={12}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    className="input w-full pl-7 text-[11px]"
                    placeholder="Contoh: Rak A-3"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    setPreviewIndex(0)
                    setShowMaximize(true)
                  }}
                  disabled={!photos.length}
                  className="grid w-8 h-8 transition border rounded-lg shrink-0 place-items-center border-line bg-side text-ink hover:border-brand hover:text-brand disabled:opacity-40"
                  aria-label="Lihat semua foto"
                  title="Lihat semua foto"
                >
                  <Maximize size={13} />
                </button>
                <button
                  onClick={() => setShowList(true)}
                  className="grid w-8 h-8 text-white transition rounded-lg shrink-0 place-items-center bg-brand hover:bg-brand/90"
                  aria-label="Daftar batch"
                  title="Daftar batch"
                >
                  <List size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modal: Foto Preview ───────────────────────── */}
      {showMaximize && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowMaximize(false)}
        >
          <div
            className="relative w-full max-w-md p-3 border shadow-2xl rounded-2xl border-line bg-side"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ImageIcon size={13} className="text-brand" />
                <span className="text-[11px] font-bold text-ink">
                  Foto Barang
                </span>
                <span className="text-[10px] text-muted">
                  ({photos.length === 0 ? 0 : previewIndex + 1}/{photos.length})
                </span>
              </div>
              <button
                onClick={() => setShowMaximize(false)}
                className="p-1 transition rounded-lg text-muted hover:bg-bg hover:text-ink"
                aria-label="Tutup"
              >
                <X size={14} />
              </button>
            </div>

            {photos.length === 0 ? (
              <div className="py-10 text-center text-[11px] text-muted">
                Belum ada foto
              </div>
            ) : (
              <>
                <div className="relative overflow-hidden bg-black border aspect-square rounded-xl border-line">
                  <img
                    src={currentPhoto?.url}
                    alt=""
                    className="object-contain w-full h-full"
                  />
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setPreviewIndex((i) => (i - 1 + photos.length) % photos.length)
                        }
                        className="absolute left-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                        aria-label="Sebelumnya"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() =>
                          setPreviewIndex((i) => (i + 1) % photos.length)
                        }
                        className="absolute right-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                        aria-label="Berikutnya"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </>
                  )}
                </div>
                {photos.length > 1 && (
                  <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
                    {photos.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => setPreviewIndex(i)}
                        className={`h-9 w-9 shrink-0 overflow-hidden rounded-md border-2 transition ${
                          i === previewIndex
                            ? 'border-brand'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={p.url} alt="" className="object-cover w-full h-full" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Modal: Daftar Batch ───────────────────────── */}
      {showList && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowList(false)}
        >
          <div
            className="relative w-full max-w-md p-3 border shadow-2xl rounded-2xl border-line bg-side"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="grid rounded-lg h-7 w-7 place-items-center bg-brandsoft text-brand">
                  <Layers size={13} />
                </span>
                <div className="leading-tight">
                  <h3 className="text-[11px] font-bold text-ink">Daftar Batch</h3>
                  <p className="text-[9px] text-muted">
                    {results.length} item · {totalQty} qty
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowList(false)}
                className="p-1 transition rounded-lg text-muted hover:bg-bg hover:text-ink"
                aria-label="Tutup"
              >
                <X size={14} />
              </button>
            </div>

            <div className="mb-2.5 grid grid-cols-2 gap-2 rounded-xl bg-bg p-2">
              <div className="flex items-center gap-1.5">
                <Users size={11} className="text-brand" />
                <div className="leading-tight">
                  <div className="text-[8px] font-semibold uppercase tracking-wide text-muted">Tim</div>
                  <div className="text-[10px] font-bold text-ink">{tim}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin size={11} className="text-brand shrink-0" />
                <div className="min-w-0 leading-tight">
                  <div className="text-[8px] font-semibold uppercase tracking-wide text-muted">Area</div>
                  <div className="truncate text-[10px] font-bold text-ink">{area || '—'}</div>
                </div>
              </div>
            </div>

            <div className="max-h-64 space-y-1.5 overflow-y-auto pr-0.5">
              {results.length === 0 ? (
                <div className="flex flex-col items-center gap-1 py-6 text-center">
                  <Package size={16} className="text-muted" />
                  <p className="text-[10px] text-muted">Belum ada barang</p>
                </div>
              ) : (
                results.map((r, i) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-2 p-2 border rounded-lg border-line bg-bg/40"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brandsoft text-[9px] font-bold text-brand">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0 leading-tight">
                      <div className="truncate text-[10px] font-semibold text-ink">{r.nama}</div>
                      <div className="text-[9px] text-muted">
                        {r.kategori} · qty {r.qty}
                      </div>
                    </div>
                    <button
                      onClick={() => removeResult(r.id)}
                      className="p-1 transition rounded-md text-muted hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                      aria-label="Hapus"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}