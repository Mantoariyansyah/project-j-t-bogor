import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export default function PageHeader({ icon: Icon, title, subtitle, right }: {
  icon: LucideIcon; title: string; subtitle?: string; right?: ReactNode
}) {
  return (
    <header className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold"><Icon size={20} className="text-brand" />{title}</h1>
        {subtitle && <p className="mt-1 text-xs text-muted">{subtitle}</p>}
      </div>
      {right}
    </header>
  )
}
