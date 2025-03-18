import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Trash2,Pencil } from "lucide-react"
import { Button } from '@/components/ui/button'

const TableTransactions = ({transactions,onEdit,onDelete}) => {
  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Descrição</TableHead>
        <TableHead>Categoria</TableHead>
        <TableHead>Conta</TableHead>
        <TableHead className="text-right">Valor</TableHead>
        <TableHead  className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
    {transactions.map((transaction) => (
       <TableRow key={transaction.id}>
          <TableCell className="font-medium">{transaction.description}</TableCell>
          <TableCell className="font-medium">{transaction.category.name}</TableCell>
          <TableCell className="font-medium">{transaction.account.name}</TableCell>
          <TableCell className="text-right font-medium">{transaction.amount.toFixed(2)}</TableCell>
          <TableCell  className="text-right">
            <Button onClick={()=>onEdit(transaction)} className='mr-2'><Pencil/></Button>
            <Button onClick={()=>onDelete(transaction)} variant="destructive"><Trash2/></Button>
          </TableCell>
       </TableRow>
     ))}
    </TableBody>
</Table>
  )
}

export default TableTransactions