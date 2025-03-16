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

const TableCategories = ({categories,onEdit,onDelete}) => {
  return (
    <Table>
          <TableHeader>
            <TableRow>
              <TableHead >Nome</TableHead>
              <TableHead  className="text-right">Ações</TableHead>
             
            </TableRow>
          </TableHeader>
          <TableBody>
          {categories.map((category) => (
             <TableRow>
                <TableCell className="font-medium">{category.name}</TableCell>
                
                <TableCell  className="text-right">
                  <Button onClick={()=>onEdit(category)} className='mr-2'><Pencil/></Button>
                  <Button onClick={()=>onDelete(category)} variant="destructive"><Trash2/></Button>
                </TableCell>
                
             </TableRow>
           ))}
          </TableBody>
      </Table>
  )
}

export default TableCategories