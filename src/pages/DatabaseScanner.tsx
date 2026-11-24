import { Database } from 'lucide-react'
import ItemTable from '../components/ItemTable'
import { scannerItems } from '../data/mock'

export default function DatabaseScanner() {
  return <ItemTable title="Database Scanner" icon={<Database size={18} />} data={scannerItems} total={4629} showUndo />
}