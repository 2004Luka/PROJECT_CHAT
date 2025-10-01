import { Routes ,Route, Navigate} from 'react-router-dom'
import Login from './pages/login/Login';
import Signup from './pages/signup/SignUp'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser}=useAuthContext();
  return (
      <div className='h-screen min-h-screen w-full p-0 sm:p-4 flex items-center justify-center bg-gradient-to-b from-emerald-700 to-black bg-fixed'>
        
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
