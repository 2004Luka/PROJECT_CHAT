import { Routes ,Route, Navigate} from 'react-router-dom'
import Login from './pages/login/Login';
import Signup from './pages/signup/SignUp'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser}=useAuthContext();
  return (
      <div>
        
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
          <Route path='/login' element={authUser ? <Navigate to="/"/>:<Login/>} />
          <Route path='/signup' element={authUser ? <Navigate to="/"/>:<Signup/>} />
        </Routes>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgb(245, 245, 240)', /* neutral-100 - Semantic Foreground */
              color: '#0f172a', /* slate-900 - High contrast text */
              border: '1px solid rgba(214, 211, 209, 0.6)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#047857', /* emerald-700 - Technical Green */
                secondary: 'rgb(245, 245, 240)',
              },
              style: {
                border: '1px solid rgba(5, 150, 105, 0.4)',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: 'rgb(245, 245, 240)',
              },
              style: {
                border: '1px solid rgba(239, 68, 68, 0.3)',
              },
            },
          }}
        />
      </div>
  );
}

export default App;
