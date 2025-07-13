import { Tags, Receipt,ChartColumnBig,Wallet,LogOut } from "lucide-react"
import { Link } from "react-router-dom";
 import { useContext } from "react";
import {SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
//import logo from '../assets/logo350.png';
import { Label } from "./ui/label";
import AuthContext from "@/context/AuthContext";
import { useNavigate } from 'react-router-dom';
 
// Menu items.
const items = [
  {
    title: "Transações",
    url: "/?page=transactions",
    icon:Receipt,
  },
  {
    title: "Dashboard",
    url: "/?page=dashboard",
    icon: ChartColumnBig,
  },
  {
    title: "Categorias",
    url: "/?page=categories",
    icon: Tags,
  },
  {
    title: "Contas",
    url: "/?page=accounts",
    icon: Wallet,
  },
 
]

const SideBar = () => {
  const {loggedUser,setLoggedUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = async () => {

    setLoggedUser(null);
    navigate('/login');
  
  }

  return (
    <SidebarProvider>
    <Sidebar>
    <SidebarHeader>
      <img src='logo350.png' alt='logo' className='w-6/12 m-auto' />
      <Label className="w-full justify-center text-xl font-semibold">Expense Tracker</Label>
      <Label className="w-full justify-center text-sm font-semibold">{loggedUser.name}</Label>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Selecione uma opção</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
                <SidebarMenuButton onClick={onLogout}>
                  <LogOut />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  </SidebarProvider>
  )
}

export default SideBar