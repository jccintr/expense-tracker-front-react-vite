//import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"

const AccountModal = ({isOpen,setIsOpen,title,description,onSave,account,setAccount,isLoading}) => {
     

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
     
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Nome:</Label>
          <Input id="name" value={account.name} className="col-span-3" placeholder="Digite o nome da categoria" onChange={(e)=>setAccount({...account,name:e.target.value})}/>
        </div>
       
      </div>
      <DialogFooter>
        <Button onClick={()=>onSave()}>{isLoading&&<Loader2 className="animate-spin" />}SALVAR</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default AccountModal