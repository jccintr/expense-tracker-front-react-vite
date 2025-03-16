import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import { Home } from './pages/Home';



function App() {
  return (
    <AuthProvider>
   
          <BrowserRouter>
           
              <Routes>
                  <Route path="/login" element={<Login/>}/>
                  <Route element={<PrivateRoute/>}>
                      <Route path="/" element={<Home/>}/>
                  </Route>
              </Routes>
           
          </BrowserRouter>
     
   </AuthProvider>
  )
}

export default App
