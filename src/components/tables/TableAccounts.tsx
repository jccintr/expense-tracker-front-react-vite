import React from 'react'
import {
    Table,
    TableBody,
   
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Trash2,Pencil } from "lucide-react"
  import { Button } from '@/components/ui/button'

const TableAccounts = ({accounts,onEdit,onDelete}) => {
  return (
    <Table>
          <TableHeader>
            <TableRow>
              <TableHead >Nome</TableHead>
              <TableHead  className="text-right">Ações</TableHead>
             
            </TableRow>
          </TableHeader>
          <TableBody>
          {accounts.map((account) => (
             <TableRow key={account.id}>

                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell  className="text-right">
                  <Button onClick={()=>onEdit(account)} className='mr-2'><Pencil/></Button>
                  <Button onClick={()=>onDelete(account)} variant="destructive"><Trash2/></Button>
                </TableCell>
                
             </TableRow>
           ))}
          </TableBody>
      </Table>
  )
}

export default TableAccounts