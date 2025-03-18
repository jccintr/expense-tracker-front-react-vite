import { Button } from '@/components/ui/button'
import {useState,useEffect,useContext} from 'react'
import api from '@/api/api';
import AuthContext from '@/context/AuthContext';
import TableTransactions from '@/components/tables/TableTransactions';
import TransactionModal from '@/components/modals/TransactionModal';
import DeleteAlert from '@/components/modals/DeleteAlert';
import { formataDataAPI,formataData } from '@/util/util';
import { ChevronRight,ChevronLeft } from "lucide-react"
import { Label } from '@/components/ui/label';
import EmptyTable from '@/components/EmptyTable';

const Transactions = () => {
  const [transactions,setTransactions] = useState([]);
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalDeleteOpen,setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [transaction,setTransaction] = useState({id:0,description:'',amount:"0",category_id:0,account_id:0});
  const [errorMessage,setErrorMessage] = useState(null);
  const [data,setData] = useState(null);
  const [categories,setCategories] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const [accounts,setAccounts] = useState([]);
  const [selectedAccount,setSelectedAccount] = useState(null);



  useEffect(()=>{
    const hoje = new Date(Date.now());
    setData(hoje);
 },[]);

  useEffect(()=>{
      getTransactions();
  },[data]);

  useEffect(()=>{
    getCategories();
    getAccounts();
},[]);


const getTransactions = async () => {
    
    const response = await api.getTransactions(formataDataAPI(data),token);
    const json = await response.json();
    setTransactions(json);
   
}

const getCategories = async () => {
    const response = await api.getCategories(token);
    if(response.ok){
        const json = await response.json();
        setCategories(json);
    }       
 }

 const getAccounts = async () => {
    const response = await api.getAccounts(token);
    if(response.ok){
        const json = await response.json();
        setAccounts(json);
        setIsLoading(false)
    }       
 }

 const onAdd = () => {
  setTransaction({id:0,description:'',amount:"0",category_id:0,account_id:0});
  setErrorMessage(null);
  setIsModalOpen(true);
}

const onEdit = (transaction) => {
 
  setTransaction({id:transaction.id,description:transaction.description,category_id:transaction.category.id,account_id:transaction.account.id,amount:transaction.amount.toString()});
  setErrorMessage(null);
  setIsModalEditOpen(true);

}

const onDelete = (transaction) => {
  setTransaction(transaction);
  setIsModalDeleteOpen(true);
}

const addTransaction = async  () => {
 
  if(transaction.description.trim().length===0){
    setErrorMessage('Informe uma descrição válida.');
    return;
   }
   if(transaction.amount.trim().length===0 || Number(transaction.amount) <= 0){
    setErrorMessage('Valor inválido.');
    return;
   }
  
   if(transaction.category_id==0){
    setErrorMessage('Selecione uma categoria.');
    return;
   }
   if(transaction.account_id==0){
    setErrorMessage('Selecione uma conta.');
    return;
   }
  
   
    const response = await api.addTransaction(token,transaction);
    if(response.ok){
      getTransactions();
    
       setIsModalOpen(false);
    }

}

const updateTransaction = async  () => {
  if(transaction.description.trim().length===0){
    setErrorMessage('Informe uma descrição válida.');
    return;
   }
   if(transaction.amount.trim().length===0 || Number(transaction.amount) <= 0){
    setErrorMessage('Valor inválido.');
    return;
   }
  
   if(transaction.category_id==0){
    setErrorMessage('Selecione uma categoria.');
    return;
   }
   if(transaction.account_id==0){
    setErrorMessage('Selecione uma conta.');
    return;
   }
  
   const response = await api.updateTransaction(token,transaction.id,transaction);
   if(response.ok){
     getTransactions();
     //setIsLoadingTransaction(false);
     setIsModalEditOpen(false);
   }
}

const deleteTransaction = async () => {
    setIsLoading(true);
    const response = await api.deleteTransaction(token,transaction.id);
    if(response.ok){
      getTransactions();
      setIsLoading(false);
      setIsModalDeleteOpen(false);
      return;
    }
    setIsModalDeleteOpen(false);
    setIsLoading(false);
    const result = await response.json();
    const error = result.error;
   
    alert(error);
    return;
}


const nextDay = () => {
  const newDate = new Date(data);
  newDate.setDate(data.getDate() + 1);
  setData(newDate);
}

const previousDay = () => {
  const newDate = new Date(data);
  newDate.setDate(data.getDate() - 1);
  setData(newDate);
}

  return (
    <div className='w-full p-5  mx-auto'>
        <div className='flex w-full flex-row justify-between mb-4'>
          <h1 className='text-3xl font-semibold'>Transações</h1>
          <Button onClick={()=>onAdd()}>Nova Transação</Button>
        </div>
        <div className="flex flex-row  gap-2">
            <ChevronLeft  onClick={previousDay}/>
            <Label className="text-base">{formataData(data)}</Label>
            <ChevronRight onClick={nextDay}/>
        </div>
        {transactions.length>0&&<TableTransactions transactions={transactions} onEdit={onEdit} onDelete={onDelete}/>}
        {transactions.length==0&&<EmptyTable buttonLabel='Adicionar Transação' message='Transações não encontradas.' message2='Por favor, escolha outra data ou adicione uma nova transação.' onAdd={onAdd}/>}
        <TransactionModal categories={categories} accounts={accounts} errorMessage={errorMessage} isLoading={isLoading} transaction={transaction} setTransaction={setTransaction} isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Nova Transação'} description={'Insira os dados da nova transação e clique em Salvar.'} onSave={addTransaction}/>
        <TransactionModal categories={categories} accounts={accounts} errorMessage={errorMessage} isLoading={isLoading} transaction={transaction} setTransaction={setTransaction} isOpen={isModalEditOpen} setIsOpen={setIsModalEditOpen} title={'Editando Transação'} description={'Altere os dados da transação e clique em Salvar.'} onSave={updateTransaction}/>
        <DeleteAlert isLoading={isLoading} deleteAction={deleteTransaction} isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen} title="Deseja deletar esta transação ?" description={'Esta operação vai excluir a transação do banco de dados e não poderá ser revertida.'}/>
    </div>
  )
}

export default Transactions