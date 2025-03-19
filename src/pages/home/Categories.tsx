import { Button } from '@/components/ui/button'
import {useState,useEffect,useContext, SetStateAction} from 'react'
import api from '@/api/api';
import AuthContext from '@/context/AuthContext';
import TableCategories from '@/components/tables/TableCategories';
import CategoryModal from '@/components/modals/CategoryModal';
import DeleteAlert from '@/components/modals/DeleteAlert';
import { Loader2 } from "lucide-react"



const Categories = () => {
  const [categories,setCategories] = useState<[]>([]);
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState<Boolean>(false);
  const [isLoadingList,setIsLoadingList] = useState<Boolean>(false);
  const [isModalOpen,setIsModalOpen] = useState<Boolean>(false);
  const [isModalDeleteOpen,setIsModalDeleteOpen] = useState<Boolean>(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState<Boolean>(false);
  const [category,setCategory] = useState<{}>({id:0,name:''});
  const [errorMessage,setErrorMessage] = useState<String>(null);
 

  useEffect(()=>{
    getCategories();
},[]);

const getCategories = async () => {
  const response = await api.getCategories(token);
  if(response.ok){
     const json = await response.json();
     setCategories(json);
    
  }       
  
}

const onAdd = () => {
    setCategory({id:0,name:''});
    setErrorMessage(null);
    setIsModalOpen(true);
}

const onEdit = (category: SetStateAction<{ id: number; name: string; }>) => {
    setCategory(category);
    setErrorMessage(null);
    setIsModalEditOpen(true);
}

const onDelete = (category: SetStateAction<{ id: number; name: string; }>) => {
  setCategory(category);
  setIsModalDeleteOpen(true);
}

const addCategory = async  () => {
  
  if(category.name.trim().length===0){
    setErrorMessage('Nome da categoria inválido.');
    return;
   }
    
   setIsLoading(true);
    const response = await api.addCategory(token,category.name);
    if(response.ok){
       getCategories();
       setIsLoading(false);
       setIsModalOpen(false);
    }
    setIsLoading(false);
}

const updateCategory = async  () => {

  if(category.name.trim().length===0){
    setErrorMessage('Nome da categoria inválido.');
    return;
   }

   setIsLoading(true);
    const response = await api.updateCategory(token,category.id,category.name);
    if(response.ok){
       getCategories();
       setIsLoading(false);
       setIsModalEditOpen(false);
    }
    setIsLoading(false);
}

const deleteCategory = async () => {
 setIsLoading(true);
  const response = await api.deleteCategory(token,category.id);
  if(response.ok){
    getCategories();
    setIsLoading(false);
   setIsModalDeleteOpen(false);
    return;
  }
  setIsModalDeleteOpen(false);
  const result = await response.json();
  const error = result.error;
  setIsLoading(false);
  alert(error);
  return;
}



  return (
    <div className='w-full p-5  mx-auto'>
        <div className='flex w-full flex-row justify-between mb-4'>
           <h1 className='text-3xl font-semibold'>Categorias</h1>
           <Button onClick={()=>onAdd()}>Nova Categoria</Button>
        </div>
        {isLoadingList?<Loader2 className="animate-spin" />:<TableCategories categories={categories} onEdit={onEdit} onDelete={onDelete}/>}
        <CategoryModal errorMessage={errorMessage} isLoading={isLoading} category={category} setCategory={setCategory} isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Nova Categoria'} description={'Insira os dados da nova categoria e clique em Salvar.'} onSave={addCategory}/>
        <CategoryModal errorMessage={errorMessage} isLoading={isLoading} category={category} setCategory={setCategory} isOpen={isModalEditOpen} setIsOpen={setIsModalEditOpen} title={'Editando Categoria'} description={'Altere os dados da categoria e clique em Salvar.'} onSave={updateCategory}/>
        <DeleteAlert isLoading={isLoading} deleteAction={deleteCategory} isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen} title="Deseja deletar esta categoria ?" description={'Esta operação vai excluir a categoria do banco de dados e não poderá ser revertida.'}/>
    </div>
  )
}

export default Categories