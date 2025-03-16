import { Button } from '@/components/ui/button'
import React,{useState,useEffect,useContext} from 'react'
import api from '@/api/api';
import AuthContext from '@/context/AuthContext';
import TableCategories from '@/components/tables/TableCategories';
import CategoryModal from '@/components/modals/CategoryModal';
import DeleteAlert from '@/components/modals/DeleteAlert';



const Categories = () => {
  const [categories,setCategories] = useState([]);
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalDeleteOpen,setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [category,setCategory] = useState({id:0,name:''});
 

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
    setIsModalOpen(true);
}

const onEdit = (category) => {
    setCategory(category);
    setIsModalEditOpen(true);
}

const onDelete = (category) => {
  setCategory(category);
  setIsModalDeleteOpen(true);
}

const addCategory = async  () => {
  /*
  if(name.trim().length===0){
    Alert.alert("Error","Please, enter a valid category name.");
    return;
   }
    */
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
/*
  if(name.trim().length===0){
    Alert.alert("Error","Please, enter a valid category name.");
    return;
   }
    */
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
        <TableCategories categories={categories} onEdit={onEdit} onDelete={onDelete}/>
        <CategoryModal isLoading={isLoading} category={category} setCategory={setCategory} isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Nova Categoria'} description={'Insira os dados da nova categoria e clique em Salvar.'} onSave={addCategory}/>
        <CategoryModal isLoading={isLoading} category={category} setCategory={setCategory} isOpen={isModalEditOpen} setIsOpen={setIsModalEditOpen} title={'Editando Categoria'} description={'Altere os dados da categoria e clique em Salvar.'} onSave={updateCategory}/>
        <DeleteAlert isLoading={isLoading} deleteAction={deleteCategory} isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen} title="Deseja deletar esta categoria ?" description={'Esta operação vai excluir a categoria do banco de dados e não poderá ser revertida.'}/>
    </div>
  )
}

export default Categories