import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Camera, Database, CheckSquare, Folder, BookOpen, Settings, ChevronLeft,
  LogOut, Sun, Moon, Package, User,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem { to: string; label: string; icon: LucideIcon }
const groups: { title: string; items: NavItem[] }[] = [
  { title: 'Operasional', items: [
    { to: '/scanner', label: 'Scanner Paket', icon: Camera },
    { to: '/database-scanner', label: 'Database Scanner', icon: Database },
    { to: '/tugas-repack', label: 'Tugas Repack', icon: CheckSquare },
    { to: '/tracking-pda', label: 'Tracking PDA', icon: Folder },
  ] },
  { title: 'Data', items: [
    { to: '/referensi', label: 'Db. Referensi', icon: BookOpen },
    { to: '/database-all', label: 'Database All', icon: Folder },
  ] },
  { title: 'Pengaturan', items: [{ to: '/admin', label: 'Admin Panel', icon: Settings }] },
]

export default function Layout() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light')
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <aside
        className={`relative flex shrink-0 flex-col border-r border-line bg-side transition-[width] duration-300 ease-in-out ${
          collapsed ? 'w-[76px]' : 'w-[240px]'
        }`}
      >
        {/* Floating toggle di tepi sidebar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Buka sidebar' : 'Ciutkan sidebar'}
          title={collapsed ? 'Buka sidebar' : 'Ciutkan sidebar'}
          className="absolute z-20 grid transition-all duration-200 bg-white border rounded-full shadow-md -right-3 top-16 h-7 w-7 place-items-center border-line text-muted hover:scale-110 hover:border-brand hover:text-brand dark:bg-side"
        >
          <ChevronLeft
            size={13}
            className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Brand */}
        <div className={`flex items-center border-b border-line ${collapsed ? 'justify-center p-4' : 'gap-3 p-4'}`}>
          {!collapsed && (
            <div className="flex-1 min-w-0 leading-tight text-center">
              <div className="text-sm font-bold">J&T Bogor</div>
              <div className="text-[9px] font-semibold tracking-wider text-muted">QC LOGISTIK</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {groups.map((g, gi) => (
            <div key={g.title} className={gi > 0 ? 'mt-4' : ''}>
              {!collapsed ? (
                <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-muted/70">
                  {g.title}
                </div>
              ) : (
                gi > 0 && <div className="mx-2 mb-2 border-t border-line/60" />
              )}
              {g.items.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  title={collapsed ? label : undefined}
                  className={({ isActive }) =>
                    `group mb-1 flex items-center gap-3 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 ${
                      collapsed ? 'justify-center px-0' : 'px-3'
                    } ${
                      isActive
                        ? 'bg-brand text-white shadow-lg shadow-brand/30'
                        : 'text-muted hover:bg-brandsoft hover:text-brand'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                          isActive ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]' : ''
                        }`}
                      />
                      {!collapsed && <span className="truncate">{label}</span>}
                      {!collapsed && isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-2 border-t border-line">
          <div
            className={`flex items-center gap-3 rounded-xl bg-bg/80 p-2 ${
              collapsed ? 'justify-center' : ''
            }`}
            title={collapsed ? 'SURIYA RAMADON' : undefined}
          >
            <div className="relative grid text-xs font-bold text-white rounded-full h-9 w-9 shrink-0 place-items-center bg-gradient-to-br from-brand to-brand/70">
              <User size={16} />
              <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full border-2 border-bg bg-emerald-400" />
            </div>
            {!collapsed && (
              <div className="min-w-0 leading-tight">
                <div className="truncate text-[11px] font-bold">SURIYA RAMADON</div>
                <div className="flex items-center gap-1 text-[9px] text-muted">
                  <Package size={10} className="shrink-0 text-brand" />
                  <span className="truncate">JAT GATEWAY</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setDark(!dark)}
            title={collapsed ? (dark ? 'Mode Terang' : 'Mode Gelap') : undefined}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white py-2 text-[11px] font-semibold text-ink transition hover:border-brand hover:text-brand dark:bg-side ${
              collapsed ? 'px-0' : 'px-3'
            }`}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
            {!collapsed && <span>{dark ? 'Mode Terang' : 'Mode Gelap'}</span>}
          </button>

          <button
            title={collapsed ? 'Keluar' : undefined}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white py-2 text-[11px] font-semibold text-ink transition hover:border-brand hover:text-brand dark:bg-side ${
              collapsed ? 'px-0' : 'px-3'
            }`}
          >
            <LogOut size={14} />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}