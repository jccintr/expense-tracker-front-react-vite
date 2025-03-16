import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from '../ui/button'
  import { Loader2 } from "lucide-react"
  

const DeleteAlert = ({isOpen,setIsOpen,title,description,deleteAction,isLoading}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button onClick={()=>deleteAction()} variant="destructive">{isLoading&&<Loader2 className="animate-spin" />}DELETAR</Button>
        </AlertDialogFooter>
        </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default DeleteAlert