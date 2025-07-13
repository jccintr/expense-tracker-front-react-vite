
import api from "@/api/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
//import logo from '../assets/logo350.png';
import { useState,useContext } from "react";
import AuthContext from "@/context/AuthContext"
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react"




const Login = () => {
    const [formData,setFormData] = useState<{}>({email:'',password:''});
    const [errorMessage,setErrorMessage] = useState<String>(null);
    const {setToken,setLoggedUser} = useContext(AuthContext);
    const [isLoading,setIsloading] = useState<Boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: { target: { id: any; value: string; }; }) => {
        setFormData({...formData,[e.target.id]: e.target.value.trim()});
    }
   

    const handleSubmit = async (e) => {
  
        e.preventDefault();

        setErrorMessage(null);

        if(formData.email.trim().length === 0){
           setErrorMessage("Informe o email por favor.");
            return;
          }
          
          if(formData.password.trim().length === 0){
            setErrorMessage("Informe a senha por favor.");
            return;
          }

         setIsloading(true);
          try {
            var response = await api.login(formData.email, formData.password);
         } catch (error) {
            setIsloading(false);
            setErrorMessage('Serviço indisponível. Tente novamente mais tarde.')
            return;
         }

         if(response.status!==200){
            setIsloading(false);
            setErrorMessage('Email e ou senha inválidos.');
            return;
        }

        const jsonToken = await response.json();
        setToken(jsonToken.token);
        

        try {
            response = await api.validateToken(jsonToken.token);
          } catch (error) {
            setIsloading(false);
            setErrorMessage('Serviço indisponível. Tente novamente mais tarde.')
             return;
          }
         
          if(response.ok){
             let jsonUser = await response.json();
             setLoggedUser(jsonUser);
             navigate('/?page=transactions');
             setIsloading(false);
          
          }
       
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-gray-100">
        <Card className="w-[350px]">
            <CardHeader className="justify-center">
               <img src='logo350.png' alt='logo' className='w-8/12 m-auto' />
               <CardTitle className="w-full text-center text-xl" >Expense Tracker</CardTitle>
               <CardDescription className="w-full text-center text-sm">Informe suas credenciais para acessar o sistema</CardDescription>
            </CardHeader>
            <CardContent>
               <Label className="mb-2 font-semibold" htmlFor="email" >Email</Label>
               <Input value={formData.email} className="mb-6" id="email" placeholder="Digite o seu email" onChange={handleChange}/>
               <Label className="mb-2 font-semibold" htmlFor="password" >Senha</Label>
               <Input value={formData.password} id="password" type={'password'} placeholder="Digite a sua senha" onChange={handleChange}/>
               {errorMessage&&<Label className="text-red-500 mt-3 w-full justify-center">{errorMessage}</Label>}
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleSubmit}>{isLoading&&<Loader2 className="animate-spin" />}ENTRAR</Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Login