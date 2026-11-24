import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScannerPaket from './pages/ScannerPaket'
import DatabaseScanner from './pages/DatabaseScanner'
import TugasRepack from './pages/TugasRepack'
import TrackingPDA from './pages/TrackingPDA'
import DbReferensi from './pages/DbReferensi'
import DatabaseAll from './pages/DatabaseAll'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/scanner" replace />} />
        <Route path="/scanner" element={<ScannerPaket />} />
        <Route path="/database-scanner" element={<DatabaseScanner />} />
        <Route path="/tugas-repack" element={<TugasRepack />} />
        <Route path="/tracking-pda" element={<TrackingPDA />} />
        <Route path="/referensi" element={<DbReferensi />} />
        <Route path="/database-all" element={<DatabaseAll />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
    </Routes>
  )
}
