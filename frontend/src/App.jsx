import { Routes ,Route, Navigate} from 'react-router-dom'
import Login from './pages/login/Login';
import Signup from './pages/signup/SignUp'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser}=useAuthContext();
  return (
      <div className='lg:p-10 h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-green-900 to-teal-900 min-h-screen relative overflow-hidden p-0 sm:p-4'>
        <div className='absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent pointer-events-none' />
        <div className='absolute inset-0 bg-gradient-radial from-teal-500/10 via-transparent to-transparent pointer-events-none [background-position:80%_20%]' />
        <div className='absolute inset-0 bg-gradient-radial from-lime-500/10 via-transparent to-transparent pointer-events-none [background-position:40%_40%]' />
        
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
          <Route path='/login' element={authUser ? <Navigate to="/"/>:<Login/>} />
          <Route path='/signup' element={authUser ? <Navigate to="/"/>:<Signup/>} />
        </Routes>
        
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#f8fafc',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </div>
  );
}

export default App;
