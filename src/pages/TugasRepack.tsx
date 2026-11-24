import { CheckSquare } from 'lucide-react'
import ItemTable from '../components/ItemTable'
import { repackItems } from '../data/mock'

export default function TugasRepack() {
  return <ItemTable title="Tugas Repack" icon={<CheckSquare size={18} />} data={repackItems} total={1090} />
}
