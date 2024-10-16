import { Routes ,Route, Navigate} from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login';
import Signup from './pages/signup/SignUp'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser}=useAuthContext();
  return (
      <div className='lg:p-10 h-screen flex items-center justify-center bg-[var(--background3)]'> 
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
          <Route path='/login' element={authUser ? <Navigate to="/"/>:<Login/>} />
          <Route path='/signup' element={authUser ? <Navigate to="/"/>:<Signup/>} />
        </Routes>
        <Toaster/>
      </div>
  );
}

export default App;
