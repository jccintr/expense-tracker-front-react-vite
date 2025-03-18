import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SelectInput from '../inputs/SelectInput'
import { useState,useEffect } from 'react'


const TransactionModal = ({isOpen,setIsOpen,title,description,onSave,transaction,setTransaction,isLoading,errorMessage,categories,accounts}) => {
  const [selectedCategory,setSelectedCategory] = useState(transaction.category_id);
  const [selectedAccount,setSelectedAccount] = useState(transaction.account_id);


  useEffect(()=>{
    setTransaction({...transaction,category_id:selectedCategory})
  },[selectedCategory]);

  useEffect(()=>{
    setTransaction({...transaction,account_id:selectedAccount})
  },[selectedAccount]);

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
          <Label htmlFor="name" className="text-right">Descrição:</Label>
          <Input id="name" value={transaction.description} className="col-span-3" placeholder="Digite a descrição da transação" onChange={(e)=>setTransaction({...transaction,description:e.target.value})}/>
          <Label htmlFor="category" className="text-right">Categoria:</Label>
          <SelectInput  data={categories} placeholder={'Selecione uma categoria'} onChange={setSelectedCategory} selected={transaction.category_id}/>
          <Label htmlFor="account" className="text-right">Conta:</Label>
          <SelectInput  data={accounts} placeholder={'Selecione uma conta'} onChange={setSelectedAccount} selected={transaction.account_id}/>
          <Label htmlFor="amount" className="text-right">Valor:</Label>
          <Input id="amount" value={transaction.amount} className="col-span-3" placeholder="Digite o valor da transação" onChange={(e)=>setTransaction({...transaction,amount:e.target.value})}/>
        </div>
      
      </div>
      <DialogFooter>
      {errorMessage&&<Label className="text-red-500 w-full justify-items-start">{errorMessage}</Label>}
        <Button onClick={()=>onSave()}>{isLoading&&<Loader2 className="animate-spin" />}SALVAR</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default TransactionModal